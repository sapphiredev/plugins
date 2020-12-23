import { isClass } from '@sapphire/utilities';
import { Logger, LoggerLevel, LoggerStyle, LoggerTimestamp } from '../src';

describe('Integration', () => {
	test('Logger should be a class', () => {
		expect(isClass(Logger)).toBe(true);
	});

	test('LoggerLevel should be a class', () => {
		expect(isClass(LoggerLevel)).toBe(true);
	});

	test('LoggerStyle should be a class', () => {
		expect(isClass(LoggerStyle)).toBe(true);
	});

	test('LoggerTimestamp should be a class', () => {
		expect(isClass(LoggerTimestamp)).toBe(true);
	});
});
