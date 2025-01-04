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
});