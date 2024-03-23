const PATH =
  "C:\\Projects\\dentalProject\\dentalparser\\tests\\samples\\Sample 2.pdf";
const path = require("path");

async function uploadFileTOSystem(page, fileInputSelector) {
  try {
    const fileUploadInput = await page.$('input[type="file"]');
    const filePath = path.resolve(PATH);
    fileUploadInput.uploadFile(filePath);
    const submitButton = await page.$(".submit_button button");
    await submitButton.click();
    console.log("File Uploaded!");
  } catch (error) {
    console.log("Error while uploading the file:-", error);
  }
}
module.exports.uploadFileTOSystem = uploadFileTOSystem;
