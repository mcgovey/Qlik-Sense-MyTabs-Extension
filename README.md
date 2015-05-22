# Qlik-Sense-MyTabs-Extension
Qlik Sense Extension to Show List of Tabs in a Qlik Sense App

This extension seeks to recreate a tab like header that can be placed at the top of Qlik Sense qvf files.  The extension is intended for use inside of Qlik Sense, it will not work in mashups.  The extension lists all tabs in a Qlik Sense App, includes a reference to the current tab, allows the user to click a tab to navigate to a different page in the app, and provides some minor formatting features.

This extension is provided 'as is' and may stop working at any time (i.e. when changes are made to the Qlik Sense APIs).

To use this extension, place the MyTabs folder in the directory C:\Users\%USERNAME%\Documents\Qlik\Sense\Extensions.  Launch Qlik Sense and open an app, drag the 'My Tabs' Chart Object into your sheet (probably the top of your sheet but that's up to you). Now have fun!

Bootstrap.js was used for tab styling

Potential Future Features:
<UL>
  <li>Remove title option from properties by default</li>
  <li>Custom Styling for navbar</li>
  <li>Sheet icon on hover</li>
  <li>Limit Tab Selection to exclude certain sheets</li>
  <li>Rename Sheets in options</li>
</UL>
