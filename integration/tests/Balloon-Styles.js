const fileName = 'test.pdf';
const partInformation = require('../locators/part-information-section.json');
const homePage = require('../locators/home-page.json');
const wizard = require('../locators/wizard.json');
const balloonStyles = require('../locators/balloon-styles.json');
const partGrid = require('../locators/part-grid.json');


import 'cypress-file-upload';
import {faker} from  '@faker-js/faker';

describe('Part Creation Wizard', () => {

  before(() => {
    cy.login('spartan.ideagen@gmail.com', 'Te@mSp@rtan1');
  });

  it('Add a balloon Style', () => {
    cy.get(homePage.newPartBtn).should('exist').click();
    cy.get(homePage.fileUploadArea).attachFile(fileName, { subjectType: 'drag-n-drop' });
    cy.get(homePage.fileUpload.file, { timeout: 30000 }).should('be.visible');
    cy.get(homePage.fileUploadArea).should('be.visible')
    cy.get(homePage.fileUploadSaveBtn).should('be.visible').click({ timeout: 1000 });
    cy.get(homePage.continueTitle, { timeout: 50000 }).should('contain', 'features');
    cy.get(homePage.getStartedBtn).should('exist').click();
    cy.get(wizard.info.title).should('exist');
    cy.get(partInformation.customer).click();
    cy.contains('Ideagen').click()
    cy.get(partInformation.customer).click();
    cy.get(partInformation.partNumber).clear().type();
    cy.get(partInformation.partRevision).clear().type(faker.random.alphaNumeric(1));
    cy.get(wizard.next).click();
    cy.get(partInformation.drawingNumber).type(faker.random.numeric(5));
    cy.get(partInformation.drawingRevision).clear().type(faker.random.alphaNumeric(1));
    cy.get(wizard.next).click();
    cy.get(wizard.tolerances.title).should('exist');
    cy.get(wizard.next).click()
    cy.get(partGrid.gridPageTitle).should('exist')
    cy.get(wizard.next).click();
    cy.get(wizard.balloons.title).should('exist');
    cy.get(balloonStyles.stylesPreset).should('be.visible')
    cy.contains('Default')
    cy.get(balloonStyles.addBalloonStyle).click()
    cy.get(balloonStyles.addBalloon).click({force:true})
    cy.contains('Classification').click()
    cy.get(balloonStyles.classification).click()

  })

  //Need to add the add new ballon style test case later when there is option to delete//
  it('Delete a balloon Style', () => {
    cy.get(balloonStyles.deleteBalloonStyle).click({multiple:true});
    cy.get(balloonStyles.classification).should('not.exist')
  })
})
