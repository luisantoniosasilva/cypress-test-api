/// <reference types="cypress" />

describe('UPDATE USER', () => {
    const user = [
        {
            "name": "Elisangela",
        }
    ]
    it('PUT users', () => {
        cy.request('PUT', '/users/2', user).then(response => {
            Cypress.log({ name: 'duration', displayName: 'DURATION', message: `**[ ⏳ ${response.duration} ]**` })
            expect(response.status, '**STATUS**').to.be.eq(200)
            expect(response.body, '**BODY TO BE AN ARRAY**').to.be.a("array")
            expect(response.body[0].name, '**NAME**').to.be.eq(user[0].name)
            expect(response.body, '**LENGTH**').to.be.length(user.length)
        })
    });
});