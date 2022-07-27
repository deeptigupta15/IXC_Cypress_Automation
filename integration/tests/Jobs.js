const homePage = require('../locators/home-page.json');
const jobs = require('../locators/jobs.json')


import 'cypress-file-upload';
let item

describe('Part Creation Wizard', () => {

  before(() => {
    cy.login('spartan.ideagen@gmail.com', 'Te@mSp@rtan1');
  });

  it('Add a new job and delete it ', () => {
    cy.get(jobs.jobSideNav).trigger('mouseover')
    cy.contains('Jobs').click({force:true})
    //verify the fields on the side window//
    cy.get(jobs.newJobBtn).should('exist').click()
    cy.get(jobs.part).should('exist')
    cy.get(jobs.jobNumber).should('exist')
    cy.get(jobs.accessControl).should('exist')
    cy.get(jobs.samplingInterval).should('exist')
    cy.get(jobs.samplingMethod).should('exist')
    cy.get(jobs.totalSamples).should('exist')
    cy.get(jobs.saveBtn).click()
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Select at least one part");
    })
    cy.get(jobs.newJobBtn).click()
    cy.get(jobs.sideWindow).should('be.visible')
    cy.get(jobs.jobNumber).type('999')
    cy.get('[data-cy="parts"] > .ant-select > .ant-select-selector').click({force:true},{timeout:5000}).invoke('text')
    cy.wait(5000)
    cy.contains("Test2").first().click({force:true})
    cy.get(jobs.saveBtn).click({force:true})
   // cy.get('tr td:nth-child(2)').should('have.value','999')
// cancel delete on the popup//
    cy.get(jobs.deleteJobBtn).first().click()
    cy.get (jobs.popupCancelBtn).click()
    cy.get('tr td:nth-child(2)').should('contain','999')
   //confirm delete on the popup//
    cy.get(jobs.deleteJobBtn).first().click()
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Are you sure?");
    })
    cy.get(jobs.popupDelBtn).click()

  })
})
