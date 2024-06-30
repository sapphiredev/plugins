import { Collection } from 'discord.js';
import type { Route } from '../Route';
import type { MethodName } from '../http/HttpMethods';
import type { RouterBranch } from './RouterBranch';

export class RouterNode {
	/**
	 * The branch containing this node.
	 */
	public readonly parent: RouterBranch;

	/**
	 * The methods this node supports.
	 */
	#methods = new Collection<MethodName, Route>();

	public constructor(parent: RouterBranch) {
		this.parent = parent;
	}

	public get path() {
		return this.parent.path;
	}

	public extractParameters(parts: readonly string[]): Record<string, string> {
		const parameters: Record<string, string> = {};

		let branch: RouterBranch | null = this.parent;
		let index = parts.length - 1;
		do {
			if (branch.dynamic) parameters[branch.name] = parts[index];

			branch = branch.parent;
			--index;
		} while (branch);

		return parameters;
	}

	public get(method: MethodName): Route | null {
		return this.#methods.get(method) ?? null;
	}

	public set(method: MethodName, route: Route): this {
		this.#methods.set(method, route);
		return this;
	}

	public delete(method: MethodName, route: Route): boolean {
		const existing = this.#methods.get(method);
		if (existing === route) {
			this.#methods.delete(method);
			return true;
		}

		return false;
	}

	public methods(): IterableIterator<MethodName> {
		return this.#methods.keys();
	}
}
