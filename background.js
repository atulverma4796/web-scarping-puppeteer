// // background.js
// console.log("in background");

// chrome.action.onClicked.addListener(async (tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: async () => {
//       const puppeteer = require("puppeteer");
//       const { loginToApp } = require("./login");
//       const { uploadFileTOSystem } = require("./fileUpload");
//       const { getFileUploadList } = require("./getFileUploadList");
//       const { searchCodeInTheFile } = require("./searchCode");

//       const browser = await puppeteer.launch({ headless: false });
//       const page = await browser.newPage();
//       await page.goto("https://app.feeschedulepro.com/login");
//       await loginToApp(
//         page,
//         'input[name="email"]',
//         'input[name="password"]',
//         'button[type="button"]'
//       );
//       await uploadFileTOSystem(page, 'input[type="file"]');
//       await getFileUploadList(page);
//       await searchCodeInTheFile(page);
//       //   await browser.close();
//     },
//   });
// });
// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: openSidebar,
//   });
// });

// chrome.action.onClicked.addListener(function (tab) {
//   chrome.tabs.create({ url: "popup.html" });
// });

// function openSidebar() {
//   chrome.tabs.create({ url: path.join(__dirname, "popup.html") });
// }

// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: () => {
//       // Create a div element and assign it an ID
//       let customDiv = document.createElement("div");
//       customDiv.id = "custom-extension-element";

//       // Append the div to the document body
//       document.body.appendChild(customDiv);

//       // Fetch the content of foo.html and populate the div
//       fetch(chrome.runtime.getURL("test.html"))
//         .then((response) => response.text())
//         .then((data) => {
//           document.getElementById("custom-extension-element").innerHTML = data;
//         });
//     },
//   });
// });

// Define the URL of the HTML page you want to open as the popup
// var popupURL = chrome.runtime.getURL("popup.html");

// // Define the position and size of the popup window
// var windowFeatures = "width=300,height=200,top=100,left=100";

// // Function to open the popup when needed
// function openCustomPopup() {
//   var popupWindow = chrome.windows.create({
//     url: "popup.html",
//     type: "popup",
//     width: 400,
//     height: 400,
//     left: 100,
//     top: 100,
//     focused: true,
//   });
// }

// // // Add an event listener or trigger this function as needed

let mediaRecorder;
let audioChunks = [];
let isRecording = false;
chrome.action.onClicked.addListener(function (tab) {
  if (tab.url.startsWith("https://stackoverflow.com/")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openCustomPopup,
    });
  }
});

async function openCustomPopup() {
  const popup = document.getElementById("custom-extension-element");
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("popup.js");
  console.log("url:-", chrome.runtime.getURL("popup.js"));
  if (popup) {
    popup.style.display = "block";
  } else {
    let customDiv = document.createElement("div");
    customDiv.id = "custom-extension-element";

    customDiv.style.position = "sticky";
    customDiv.style.bottom = "30px";
    customDiv.style.left = "75%";
    customDiv.style.width = "400px";
    customDiv.style.height = "450px";
    customDiv.style.border = "2px solid";
    customDiv.style.zIndex = "9999";
    customDiv.style.background = "white";

    customDiv.innerHTML = `
  <div>
    <div style="display: flex; justify-content: flex-end;">
      <span id="custom-extension-close" style="cursor: pointer; width:25px;">&times;</span>
    </div>
    <h2>Custom Element</h2>
    <p>This is a custom element at the bottom of the page.</p>
     <button id="startRecord">Start Recording</button>
    </div>
  `;
    document.documentElement.appendChild(customDiv);
    document.body.appendChild(script);

    const closeIcon = document.getElementById("custom-extension-close");
    closeIcon.addEventListener("click", () => {
      const popup = document.getElementById("custom-extension-element");
      popup.style.display = "none";
    });
    // const startRecordButton = document.getElementById("startRecord");
    // startRecordButton.addEventListener("click", () => {
    //   console.log("clicked");

    // navigator.mediaDevices
    //   .getUserMedia({ audio: true })
    //   .then((stream) => {
    //     mediaRecorder = new MediaRecorder(stream);
    //     mediaRecorder.ondataavailable = function (e) {
    //       if (e.data.size > 0) {
    //         audioChunks.push(e.data);
    //       }
    //     };
    //     mediaRecorder.onstop = function (e) {
    //       const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    //       const audioUrl = URL.createObjectURL(audioBlob);
    //       console.log("audioUrl", audioUrl);
    //     };
    //     mediaRecorder.start();
    //   })
    //   .catch((err) => console.log("Error", err));
    // });
  }
}

// Rest of your code

// chrome.action.onClicked.addListener(function (tab) {
// fetch(chrome.runtime.getURL("test.html"))
//   .then((response) => response.text())
//   .then((html) => {
//     // Send a message to the content script to append the custom popup.
//     chrome.tabs.query(
//       { active: true, currentWindow: true, lastFocusedWindow: true },
//       function (tabs) {
//         if (tabs.length > 0) {
//           console.log("sending the message to the script", tabs);
//           chrome.tabs.sendMessage(
//             tabs[0].id,
//             {
//               action: "appendCustomPopup",
//               html: html,
//             }
//             // function (response) {
//             //   if (!chrome.runtime.lastError) {
//             //     // if you have any response
//             //     console.log("response", response);
//             //   } else {
//             //     console.log("error");
//             //   }
//             // }
//           );
//         }
//       }
//     );
//   })
//   .catch((err) => console.log("error", err));
// In the content script
//   try {
//     chrome.tabs.sendMessage(111144552, {
//       message: "Hello from background script!",
//     });
//     // const port = chrome.runtime.connect({ name: "content-script" });

//     // port.postMessage({ message: "Hello from background script!" });
//   } catch (error) {
//     console.log("error", error);
//   }

// injectContentScript();
// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   chrome.tabs.sendMessage(
//     tabs[0].id,
//     { greeting: "hello" },
//     function (response) {
//       console.log(response);
//     }
//   );
// });
// });

// async function getCurrentTab() {
//   return new Promise((resolve, reject) => {
//     chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//       if (tabs && tabs[0]) {
//         resolve(tabs[0]);
//       } else {
//         reject(new Error("No active tab found."));
//       }
//     });
//   });
// }

// function injectContentScript() {
//   getCurrentTab().then((tab) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: myFunction, // Replace with the function you want to inject
//     });
//   });
// }

// chrome.runtime.onInstalled.addListener(function (details) {
//   if (details.reason === "install" || details.reason === "update") {
//     // Inject the content script when the extension is installed or updated
//     injectContentScript();
//   }
// });
