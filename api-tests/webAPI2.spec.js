const {test, expect} = require('@playwright/test');
const { APiUtils } = require('./utils/APiUtils');
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] };
let webContext;
let response;
test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[id='login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
})
test('client app login', async()=>{
    const page  = webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerLink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDeatils = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDeatils)).toBeTruthy();
})