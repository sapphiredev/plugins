import { Logger as BuiltLogger, LogLevel } from '@sapphire/framework';

export class Logger extends BuiltLogger {
	public write(level: LogLevel, ...values: readonly unknown[]): void {
		throw new Error('Method not implemented.');
	}
}
