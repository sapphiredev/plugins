import { isClass } from '@sapphire/utilities';
import { ApiRequest, ApiResponse, CookieStore, Server } from '../src';

describe('Integration', () => {
	test('ApiRequest should be a class', () => {
		expect(isClass(ApiRequest)).toBe(true);
	});

	test('ApiResponse should be a class', () => {
		expect(isClass(ApiResponse)).toBe(true);
	});

	test('CookieStore should be a class', () => {
		expect(isClass(CookieStore)).toBe(true);
	});

	test('Server should be a class', () => {
		expect(isClass(Server)).toBe(true);
	});
});
