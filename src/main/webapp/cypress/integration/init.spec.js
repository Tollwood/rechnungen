function assertOverviewCard(className, title) {

    cy.get(className).click();
    cy.get('.menu-title')
        .should('have.contain.text', title);
    cy.get(".close").click();
}

it('visits the app', () => {
    cy.visit('http://localhost:8080');
    assertOverviewCard('.orderOverviewCard', 'Auftragsübersicht');
    assertOverviewCard('.employeeOverviewCard', 'Mitarbeiterverwaltung');
    assertOverviewCard('.realEstateOverviewCard', 'Liegenschaften Verwalten');

});