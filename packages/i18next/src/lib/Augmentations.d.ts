/**
 * ================================================
 * | THIS IS FOR TYPEDOC. DO NOT REMOVE THIS FILE |
 * ================================================
 */

import type { InternationalizationHandler } from './InternationalizationHandler';

declare module '@sapphire/pieces' {
	interface Container {
		i18n: InternationalizationHandler;
	}
}
