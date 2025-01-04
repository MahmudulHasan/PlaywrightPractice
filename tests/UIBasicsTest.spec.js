const {test, expect} = require('@playwright/test');

test('First Playwright test', async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy"); 
    await signIn.click();
    //console.log(await cardTitles.nth(0).textContent());
    //await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('UI Control', async ({page})=> {
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    const dropdown = page.locator("select.form-control");
    const documentlink = page.locator("[href*='documents-request']");
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
    //const allTitles = await cardTitles.allTextContents();
});

test.only('Child window handle', async ({browser, page})=> {
    const context = await browser.newContext();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentlink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentlink.click()
    ]);
    const text =  await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    await userName.fill(domain);
    await page.pause();_
    console.log(await page.locator("#username").textContent());
});