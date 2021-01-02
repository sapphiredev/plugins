import { SubCommandError, SubCommandErrorType } from './SubCommandError';

/**
 * Describes a [[SubCommandErrorType.NotLoaded]] sub command error.
 */
export class SubCommandNotLoadedError extends SubCommandError {
	public readonly commandName: string;

	public readonly parentName: string;

	public constructor(commandName: string, parentName: string) {
		super(SubCommandErrorType.NotLoaded, `The sub command for command ${parentName} with name '${commandName}' is not loaded.`);
		this.commandName = commandName;
		this.parentName = parentName;
	}
}
