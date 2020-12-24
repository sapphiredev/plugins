import { isClass } from '@sapphire/utilities';
import { bgCyan, bold, dim, green, inverse, reset } from 'colorette';
import { LoggerStyle, LoggerStyleBackground, LoggerStyleEffect, LoggerStyleText } from '../src';

describe('LoggerStyle', () => {
	test('LoggerStyle should be a class', () => {
		expect(isClass(LoggerStyle)).toBe(true);
	});

	test('Empty Constructor', () => {
		const style = new LoggerStyle();
		expect(style.style).toBe(reset);
	});

	test('Empty Object Constructor', () => {
		const style = new LoggerStyle({});
		expect(style.style).toBe(reset);
	});

	test('Background', () => {
		const style = new LoggerStyle({ background: LoggerStyleBackground.Cyan });
		expect(style.run('World')).toBe(bgCyan('World'));
	});

	test('Text', () => {
		const style = new LoggerStyle({ text: LoggerStyleText.Green });
		expect(style.run('World')).toBe(green('World'));
	});

	test('Effect', () => {
		const style = new LoggerStyle({ effects: [LoggerStyleEffect.Inverse] });
		expect(style.run('World')).toBe(inverse('World'));
	});

	test('Effects', () => {
		const style = new LoggerStyle({ effects: [LoggerStyleEffect.Dim, LoggerStyleEffect.Bold] });
		expect(style.run('World')).toBe(bold(dim('World')));
	});

	test('Multiple', () => {
		const style = new LoggerStyle({
			background: LoggerStyleBackground.Cyan,
			text: LoggerStyleText.Green,
			effects: [LoggerStyleEffect.Dim, LoggerStyleEffect.Bold]
		});
		expect(style.run('World')).toBe(bgCyan(green(bold(dim('World')))));
	});
});
