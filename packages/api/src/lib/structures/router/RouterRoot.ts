import { isNullishOrEmpty } from '@sapphire/utilities';
import type { Route } from '../Route';
import type { MethodName } from '../http/HttpMethods';
import { RouterBranch } from './RouterBranch';
import type { RouterNode } from './RouterNode';

export class RouterRoot extends RouterBranch {
	public constructor() {
		super('::ROOT::', false, null);
	}

	/**
	 * Adds a route to the branch
	 *
	 * @param route The route to add
	 * @returns The node the route was added to
	 */
	public add(route: Route): RouterNode {
		return this._add(route.path, 0, route);
	}

	/**
	 * Removes a route from the branch
	 *
	 * @param route The route to remove
	 * @returns Whether or not the route was removed
	 */
	public remove(route: Route): boolean {
		return this._remove(route.path, 0, route);
	}

	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public override get path(): string {
		return '';
	}

	public override toString(): string {
		return '';
	}

	public static makeRoutePathForPiece(directories: readonly string[], name: string): string {
		const parts: string[] = [];
		for (const directory of directories) {
			const trimmed = directory.trim();

			// If empty, skip:
			if (isNullishOrEmpty(trimmed)) continue;
			// If it's a group, skip:
			if (trimmed.startsWith('(') && trimmed.endsWith(')')) continue;

			parts.push(trimmed);
		}

		parts.push(name);
		return parts.join('/');
	}

	public static normalize(path: string | null | undefined): string[] {
		const parts = [] as string[];
		if (isNullishOrEmpty(path)) return parts;

		let part = '';
		for (const char of path) {
			if (char === '/') {
				if (part.length) {
					parts.push(part);
					part = '';
				}
			} else {
				part += char;
			}
		}

		if (part.length) {
			parts.push(part);
			part = '';
		}

		return parts;
	}

	public static extractMethod(path: readonly string[]): MethodName | null {
		if (path.length === 0) return null;

		const lastIndex = path.length - 1;
		const last = path[lastIndex];
		const methodIndex = last.lastIndexOf('.');
		if (methodIndex === -1 || methodIndex === last.length - 1) return null;

		return last.slice(methodIndex + 1).toUpperCase() as MethodName;
	}
}
