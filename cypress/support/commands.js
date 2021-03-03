Cypress.Commands.add("loginAPI", (email, password) => {
    cy.request({
        method: 'GET',
        url: '/login',
        body: {
            "email": email,
            "password": password
        }
    }).then(response => {
        cy.log(response)
    })
})