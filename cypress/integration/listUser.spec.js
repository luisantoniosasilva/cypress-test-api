/// <reference types="cypress" />

describe('LIST USERS', () => {
    it('GET users', () => {
        cy.request('GET', '/users').then(response => {
            Cypress.log({ name: 'duration', displayName: 'DURATION', message: `**[ ⏳ ${response.duration} ]**` })
            expect(response.status).to.be.eq(200)
            expect(response.body.total).gt(0)
            expect(response.body.page).to.be.a("number").gt(0)
            expect(response.headers).to.have.property("date")
            expect(response.headers.date).to.include(Cypress.moment().format('DD MMM YYYY'))
            expect(response.body.support.text).to.include('To keep ReqRes free, contributions towards server costs are appreciated!')
            expect(response.body.support.url).not.to.be.null
            expect(response.body.data).to.have.length(response.body.per_page)
            
            const schema = Cypress.log({ name: 'schema', displayName: 'SCHEMA', message: '**[ VALIDATING THE SCHEMA ⬇ ]**', autoEnd: false })
            cy.wrap(response.body.data, {log: false}).each(($el) => {
                expect($el.id, 'ID').to.be.a("number").gt(0)
                expect($el.avatar, 'AVATAR').to.be.a("string")
                expect($el.email, 'EMAIL').to.be.a("string").to.include("@reqres.in")
                expect($el.first_name, 'FIRST NAME').to.be.a("string")
                expect($el.last_name, 'LAST NAME').to.be.a("string")
            })
            schema.end()
        })
    });

    it('GET single user not found', () => {
        cy.request({
            method: 'GET', 
            url: '/api/users/23',
            failOnStatusCode: false
        }).then(response => {
            Cypress.log({ name: 'duration', displayName: 'DURATION', message: `⏳ ${response.duration}` })
            expect(response.status).to.be.eq(404)
            expect(response.body).to.be.empty
        })
    })
});