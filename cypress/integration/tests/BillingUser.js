import { faker } from '@faker-js/faker';
require('cypress-iframe')

describe('Login functionality', () => {


    it('Billing free seat user can only view and edit billing Info', () => {
        cy.login('cbit999+FB@gmail.com', '215K@KI2jT5Msq')
        cy.url().should('include', '/settings/billing')
        cy.get('h1').should('contain', 'Account Settings')
        cy.get('h2').should('contain', 'Billing')
        cy.get('h3').should('contain', 'Billing History & Invoices')

        // billing subscription edit allowed //
        cy.get('[data-cy=change-modal-btn]').should('be.enabled').click()
        cy.get('[data-cy="subscription-modal-title"]').should('contain', 'Change your Subscription')
        cy.get('[data-cy=planTier]', { timeout: 3000 }).should('be.visible')
        cy.get('[data-cy=paidUserSeat-step]').click()
        cy.get('[data-cy="2-3"] > .ant-select-item-option-content').click()
        cy.get('#termsAndConditionsSubscription').check()
        cy.get('[data-cy=subscription-modal-confirm]').should('be.enabled')
        cy.get('[data-cy=subscription-modal-cancel]').click()
        //Add a new card//


        cy.get('[data-cy=addCard]', { timeout: 5000 }).should('be.enabled').click({ timeout: 5000 })
        cy.get('iframe', { timeout: 20000 })
        cy.wait(15000)
        cy.get('iframe[name="%card%#chargifyNumber"]', { timeout: 20000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("[name=number]", { timeout: 100000 })
                    .type("4111111111111111", { force: true });
            })
        cy.get('iframe[name="%card%#chargifyMonth"]', { timeout: 10000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("#cfy-month", { timeout: 10000 })
                    .type("12", { force: true });
            });
        cy.get('iframe[name="%card%#chargifyYear"]', { timeout: 10000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("[name=year]", { timeout: 10000 })
                    .type("2030", { force: true });
            })
            cy.get('iframe[name="%card%#chargifyCvv"]', { timeout: 10000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("[name=cvv]", { timeout: 10000 })
                    .type("111", { force: true });
            })
            cy.get('iframe[name="%card%#chargifyFirstName"]', { timeout: 10000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("[name=firstName]", { timeout: 10000 })
                    .type("test", { force: true });
            })
            cy.get('iframe[name="%card%#chargifyLastName"]', { timeout: 10000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("[name=lastName]", { timeout: 10000 })
                    .type("test", { force: true });
            })

        cy.get('iframe[name="%card%#chargifyCountry"]', { timeout: 20000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("select[name=country]", { timeout: 10000 }).select(2).should('have.value','GB');
            })

        cy.get('iframe[name="%card%#chargifyAddressLine1"]', { timeout: 20000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("[name=address]", { timeout: 10000 })
                    .type("Business park", { force: true });
            })
        cy.get('iframe[name="%card%#chargifyCity"]', { timeout: 20000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("[name=city]", { timeout: 10000 })
                    .type("London", { force: true });
            })
        cy.get('iframe[name="%card%#chargifyState"]', { timeout: 20000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("[name=state]", { timeout: 10000 })
                   .select('London, City of').should('have.value','LND');
            })
        cy.get('iframe[name="%card%#chargifyZip"]', { timeout: 20000 })
            .its("0.contentDocument.body")
            .should("be.visible")
            .then((body) => {
                cy.wrap(body)
                    .find("[name=zip]", { timeout: 10000 })
                    .type("LG1", { force: true });
            })
         cy.get('#card-submit').click({force:true})
         cy.wait(5000)
         cy.get('[data-cy=masked-number]').should('exist')
         cy.get('[data-cy=expiration]').should('exist')
//Remove the card //
         cy.get('[data-cy=removeCard]').click({force:true})
         cy.on("window:confirm", (str) => {
            expect(str).to.contain("Removing your card will switch you to Pay-By-Invoice");
              })
        cy.get('.ant-btn.ant-btn-primary').click({force:true})
        cy.get('[data-cy=masked-number]').should('not.exist')
        cy.get('[data-cy=expiration]').should('not.exist')
    })
    it('Reviewer free seat user can view reports,parts and jobs', () => {
        cy.login('cbit999+FR@gmail.com', 'Titan222#=')

        cy.get('h1').should('contain', 'Parts')
        cy.get('#NewPart-btn > :nth-child(2)').should('not.exist');
        //bug currently for create new jobs //

    })
    it('Planner with billing user can view reports,parts and jobs', () => {
        cy.login('cbit999+FR@gmail.com', 'Titan222#=')
        //can view parts but no new part button //
        cy.get('h1').should('contain', 'Parts')
        cy.get('#NewPart-btn > :nth-child(2)').should('not.exist');
        //bug currently for create new jobs //

    })
})
