import { Timestamp } from '@sapphire/time-utilities';
import { LoggerStyle, LoggerStyleResolvable } from './LoggerStyle';

export interface LoggerTimestampOptions {
	pattern?: string;
	utc?: boolean;
	color?: LoggerStyleResolvable;
}

export class LoggerTimestamp {
	public timestamp: Timestamp;
	public utc: boolean;
	public color: LoggerStyle;

	public constructor(options: LoggerTimestampOptions = {}) {
		this.timestamp = new Timestamp(options.pattern ?? 'YYYY-MM-DD HH:mm:ss');
		this.utc = options.utc ?? false;
		this.color = new LoggerStyle(options.color);
	}

	public run() {
		const result = this.utc ? this.timestamp.displayUTC(new Date()) : this.timestamp.display(new Date());
		return this.color.run(`[${result}]`);
	}
}
