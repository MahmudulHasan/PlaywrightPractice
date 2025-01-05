const {test, expect} = require('@playwright/test');

test('Client App Login', async ({page})=> {
    const userName = page.locator("#username");
    const products = page.locator(".card-body");
    const productCart = page.locator(".card-footer");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    const dropdown = page.locator("select.form-control"); 
    const documentlink = page.locator("[href*='documents-request']");
    const productName = "Samsung Note 8";
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");
    dropdown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    expect(await page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#okayBtn').click();
    await page.locator("#terms").click();
    expect(await page.locator('#terms')).toBeChecked();
    await expect(documentlink).toHaveAttribute("class", "blinkingText");
    await signIn.click();
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    const count = await products.count();
    console.log(count);
    for( let i = 0; i < count; i++) {
        if(await products.nth(i).locator("a").textContent() === productName)  {
            console.log(await products.nth(i).locator("a").textContent());
            await productCart.nth(i).locator("button").click();
            break;
        }
    }
    await page.locator("#navbarResponsive a").click();
    await page.locator("table td a").first().waitFor();
    const bool = await page.locator("h4:has-text('Samsung Note 8')").isVisible();
    expect(bool).toBeTruthy();
    //await page.pause();
    await page.locator("button[class='btn btn-success']").click();
    await page.locator("#country").pressSequentially("Ban");
    const dropdownCountry = await page.locator(".container .suggestions");
    await dropdownCountry.waitFor();
    const optionCount = await dropdownCountry.locator("a").count();
    for(let i = 0; i < optionCount; i++) {
        const countryText = await dropdownCountry.locator("a").nth(i).textContent();
        if(countryText === "Bangladesh") {
            await dropdownCountry.locator("a").nth(i).click();
            break;
        }
    }
    await page.locator("footer div").click();
    const checkbox = await page.locator("label[for='checkbox2']");
    //await checkbox.waitFor();
    //await page.locator("#checkbox2").waitFor().click();
    await checkbox.click();
    await page.locator("input[value='Purchase']").click();
    const successMessage = await page.locator('[class="alert alert-success alert-dismissible"]').textContent();
    await console.log(successMessage);
    await page.pause();
});

test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    //locator(css)
 
});
 