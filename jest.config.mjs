/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	displayName: 'unit test',
	preset: 'ts-jest',
	testMatch: ['<rootDir>/packages/**/tests/**/*.test.ts', '<rootDir>/packages/**/tests/**/*.test.js'],
	collectCoverageFrom: ['<rootDir>/packages/**/src/**/*.ts'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.base.json'
		}
	},
	reporters: ['default', 'github-actions']
};

export default config;
