/// <reference types="cypress" />

describe('DELETE USER', () => {
    it('DELETE User', () => {
        cy.request('DELETE', '/users/2').then(response => {
            Cypress.log({ name: 'duration', displayName: 'DURATION', message: `**[ ⏳ ${response.duration} ]**` })
            expect(response.status).to.be.eq(204)
            expect(response.body).to.be.empty
        })
    })
});