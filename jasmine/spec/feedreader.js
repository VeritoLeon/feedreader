/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions,
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is defined', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toBeTruthy();
                expect(allFeeds[i].url).not.toMatch(/^\s+$|^$/gi); //empty spaces
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name is defined', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeTruthy();
                expect(allFeeds[i].name).not.toMatch(/^\s+$|^$/gi); //empty spaces
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
            var bodyClass = $( 'body' ).attr('class'),
                transform = $( '.menu' ).css( 'transform' ),
                position = getTranslateX(transform);

            expect(bodyClass).toBe('menu-hidden');
            expect(transform).toBeDefined();
            expect(position).toBe(-192); //This means that .menu is off-canvas
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('changes visibility when clicked', function() {
            var body = $( 'body' );

            $( '.menu-icon-link' ).click();
            expect(body.attr('class')).not.toBe('menu-hidden');
            

            $( '.menu-icon-link' ).click();
            expect(body.attr('class')).toBe('menu-hidden');
         });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('have at least one entry', function() {
            var entries = $( '.feed .entry' );
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    });
}());

///
/// Helper functions
///

/**
 * Transform the string of the matrix of 'transform'
 * (in the form "matrix(a, c, b, d, tx, ty)") to an array.
 * @param  String transformValue "matrix(a, c, b, d, tx, ty)"
 * @return Array                in the following format: [a, c, b, d, tx, ty]
 */
function getMatrix (transformValue) {
    // transform.split('(')[1].split(')')[0].split(',') sometimes caused errors
    var values = transformValue.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');
    return values;
}

/**
 * Gets the tx value of the string "matrix(a, c, b, d, tx, ty)".
 * "tx" represents the translation of the element in the x axis.
 * @param  Array transformValue "matrix(a, c, b, d, tx, ty)"
 * @return number                tx (Translate X)
 */
function getTranslateX (transformValue) {
    var matrix = getMatrix(transformValue),
        xVal = matrix[4].trim();
    return parseInt(xVal);
}