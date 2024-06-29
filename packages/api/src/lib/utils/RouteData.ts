/**
 * @since 1.0.0
 */
export enum TypeState {
	/**
	 * @since 1.0.0
	 */
	Static,

	/**
	 * @since 1.0.0
	 */
	Dynamic
}

export type MatchData = Record<string, string> | null;

export class RouteData {
	public readonly path: string;
	private readonly static: boolean;
	private readonly parts: readonly ParsedPart[];

	public constructor(path: string) {
		this.path = path;
		this.parts = RouteData.split(path).map((value) => RouteData.parsePart(value));
		this.static = this.parts.every((part) => part.type === TypeState.Static);
	}

	public match(split: readonly string[]): MatchData {
		if (split.length !== this.parts.length) return null;
		if (this.static) return this.parts.every((part, index) => part.value === split[index]) ? {} : null;

		const parameters: [string, string][] = [];
		for (let i = 0; i < this.parts.length; ++i) {
			const part = this.parts[i];
			const value = split[i];

			if (part.type === TypeState.Static) {
				if (part.value === value) continue;
				return null;
			}

			parameters.push([part.value, value]);
		}

		return Object.fromEntries(parameters);
	}

	/**
	 * @since 1.0.0
	 */
	private static parsePart(value: string): ParsedPart {
		const type = value.length > 2 && value.at(0) === '[' && value.at(-1) === ']' ? TypeState.Dynamic : TypeState.Static;
		if (type === TypeState.Dynamic) value = value.slice(1, -1);
		return { value, type };
	}

	/**
	 * @since 1.0.0
	 */
	private static split(url: string): string[] {
		if (url.length === 1 && url.at(0) === '/') return [''];
		if (url.at(0) === '/') url = url.slice(1);
		if (url.length > 0 && url.at(-1) === '/') url = url.slice(0, -1);
		return url.split('/');
	}
}

export interface ParsedPart {
	value: string;
	type: TypeState;
}
