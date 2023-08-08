describe('To find the price of first available flight from Vienna to Malta ', () => {
  it('Should visit booking page of AirMalta', () => {

    cy.visit('https://book.airmalta.com/search')

    cy.get("#origin").click().type('VIE{enter}')
    cy.get("#origin").should('have.value', 'Vienna International')
    cy.get("#destination").click().type('MLA{enter}')
    cy.get("#destination").should('have.value', 'Malta International Airport')
    cy.get("#startDate_id").click()
    cy.get('.eHEcAZ').click({ force: true }) 
    cy.xpath("/html/body/div[2]/div/div[5]/div/div[3]/div[1]/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div[2]/div/table")
      .find('[aria-disabled="false"]') // Find elements with aria-disabled=false
      .first() // Get the first enabled date in calendar and move to the next, purpose of this is just to reach the next page 
      .next() //to use the Flexible dates calendar to find the price
      .should('exist') // check if the element exists
      .click({ force: true }); 

    cy.get('.sc-cExpMz > .ButtonUI__Button-gySPPR').click({ force: true })  //search from homepage

    cy.get('.sc-jOZkJh').should('exist').then(() => {
      cy.contains('Flexible dates').should('be.visible').click(); //navigate to page having the calendar with flight prices
    });

    
    cy.get('.cTeiQF').click({ force: true }) 
      .find('button[class*="gGQXDF"]') // class name of button with flight dates that are available
      .first() // get the first available button
      .click(); //click 
    cy.focused() 
      .find('div[class*="cmVAqE"]').invoke('text') //class containing the flight price
      .then(text => {
        const flightPrice = text //save value of flight price obtained
        cy.wrap(flightPrice).should('not.be.empty'); 
        cy.log('Price of first available flight from Vienna to Malta is:', flightPrice) 
      });
  });
});
