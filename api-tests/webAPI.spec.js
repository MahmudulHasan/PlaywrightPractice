const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
let token;
test.beforeAll( async () => {
     const apiContext = await request.newContext();
     const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
       { data:loginPayload });
       expect(loginResponse.ok()).toBeTruthy();
       const loginResponseJson = await loginResponse.json();
       token = loginResponseJson.token;
       console.log(token);
});

test.beforeEach( ()=> {

});

test('Client App Login', async ({page})=> {
    const userName = page.locator("#username");
    const products = page.locator(".card-body");
    const productCart = page.locator(".card-footer");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    const dropdown = page.locator("select.form-control"); 
    const documentlink = page.locator("[href*='documents-request']");
    const productName = "Zara Coat 4";
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/");
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