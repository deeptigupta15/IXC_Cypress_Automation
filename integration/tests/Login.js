
import { faker } from '@faker-js/faker';
describe('Login functionality', () => {

    it('login as admin user and logout', () => {
        cy.login('spartan.ideagen@gmail.com', 'Te@mSp@rtan1');
        cy.get('h1',{timeout:5000}).should('be.visible').and('contain','Parts')
        cy.get('.ant-avatar-string').trigger('mouseover')
        cy.contains('Logout').click({force:true},{timeout:10000})
        cy.url().should('include','/auth/signin')
    });
    it('login as planner-paid seat', () => {
        cy.login('cbit999+ix@gmail.com', 'Spartan1010#=');
        cy.get('h1',{timeout:5000}).should('be.visible').and('contain','Parts')
    });
    it('login as reviewer-Free seat', () => {
        cy.login('cbit999+FR@gmail.com', 'Titan222#=');
        cy.get('h1',{timeout:5000}).should('be.visible').and('contain','Parts')
    });
    it('login as planner with Billing-Paid seat', () => {
        cy.login('cbit999+it@gmail.com', 'TigerTiger10#');
        cy.get('h1',{timeout:3000}).should('be.visible').and('contain','Parts')
    });
    it('login as Billing-Free seat', () => {
        cy.login('cbit999+FB@gmail.com', '215K@KI2jT5Msq');
        cy.get('h1',{timeout:3000}).should('be.visible').and('contain','Account Settings')
    });
    it('login as Inactive', () => {
        cy.login('cbit999+IA@gmail.com', 'k$1fEqF$hV2K5G');
        cy.get('.ant-form-item-explain-error').should("be.visible").and('contain', 'Your account membership with {0} is disabled, please contact your account administrator to regain access.');
    })
    it('Forgot password journey', () => {
        cy.get('.ant-form-item-control-input-content > a').click()
        let email = faker.random.alpha(10) + '@test.com'
        cy.get('#email').type(email)
        cy.get('.ant-btn').click()
        cy.on("window:confirm", (str) => {
            expect(str).to.contain("Please check your email for a password reset link, it will expire in 30 minutes");
          })
    })
    it('Request an account', () => {
        cy.visit('/')
        cy.get('[href="/auth/signup"]').click()
        //Enter the details for the new account//
        let email = faker.random.alpha(10) + '@test.com'
        cy.get('#email').type(email)
        cy.get('#firstName').type(faker.random.alpha(6))
        cy.get('.ant-btn').click()
        cy.get('h3',{timeout:10000}).should('be.visible').and('contain','Please confirm your email at ' + email + ' to continue')
    });
})