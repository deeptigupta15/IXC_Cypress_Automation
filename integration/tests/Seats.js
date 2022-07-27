
const account = require('../locators/settings-account.json');

describe('Seats', () => {
  before(() => {
    cy.login('deepti.gupta@ideagen.com', 'Testing@123');

  });
  it('Seats page ', () => { 
    cy.get('[data-cy="avatar"]').trigger('mouseover')
    cy.get('#My_Profile').click({ force: true })
    cy.get(account.UserSettings.firstName).should('exist').clear().type('test')
    cy.get(account.UserSettings.lastName).should('exist').clear().type('testnew')
    cy.get(account.UserSettings.phoneNumber).should('exist').clear().type('111')
    cy.get(account.UserSettings.saveBtn).click({ timeout: 10000 })
    cy.on("window:confirm", (str) => {
      expect(str).to.contain("Profile updated successfully");
    })
    cy.get('.ant-form-item-control-input-content > :nth-child(3)').click({ force: true }, { timeout: 10000 })
    //Verify the data is reset //
    cy.get(account.UserSettings.firstName).should('exist').clear().type('testnew')
    cy.get(account.UserSettings.resetBtn).click()
    cy.get(account.UserSettings.firstName).should('have.text','test')
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
    cy.get('#rc-tabs-2-tab-preferences > .tab-content').click({force:true})
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
    cy.get('#rc-tabs-3-tab-account > .tab-content').click({force:true})
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
  it('Seat manage')
})
