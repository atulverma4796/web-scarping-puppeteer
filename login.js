const email = "atul.verma@soforix.com";
const password = "11111111";
async function loginToApp(
  page,
  emailInputSelector,
  passwordInputSelector,
  loginButtonSelector
) {
  try {
    console.log("At login");
    const emailInput = await page.$(emailInputSelector);
    const passwordInput = await page.$(passwordInputSelector);
    const loginButton = await page.$(loginButtonSelector);
    await emailInput.type(email);
    await passwordInput.type(password);
    await loginButton.click();
    await page.waitForNavigation();
    const dropdownToggleButton = await page.$(
      "div.nav-item.dropdown > a.dropdown-toggle"
    );
    if (dropdownToggleButton) {
      await dropdownToggleButton.click();
      await page.waitForSelector("div.dropdown-menu.show", {
        visible: true,
      });
      const userNameElement = await page.$(
        "div.dropdown-menu.show a[data-rr-ui-dropdown-item]"
      );

      if (userNameElement) {
        const userName = await userNameElement.evaluate((element) => {
          return element.textContent.trim();
        });
        console.log("You are logged in as a user:-", userName);
      } else {
        console.log("There is some error in to the system");
      }
    }
  } catch (error) {
    console.log("Error while login to the system:-", error);
  }
}
module.exports.loginToApp = loginToApp;
