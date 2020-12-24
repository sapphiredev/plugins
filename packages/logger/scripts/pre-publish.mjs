import { rename } from 'fs/promises';

const distDir = new URL('../dist/', import.meta.url);
const rootDir = new URL('../', import.meta.url);

const registerFiles = [
	[new URL('register.js', distDir), new URL('register.js', rootDir)],
	[new URL('register.mjs', distDir), new URL('register.mjs', rootDir)],
	[new URL('register.js.map', distDir), new URL('register.js.map', rootDir)],
	[new URL('register.d.ts', distDir), new URL('register.d.ts', rootDir)],
	[new URL('register.d.ts.map', distDir), new URL('register.d.ts.map', rootDir)]
];

for (const [sourceFile, destFile] of registerFiles) {
	await rename(sourceFile, destFile);
}
