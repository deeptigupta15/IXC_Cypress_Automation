
const account = require('../locators/settings-account.json');
import { faker } from '@faker-js/faker'

describe('Seats', () => {
  before(() => {
    cy.login('deepti.gupta@ideagen.com', 'Testing@123');

  });
  it('My profile page ', () => { 
    cy.get('[data-cy="avatar"]').trigger('mouseover')
    cy.get('#My_Profile').click({ force: true })
    cy.get(account.UserSettings.firstName).should('exist').clear().type('test')
    cy.get(account.UserSettings.lastName).should('exist').clear().type('testnew')
    cy.get(account.UserSettings.phoneNumber).should('exist').clear().type('111')
    cy.get(account.UserSettings.saveBtn).click({ timeout: 10000 })
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Profile updated successfully");
    })
    //cy.get('.ant-form-item-control-input-content > :nth-child(3)').click({ force: true }, { timeout: 10000 })
    //Verify the data is reset //
    cy.get(account.UserSettings.firstName).should('exist').clear().type('testnew')
    cy.get(account.UserSettings.resetBtn).click({force:true})
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Profile updated successfully");
    })
  })
  // it('Field validations -profile data', () => {
  //   //check the behavior of save ,reset and cancel buttons//
  //   //No field validation errors //
  //   cy.get('[data-cy="avatar"]').trigger('mouseover')
  //   cy.get('#My_Profile').click({ force: true })
  //   cy.get(account.UserSettings.firstName).should('exist').clear().type('test£')
  //   //add assertion here//
  //   cy.get(account.UserSettings.lastName).should('exist').clear().type('test@')
  //   //add assertion here//
  //   cy.get(account.UserSettings.phoneNumber).should('exist').clear().type('1abc')
  //   //add assertion here//
  //})
  it('Preferences', () => {
    cy.get(':nth-child(1) > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click({force:true})
    cy.get(account.Preferences.language).should('exist')
    cy.contains('English')
    cy.get(account.Preferences.GDTcheckbox).should('exist')
    cy.get(account.Preferences.saveBtn).should('be.disabled')
    //check the GDT Font
    cy.get(account.Preferences.GDTcheckbox).click()
    cy.get(account.Preferences.saveBtn).should('be.enabled').click()
    cy.get(account.Preferences.GDTcheckbox).click()
    cy.get(account.Preferences.saveBtn).should('be.enabled').click()
  })
  it('Company Profile-cannot edit the form', () => {
    cy.get(':nth-child(2) > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(1)').click({force:true})
    cy.get(account.CompanyProfile.Organization).should('be.disabled')
    cy.get(account.CompanyProfile.PrimaryPhone).should('be.disabled')
    cy.get(account.CompanyProfile.Street).should('be.disabled')
    cy.get(account.CompanyProfile.Street2).should('be.disabled')
    cy.get(account.CompanyProfile.City).should('be.disabled')
    cy.get(account.CompanyProfile.Country).should('be.disabled')
    cy.get(account.CompanyProfile.PostalCode).should('be.disabled')
    cy.get(account.CompanyProfile.SaveBtn).should('be.disabled')
    cy.get(account.CompanyProfile.ResetBtn).should('be.disabled')
  })
  it('Seat management',() => {
  //invite users//
  cy.get(':nth-child(2) > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click({force:true})
  cy.get(account.Seats.InviteUsers).should('be.enabled').click()
  cy.on("window:confirm", (str) => {
   expect(str).to.contain("Invite a New User");
 })
 cy.generateEmail()
 cy.get(account.Seats.SendInvites).click({force:true})
  })
it('Add Operator',() => {
  cy.get('#ant-input ant-input-lg').click({force:true})
  cy.get(account.Operators.AddOperator).click()
  cy.on("window:confirm", (str) => {
    expect(str).to.contain("Update Operator");
  })
  cy.get(account.Operators.firstName).type(faker.random.alpha(8))
  cy.get(account.Operators.lastName).type(faker.random.alpha(8))
  cy.get(account.Operators.submitBtn).click({force:true})
//search for an operator//
  cy.get(account.Operators.searchName).type()  

})
})
