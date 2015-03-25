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
        
        /* This restores our menu to its intended default state
         *  (hidden) without influencing the 'is hidden by default'
         *  test case.
         */
        afterEach(function () {
           $('body').addClass('menu-hidden');
        });

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
            expect($('.menu').is('.menu-hidden .menu')).toBe(true);
         });

         /* This ensures the menu displays when
          * clicked.
          */
         it('displays when clicked if hidden', function(done) {
            var body = $( 'body' );

            $( '.menu-icon-link' ).click();
            setTimeout(function () {
                var transform = $( '.menu' ).css( 'transform' ),
                    position = getTranslateX(transform);
                    
                expect(position).toBeGreaterThan(-1);
                expect($('.menu').is('.menu-hidden .menu')).toBe(false);
                done();
            }, 500);
         });

         /* This ensures the menu hides when clicked if the menu 
          *  is displayed.
          */
         it('hides when clicked if displayed', function(done) {
            var body = $( 'body' );
            $( '.menu-icon-link' ).click();
            $( '.menu-icon-link' ).click();
            
            setTimeout(function () {
                var transform = $( '.menu' ).css( 'transform' ),
                    position = getTranslateX(transform);

                //This means that .menu is off-canvas
                expect(position).toBe(-192);
                expect($('.menu').is('.menu-hidden .menu')).toBe(true);
                done();
            }, 500);
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
            var entries = $( '.feed .entry-link' );
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

    describe('Accessibility', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* This suite is all about font accesibility.
        */
        describe('Fonts', function() {
            /* This ensures that the font size for all elements is at least 16px
             */
            it('are at least 16px', function() {
                //Must be sure not to include jasmine reporter on the test, but to allow other elements to be added to the app
                var textElements = $( "body" ).find( "*" ).not( '.jasmine_html-reporter' ).not( '.jasmine_html-reporter *' ).not('script').not('link');
                for (var i = textElements.length - 1; i >= 0; i--) {
                    expect($(textElements[i]).css('font-size').slice(0, -2)).toBeGreaterThan('15');
                }
            });
        });

        describe('Menu', function() {
            // Since it's an empty link, there needs to be a way for
            // the screen reader to know what it is when focused in it.
            it('button contains title', function() {
                
            });
        });


        describe('Focus', function() {
            it('is set on menu button when loaded', function() {
                
            });

            it('is set on first entry after tab', function() {
                
            });

            it('is set on the first feed after tab when menu is displayed', function() {
                
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