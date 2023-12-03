import { bold, green } from 'colorette';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const paths = ['dist/cjs/register.d.ts', 'dist/esm/register.d.mts'];
const cleanupImportsRegex = /^import '(?!.*index\.[cm]?js).*';$/gm;
const cleanupNewlineRegex = /\n{2,}/g;

for (const path of paths) {
	const fullPathUrl = join(process.cwd(), path);
	const fileContent = await readFile(fullPathUrl, { encoding: 'utf8' });
	const cleanedUpContent = fileContent
		.replace(cleanupImportsRegex, '')
		.replace(cleanupNewlineRegex, '\n\n')
		.replace("import './index.js';", "import './index.cjs';");

	await writeFile(fullPathUrl, cleanedUpContent, { encoding: 'utf8' });
	console.log(green(`✅ Cleaned up ${bold(path)}`));
}
