import { appendFile } from 'node:fs/promises';
import { container } from '@sapphire/pieces';
import { LogLevel } from '@sapphire/framework';

export class LoggerTransport {
	public fileName: string;
	public loglevel: LogLevel;
	public constructor(options: TransporterOption) {
		this.fileName = options.file;
		this.loglevel = options.loglevel;
		container.transporters.set(this.loglevel, this);
	}

	public async transport(message: string) {
		await appendFile(this.fileName, `${message}\n`);
	}
}

export interface TransporterOption {
	file: string;
	loglevel: LogLevel;
}
