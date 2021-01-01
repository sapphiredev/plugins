import { isClass } from '@sapphire/utilities';
import { I18nextHandler } from '../src';
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
