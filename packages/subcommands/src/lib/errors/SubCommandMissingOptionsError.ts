import { SubCommandError, SubCommandErrorType } from './SubCommandError';

/**
 * Describes a [[SubCommandErrorType.NotLoaded]] sub command error.
 */
export class SubCommandMissingOptionsError extends SubCommandError {
	public readonly commandName: string;

	public readonly parentName: string;

	public constructor(commandName: string, parentName: string) {
		super(
			SubCommandErrorType.MissingOptions,
			`Missing both options 'method' and 'command' in sub command '${commandName}' of parent '${parentName}'.`
		);
		this.commandName = commandName;
		this.parentName = parentName;
	}
}
