import { isClass } from '@sapphire/utilities';
import * as Colorette from 'colorette';
import { LoggerLevel, LoggerStyleText } from '../src';

describe('LoggerLevel', () => {
	test('LoggerLevel should be a class', () => {
		expect(isClass(LoggerLevel)).toBe(true);
	});

	test('Empty Constructor', () => {
		const level = new LoggerLevel();
		expect(level.infix).toBe('');
		expect(level.message).not.toBeNull();
		expect(level.message!.style).toBe(Colorette.reset);
		expect(level.timestamp).not.toBeNull();
		expect(level.timestamp!.color).not.toBeNull();
		expect(level.timestamp!.color!.style).toBe(Colorette.reset);
		expect(level.timestamp!.formatter('SHARD 0')).toBe('SHARD 0 - ');
		expect(level.timestamp!.timestamp.pattern).toBe('YYYY-MM-DD HH:mm:ss');
		expect(level.timestamp!.utc).toBe(false);
	});

	test('Empty Object Constructor', () => {
		const level = new LoggerLevel({});
		expect(level.infix).toBe('');
		expect(level.message).not.toBeNull();
		expect(level.message!.style).toBe(Colorette.reset);
		expect(level.timestamp).not.toBeNull();
		expect(level.timestamp!.color).not.toBeNull();
		expect(level.timestamp!.color!.style).toBe(Colorette.reset);
		expect(level.timestamp!.formatter('SHARD 0')).toBe('SHARD 0 - ');
		expect(level.timestamp!.timestamp.pattern).toBe('YYYY-MM-DD HH:mm:ss');
		expect(level.timestamp!.utc).toBe(false);
	});

	test('Infix', () => {
		const level = new LoggerLevel({ infix: 'WARN' });
		expect(level.infix).toBe('WARN');
	});

	test('Message (Colorette)', () => {
		const level = new LoggerLevel({ message: Colorette.yellow });
		expect(level.message).not.toBeNull();
		expect(level.message!.style).toBe(Colorette.yellow);
	});

	test('Message (Enum)', () => {
		const level = new LoggerLevel({ message: { text: LoggerStyleText.Yellow } });
		expect(level.message).not.toBeNull();
		expect(level.message!.style).toBe(Colorette.yellow);
	});

	test('Message (None)', () => {
		const level = new LoggerLevel({ message: null });
		expect(level.message).toBeNull();
	});

	test('Timestamp (Colorette)', () => {
		const level = new LoggerLevel({ timestamp: { color: Colorette.yellow } });
		expect(level.timestamp).not.toBeNull();
		expect(level.timestamp!.color).not.toBeNull();
		expect(level.timestamp!.color!.style).toBe(Colorette.yellow);
	});

	test('Timestamp (Enum)', () => {
		const level = new LoggerLevel({ timestamp: { color: { text: LoggerStyleText.Yellow } } });
		expect(level.timestamp).not.toBeNull();
		expect(level.timestamp!.color).not.toBeNull();
		expect(level.timestamp!.color!.style).toBe(Colorette.yellow);
	});

	test('Timestamp (None)', () => {
		const level = new LoggerLevel({ timestamp: null });
		expect(level.timestamp).toBeNull();
	});
});
