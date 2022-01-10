import { fetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import { container, fromAsync, isErr, isOk } from '@sapphire/framework';
import { PhishermanEvents } from './PhishermanEvents';
import type { PhishermanOptions, PhishermanReportType, PhishermanReturnType } from './PhishermanTypes';

export class Phisherman {
	/**
	 * The options for this Phisherman instance
	 */
	public options: PhishermanOptions;

	/**
	 * Constructs a new instance of {@link Phisherman}
	 * @param options The options for this Phisherman instance
	 */
	public constructor(options: PhishermanOptions) {
		this.options = options;
	}

	/**
	 * Initializes the {@link Phisherman} instance by checking the API key.
	 */
	public async init() {
		container.client.emit(PhishermanEvents.PhishermanApiKeyValidate);

		const checkApiResult = await fromAsync(async () => {
			return fetch<Promise<{ success: boolean; message: string }>>(
				`https://api.phisherman.gg/v2/domains/check/verified.test.phisherman.gg`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${this.options.apiKey}`
					}
				},
				FetchResultTypes.JSON
			);
		});

		if (isErr(checkApiResult) || (isOk(checkApiResult) && checkApiResult.value.message === 'missing permissions or invalid API key')) {
			container.client.emit(PhishermanEvents.PhishermanConnectError, checkApiResult.error);
			throw new Error('[PhishermanPlugin]: Invalid API key provided. Please check `clientOptions.phisherman.apiKey`');
		}
	}

	/**
	 * Checks if a link is detected as a scam or phishing link by phisherman.
	 * @param domain The link to check
	 * @since 1.0.0
	 */
	public async check(domain: string) {
		const result = await fromAsync(async () => {
			container.client.emit(PhishermanEvents.PhishermanRun, domain);

			const result = fetch<PhishermanReturnType>(
				`https://api.phisherman.gg/v2/domains/check/${domain}`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${this.options?.apiKey}`
					}
				},
				FetchResultTypes.JSON
			);

			container.client.emit(PhishermanEvents.PhishermanSuccess, result);

			return result;
		});

		if (isErr(result)) {
			container.client.emit(PhishermanEvents.PhishermanError, result.error, domain);
		}

		container.client.emit(PhishermanEvents.PhishermanFinished, domain);

		return {
			isScam: result.value?.classification === 'safe' ? false : true,
			...result.value
		};
	}

	/**
	 * Report a domain that is confirmed to be a scam or phishing domain to phisherman, to enhance their API.
	 * @param domain The domain to report
	 * @since 1.0.0
	 */
	public async report(domain: string) {
		const result = await fromAsync(async () => {
			return fetch<PhishermanReportType>(
				`https://api.phisherman.gg/v2/phish/report`,
				{
					method: FetchMethods.Put,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${this.options?.apiKey}`
					},
					body: JSON.stringify({
						url: domain
					})
				},
				FetchResultTypes.JSON
			);
		});

		if (isErr(result)) {
			throw result.error;
		}

		return result.value;
	}
}
