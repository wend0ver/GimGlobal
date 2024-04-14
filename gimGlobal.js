// ==UserScript==
// @name        GimGlobal
// @description Allows for syncing data between gimkit modded clients
// @namespace
// @run-at      document-start
// @iconURL     https://www.gimkit.com/favicon.png
// @author      wendover
// @updateURL
// @downloadURL
// @version     0.2.4
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==

// Put your settings here:
var serverURL = ""



function main() {
  var newServer = null;
  var newClient = null;
  storeData('clientMessage', null)
  storeData('serverMessage', null)

  console.log('GimGlobal loaded');

  // send message
  function sendMessage(message) {
    window.postMessage({ type: 'message', data: message }, window.origin);
  }

  // store data using GM_setValue
  function storeData(key, value) {
    GM_setValue(key, value);
  }

  // retrieve data using GM_getValue
  function retrieveData(key) {
    return GM_getValue(key);
  }

  // runs code on both tabs
  function tabSyncFunction() {
    setInterval(function() {
      newServer = retrieveData('serverMessage');
      if (newServer !== null) {
        if (window.document.domain.includes(serverURL)) {
          window.eval(newServer);
          storeData('serverMessage', null)
        }
      }

      newClient = retrieveData('clientMessage');
      if (newClient !== null) {
        if (window.document.domain.includes("gimkit.com")) {
          window.eval(newClient);
          storeData('clientMessage', null)
        }
      }
    }, 50);
  }
  tabSyncFunction();

  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
  });

  // send data to server
  console.sendDataToServer = function(message) {
    storeData('serverMessage', message)
  };

  // send data to client
  console.sendDataToClient = function(message) {
    storeData('clientMessage', message)
  };

  // request server
  console.requestDataFromServer = function(message) {
    storeData('serverMessage', `fetch("https://${serverURL}/api", { method: "GET", headers: { "data": "${message}" } }).then(response => { if (response.ok) { return response.text(); } else { throw new Error(\`HTTP error! status: \${response.status}\`); } }).then(data => console.sendDataToClient(data)).catch(error => console.error("Error:", error));`);
  };

}

if (window.document.domain.includes(serverURL) || window.document.domain.includes("gimkit.com") ) {
    main();
}
