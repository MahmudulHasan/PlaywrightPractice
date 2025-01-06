const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6581cade9fd99c85e8ee7ff5"}]};
let token;
let orderId;
test.beforeAll( async () => {
    //login api
     const apiContext = await request.newContext();
     const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
       { data:loginPayload });
       expect(loginResponse.ok()).toBeTruthy();
       const loginResponseJson = await loginResponse.json();
       token = loginResponseJson.token;
       console.log(token);
    
       //create order api
      const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
        { data:orderPayload,
            headers: {
                'Authorization' : token,
                'Content-Type': 'application/json'
            }
         });
      const orderResponseJson = await orderResponse.json();
      console.log(orderResponseJson);
      orderId = orderResponseJson.orders[0];

});

test('Create order via api', async ({page})=> {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerLink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i = 0; i<await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDeatils = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDeatils)).toBeTruthy();
});