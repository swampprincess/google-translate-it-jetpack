'use strict';

const { Item, PageContext } = require('sdk/context-menu');
const { isPrivate } = require('sdk/private-browsing');
const { browserWindows: windows } = require('sdk/windows');
const tabs = require('sdk/tabs');

Item({
  label: 'Google Translate It',
  context: PageContext(),
  contentScript: 'self.on("click", function (node) {' +
                 '  self.postMessage(window.location.toString());' +
                 '});',
  onMessage: function(src) {
    tabs.open({
      url: 'http://translate.google.com/translate?sl=auto&u=' + encodeURIComponent(src),
      isPinned: true,
      isPrivate: isPrivate(windows.activeWindow)
    });
  }
});
