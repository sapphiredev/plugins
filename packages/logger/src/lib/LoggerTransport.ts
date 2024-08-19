import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
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
		if (existsSync(this.fileName)) {
			const content = JSON.parse((await readFile(this.fileName)).toString());
			content.push(message);
			await writeFile(this.fileName, content);
		} else {
			await writeFile(this.fileName, [message]);
		}
	}
}

export interface TransporterOption {
	file: string;
	loglevel: LogLevel;
}
