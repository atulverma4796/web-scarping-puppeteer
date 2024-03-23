const extractedData = [];
async function getFileUploadList(page) {
  try {
    const tableData = await page.evaluate(() => {
      const data = [];
      const container = document.querySelector(".container");
      const rows = Array.from(
        container.querySelectorAll(
          ".border-top.d-flex.align-items-center.py-2.justify-content-center.row"
        )
      );

      for (const row of rows) {
        const cols = Array.from(
          row.querySelectorAll(".col-sm-1, .col-sm-3, .col-sm-2")
        );
        if (cols.length >= 4) {
          const sNo = cols[0].textContent.trim();
          const fileName = cols[1].querySelector("div").textContent.trim();
          const status = cols[2].querySelector("div").textContent.trim();
          const createdAt = cols[3].querySelector("div").textContent.trim();
          data.push({ sNo, fileName, status, createdAt });
        }
      }
      return data;
    });
    extractedData.push(...tableData);
    //   const pagination = await page.$(".Pagination");
    //   const nextButton = await pagination.$(".next a");
    //   console.log("next", nextButton.classList.contains("disabled"));
    const paginationInfo = await page.evaluate(() => {
      const pagination = document.querySelector(".Pagination");
      const nextButton = pagination.querySelector(".next");
      return {
        hasNextButton: !!nextButton,
        isNextButtonDisabled: nextButton
          ? nextButton.classList.contains("disabled")
          : true,
      };
    });
    console.log("paginationInfo", paginationInfo);
    if (paginationInfo.hasNextButton && !paginationInfo.isNextButtonDisabled) {
      const nextButton = await page.$(".Pagination .next a");
      await nextButton.click();
      await page.waitForTimeout(2000);
      return getFileUploadList(page);
    } else {
      return extractedData;
    }
  } catch (error) {
    console.log(
      "There is some error while collecting the file details:-",
      error
    );
  }
}
module.exports.getFileUploadList = getFileUploadList;
