// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

const loginPage = require('../integration/locators/login-page.json')
require ('@4tw/cypress-drag-drop')
import 'cypress-file-upload'


Cypress.Commands.add('resetSession', () => {
  cy.clearCookie('jwt');
  cy.clearCookie('session');
  cy.clearCookie('refresh_token');
});

Cypress.Commands.add('persistSession', () => {
  Cypress.Cookies.defaults({
    preserve: 'refresh_token',
});
});
Cypress.Commands.add('randomText', () => {
  var randomtext = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++)
    randomtext += possible.charAt(Math.floor(Math.random() * possible.length));

  return randomtext;
});
Cypress.Commands.add('login', (email, password) => {
      cy.resetSession();
      cy.visit('https://www.ixc-dev.com');
      cy.get(loginPage.email).type(email);
      cy.get(loginPage.password).type(password,{log:false})
      cy.get(loginPage.loginBtn).click()
      cy.get('#NewPart-btn').contains('New Part');
      cy.persistSession();  
});
// Returns the PDFTron iFrame
Cypress.Commands.add('PDF', () => {
  cy.log(cy.get('#pdf-viewer'));
  return (
    cy.get('#pdf-viewer')
      .get('#webviewer-1')
      // Cypress yields jQuery element, which has the real
      // DOM element under property "0".
      // From the real DOM iframe element we can get
      // the "document" element, it is stored in "contentDocument" property
      // Cypress "its" command can access deep properties using dot notation
      // https://on.cypress.io/its
      .its('0.contentDocument.body', {timeout: 30000})
      .should('be.visible')
      .then(cy.wrap)
  );
});
Cypress.Commands.add('readConfig', () => {
  cy.get('#config')
    .should('have.attr', 'data-json')
    .then((data) => {
      const config = JSON.parse(data);
      cy.wrap(config).as('config');
    });
  })