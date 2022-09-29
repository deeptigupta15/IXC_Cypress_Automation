const fileName = 'test.pdf';
const fileName1 = 'test2.pdf';
const partCanvas = require('../locators/part-canvas-section.json');
const homePage = require('../locators/home-page.json');
const docInformation = require('../locators/part-docs-info-section.json');
const wizard = require('../locators/wizard.json');
const partSider = require('../locators/part-sider-common.json');
const partInformation = require('../locators/part-information-section.json');
import 'cypress-file-upload';
import { faker } from '@faker-js/faker'
require('cypress-plugin-tab');

describe('Part Information functionality ', () => {

  before(() => {
    cy.login('spartan.ideagen@gmail.com', 'Te@mSp@rtan1');
    cy.get(homePage.newPartBtn,{timeout:10000}).should('be.visible').click();
    cy.get(homePage.fileUploadArea).attachFile(fileName, { subjectType: 'drag-n-drop' });
    cy.get(homePage.fileUpload.file, { timeout: 30000 }).should('be.visible');
    cy.get(homePage.fileUploadArea).should('be.visible')
    cy.get(homePage.fileUploadSaveBtn).should('be.visible').click({ timeout: 1000 });
    cy.get(homePage.continueTitle, { timeout: 50000 }).should('contain', 'features');
    cy.get(homePage.getStartedBtn).should('exist').click();
    cy.get(wizard.info.title).should('exist');
  })
  it('Add a new customer', () => {
    cy.get(partInformation.customer).click({ force: true })
    cy.get(partInformation.addCustomer).click()
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Create Customer");
    })
    let newCustomer = faker.random.alpha(3)
    cy.get(partInformation.newCustomerName).type(newCustomer)
    cy.get(partInformation.createCustomerOkButton).click()
    //convert the first character to Uppercase to match the customer name//
    let newCustomer1=newCustomer.charAt(0).toUpperCase() + newCustomer.slice(1,3)
    cy.get(partInformation.customer).should('contain',newCustomer1)
  })
  it('Part Information page correct values', () => {
    cy.get(partInformation.partNumber).type(faker.random.numeric(4));
    cy.get(partInformation.partRevision).clear().type(faker.random.alphaNumeric());
    cy.get(partInformation.partName).should('exist').and('contain', fileName.substring(0,4))
    cy.get(partInformation.documentControl).click().should('contain','None')
    cy.get(wizard.next).click();
  });

  it('Document Information page correct values', () => {
    cy.get(docInformation.documentType).should('not.be.empty').and('contain','Drawing')
    var todaysDate = new Date().toISOString().slice(0, 10);
    cy.get(docInformation.drawingNumber).type(faker.random.numeric(2))
    cy.get(docInformation.drawingRevision).should('contain', todaysDate)
    cy.get(docInformation.drawingName).should('contain',fileName)
    cy.get(docInformation.pageOneInput).should('exist')
    cy.get(docInformation.pageTwoInput).should('exist')
   //check the toolbar on the top//
    cy.get(partCanvas.documentTools.partNumber).should('not.be.null')
    cy.focused().tab()
    cy.get(partCanvas.documentTools.partRevisionSelect).should('contain',todaysDate)
    cy.get(partCanvas.documentTools.drawingRevisionSelect).should('contain',todaysDate)
  })
   //add customer test commented till DB can be cleared//

  it('Edit the document information fields', () => {
    const drawingNum=faker.random.numeric(2)
    cy.get(docInformation.drawingNumber).clear().type(drawingNum);
    const drawingRev=faker.random.alphaNumeric(2)
    cy.get(docInformation.drawingRevision).clear().type(drawingRev);
    
   
    cy.get(docInformation.pageOneInput).clear().type(faker.random.numeric(2))
    cy.get(docInformation.pageTwoInput).clear().type(faker.random.numeric(2))
    cy.get(partCanvas.documentTools.partDrawingSelect).should('contain',drawingNum)
    cy.get(partCanvas.documentTools.drawingRevisionSelect).should('contain',drawingRev)
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
    cy.contains(fileName1)

  })
  it('View revision history', () => {
    cy.get(partCanvas.documentTools.drawingRevisionSelect).click()
    cy.get(partCanvas.documentTools.drawingRevisionHistoryButton).click()
    cy.get('h1').should('have.text', 'Revision History')

  })
})