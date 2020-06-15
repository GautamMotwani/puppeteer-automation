const puppeteer = require('puppeteer')

describe('Device Emulaion', () => {
	let browser
    let page
    const pageWait = 2000

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
        })
        const context = await browser.createIncognitoBrowserContext()
		page = await context.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('Desktop device', async function () {
		await page.setViewport({ width: 1800, height: 1050 })
		await page.goto('http://example.com')
		await page.waitFor(pageWait)
	})
	it('Tablet device', async function () {
		const tablet = puppeteer.devices['iPad landscape']
		await page.emulate(tablet)
		await page.goto('http://example.com')
		await page.waitFor(pageWait)
	})
	it('Mobile device', async function () {
		const mobile = puppeteer.devices['iPhone X']
		await page.emulate(mobile)
        await page.goto('http://example.com')
        console.log(await browser.wsEndpoint())
		await page.waitFor(pageWait)
	})
})
