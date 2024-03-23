async function searchCodeInTheFile(page) {
  try {
    const viewResultButton = await page.$$(
      ".container .border-top .btn-success"
    );
    // console.log("viewResultButton", viewResultButton);
    await viewResultButton[0].click();
    await page.waitForTimeout(1000);
    const searchBoxInput = await page.$('input[type="text"]');
    // console.log("content=> before====>>   ", await page.content());
    //   console.log("searchBoxInput", searchBoxInput);
    searchBoxInput.type("1120");
    await page.waitForResponse(
      (response) =>
        response.url() === "https://app.feeschedulepro.com/graphql" &&
        response.status() === 200
    );
    console.log("\n", "\n");
    // console.log("content after=====>", await page.content());
  } catch (error) {
    console.log("There is some error while searching:-", error);
  }
}
module.exports.searchCodeInTheFile = searchCodeInTheFile;
