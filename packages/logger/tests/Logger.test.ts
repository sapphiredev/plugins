import { LogLevel } from '@sapphire/framework';
import { isClass } from '@sapphire/utilities';
import { Logger } from '../src';

const levels = [LogLevel.Trace, LogLevel.Debug, LogLevel.Info, LogLevel.Warn, LogLevel.Error, LogLevel.Fatal, LogLevel.Trace] as const;

describe('Logger', () => {
	test('Logger should be a class', () => {
		expect(isClass(Logger)).toBe(true);
	});

	test('Empty Constructor', () => {
		const logger = new Logger();
		expect(logger.console).toBeDefined();
		expect(logger.depth).toBe(0);
		expect(logger.formats.size).toBe(7);
		levels.forEach((level) => expect(logger.formats.has(level)).toBe(true));
		expect(logger.join).toBe(' ');
		expect(logger.level).toBe(LogLevel.Info);
	});

	test('Empty Object Constructor', () => {
		const logger = new Logger({});
		expect(logger.console).toBeDefined();
		expect(logger.depth).toBe(0);
		expect(logger.formats.size).toBe(7);
		levels.forEach((level) => expect(logger.formats.has(level)).toBe(true));
		expect(logger.join).toBe(' ');
		expect(logger.level).toBe(LogLevel.Info);
	});

	test('Depth', () => {
		const logger = new Logger({ depth: 2 });
		expect(logger.depth).toBe(2);
	});

	test('Join', () => {
		const logger = new Logger({ join: '\n' });
		expect(logger.join).toBe('\n');
	});

	test('Level', () => {
		const logger = new Logger({ level: LogLevel.Debug });
		expect(logger.level).toBe(LogLevel.Debug);
	});
});
