import { Logger as BuiltinLogger, LogLevel, LogMethods } from '@sapphire/framework';
import { bgRed, cyan, gray, magenta, options as coloretteOptions, red, Style, white, yellow } from 'colorette';
import { Console } from 'console';
import { inspect, InspectOptions } from 'util';
import { LoggerLevel, LoggerLevelOptions } from './LoggerLevel';

/**
 * The logger class.
 * @since 1.0.0
 */
export class Logger extends BuiltinLogger {
	/**
	 * The console this writes to.
	 * @since 1.0.0
	 */
	protected readonly console: Console;

	/**
	 * The formats supported by the logger.
	 * @since 1.0.0
	 */
	protected readonly formats: Map<LogLevel, LoggerLevel>;

	/**
	 * The string write will join values by.
	 * @since 1.0.0
	 */
	protected readonly join: string;

	public constructor(options: LoggerOptions = {}) {
		super(options.level ?? LogLevel.Info);

		this.console = new Console(options.stdout ?? process.stdout, options.stderr ?? process.stderr);
		this.formats = Logger.createFormatMap(options.format, options.defaultFormat);
		this.join = options.join ?? ' ';

		if (typeof options.colors === 'boolean') coloretteOptions.enabled = options.colors;
	}

	/**
	 * Writes the log message given a level and the value(s).
	 * @param level The log level.
	 * @param values The values to log.
	 */
	public write(level: LogLevel, ...values: readonly unknown[]): void {
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
	protected preprocess(...values: readonly unknown[]) {
		const inspectOptions: InspectOptions = { colors: coloretteOptions.enabled, depth: 0 };
		return values.map((value) => (typeof value === 'string' ? value : inspect(value, inspectOptions))).join(this.join);
	}

	private get levels() {
		return Reflect.get(BuiltinLogger, 'levels') as Map<LogLevel, LogMethods>;
	}

	private static createFormatMap(options: LoggerFormatOptions = {}, defaults: LoggerLevelOptions = options.none ?? {}) {
		const map = new Map<LogLevel, LoggerLevel>();

		map.set(LogLevel.Trace, Logger.ensureDefaultLevel(options.trace, defaults, gray, 'TRACE'));
		map.set(LogLevel.Debug, Logger.ensureDefaultLevel(options.debug, defaults, magenta, 'DEBUG'));
		map.set(LogLevel.Info, Logger.ensureDefaultLevel(options.info, defaults, cyan, 'INFO'));
		map.set(LogLevel.Warn, Logger.ensureDefaultLevel(options.warn, defaults, yellow, 'WARN'));
		map.set(LogLevel.Error, Logger.ensureDefaultLevel(options.error, defaults, red, 'ERROR'));
		map.set(LogLevel.Fatal, Logger.ensureDefaultLevel(options.fatal, defaults, bgRed, 'FATAL'));
		map.set(LogLevel.None, Logger.ensureDefaultLevel(options.none, defaults, white, ''));

		return map;
	}

	private static ensureDefaultLevel(options: LoggerLevelOptions | undefined, defaults: LoggerLevelOptions, color: Style, name: string) {
		if (options) return new LoggerLevel(options);
		return new LoggerLevel({
			...defaults,
			timestamp: defaults.timestamp === null ? null : { ...(defaults.timestamp ?? {}), color },
			infix: name.length ? `${color(name.padEnd(5, ' '))} -` : ''
		});
	}
}

/**
 * The logger options.
 * @since 1.0.0
 */
export interface LoggerOptions {
	/**
	 * The WriteStream for the output logs.
	 * @since 1.0.0
	 * @default process.stdout
	 */
	stdout?: NodeJS.WriteStream;

	/**
	 * A WriteStream for the error logs.
	 * @since 1.0.0
	 * @default process.stderr
	 */
	stderr?: NodeJS.WriteStream;

	/**
	 * The default options used to fill all the possible values for [[LoggerOptions.format]].
	 * @since 1.0.0
	 * @default options.format.none ?? {}
	 */
	defaultFormat?: LoggerLevelOptions;

	/**
	 * The options for each log level. LogLevel.None serves to set the default for all keys, where only
	 * [[LoggerTimestampOptions.timestamp]] and [[LoggerLevelOptions.prefix]] would be overridden.
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
	 * Whether or not colors should be added, this modifies colorette's global options. For specific ones, use `null` in
	 * the style options.
	 * @since 1.0.0
	 */
	colors?: boolean;
}

/**
 * The logger format options.
 * @since 1.0.0
 */
export interface LoggerFormatOptions {
	/**
	 * The logger options for the lowest log level, used when calling [[ILogger.trace]].
	 * @since 1.0.0
	 */
	trace?: LoggerLevelOptions;

	/**
	 * The logger options for the debug level, used when calling [[ILogger.debug]].
	 * @since 1.0.0
	 */
	debug?: LoggerLevelOptions;

	/**
	 * The logger options for the info level, used when calling [[ILogger.info]].
	 * @since 1.0.0
	 */
	info?: LoggerLevelOptions;

	/**
	 * The logger options for the warning level, used when calling [[ILogger.warn]].
	 * @since 1.0.0
	 */
	warn?: LoggerLevelOptions;

	/**
	 * The logger options for the error level, used when calling [[ILogger.error]].
	 * @since 1.0.0
	 */
	error?: LoggerLevelOptions;

	/**
	 * The logger options for the critical level, used when calling [[ILogger.fatal]].
	 * @since 1.0.0
	 */
	fatal?: LoggerLevelOptions;

	/**
	 * The logger options for an unknown or uncategorized level.
	 * @since 1.0.0
	 */
	none?: LoggerLevelOptions;
}
