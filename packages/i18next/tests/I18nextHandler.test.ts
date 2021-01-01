import { isClass } from '@sapphire/utilities';
import { I18nextHandler } from '../src';
import '../register';
import { SapphireClient } from '@sapphire/framework';

function structureTest(i18n: I18nextHandler) {
	expect(i18n.languagesLoaded).toBe(false);
	expect(i18n.languages).toBeDefined();
}

describe('I18nextHandler', () => {
	test('I18nextHandler should be a class', () => {
		expect(isClass(I18nextHandler)).toBe(true);
	});

	test('Empty Constructor', () => {
		const i18n = new I18nextHandler();
		structureTest(i18n);
	});

	test('Empty Object Constructor', () => {
		const i18n = new I18nextHandler({});
		structureTest(i18n);
	});
});

describe('Extensions', () => {
	test('SapphireClient', () => {
		const client = new SapphireClient();
		expect(client.i18n).toBeDefined();
		expect(client.fetchLanguage).toBeDefined();
	});

	/* test('SapphireClientOptions', () => {
		const options = new SapphireClientOptions();
		expect(options.i18n).toBeDefined();
		expect(options.fetchLanguage).toBeDefined();
	});*/
});
