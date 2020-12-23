import { LoggerStyle, LoggerStyleResolvable } from './LoggerStyle';
import { LoggerTimestamp, LoggerTimestampOptions } from './LoggerTimestamp';

export class LoggerLevel {
	public timestamp: LoggerTimestamp | null;
	public prefix: string | null;
	public message: LoggerStyle | null;

	public constructor(options: LoggerLevelOptions = {}) {
		this.timestamp = options.timestamp === null ? null : new LoggerTimestamp(options.timestamp);
		this.prefix = options.prefix ?? null;
		this.message = options.message === null ? null : new LoggerStyle(options.message);
	}

	public run(content: string) {
		const timestamp = this.timestamp ? `${this.timestamp.run()} ` : '';
		const prefix = this.prefix ? `${timestamp}${this.prefix} ` : timestamp;

		if (prefix.length) {
			const formatter = this.message //
				? (line: string) => prefix + this.message!.run(line)
				: (line: string) => prefix + line;
			return content.split('\n').map(formatter).join('\n');
		}

		return this.message ? this.message.run(content) : content;
	}
}

export interface LoggerLevelOptions {
	timestamp?: LoggerTimestampOptions | null;
	prefix?: string | null;
	message?: LoggerStyleResolvable | null;
}
