const [slash, colon]: [number, number] = [47, 58];

/**
 * @since 1.0.0
 */
export const enum TypeState {
	/**
	 * @since 1.0.0
	 */
	Static = 0,

	/**
	 * @since 1.0.0
	 */
	Dynamic = 1
}

/**
 * @since 1.0.0
 */
export type ParsedPart = [string, TypeState];

/**
 * @since 1.0.0
 */
export function parsePart(value: string): ParsedPart {
	const type = value.charCodeAt(0) === colon ? TypeState.Static : TypeState.Dynamic;
	if (type) value = value.substring(1);
	return [value, type];
}

/**
 * @since 1.0.0
 */
export function split(url: string): string[] {
	if (url.length === 1 && url.charCodeAt(0) === slash) return [url];
	else if (url.charCodeAt(0) === slash) url = url.substring(1);
	return url.split('/');
}

/**
 * @since 1.0.0
 */
export function parse(url: string): ParsedPart[] {
	return split(url).map(parsePart);
}
