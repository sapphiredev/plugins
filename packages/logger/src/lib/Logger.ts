import { Logger as BuiltinLogger, LogLevel, type LogMethods } from '@sapphire/framework';
import { bgRed, cyan, gray, isColorSupported, magenta, red, white, yellow, type Color } from 'colorette';
import { Console } from 'console';
import { inspect, type InspectOptions } from 'util';
import { LoggerLevel, type LoggerLevelOptions } from './LoggerLevel';

/**
 * The logger class.
 * @since 1.0.0
 */
export class Logger extends BuiltinLogger {
	/**
	 * The console this writes to.
	 * @since 1.0.0
	 */
	public readonly console: Console;

	/**
	 * The formats supported by the logger.
	 * @since 1.0.0
	 */
	public readonly formats: Map<LogLevel, LoggerLevel>;

	/**
	 * The string `write` will join values by.
	 * @since 1.0.0
	 */
	public readonly join: string;

	/**
	 * The inspect depth when logging objects.
	 * @since 1.0.0
	 */
	public readonly depth: number;

	public constructor(options: LoggerOptions = {}) {
		super(options.level ?? LogLevel.Info);

		this.console = new Console(options.stdout ?? process.stdout, options.stderr ?? process.stderr);
		this.formats = Logger.createFormatMap(options.format, options.defaultFormat);
		this.join = options.join ?? ' ';
		this.depth = options.depth ?? 0;
	}

	/**
	 * Writes the log message given a level and the value(s).
	 * @param level The log level.
	 * @param values The values to log.
	 */
	public override write(level: LogLevel, ...values: readonly unknown[]): void {
		if (level < this.level) return;

		const method = this.levels.get(level) ?? 'log';
		const formatter = this.formats.get(level) ?? this.formats.get(LogLevel.None)!;

		this.console[method](formatter.run(this.preprocess(values)));
	}

	/**
	 * Pre-processes an array of values.
	 * @since 1.0.0
	 * @param values The values to pre-process.
	 */
	protected preprocess(values: readonly unknown[]) {
		const inspectOptions: InspectOptions = { colors: isColorSupported, depth: this.depth };
		return values.map((value) => (typeof value === 'string' ? value : inspect(value, inspectOptions))).join(this.join);
	}

	private get levels() {
		return Reflect.get(BuiltinLogger, 'levels') as Map<LogLevel, LogMethods>;
	}

	/**
	 * Gets whether or not colorette is enabled.
	 * @since 1.0.0
	 */
	public static get stylize() {
		return isColorSupported;
	}

	private static createFormatMap(options: LoggerFormatOptions = {}, defaults: LoggerLevelOptions = options.none ?? {}) {
		return new Map<LogLevel, LoggerLevel>([
			[LogLevel.Trace, Logger.ensureDefaultLevel(options.trace, defaults, gray, 'TRACE')],
			[LogLevel.Debug, Logger.ensureDefaultLevel(options.debug, defaults, magenta, 'DEBUG')],
			[LogLevel.Info, Logger.ensureDefaultLevel(options.info, defaults, cyan, 'INFO')],
			[LogLevel.Warn, Logger.ensureDefaultLevel(options.warn, defaults, yellow, 'WARN')],
			[LogLevel.Error, Logger.ensureDefaultLevel(options.error, defaults, red, 'ERROR')],
			[LogLevel.Fatal, Logger.ensureDefaultLevel(options.fatal, defaults, bgRed, 'FATAL')],
			[LogLevel.None, Logger.ensureDefaultLevel(options.none, defaults, white, '')]
		]);
	}

	private static ensureDefaultLevel(options: LoggerLevelOptions | undefined, defaults: LoggerLevelOptions, color: Color, name: string) {
		if (options) return new LoggerLevel(options);
		return new LoggerLevel({
			...defaults,
			timestamp: defaults.timestamp === null ? null : { ...(defaults.timestamp ?? {}), color },
			infix: name.length ? `${color(name.padEnd(5, ' '))} - ` : ''
		});
	}
}

/**
 * The logger options.
 * @since 1.0.0
 */
export interface LoggerOptions {
	/**
	 * A writable stream for the output logs.
	 * @since 1.0.0
	 * @default process.stdout
	 */
	stdout?: NodeJS.WritableStream;

	/**
	 * A writable stream for the error logs.
	 * @since 1.0.0
	 * @default process.stderr
	 */
	stderr?: NodeJS.WritableStream;

	/**
	 * The default options used to fill all the possible values for {@link LoggerOptions.format}.
	 * @since 1.0.0
	 * @default options.format.none ?? {}
	 */
	defaultFormat?: LoggerLevelOptions;

	/**
	 * The options for each log level. LogLevel.None serves to set the default for all keys, where only
	 * {@link LoggerTimestampOptions.timestamp} and {@link LoggerLevelOptions.prefix} would be overridden.
	 * @since 1.0.0
	 * @default {}
	 */
	format?: LoggerFormatOptions;

	/**
	 * The minimum log level.
	 * @since 1.0.0
	 * @default LogLevel.Info
	 */
	level?: LogLevel;

	/**
	 * The string that joins different messages.
	 * @since 1.0.0
	 * @default ' '
	 */
	join?: string;

	/**
	 * The inspect depth when logging objects.
	 * @since 1.0.0
	 * @default 0
	 */
	depth?: number;
}

/**
 * The logger format options.
 * @since 1.0.0
 */
export interface LoggerFormatOptions {
	/**
	 * The logger options for the lowest log level, used when calling {@link ILogger.trace}.
	 * @since 1.0.0
	 */
	trace?: LoggerLevelOptions;

	/**
	 * The logger options for the debug level, used when calling {@link ILogger.debug}.
	 * @since 1.0.0
	 */
	debug?: LoggerLevelOptions;

	/**
	 * The logger options for the info level, used when calling {@link ILogger.info}.
	 * @since 1.0.0
	 */
	info?: LoggerLevelOptions;

	/**
	 * The logger options for the warning level, used when calling {@link ILogger.warn}.
	 * @since 1.0.0
	 */
	warn?: LoggerLevelOptions;

	/**
	 * The logger options for the error level, used when calling {@link ILogger.error}.
	 * @since 1.0.0
	 */
	error?: LoggerLevelOptions;

	/**
	 * The logger options for the critical level, used when calling {@link ILogger.fatal}.
	 * @since 1.0.0
	 */
	fatal?: LoggerLevelOptions;

	/**
	 * The logger options for an unknown or uncategorised level.
	 * @since 1.0.0
	 */
	none?: LoggerLevelOptions;
}
