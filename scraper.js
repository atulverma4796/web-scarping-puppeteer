const puppeteer = require("puppeteer");
const { loginToApp } = require("./login");
const { uploadFileTOSystem } = require("./fileUpload");
const { getFileUploadList } = require("./getFileUploadList");
const { searchCodeInTheFile } = require("./searchCode");
const emailInputSelector = 'input[name="email"]';
const passwordInputSelector = 'input[name="password"]';
const loginButtonSelector = 'button[type="button"]';
const fileInputSelector = 'input[type="file"]';
async function scrapDetail(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //   await page.setViewport({ width: 1280, height: 800 });

  await page.goto(url);
  //Automatic Login to the App
  await loginToApp(
    page,
    emailInputSelector,
    passwordInputSelector,
    loginButtonSelector
  );
  //Automatic Upload file
  await uploadFileTOSystem(page, fileInputSelector);

  //Automatic Get All List of file uploads in to the system
  //   console.log(await getFileUploadList(page));
  await getFileUploadList(page);

  // Automatic Search Code in the file
  await searchCodeInTheFile(page);
}
scrapDetail("https://app.feeschedulepro.com/login");
