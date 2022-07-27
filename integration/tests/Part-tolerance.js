const fileName = 'test.pdf';
const homePage = require('../locators/home-page.json');
const wizard = require('../locators/wizard.json');
const partInformation = require('../locators/part-information-section.json');
const partTolerance = require('../locators/part-tolerance.json')
import 'cypress-file-upload';
import { faker } from '@faker-js/faker'

require('cypress-plugin-tab');
let rowlength1
let rowlength2

describe('Part Creation Wizard', () => {

  before(() => {
    cy.login('spartan.ideagen@gmail.com', 'Te@mSp@rtan1');
    cy.get(homePage.newPartBtn).should('exist').click();
    cy.get(homePage.fileUploadArea).attachFile(fileName, { subjectType: 'drag-n-drop' });

    cy.get(homePage.fileUpload.file, { timeout: 50000 }).should('be.visible');
    cy.get(homePage.fileUploadArea).should('be.visible')
    cy.get(homePage.fileUploadSaveBtn).should('be.visible').click({ timeout: 1000 });
    cy.get(homePage.continueTitle, { timeout: 50000 }).should('contain', 'features');
    cy.get(homePage.getStartedBtn).should('exist').click({ timeout: 5000 });
    cy.wait(30000)
    cy.get(wizard.info.title).should('exist');
    cy.get(partInformation.customer).click();
    cy.contains('Ideagen').click()
    cy.get(partInformation.partNumber).clear().type(faker.random.alphaNumeric(5));
    cy.get(partInformation.partRevision).clear().type(faker.random.alphaNumeric(1));
    cy.get(wizard.next).click();
    cy.get(partInformation.drawingNumber).type(faker.random.numeric(5));
    cy.get(partInformation.drawingRevision).clear().type(faker.random.alphaNumeric(1));
    cy.get(wizard.next).click();
    cy.get(wizard.tolerances.title).should('exist');
  });

  it('Modify linear tolerance by precision', () => {

    cy.get(partTolerance.tolerancePreset).should('have.text', 'Default');
    cy.get(partTolerance.linearTable.precisionTopColumn).first().click()
    cy.get(partTolerance.linearTable.precisionDropdown).contains('X.XX').click()
    let randomplustopcolumn = faker.random.numeric(1)
    cy.get(partTolerance.linearTable.plusTolTopColumn).first().type(randomplustopcolumn)
    cy.contains(randomplustopcolumn)
    let randomminusTolcolumn = -faker.random.numeric(1)
    cy.get(partTolerance.linearTable.minusTolColumn).first().type(randomminusTolcolumn)
    //cy.contains(randomminusTolcolumn)
  })
  it('Add and delete linear precision tolerance', () => {
    cy.get(partTolerance.addTolerance).click({ force: true })
    cy.get(partTolerance.linearTable.precisionTopColumn).last().click()
    cy.get(partTolerance.linearTable.precisionDropdown).last().click()
    cy.get(partTolerance.linearTable.plusTolTopColumn).last().click().type(faker.random.numeric(1))
    cy.get(partTolerance.linearTable.minusTolColumn).last().click().type(-faker.random.numeric(1))
    cy.get("#Linear-table")
    .find("tr")
      .then((row) => {
        //row.length will give you the row count
        let rowlength1 = cy.log(row.length);
        console.log(rowlength1)
      });
    //delete the linear precision tolerance 
    cy.get(partTolerance.linearTable.deleteRow).last().click()

  })
  it('Add linear range tolerance', () => {
    //  cy.get(partTolerance.linear).click({force:true},{timeout:3000})
    cy.get(partTolerance.linearTable.rangeRadioButton).click({ force: true }, { timeout: 3000 })
    cy.get(partTolerance.linearTable.MinusTotHeader).should("exist")
    cy.get(partTolerance.linearTable.rangeHeader).should("exist")
    cy.get(partTolerance.linearTable.plusTotheader).should("exist")
    cy.get(partTolerance.linearTable.addTolerance).click()
    cy.get(partTolerance.linearTable.plusTolTopColumn).last().click().type(faker.random.numeric(1))
    cy.get(partTolerance.linearTable.minusTolColumn).last().click().type(-faker.random.numeric(1))
    cy.get("#Linear-table")
    .find("tr")
      .then((row) => {
        //row.length will give you the row count
        let rowlength1 = cy.log(row.length);
        console.log(rowlength1)
      });
    //delete the tolerance
    cy.get(partTolerance.linearTable.deleteRow).last().click()
    cy.get("#Linear-table")
      .find("tr")
      .then((row) => {
        //row.length will give you the row count
        let rowlength2 = cy.log(row.length);
        console.log(rowlength2)
        assert.notEqual(rowlength1, rowlength2, 'no of rows not equal')
  });
});
  it('View angular tolerance', () => {
    cy.get(partTolerance.angular).click()
    cy.get(partTolerance.angularTable.angularTopColumn).first().click()
    //  cy.get(partTolerance.angularTable.precisionDropdown).contains('X.XX',{timeout:2000}).click()
    cy.get(partTolerance.angularTable.angularplusTolTopColumn).should('exist')
    cy.get(partTolerance.angularTable.angularminusTolColumn).should('exist')
  })

  it('Add angular precision tolerance', () => {
    cy.get(partTolerance.angularTable.addTolerance).click({ force: true })
    cy.get(partTolerance.angularTable.angularTopColumn).last().click()
    cy.get(partTolerance.angularTable.precisionDropdown).last().click()
    cy.get(partTolerance.angularTable.angularplusTolTopColumn).last().click().type(faker.random.numeric(1))
    cy.get(partTolerance.angularTable.angularminusTolColumn).last().click().type(-faker.random.numeric(1))
    cy.get("#Angular-table")
      .find("tr")
      .then((row) => {
        //row.length will give you the row count
        let rowlength1 = cy.log(row.length);
        console.log(rowlength1)
      });
  })
  it('Delete angular precision tolerance', () => {
    cy.get(partTolerance.angularTable.deleteRow).last().click()
    cy.get("#Angular-table")
      .find("tr")
      .then((row) => {
        //row.length will give you the row count
        let rowlength2 = cy.log(row.length);
        console.log(rowlength2)
        assert.notEqual(rowlength1, rowlength2, 'no of rows not equal')
      });
  })
})