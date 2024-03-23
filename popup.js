chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.scriptLoaded) {
    console.log("popup.js has been loaded");
  }
});
