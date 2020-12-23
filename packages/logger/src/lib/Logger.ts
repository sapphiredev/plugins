import { Logger as BuiltLogger, LogLevel, LogMethods } from '@sapphire/framework';
import { bgRed, cyan, gray, magenta, red, Style, white, yellow } from 'colorette';
import { Console } from 'console';
import { LoggerLevel, LoggerLevelOptions } from './LoggerLevel';

export class Logger extends BuiltLogger {
	protected readonly console: Console;
	protected readonly formats: Map<LogLevel, LoggerLevel>;
	protected readonly join: string;

	public constructor(options: LoggerOptions = {}) {
		super(options.level ?? LogLevel.Info);

		this.console = new Console(options.stdout ?? process.stdout, options.stderr ?? process.stderr);
		this.formats = Logger.createFormatMap(options.format, options.defaultFormat);
		this.join = options.join ?? ' ';
	}

	public write(level: LogLevel, ...values: readonly unknown[]): void {
		if (level < this.level) return;

		const method = this.levels.get(level) ?? 'log';
		const formatter = this.formats.get(level) ?? this.formats.get(LogLevel.None)!;

		this.console[method](formatter.run(values.join(this.join)));
	}

	protected get levels() {
		return Reflect.get(BuiltLogger, 'levels') as Map<LogLevel, LogMethods>;
	}

	protected static createFormatMap(options: LoggerFormatOptions = {}, defaults: LoggerLevelOptions = options.none ?? {}) {
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

	protected static ensureDefaultLevel(options: LoggerLevelOptions | undefined, defaults: LoggerLevelOptions, color: Style, name: string) {
		if (options) return new LoggerLevel(options);
		return new LoggerLevel({
			...defaults,
			timestamp: defaults.timestamp === null ? null : { ...(defaults.timestamp ?? {}), color },
			prefix: name.length ? `${color(name.padEnd(5, ' '))} -` : null
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
	 * @since 0.0.1
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
