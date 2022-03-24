// https://docs.cypress.io/api/introduction/api.html

describe('Home page test', () => {
  it('Visits the dashboard', () => {
    cy.visit('/')
    cy.contains('h1', 'Token Seller')
  })
})

describe('Dashboard test', () => {
  it('Visits the app root url', () => {
    cy.visit('/dashbaord')
    cy.contains('h1', 'Dashboard')
  })
})