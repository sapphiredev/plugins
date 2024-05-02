import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	'./vitest.config.ts',
	'./packages/api/vitest.config.ts',
	'./packages/logger/vitest.config.ts',
	'./packages/i18next/vitest.config.ts'
]);
