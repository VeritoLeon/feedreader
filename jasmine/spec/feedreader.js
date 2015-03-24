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
        /* This tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not
         * empty.
         */
        it('URL is defined', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toBeTruthy();
                expect(allFeeds[i].url).not.toMatch(/^\s+$|^$/gi); //empty spaces
            }
        });

        /* This loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is
         * not empty.
         */
        it('Name is defined', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeTruthy();
                expect(allFeeds[i].name).not.toMatch(/^\s+$|^$/gi); //empty spaces
            }
        });
    });

    /* This suite is all about the menu,
     * the '.menu hidden' element of our application.
     */
    describe('The menu', function() {
        /* This ensures the menu element is hidden by default.
         */
         it('is hidden by default', function() {
            var bodyClass = $( 'body' ).attr('class'),
                transform = $( '.menu' ).css( 'transform' ),
                position = getTranslateX(transform);

            expect(bodyClass).toBe('menu-hidden');
            expect(transform).toBeDefined();
            //This means that .menu is off-canvas
            expect(position).toBe(-192); 
         });

         /* This ensures ensures the menu changes visibility when the
          * menu icon is clicked.
          * This test has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('changes visibility when clicked', function() {
            var body = $( 'body' );

            $( '.menu-icon-link' ).click();
            expect($('.menu').is('.menu-hidden .menu')).toBe(false);
            

            $( '.menu-icon-link' ).click();
            expect($('.menu').is('.menu-hidden .menu')).toBe(true);
         });
    });

    /* This suite is all about the entries,
     * the '.feed .entry' elements in our application.
     */
    describe('Initial Entries', function() {
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* This ensures  when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container.
         */
        it('have at least one entry', function() {
            var entries = $( '.feed .entry' );
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    /* This suite is all about the feed selection.
     */
    describe('New Feed Selection', function() {
        var oldEntries, oldHeader;

        /**
         * Makes sure there are more than 1 feed in the reader, in order
         * for the test cases in the suite to be accurate.
         * Then, it loads the default values to compare against them in the
         * test cases.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                expect(allFeeds.length).toBeGreaterThan(1);
                oldEntries = $( '.feed .entry' ).text();
                oldHeader = $( '.header-title' ).text();
                done();
            });
        });

        /* This ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         *
         * Note: This test will only work if there is more than 1 feed.
         * Otherwise, this will give a false positive
         */
        it('loads content', function(done) {
            loadFeed(allFeeds.length - 1, function() {
                 var newEntries = $( '.feed .entry' ).text();
                expect(oldEntries).not.toEqual(newEntries);
                done();
            });
        });

        /* This ensures that when a new feed is loaded
         * by the loadFeed function that the header changes accordingly
         *
         * Note: This test will only work if there is more than 1 feed.
         * Otherwise, this will give a false positive
         */
        it('loads correct header', function(done) {
            loadFeed(allFeeds.length - 1, function() {
                var newHeader = $( '.header-title' ).text();
                expect(oldHeader).not.toEqual(newHeader);
                expect(allFeeds[allFeeds.length - 1].name).toEqual(newHeader);
                done();
            });
        });
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
    // transformValue.split('(')[1].split(')')[0].split(',') sometimes caused errors
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