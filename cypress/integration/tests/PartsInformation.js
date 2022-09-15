const fileName = 'test.pdf';
const fileName1 = 'test2.pdf';
const partCanvas = require('../locators/part-canvas-section.json');
const homePage = require('../locators/home-page.json');
const wizard = require('../locators/wizard.json');
const partSider = require('../locators/part-sider-common.json');
const partInformation = require('../locators/part-information-section.json');
import 'cypress-file-upload';
import { faker } from '@faker-js/faker'
require('cypress-plugin-tab');

describe('Part Information page ', () => {

  before(() => {
    cy.login('spartan.ideagen@gmail.com', 'Te@mSp@rtan1');
    cy.get(homePage.newPartBtn).should('exist').click();
    cy.get(homePage.fileUploadArea).attachFile(fileName, { subjectType: 'drag-n-drop' });
    cy.get(homePage.fileUpload.file, { timeout: 30000 }).should('be.visible');
    cy.get(homePage.fileUploadArea).should('be.visible')
    cy.get(homePage.fileUploadSaveBtn).should('be.visible').click({ timeout: 1000 });
    cy.get(homePage.continueTitle, { timeout: 50000 }).should('contain', 'features');
    cy.get(homePage.getStartedBtn).should('exist').click();
    cy.get(wizard.info.title).should('exist');
  });

  it('Document Information page correct values', () => {
    cy.get(partInformation.customer).click();
    cy.contains('Ideagen').click()
    var todaysDate = new Date().toISOString().slice(0, 10);
    cy.get(partCanvas.documentTools.partNumber).should('exist')
    cy.get(partCanvas.documentTools.partRevisionSelect).should('contain', todaysDate)
    cy.get(partCanvas.documentTools.partDrawingSelect).should('exist')
    cy.get(partCanvas.documentTools.drawingRevisionSelect).should('exist')
    //part number is mandatory//
    cy.get(partInformation.partNumber).should('not.be.null')
    cy.focused().tab()
    cy.get(partInformation.partRevision).click()
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Part Number is blank and will not be saved.");
    })
    //update revision number and part number//
    let partRev=faker.random.alphaNumeric()
    cy.get(partInformation.partRevision).find(partSider.input).clear().type(partRev);
    cy.get(partInformation.partNumber).find(partSider.input).clear().type(faker.random.numeric(4));
    cy.get(partInformation.partRevision).click()
    cy.get(partCanvas.documentTools.partRevisionSelect).should('contain', partRev)
   // cy.get(partCanvas.documentTools.partNumber).should('contain', '222')
  });
   //add customer test commented till DB can be cleared//
   it('Add a new customer', () => {
    cy.get(partInformation.customer).click({ force: true })
    cy.get(partInformation.addCustomer).click()
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Create Customer");
    })
    cy.get(partInformation.newCustomerName).type("abc")
    cy.get(partInformation.createCustomerOkButton).click()
    cy.get(partInformation.customer).should('have.text', 'Abc')
  })
  it('Edit the document information fields', () => {
    cy.get(wizard.next).click();
    cy.get(partInformation.drawingNumber).type(faker.random.numeric(4));
    cy.get(partInformation.drawingRevision).clear().type(faker.random.alphaNumeric());
    cy.get(partInformation.pageOneInput).clear().type('P 1')
    cy.get(partInformation.pageTwoInput).clear().type('P 2',{timeout:2000})
  })

 
  it('Add a new drawing', () => {
    cy.get(partCanvas.documentTools.partDrawingSelect).invoke('removeAttr', 'unselectable').click();
    //cy.get(partCanvas.documentTools.partDrawingSelect).click()
    cy.get(partCanvas.documentTools.addDrawingButton).click()
    cy.get(homePage.fileUploadArea).attachFile(fileName1, { subjectType: 'drag-n-drop' });
    cy.get(homePage.fileUpload.file, { timeout: 30000 }).should('be.visible');
    cy.get(homePage.fileUploadArea).should('be.visible')
    cy.get(partCanvas.documentTools.fileUploadNextButton).should('be.visible').last().click({ force: true }, { timeout: 1000 });
    //check that the new drawing is added//
    cy.get(partCanvas.documentTools.partDrawingSelect).click()
    cy.contains('test2.pdf')
  })
  it('View revision history', () => {
    cy.get(partCanvas.documentTools.drawingRevisionSelect).click()
    cy.get(partCanvas.documentTools.drawingRevisionHistoryButton).click()
    cy.get('h1').should('have.text', 'Revision History')

  })
})