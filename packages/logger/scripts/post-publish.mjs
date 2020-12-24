import { rm } from 'fs/promises';

const rootDir = new URL('../', import.meta.url);

const registerFiles = [
	new URL('register.js', rootDir),
	new URL('register.mjs', rootDir),
	new URL('register.js.map', rootDir),
	new URL('register.d.ts', rootDir),
	new URL('register.d.ts.map', rootDir)
];

for (const file of registerFiles) {
	await rm(file);
}
