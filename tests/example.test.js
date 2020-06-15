const puppeteer = require('puppeteer')
const expect = require('chai').expect
const newman = require('newman')
const { doClick } = require('../lib/helpers')
const { getText } = require('../lib/helpers')
const { getCount } = require('../lib/helpers')

describe('Launch Browser', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
        page = await browser.newPage()
		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('page title', async function () {
		const page = await browser.newPage()
		page.setDefaultTimeout(10000)
		page.setDefaultNavigationTimeout(20000)

		await page.goto('http://example.com')
		await page.waitForXPath('//h1')
		const title = await page.title()
		const url = page.url()
		// const text = await page.$eval('h1', element => element.textContent)
		// const count = await page.$$eval('p', element => element.length)
		const text = await getText(page, 'h1')
		const count = await getCount(page, 'p')

		expect(title).to.be.a('string', 'Example Domain')
		expect(url).to.include('example.com')
		expect(text).to.be.a('string', 'Example Domain')
		expect(count).to.equal(2)
	})

	it('zero bank signin', async function () {
		await page.goto('http://zero.webappsecurity.com/')
		// await page.waitForSelector('#signin_button')
		// await page.click('#signin_button')
		await doClick(page, '#signin_button')
		// await page.waitFor(() => !document.querySelector('#signin_button'))
		await page.waitForSelector('#signin_button', {
			hidden: true,
			timeout: 3000,
		})
	})

	// launchBrowser()

	// inputFields()

	// checkBox()

	// dropdownValue()

	// commentsBox()

	// submitButton()

	// doItAll()

	// pageTitleURL()

	// zeroBankSearch()

	// zeroBankSignin()

	// apiTesting()
})

function apiTesting() {
	newman.run(
		{
			collection: 'https://www.getpostman.com/collections/3d9d2247c6bbeca2a07b',
			reporters: 'json',
		},
		function (err) {
			if (err) {
				throw err
			}
			console.log('collection run complete')
		}
	)
}

function zeroBankSignin() {}

function zeroBankSearch() {
	it('zero bank search', async function () {
		const page = await browser.newPage()
		await page.goto('http://zero.webappsecurity.com/')
		await page.waitForSelector('#searchTerm')
		await page.type('#searchTerm', 'Hello World')
		await page.keyboard.press('Enter', { delay: 10 })
		await page.waitFor(2000)
	})
}

function pageTitleURL() {}

function doItAll() {
	it('do all', async function () {
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.type('#developer-name', 'Mike', { delay: 0 })
		await page.click('#tried-test-cafe', { clickCount: 1 })
		await page.select('#preferred-interface', 'JavaScript API')
		const message = 'Lets enter message'
		await page.type('#comments', message)
		await page.click('#submit-button', { clickCount: 1 })
		await page.waitForSelector('.result-content')
		await page.waitFor(1000)
	})
}

function submitButton() {
	it('submit button', async function () {
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.click('#submit-button', { clickCount: 1 })
	})
}

function commentsBox() {
	it('comments box', async function () {
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')
		const message = 'Lets enter message'
		await page.type('#comments', message)
	})
}

function dropdownValue() {
	it('dropdown value', async function () {
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.select('#preferred-interface', 'JavaScript API')
	})
}

function checkBox() {
	it('check box', async function () {
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.click('#tried-test-cafe', { clickCount: 1 })
	})
}

function inputFields() {
	it('input fields', async function () {
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.type('#developer-name', 'Mike', { delay: 0 })
	})
}

function launchBrowser() {
	it('launch browser', async function () {
		const page = await browser.newPage()
		await page.goto('http://exmaple.com/')
		await page.waitForSelector('h1')
		await page.goto('http://dev.to/')
		await page.waitForSelector('#top-bar')
		await page.goBack()
		await page.waitForSelector('h1')
		await page.goForward()
		await page.waitForSelector('#top-bar')
	})
}
