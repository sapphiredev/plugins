import { isNullishOrEmpty } from '@sapphire/utilities';
import { splitSetCookieString } from 'cookie-es';
import type { Headers, SpecIterableIterator } from 'undici';
import type { ApiRequest } from '../../structures/api/ApiRequest';
import { NodeUtilInspectSymbol } from '../constants';

export class RequestHeadersProxy implements Headers {
	private readonly request: ApiRequest;

	public constructor(request: ApiRequest) {
		this.request = request;
	}

	public append(name: string, value: string): void {
		const { headers } = this.request;
		const current = headers[name];
		if (current) {
			if (Array.isArray(current)) {
				current.push(value);
			} else {
				headers[name] = [current, value];
			}
		} else {
			headers[name] = value;
		}
	}

	public delete(name: string): void {
		this.request.headers[name] = undefined;
	}

	public get(name: string): string | null {
		return normalizeValue(this.request.headers[name]);
	}

	public has(name: string): boolean {
		return !isNullishOrEmpty(this.request.headers[name]);
	}

	public set(name: string, value: string): void {
		this.request.headers[name] = value;
	}

	public getSetCookie(): string[] {
		const setCookie = this.get('set-cookie');
		return setCookie === null ? [] : splitSetCookieString(setCookie);
	}

	public forEach(callbackfn: (value: string, key: string, iterable: Headers) => void, thisArg?: unknown): void {
		for (const [key, value] of this.entries()) {
			callbackfn.call(thisArg, value, key, this);
		}
	}

	public *keys(): SpecIterableIterator<string> {
		const { headers } = this.request;
		for (const key of Object.keys(headers)) {
			const value = headers[key];

			if (!isNullishOrEmpty(value)) {
				yield key;
			}
		}
	}

	public *values(): SpecIterableIterator<string> {
		const { headers } = this.request;
		for (const key of Object.keys(headers)) {
			const value = headers[key];

			if (!isNullishOrEmpty(value)) {
				yield normalizeValue(value);
			}
		}
	}

	public *entries(): SpecIterableIterator<[string, string]> {
		const { headers } = this.request;
		for (const key of Object.keys(headers)) {
			const value = headers[key];

			if (!isNullishOrEmpty(value)) {
				yield [key, normalizeValue(value)];
			}
		}
	}

	public [Symbol.iterator](): SpecIterableIterator<[string, string]> {
		return this.entries();
	}

	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public get [Symbol.toStringTag]() {
		return 'Headers';
	}

	public [NodeUtilInspectSymbol]() {
		return Object.fromEntries(this.entries());
	}
}

function normalizeValue(value: string | string[] | undefined): string {
	if (Array.isArray(value)) {
		return value.join(', ');
	}

	return String(value ?? '');
}
