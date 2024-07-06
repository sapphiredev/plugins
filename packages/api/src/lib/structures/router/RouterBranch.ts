import { isNullish } from '@sapphire/utilities';
import type { Route } from '../Route';
import { RouterNode } from './RouterNode';

export class RouterBranch {
	/**
	 * The name of the branch.
	 */
	public readonly name: string;

	/**
	 * Whether or not the branch is dynamic.
	 */
	public readonly dynamic: boolean;

	/**
	 * The parent branch, if any.
	 */
	public readonly parent: RouterBranch | null;

	/**
	 * The node this branch is associated with.
	 */
	public readonly node = new RouterNode(this);

	/**
	 * The methods supported by the branch's node or any of its children.
	 */
	public supportedMethods: readonly string[] = [];

	private _staticChildren: RouterBranch[] = [];
	private _dynamicChild: RouterBranch | null = null;

	public constructor(name: string, dynamic: boolean, parent: RouterBranch | null) {
		this.name = name;
		this.dynamic = dynamic;
		this.parent = parent;
	}

	/**
	 * The path representing this branch
	 * @version 7.0.0
	 */
	public get path(): string {
		return this.parent ? `${this.parent}/${this}` : `${this}`;
	}

	/**
	 * The branches the branch is associated with
	 * @version 7.0.0
	 */
	public get children(): RouterBranch[] {
		return this._staticChildren.concat(this._dynamicChild ?? []);
	}

	/**
	 * Whether or not the branch is empty
	 * @version 7.0.0
	 */
	public get empty(): boolean {
		return this._staticChildren.length === 0 && this._dynamicChild === null;
	}

	/**
	 * Tries to find a branch given a path
	 * @version 7.0.0
	 *
	 * @param parts The parts of a path to find a node from
	 * @returns The branch found, or null if not found
	 */
	public find(parts: readonly string[]): RouterBranch | null {
		return this._find(parts, 0);
	}

	/**
	 * Checks if the given name matches the branch
	 * @version 7.0.0
	 *
	 * @param name The name to match
	 * @returns Whether or not the branch matches the name
	 */
	public matches(name: string): boolean {
		return this.dynamic || this.name === name;
	}

	/**
	 * Returns the string representation of the branch
	 * @version 7.0.0
	 *
	 * @returns The string representation of the branch
	 */
	public toString(): string {
		return this.dynamic ? `[${this.name}]` : this.name;
	}

	public *nodes(): IterableIterator<RouterNode> {
		yield this.node;
		for (const child of this._staticChildren) {
			yield* child.nodes();
		}

		if (this._dynamicChild) {
			yield* this._dynamicChild.nodes();
		}
	}

	protected _add(parts: readonly string[], index: number, route: Route): RouterNode {
		const result = this._performAdd(parts, index, route);
		this._updateSupportedChildrenMethods();
		return result;
	}

	protected _remove(parts: readonly string[], index: number, route: Route): boolean {
		const result = this._performRemove(parts, index, route);
		if (result) this._updateSupportedChildrenMethods();
		return result;
	}

	protected _performAdd(parts: readonly string[], index: number, route: Route): RouterNode {
		if (index >= parts.length) {
			for (const method of route.methods) {
				this.node.set(method, route);
			}

			return this.node;
		}

		const part = parts[index];
		const child = this._staticChildren.find((branch) => branch.matches(part));
		if (child) {
			return child._add(parts, index + 1, route);
		}

		if (this._dynamicChild) {
			return this._dynamicChild._add(parts, index + 1, route);
		}

		const dynamic = part.startsWith('[') && part.endsWith(']');
		let branch: RouterBranch;
		if (dynamic) {
			branch = new RouterBranch(part.slice(1, -1), true, this);
			this._dynamicChild = branch;
		} else {
			branch = new RouterBranch(part, false, this);
			this._staticChildren.push(branch);
		}

		return branch._add(parts, index + 1, route);
	}

	protected _performRemove(parts: readonly string[], index: number, route: Route): boolean {
		if (index >= parts.length) {
			let success = false;
			for (const method of route.methods) {
				if (this.node.delete(method, route)) {
					success = true;
				}
			}

			return success;
		}

		const part = parts[index];
		const staticChildIndex = this._staticChildren.findIndex((branch) => branch.matches(part));
		if (staticChildIndex === -1) {
			const child = this._staticChildren[index];
			const removed = child._remove(parts, index + 1, route);
			if (removed && child.empty) {
				this._staticChildren = this._staticChildren.filter((branch) => branch !== child);
			}

			return removed;
		}

		if (this._dynamicChild) {
			const removed = this._dynamicChild._remove(parts, index + 1, route);
			if (removed && this._dynamicChild.empty) {
				this._dynamicChild = null;
			}

			return removed;
		}

		return false;
	}

	protected _find(parts: readonly string[], index: number): RouterBranch | null {
		if (index >= parts.length) return this;

		const part = parts[index];
		const child = this._staticChildren.find((branch) => branch.matches(part)) ?? this._dynamicChild;

		// If a child is not found, return null:
		if (isNullish(child)) return null;

		// Continue the search:
		return child._find(parts, index + 1);
	}

	protected _updateSupportedChildrenMethods(): void {
		const methods = new Set(this.node.methods());
		for (const child of this.children) {
			for (const method of child.node.methods()) {
				methods.add(method);
			}
		}

		this.supportedMethods = [...methods];
	}
}
