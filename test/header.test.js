const Page = require("./helpers/page");
test("Adds two numbers", () => {
  const sum = 1 + 2;
  expect(sum).toEqual(3);
});
let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("Header has the correct text", async () => {
  const text = await page.getContentsOf("a.brand-logo");
  expect(text).toEqual("Blogster");
});

test("Click start oauth flow", async () => {
  await page.click(".right a");
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in, shows logout button", async () => {
  await page.login();
  const logoutText = await page.getContentsOf('a[href="/auth/logout"]');
  expect(logoutText).toEqual("Logout");
});
