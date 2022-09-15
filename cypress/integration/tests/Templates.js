const fileName = 'addTemplate.xlsx';

const homePage = require('../locators/home-page.json');
const templates = require('../locators/Templates.json')


import 'cypress-file-upload';
let item

describe('Part Creation Wizard', () => {

  before(() => {
    cy.login('spartan.ideagen@gmail.com', 'Te@mSp@rtan1');
  });

  it('Verify templates in the Gallery', () => {
    cy.get(homePage.partSideMenu).trigger('mouseover')
    cy.get('.ant-menu-submenu.ant-menu-submenu-popup').should('be.visible')
    cy.get('.ant-menu.ant-menu-sub.ant-menu-vertical').should('be.visible')
    cy.contains('Templates').click()
    cy.get(templates.PartNumber).click()
    cy.wait(20000)
    cy.contains('111').click()
    cy.get(templates.Buildreport).should('be.enabled')
    cy.get('[data-cy=template_list]').should('be.visible')
    cy.get('[data-cy=template_new]').should('exist')
    cy.get('[data-cy=template_card_default_fai').should('exist')
    cy.get('[data-cy=template_card_default_as9102b').should('exist')
    cy.get('[data-cy=template_card_default_ppap').should('exist')
  })
  it('Add a new template', () => {
    cy.get('.ant-upload-file-type-icons').attachFile(fileName, { subjectType: 'drag-n-drop' });
    //the template is opened to build it -will not automate this //
    cy.contains('Build Your Template')
    cy.get('[data-cy=back-btn-footer]').click({force:true})

  })
  it('Open AS9102B template and verify fields on review report', () => {
          cy.get('span.template-card-title').eq(0).should('have.text','All Data Template')
          cy.get('[data-cy="template_card_default_fai"] > .generate-report').click()
          //opens the Review report page -editing the report is out of scope for automation//
          cy.contains('Review Your Report')
          cy.get('#part').should('exist')
          cy.get('#customer').should('exist')
          cy.get('.ant-select-selection-search').should('exist')
          cy.get('[data-cy=data-cascader]').click().invoke('text')
          cy.get('[title=Features]').click().invoke('text')
          cy.get('[title=Type]').click()
          cy.get('.ant-select-selection-item > span')
          cy.contains('Features / Type')
          })
          it('Add new filter and delete it ', () => {
            cy.get('[data-icon=plus-circle]').click()
            cy.get('span.ant-select-selection-search').last().click()
            cy.get('[title=Location]').first().click({force:true}).invoke('text')
            cy.get('[title=Page]').click({force:true})
            //delete the new filter//
            cy.get('span.anticon.anticon-close-circle').last().click()
    })
  })
  