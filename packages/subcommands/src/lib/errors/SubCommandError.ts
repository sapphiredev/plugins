export const enum SubCommandErrorType {
	'NotLoaded' = 'NOT_LOADED',
	'MissingOptions' = 'MISSING_OPTIONS'
}

/**
 * The SubCommandError class to be emitted in the pieces.
 * @property name This will be `'SubCommandError'` and can be used to distinguish the type of error when any error gets thrown
 */
export class SubCommandError extends Error {
	/**
	 * The type of the error that was thrown.
	 */
	public readonly type: SubCommandErrorType;

	/**
	 * Constructs an SubCommandError.
	 * @param type The identifier, useful to localize emitted errors.
	 * @param message The error message.
	 */
	public constructor(type: SubCommandErrorType, message: string) {
		super(message);
		this.type = type;
	}

	public get name() {
		return `${super.name} [${this.type}]`;
	}
}
