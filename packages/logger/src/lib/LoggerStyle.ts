import * as Colorette from 'colorette';

export enum LoggerStyleText {
	Reset = 'reset',
	Bold = 'bold',
	Dim = 'dim',
	Italic = 'italic',
	Underline = 'underline',
	Inverse = 'inverse',
	Hidden = 'hidden',
	Strikethrough = 'strikethrough'
}

export enum LoggerStyleColor {
	Black = 'black',
	Red = 'red',
	Green = 'green',
	Yellow = 'yellow',
	Blue = 'blue',
	Magenta = 'magenta',
	Cyan = 'cyan',
	White = 'white',
	Gray = 'gray',
	BlackBright = 'blackBright',
	RedBright = 'redBright',
	GreenBright = 'greenBright',
	YellowBright = 'yellowBright',
	BlueBright = 'blueBright',
	MagentaBright = 'magentaBright',
	CyanBright = 'cyanBright',
	WhiteBright = 'whiteBright'
}

export enum LoggerStyleBackground {
	Black = 'bgBlack',
	Red = 'bgRed',
	Green = 'bgGreen',
	Yellow = 'bgYellow',
	Blue = 'bgBlue',
	Magenta = 'bgMagenta',
	Cyan = 'bgCyan',
	White = 'bgWhite',
	BlackBright = 'bgBlackBright',
	RedBright = 'bgRedBright',
	GreenBright = 'bgGreenBright',
	YellowBright = 'bgYellowBright',
	BlueBright = 'bgBlueBright',
	MagentaBright = 'bgMagentaBright',
	CyanBright = 'bgCyanBright',
	WhiteBright = 'bgWhiteBright'
}

export class LoggerStyle {
	private readonly style: Colorette.Style;

	public constructor(resolvable: LoggerStyleResolvable = {}) {
		if (typeof resolvable === 'function') {
			this.style = resolvable;
		} else {
			const styles: Colorette.Style[] = [];
			if (resolvable.text) styles.push(...resolvable.text.map((text) => Colorette[text]));
			if (resolvable.color) styles.push(Colorette[resolvable.color]);
			if (resolvable.background) styles.push(Colorette[resolvable.background]);

			this.style = styles.length //
				? (string) => styles.reduce((out, style) => style(out), string)
				: Colorette.reset;
		}
	}

	public run(string: string) {
		return this.style(string);
	}
}

export interface LoggerStyleOptions {
	text?: LoggerStyleText[];
	color?: LoggerStyleColor;
	background?: LoggerStyleBackground;
}

export type LoggerStyleResolvable = Colorette.Style | LoggerStyleOptions;
