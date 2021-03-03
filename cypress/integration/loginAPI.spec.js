/// <reference types="cypress" />

describe('LOGIN BY API', () => {
    it('Login by API', () => {
        cy.loginAPI("eve.holt@reqres.in", "cityslicka")
    });
});