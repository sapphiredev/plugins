import { container, LogLevel } from '@sapphire/framework';
import chokidar from 'chokidar';

container.logger = {
	debug(...args: readonly unknown[]) {
		console.log('[DEBUG]', args);
	},
	error(...args: readonly unknown[]) {
		console.error('[ERROR]', args);
	},
	info(...args: readonly unknown[]) {
		console.info('[INFO]', args);
	},
	has(_level: LogLevel) {
		return true;
	},
	write(level: LogLevel, ...args: readonly unknown[]) {
		console.log(`[${level}]`, args);
	},
	fatal(...args: readonly unknown[]) {
		console.error('[FATAL]', args);
	},
	trace(...args: readonly unknown[]) {
		console.log('[TRACE]', args);
	},
	warn(...args: readonly unknown[]) {
		console.warn('[WARN]', args);
	}
};

if (container.logger && process.env.NODE_ENV === 'development') {
	container.logger.info('HMR is enabled!');

	chokidar.watch('.').on('change', (_event, path) => {
		container.logger.info(`File ${path} has been changed.`);
		container.logger.info('Reloading...');
	});
}
