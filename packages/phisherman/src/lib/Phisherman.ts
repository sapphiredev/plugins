import fetch, { Headers } from 'node-fetch';
import { fromAsync, isErr } from '@sapphire/framework';

export class Phisherman {
	/**
	 * The options for phisherman
	 */
	public options;
	public constructor(options: PhishermanOptions | undefined) {
		this.options = options;
		void this.checkApiKey(this.options!.apiKey).then((res) => {
			if (res) throw new Error('Invalid API key');
		});
	}

	/**
	 * Check if a link is scam
	 * @param domain The link to check
	 * @since 1.0.0
	 */
	public async check(domain: string) {
		const result = await fromAsync(async () => {
			const check = fetch(`https://api.phisherman.gg/v2/domains/check/${domain}`, {
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.options?.apiKey}`
				})
			}).then((body) => body.json());
			return check as Promise<PhishermanReturnType>;
		});
		return {
			isScam: result.value!.classification === 'safe' ? false : true,
			...result.value
		};
	}

	/**
	 * Report a scam domain to phisherman
	 * @param domain The domain to report
	 * @since 1.0.0
	 */
	public async report(domain: string) {
		const result = await fromAsync(async () => {
			const report = await fetch(`https://api.phisherman.gg/v2/phish/report`, {
				method: 'put',
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.options?.apiKey}`
				}),
				body: JSON.stringify({
					url: domain
				})
			}).then((body) => body.json());
			return report as PhishermanReportType;
		});
		if (isErr(result)) throw result.error;
		return result.value;
	}

	private async checkApiKey(key: string) {
		const result = await fromAsync(async () => {
			const check = fetch(`https://api.phisherman.gg/v2/domains/check/verified.test.phisherman.gg`, {
				headers: new Headers({
					'Content-Type': 'application/json',
					Authorization: `Bearer ${key}`
				})
			}).then((body) => body.json());
			return check as Promise<{ success: boolean; message: string }>;
		});
		return result.value!.message === 'missing permissions or invalid API key';
	}
}

export interface PhishermanOptions {
	apiKey: string;
}

export interface PhishermanReturnType {
	verifiedPhish: boolean;
	classification: 'malicious' | 'suspicious' | 'safe';
}

export type CheckReturnType = PhishermanReturnType & {
	isScam: boolean;
};

export interface PhishermanReportType {
	success: boolean;
	message: string;
}
