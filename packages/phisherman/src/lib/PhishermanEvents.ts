/**
 * Events emitted during the process setting up the phisherman plugin and running a link check.
 * You can use these events to trace the progress for debugging purposes.
 */
export enum PhishermanEvents {
	/** Event that is emitted before the API key is validated */
	PhishermanApiKeyValidate = 'phishermanApiKeyValidate',
	/**
	 * Event that is emitted before a link is checked
	 * @param domain The domain that is about to be checked
	 */
	PhishermanRun = 'phishermanRun',
	/**
	 * Event that is emitted when a link check throws an error
	 * @param error The first parameter of this event is the error that was thrown
	 * @param domain The domain that is about to be checked
	 */
	PhishermanError = 'phishermanError',
	/**
	 * Event that is emitted when a link check is successful
	 * @param result The result of the check.
	 */
	PhishermanSuccess = 'phishermanSuccess',
	/** Event that is emitted when a a link check finishes, regardless of whether an error occurred or not */
	PhishermanFinished = 'phishermanFinished',
	/**
	 * Event that is emitted when the Phisherman integration fails to validate the phisherman API connection.
	 * @param error The first parameter of this event is the error that was thrown
	 */
	PhishermanConnectError = 'phishermanConnectError'
}
