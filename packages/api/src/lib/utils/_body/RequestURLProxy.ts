import { isNullishOrEmpty } from '@sapphire/utilities';
import type { ApiRequest } from '../../structures/api/ApiRequest';
import { NodeUtilInspectSymbol } from '../constants';

export class RequestURLProxy implements URL {
	public hash: string = '';
	public password: string = '';
	public username: string = '';

	#protocol: URLProtocol | null = null;
	#hostname: string | null = null;
	#port: string | null = null;

	#pathname: string | null = null;
	#search: string | null = null;
	#searchParams: URLSearchParams | null = null;

	readonly #request: ApiRequest;

	public constructor(request: ApiRequest) {
		this.#request = request;
	}

	public get host(): string {
		return this.#request.headers.host ?? '';
	}

	public set host(value: string) {
		this.#hostname = null;
		this.#port = null;
		this.#request.headers.host = value;
	}

	public get hostname(): string {
		if (this.#hostname === null) {
			const [hostname, port] = parseHost(this.#request.headers.host);
			this.#hostname = hostname;
			this.#port = port === -1 ? '' : String(port);
		}

		return this.#hostname;
	}

	public set hostname(value: string) {
		this.#hostname = value;
	}

	public get port(): string {
		if (this.#port === null) {
			const [hostname, port] = parseHost(this.#request.headers.host);
			this.#hostname = hostname;
			this.#port = port === -1 ? String(this.#request.socket.localPort ?? '') : String(port);
		}

		return this.#port;
	}

	public set port(value: string) {
		this.#port = String(Number(value || ''));
	}

	public get pathname(): string {
		if (this.#pathname === null) {
			const [pathname, search] = parsePath(this.#request.url);
			this.#pathname = pathname;
			this.#search ??= search;
		}

		return this.#pathname;
	}

	public set pathname(value: string) {
		const normalized = value.startsWith('/') ? value : `/${value}`;
		if (normalized === this.#pathname) return;

		this.#pathname = normalized;
		this.#request.url = normalized + this.search;
	}

	public get search(): string {
		if (this.#search === null) {
			const [pathname, search] = parsePath(this.#request.url);
			this.#pathname ??= pathname;
			this.#search = search;
		}

		return this.#search;
	}

	public set search(value: string) {
		let normalized: string;
		if (value === '?') {
			normalized = '';
		} else if (value && !value.startsWith('?')) {
			normalized = `?${value}`;
		} else {
			normalized = value;
		}

		if (normalized === this.#search) return;

		this.#search = normalized;
		this.#searchParams = null;
		this.#request.url = this.pathname + normalized;
	}

	public get searchParams(): URLSearchParams {
		this.#searchParams ??= new URLSearchParams(this.search);
		return this.#searchParams;
	}

	public set searchParams(value: URLSearchParams) {
		this.#searchParams = value;
		this.search = value.toString();
	}

	public get protocol(): URLProtocol {
		this.#protocol ??= (this.#request.socket as any).encrypted || this.#request.headers['x-forwarded-proto'] === 'https' ? 'https:' : 'http:';
		return this.#protocol;
	}

	public set protocol(value: URLProtocol) {
		this.#protocol = value;
	}

	public get origin(): string {
		return `${this.protocol}//${this.host}`;
	}

	public set origin(_value: string) {
		// No-op
	}

	public get href(): string {
		return `${this.protocol}//${this.host}${this.pathname}${this.search}`;
	}

	public set href(value: string) {
		const url = new URL(value);
		this.#protocol = url.protocol as URLProtocol;
		this.username = url.username;
		this.password = url.password;
		this.#hostname = url.hostname;
		this.#port = url.port;
		this.#pathname = url.pathname;
		this.#search = url.search;
		this.hash = url.hash;
	}

	public toString(): string {
		return this.href;
	}

	public toJSON(): string {
		return this.href;
	}

	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public get [Symbol.toStringTag]() {
		return 'URL';
	}

	public [NodeUtilInspectSymbol]() {
		return this.href;
	}
}

export type URLProtocol = 'https:' | 'http:';

function parsePath(input: string | undefined): [pathname: string, search: string] {
	const url = (input ?? '/').replaceAll('\\', '/');
	const index = url.indexOf('?');
	if (index === -1) {
		return [url, ''];
	}

	return [url.slice(0, index), url.slice(index)];
}

function parseHost(host: string | undefined): [hostname: string, port: number] {
	if (isNullishOrEmpty(host)) {
		return ['localhost', -1];
	}

	const index = host.indexOf(':');
	if (index === -1) {
		return [host, -1];
	}

	const port = Number(host.slice(index));
	return [host.slice(0, index), Number.isSafeInteger(port) ? port : -1];
}
