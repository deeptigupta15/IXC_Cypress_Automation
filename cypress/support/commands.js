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
const account=require('../integration/locators/settings-account.json')

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
Cypress.Commands.add('generateEmail', ()=> {
  // fill-out form

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
 console.log(makeid(15));
 cy.get(account.Seats.Email).type((makeid(15) + "@aharo.com"),{force:true})

})
Cypress.Commands.add('login', (email, password) => {
      cy.resetSession();
      cy.visit('https://www.ixc-dev.com');
      cy.get(loginPage.email).type(email);
      cy.get(loginPage.password).type(password,{log:false})
      cy.get(loginPage.loginBtn).click()
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