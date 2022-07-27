const fileName = 'test.pdf';
const homePage = require('../locators/home-page.json');
const partGrid = require('../locators/part-grid.json');
const wizard = require('../locators/wizard.json');
const partInformation = require('../locators/part-information-section.json');
import { faker } from '@faker-js/faker';

import 'cypress-file-upload';



describe('Part Creation Wizard', () => {

  before(() => {
    cy.login('spartan.ideagen@gmail.com', 'Te@mSp@rtan1');
    cy.get(homePage.newPartBtn).should('exist').click();
    cy.get(homePage.fileUploadArea).attachFile(fileName, { subjectType: 'drag-n-drop' });
    cy.get(homePage.fileUpload.file, { timeout: 30000 }).should('be.visible');
    cy.get(homePage.fileUploadArea).should('be.visible')
    cy.get(homePage.fileUploadSaveBtn).should('be.visible').click({timeout:1000});
    cy.get(homePage.continueTitle, { timeout: 50000 }).should('contain', 'features');
    cy.get(homePage.getStartedBtn).should('exist').click();
    cy.get(wizard.info.title).should('exist');
    cy.get(partInformation.customer).click();
    cy.contains('Ideagen').click()
    cy.get(partInformation.partNumber).clear().type(faker.random.numeric(4));
    cy.get(partInformation.partRevision).clear().type(faker.random.alphaNumeric());
    cy.get(wizard.next).click();
    cy.get(partInformation.drawingNumber).type(faker.random.numeric(4));
    cy.get(partInformation.drawingRevision).clear().type(faker.random.alphaNumeric(2));
    cy.get(wizard.next).click();
    cy.get(wizard.tolerances.title).should('exist');
    cy.get(wizard.next).click()
    cy.get(partGrid.gridPageTitle).should('exist')
  });

  it('Grid Zones toggle', () => {
    
    //toggle grid document //
    cy.get(partGrid.gridSwitchDocToggle).click({timeout:1000})
    //cy.get(partGrid.gridSwitchPageToggle).should('have.css','aria-checked','true')
    cy.get(partGrid.gridSwitchDocToggle).click({timeout:1000})
   // cy.get(partGrid.gridSwitchPageToggle).should('have.css','aria-checked','true')
    
     //toggle grid zones//
    cy.get(partGrid.gridSwitchPageToggle).click({timeout:1000})
    cy.get(partGrid.gridSwitchPageToggle).click({timeout:1000})
  })
    it('Update the column and row numbers in the grid ', () => {
      cy.get(partGrid.colLeft).should('exist').clear().type(faker.random.numeric())
      cy.get(partGrid.colRight).should('exist').clear().type(faker.random.numeric())
      cy.get(partGrid.rowTop).should('exist').clear().type(faker.random.alphaNumeric())
      cy.get(partGrid.rowBot).should('exist').clear().type(faker.random.alphaNumeric())
      cy.get(partGrid.ColRowsToSkip).should('be.empty')
    })
      it('Update the grid and label color ', () => {
      cy.get(partGrid.labelColor).should('have.css', 'background-color', 'rgb(150, 60, 189)').click({force:true})
      cy.get(partGrid.ColourRed).click({force:true})
      cy.get(partGrid.labelColor).should('have.css', 'background-color', 'rgb(208, 2, 27)').click({timeout:2000})
      cy.get(partGrid.gridColor).should('have.css','background-color', 'rgb(150, 60, 189)').click({force:true})
      cy.get(partGrid.ColourRed).last().click({force:true})
      cy.get(partGrid.gridColor).should('have.css', 'background-color', 'rgb(208, 2, 27)')
  });
})