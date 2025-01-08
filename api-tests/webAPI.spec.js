const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('./utils/APiUtils');
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] };
let response;
test.beforeAll(async () => {
    //login api
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});

test('Create order via api', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
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
});