// document.addEventListener("DOMContentLoaded", function () {
//   const myButton = document.getElementById("myButton");
//   if (myButton) {
//     myButton.addEventListener("click", function () {
//       console.log("Button clicked!");
//     });
//   }
// });
console.log("In the content script");

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   console.log("In the content script");
//   console.log(
//     sender.tab
//       ? "from a content script:" + sender.tab.url
//       : "from the extension"
//   );
//   if (message.action === "appendCustomPopup") {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(message.html, "text/html");
//     const customPopup = doc.querySelector(".custom-popup");

//     if (customPopup) {
//       document.body.appendChild(customPopup);
//     }
//   }
//   sendResponse({ farewell: "goodbye" });
// });
// In the background script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Message received in content script:", message, sender);
//   return true;
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(request, sender, sendResponse);
//   sendResponse("send this：" + JSON.stringify(request));
// });

// contentScript.js
// const script = document.createElement("script");
// script.src = chrome.runtime.getURL("popup.js");
// document.body.appendChild(script);

function startRecording() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };
      mediaRecorder.onstop = function (e) {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("audioUrl", audioUrl);
      };
      mediaRecorder.start();
    })
    .catch((err) => console.log("Error", err));
}

function handleMutations(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      const startRecordButton = document.getElementById("startRecord");
      if (startRecordButton) {
        startRecordButton.addEventListener("click", startRecording);
        observer.disconnect();
      }
    }
  }
}

const observer = new MutationObserver(handleMutations);

observer.observe(document.documentElement, { childList: true, subtree: true });
