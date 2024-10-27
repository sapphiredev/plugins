import { isNullish, isNullishOrEmpty } from '@sapphire/utilities';
import { Blob } from 'node:buffer';
import { arrayBuffer } from 'node:stream/consumers';
import { ReadableStream } from 'node:stream/web';
import type {
	FormData,
	Headers,
	ReferrerPolicy,
	Request,
	RequestCache,
	RequestCredentials,
	RequestDestination,
	RequestMode,
	RequestRedirect
} from 'undici';
import type { ApiRequest } from '../../structures/api/ApiRequest';
import type { MethodName } from '../../structures/http/HttpMethods';
import { RequestHeadersProxy } from './RequestHeadersProxy';
import { RequestURLProxy } from './RequestURLProxy';

export class RequestProxy implements Request {
	public cache: RequestCache = 'default';
	public credentials: RequestCredentials = 'same-origin';
	public destination: RequestDestination = '';
	public integrity: string = '';
	public keepalive: boolean = false;

	public mode: RequestMode = 'cors';
	public redirect: RequestRedirect = 'follow';
	public referrer: string = 'about:client';
	public referrerPolicy: ReferrerPolicy = '';

	public headers: Headers;

	public bodyUsed: boolean = false;
	public duplex = 'half' as const;

	readonly #request: ApiRequest;
	readonly #url: RequestURLProxy;
	#cachedMethod: MethodName | null = null;
	#cachedHasBody: boolean | null = null;
	#abortController: AbortController | null = null;
	#bodyStream: ReadableStream<Uint8Array> | null = null;

	public constructor(request: ApiRequest) {
		this.#request = request;
		this.#url = new RequestURLProxy(request);
		this.headers = new RequestHeadersProxy(request);
	}

	public get url(): string {
		return this.#url.href;
	}

	public get method(): MethodName {
		this.#cachedMethod ??= (this.#request.method?.toUpperCase() ?? 'GET') as MethodName;
		return this.#cachedMethod;
	}

	public get signal(): AbortSignal {
		this.#abortController ??= new AbortController();
		return this.#abortController.signal;
	}

	public get body(): ReadableStream<Uint8Array> | null {
		if (!this.hasBody) return null;

		this.#bodyStream ??= new ReadableStream<Uint8Array>({
			start: (controller) => {
				this.#request
					.on('data', (chunk) => controller.enqueue(chunk))
					.once('error', (error) => {
						controller.error(error);
						this.#abortController?.abort();
					})
					.once('close', () => {
						this.#abortController?.abort();
					})
					.once('end', () => {
						controller.close();
					});
			}
		});

		return this.#bodyStream;
	}

	public async arrayBuffer(): Promise<ArrayBuffer> {
		const { body } = this;
		return isNullish(body) ? new ArrayBuffer(0) : arrayBuffer(body);
	}

	public async blob(): Promise<Blob> {
		const arrayBuffer = await this.arrayBuffer();
		return new Blob([arrayBuffer], {
			type: this.headers.get('content-type') ?? ''
		});
	}

	public async formData(): Promise<FormData> {
		return new Response(this.body, { headers: this.headers }).formData(); // NOSONAR
	}

	public async json(): Promise<unknown> {
		return JSON.parse(await this.text());
	}

	public async text(): Promise<string> {
		return new TextDecoder().decode(await this.arrayBuffer());
	}

	public clone(): Request {
		return new RequestProxy(this.#request);
	}

	private get hasBody(): boolean {
		if (this.#cachedHasBody !== null) return this.#cachedHasBody;

		const contentLengthString = this.headers.get('content-length');
		const contentLength = isNullishOrEmpty(contentLengthString) ? 0 : Number(contentLengthString);
		if (Number.isSafeInteger(contentLength) && contentLength > 0) {
			this.#cachedHasBody = true;
			return true;
		}

		const transferEncoding = this.headers.get('transfer-encoding');
		if (transferEncoding?.includes('chunked')) {
			this.#cachedHasBody = true;
			return true;
		}

		this.#cachedHasBody = false;
		return false;
	}
}
