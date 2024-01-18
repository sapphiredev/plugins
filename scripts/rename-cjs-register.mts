import { bold, green } from 'colorette';
import { rename } from 'node:fs/promises';
import { join } from 'node:path';

const inputPath = 'dist/cjs/register.d.ts';
const outputPath = 'dist/cjs/register.d.cts';

const fullInputPathUrl = join(process.cwd(), inputPath);
const fullOutputPathUrl = join(process.cwd(), outputPath);

await rename(fullInputPathUrl, fullOutputPathUrl);
console.log(green(`✅ Renamed ${bold(inputPath)} to ${bold(outputPath)}`));
