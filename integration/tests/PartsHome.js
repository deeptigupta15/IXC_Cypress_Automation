const fileName = 'test.pdf';
const fileName1 = 'test2.PDF';
const partInformation = require('../locators/part-information-section.json');
const sideNavMenu = require('../locators/side-nav-menu-section.json');
const homePage = require('../locators/home-page.json');
const wizard = require('../locators/wizard.json');
import { faker } from '@faker-js/faker'

import 'cypress-file-upload';
let columnHeaders
describe('Part Creation Wizard', () => {

  before(() => {
    cy.login('spartan.ideagen@gmail.com', 'Te@mSp@rtan1');
  });
  it('Alert me button keeps user on parts list page', () => {
    cy.get(homePage.newPartBtn).should('exist').click();
    cy.get(homePage.fileUploadArea).attachFile(fileName, { subjectType: 'drag-n-drop' });
    cy.get(homePage.fileUpload.file).should('be.visible');
    cy.get(homePage.fileUploadSaveBtn).should('be.visible').click({timeout:1000});
    cy.get(homePage.continueTitle,{timeout: 50000 }).should('contain', 'features');
    cy.get(homePage.alertMeBtn).should('exist').click();
    cy.get(homePage.newPartBtn).should('exist');
  });
  it('Search a part by partName', () => {
    //Verify table headers //
    cy.get(homePage.partTableHeader).get('th').each(elem => {
    columnHeaders=elem.text() 
    })
   cy.contains('Part Number')
   cy.contains('Part Name')
   cy.contains('Revision')
   cy.contains('Customer')
   cy.contains('Updated at')
   cy.contains('Review Status')
   cy.contains('Access Control')
   cy.contains('Autoballoon')
    //Search part using part name//
    cy.get(homePage.searchPart).type("test")
    //assert that the first row contains 'test'//
    cy.get(homePage.parttable).find(homePage.firstRow).should('contain','test')
})

// it('Delete the first part from the parts page', () => {
//   cy.get('[data-icon=delete]').first().click({force:true});
//   cy.on("window:confirm", (str) => {
//     expect(str).to.contain("Are you sure?");
//   })
//   cy.get("#popconfirm-btn-ok").click({ force: true })
// })
  it('verify fields on the side Window wrapper ', () => {
    cy.get(homePage.parttable).should('exist')
    cy.contains('test').first().click({force:true},{timeout:2000})
    // check the fields in the side wrapper//
    cy.get(homePage.sideWindowWrapper.balloonPart).should('exist')
    cy.get(homePage.sideWindowWrapper.partReport).should('exist')
    cy.get(homePage.sideWindowWrapper.exportPart).should('be.visible')
    cy.get(homePage.sideWindowWrapper.detailDelete).should('be.visible')
    cy.get(homePage.sideWindowWrapper.closeDrawer).should('be.visible')
    cy.get(homePage.sideWindowWrapper.partNumber).should('be.visible')
    cy.get(homePage.sideWindowWrapper.partName).should('be.visible')
    cy.get(homePage.sideWindowWrapper.partNumber).should('be.visible')
    cy.get(homePage.sideWindowWrapper.partRevision).should('be.visible')
    //These elments have opacity 0 so not visible//
    cy.get(homePage.sideWindowWrapper.savedReports).should('not.be.visible')
    cy.get(homePage.sideWindowWrapper.statusSection).should('be.visible')
    cy.get(homePage.sideWindowWrapper.partDocumentSection).should('be.visible')
//Check the status //
    cy.get(homePage.sideWindowWrapper.revisionDropdown).last().click().invoke('text')
    cy.contains('Unverified')
    cy.contains('Ready for Review')
    cy.contains('Verified')
  })
  it('attach and delete part document', () => {
    cy.get(homePage.sideWindowWrapper.cardContent).first().trigger('mouseover')
    cy.get(homePage.sideWindowWrapper.attachDocument).first().click({force:true})
    cy.get(homePage.fileUploadArea).attachFile(fileName1 ,{subjectType: 'drag-n-drop'})
    cy.get(homePage.fileUpload.file, { timeout: 30000 }).should('be.visible');
    cy.get(homePage.fileUploadArea).should('be.visible')
    cy.get(homePage.fileUploadSaveBtn).should('be.visible').click({timeout:1000});
    cy.get(homePage.sideWindowWrapper.cardContent)
    cy.contains('test2.PDF')
    //delete the attached document//
    cy.get(homePage.sideWindowWrapper.cardContent).trigger('mouseover')
    cy.get(homePage.sideWindowWrapper.documentDelete).click({force:true})
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Delete document and any associated items?");
        })
    cy.get("#popconfirm-btn-ok").click({ force: true })
    cy.get('.card-content').should('not.contain','test2.PDF')
  })
  it('attach and delete attached document', () => {
    cy.get(homePage.sideWindowWrapper.cardContent).last().trigger('mouseover')
    cy.get(homePage.sideWindowWrapper.attachDocument).last().click({force:true})
    cy.get(homePage.fileUploadArea).attachFile(fileName1 ,{subjectType: 'drag-n-drop'})
    cy.get(homePage.fileUpload.file, { timeout: 30000 }).should('be.visible');
    cy.get(homePage.fileUploadArea).should('be.visible')
    cy.get(homePage.fileUploadSaveBtn).should('be.visible').click();
    cy.wait(1000);
    cy.get(homePage.sideWindowWrapper.cardContent)
    cy.contains('test2.PDF')
    //delete the attached document//
    cy.get(homePage.sideWindowWrapper.cardContent).last().trigger('mouseover')
    cy.get(homePage.sideWindowWrapper.documentDelete).click({force:true})
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Delete document and any associated items?");
        })
    cy.get("#popconfirm-btn-ok").click({force: true})
    cy.get(homePage.sideWindowWrapper.cardContent).should('not.contain','test2.PDF')
  })
  it('Add part button loads the wizard', () => {
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
    cy.get(partInformation.partNumber).clear().type(faker.random.numeric(5));
    cy.get(partInformation.partRevision).clear().type(faker.random.alphaNumeric(3));
    cy.get(wizard.next).click();
    cy.get(partInformation.drawingNumber).type(faker.random.numeric(5));
    cy.get(partInformation.drawingRevision).clear().type(faker.random.alphaNumeric(3));
    cy.get(sideNavMenu.defaultTolerancesIcon).should('not.be.visible');
    cy.get(wizard.next).click();
    cy.get(wizard.tolerances.title).should('exist');
    cy.get(wizard.next).click();
    cy.get(wizard.grid.title).should('exist');
    cy.get(wizard.next).should('exist').click();
    cy.get(wizard.balloons.title).should('exist');
    cy.get(wizard.next).should('exist').click();
  });
})