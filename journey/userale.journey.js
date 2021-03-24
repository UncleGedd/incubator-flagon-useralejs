describe('Userale logging', () => {
    beforeEach(() => {
        cy.intercept('POST', 'http://localhost:8000/').as('backend')
    })

    xit('sends a page load log', () => {
        cy.visit('http://localhost:8000')
        cy.wait('@backend').then(xhr => {
            const body = xhr.request.body
            const pageLoadLog = body[0]
            expect(pageLoadLog['pageLoadTime']).to.be.greaterThan(0)
            expect(pageLoadLog).to.contain({
                logType: 'raw',
                type: 'load'
            })
        })
    });

    it('sends a log whenever a page is navigated away from', () => {
        cy.visit('http://localhost:8000')
        const spies = {beaconWasCalled: false};
        cy.window().then(win => {
            cy.stub(win.navigator, "sendBeacon", () => spies.beaconWasCalled = true);
            cy.contains('Link to Flagon Page').click()
        });
        cy.wrap(spies).its("beaconWasCalled").should("eq", true);
    });
});