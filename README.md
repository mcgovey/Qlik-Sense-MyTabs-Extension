# Qlik-Sense-MyTabs-Extension
Qlik Sense Extension to Show List of Tabs in a Qlik Sense App

# Project Description
This extension seeks to recreate a tab like header that can be placed at the top of Qlik Sense qvf files.  The extension is intended for use inside of Qlik Sense, it will not work in mashups.  The extension lists all tabs in a Qlik Sense App, includes a reference to the current tab, allows the user to click a tab to navigate to a different page in the app, and provides some minor formatting features.

# Installation Instructions

To use this extension, place the MyTabs folder in the directory C:\Users\%USERNAME%\Documents\Qlik\Sense\Extensions.  Launch Qlik Sense and open an app, drag the 'My Tabs' Chart Object onto the top of each sheet where you'd like it to appear (probably the top of your sheet but that's up to you). There are some configuration options to play with once the object is on the sheet.  Have fun!

## Author

**Kevin McGovern**

* [github.com/mcgovey](http://github.com/mcgovey)
* [twitter.com/mcgovey](http://twitter.com/mcgovey)

## Comments, Feedback & Questions

If you have any questions, found errors, etc., please [create an issue here on GitHub](https://github.com/mcgovey/Qlik-Sense-MyTabs-Extension/issues).

## JavaScript Libraries Used in this Extension

* [Bootstrap.js](https://github.com/homeyer/scoped-twbs) - used for CSS tab styling - note: this is a forked version of Bootstrap that scopes the styling specific to the current sheet

# License
This extension is provided 'as is' and may stop working at any time (i.e. when changes are made to the Qlik Sense APIs).

[Additional license information for this extension](https://github.com/McGovey/Qlik-Sense-MyTabs-Extension/blob/master/LICENSE.md).