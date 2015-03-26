# Feedreader tests - Project 6 of Front End Nanodegree
So, with this project I got introduced to Jasmine and got to play a bit with it.
I got an application that listed the last entries of some predefined feeds. There were some test specifications that I needed to implement, with the liberty of write additional ones.

###Disclaimer
While some additional tests were added, this project should not be seen as an example of acceptable test coverage for production code. This project seeks to illustrate to me (and hopefully someone else checking out the project) the structure and functionality of Jasmine test suites.

## Run
You can check the test run on <a href="https://veritoleon.github.io/feedreader">the project's github page</a>, or if you want to test it locally, just download the project and open <a href="https://github.com/VeritoLeon/feedreader/blob/master/index.html">index.html</a> on the root.

## Tests
_Clicking on the test suite's header will link to the execution of the test_
###<a href="">RSS Feeds</a>
* **are defined** — Checks that the allFeeds variable is declared and has a value.
* **URL is defined** — Checks that every object inside allFeeds contains the url key, and it has a value.
* **Name is defined** — Checks that every object inside allFeeds contains the name key, and it has a value.
###<a href="">The menu</a>
* **is hidden by default** — Checks that when the page loads, the menu containing the available feeds doesn't appear on the screen.
* **displays when clicked if hidden** — Checks that when clicking the hamburger icon, the menu is visible to the user.
* **hides when clicked if displayed** — Checks that when clicking the hamburger icon when the menu is visible, will hide it.

The last two test specifications used to be in a single specification, but it seemed that I was testing two different things in a single test, so to try to adhere to the _unit_ of unit testing, it was divided.
###<a href="">Initial Entries
* **have at least one entry** — Checks that the entries are being shown in the app.
* **link somewhere** — Checks that the anchor link associated with each entry has a reference (_additional test_).
###<a href="">New Feed Selection</a>
* **loads content** — Checks that selecting a different feed will load different entries, asociated with the selected feed.
* **loads correct header** — Checks that selecting a different feed will load a different header, asociated with the selected feed (_additional test_).
###<a href="">Accessibility</a>
####<a href="">Fonts</a>
* **are at least 16px** — Checks that the font-size property of all elements of index.html holds a value of at least 16px (_additional test_).
####<a href="">Menu</a>
* **button contains title** — Checks that the hamburger icon contains a non-empty title attribute, so a screen reader can know what is it linking to. This test initially failed, so index.html was modified to include this (_additional test_).


## Sources

The following sources were consulted during the development of this project:
* <a href="https://www.udacity.com/course/ud549">Udacity's JavaScript Testing course</a>
* <a href="http://jasmine.github.io/2.0/introduction.html">Jasmine documentation</a>
* <a href="http://www.cheatography.com/citguy/cheat-sheets/jasmine-js-testing/">Jasmine cheat sheet</a>
* <a href="http://api.jquery.com/css/">JQuery documentation</a>
* <a href="https://css-tricks.com/get-value-of-css-rotation-through-javascript/">"Get Value of CSS Rotation through JavaScript" - CSS Tricks</a> (To get values of Matrix)