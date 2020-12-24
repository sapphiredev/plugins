import { isClass } from '@sapphire/utilities';
import { bgCyan, reset } from 'colorette';
import { LoggerStyleBackground, LoggerTimestamp } from '../src';

describe('LoggerTimestamp', () => {
	test('LoggerTimestamp should be a class', () => {
		expect(isClass(LoggerTimestamp)).toBe(true);
	});

	test('Empty Constructor', () => {
		const timestamp = new LoggerTimestamp();
		expect(timestamp.color!.style).toBe(reset);
		expect(timestamp.formatter('SHARD 0')).toBe('SHARD 0 - ');
		expect(timestamp.timestamp.pattern).toBe('YYYY-MM-DD HH:mm:ss');
		expect(timestamp.utc).toBe(false);
	});

	test('Empty Object Constructor', () => {
		const timestamp = new LoggerTimestamp({});
		expect(timestamp.color!.style).toBe(reset);
		expect(timestamp.formatter('SHARD 0')).toBe('SHARD 0 - ');
		expect(timestamp.timestamp.pattern).toBe('YYYY-MM-DD HH:mm:ss');
		expect(timestamp.utc).toBe(false);
	});

	test('Color (Defined)', () => {
		const timestamp = new LoggerTimestamp({ color: { background: LoggerStyleBackground.Cyan } });
		expect(timestamp.color!.style).toBe(bgCyan);
	});

	test('Color (None)', () => {
		const timestamp = new LoggerTimestamp({ color: null });
		expect(timestamp.color).toBeNull();
	});

	test('UTC', () => {
		const timestamp = new LoggerTimestamp({ utc: true });
		expect(timestamp.utc).toBe(true);
	});

	test('Pattern', () => {
		const timestamp = new LoggerTimestamp({ pattern: 'HH:mm:ss' });
		expect(timestamp.timestamp.pattern).toBe('HH:mm:ss');
	});

	test('Formatter', () => {
		const timestamp = new LoggerTimestamp({ formatter: (string) => `[${string}]` });
		expect(timestamp.formatter('10:33:34')).toBe('[10:33:34]');
	});
});
