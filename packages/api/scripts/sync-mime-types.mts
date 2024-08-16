import { writeFile } from 'node:fs/promises';

const output = new URL('../src/lib/utils/MimeType.ts', import.meta.url);

const response = await fetch('https://www.iana.org/assignments/media-types/media-types.xml');
const text = await response.text();

const fileTypeTemplateRegex = /<file type="template">(\w+\/.+?)<\/file>/g;
const outputLines = ['export type MimeType ='];

let result: RegExpExecArray | null;
while ((result = fileTypeTemplateRegex.exec(text))) {
	outputLines.push(`\t| '${result[1]}'`);
}

outputLines.push('\t| `X-${string}/${string}`;');
outputLines.push('');

await writeFile(output, outputLines.join('\n'), 'utf8');
console.log(`Successfully written to ${output.href}: ${outputLines.length - 3} mime types total`);
