function assertOverviewCard(className, title) {

    cy.get(className).click();
    cy.get('.menu-title')
        .should('have.contain.text', title);
    cy.get(".close").click();
}

it('visits the app', () => {
    cy.visit('http://localhost:3000');
    assertOverviewCard('.orderOverviewCard', 'Auftragsübersicht');
    assertOverviewCard('.employeeOverviewCard', 'Mitarbeiterverwaltung');
    assertOverviewCard('.realEstateOverviewCard', 'Liegenschaften Verwalten');
});

it('searchExistingOrders', ()=>{
    cy.visit('http://localhost:3000');
    cy.get('.orderSearch').children('input').type('1{enter}',{'force':true});
    cy.get('.OrderIdInput').children('i').should('have.css','green');

    //save button should be active

});