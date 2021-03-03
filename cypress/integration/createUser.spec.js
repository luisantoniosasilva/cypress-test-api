/// <reference types="cypress" />

describe('CREATE USERS', () => {

    const users = [
        {
            "name": "Ricardo",
            "job": "QA"
        },
        {
            "name": "Marcela",
            "job": "QA II",
            "experience": 2
        }

    ]

    it('POST users', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            body: users
        }).then(response => {
            Cypress.log({ name: 'duration', displayName: 'DURATION', message: `**[ ⏳ ${response.duration} ]**` })
            expect(response.status).to.be.eq(201)
            expect(response.body.length).to.eq(users.length)
            expect(response.headers.date).to.include(Cypress.moment().format('DD MMM YYYY'))

            cy.wrap(response.body, {log: false}).each(($el, index) => {
                expect($el).to.have.property('name')
                expect($el.name).to.be.a("string")
                expect($el).to.have.property('job')
                expect($el.job).to.be.a("string")
                if($el.experience)
                    expect($el.experience).to.be.a("number")
                expect($el).to.include(users[index])
            })
        })
    });
});