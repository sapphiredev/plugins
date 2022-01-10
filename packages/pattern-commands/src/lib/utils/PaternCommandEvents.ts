/**
 * Events emitted during the parsing and command run.
 * You can use these events for debugging and loging purposes.
 */
export enum PatternCommandEvents {
	/**
	 * Event that is emmitted when the RNG doesn't love the command
	 * @param message The message where the command was triggered
	 * @param command The command's piece
	 * @param alias The alias what triggered the command
	 */
	CommandNoLuck = 'patternCommandNoLuck',
	/**
	 * Event that is emmitted when an alias triggered the command but before parsing the preconditions
	 * @param payload PatternCommandRunPayload what contains message, command and alias
	 */
	PreCommandRun = 'patternCommandPreRun',
	/**
	 * Event that is emmitted after the preconditions if none of them catched the command
	 * @param payload PatternCommandAcceptedPayload what contains parameters, context, message, command and alias
	 */
	CommandAccepted = 'patternCommandAccepted',
	/**
	 * Event that is emmitted after the preconditions if at least one of them catched the command
	 * @param error The error of the precondition what cached the command
	 * @param payload PatternCommandDeniedPayload what contains parameters, context, message, command and alias
	 */
	CommandDenied = 'patternCommandDenied',
	/**
	 * Event that is emmitted just before the command run
	 * @param message The message where the command was triggered
	 * @param command The command's piece
	 * @param alias The alias what triggered the command
	 */
	CommandRun = 'patternCommandRun',
	/**
	 * Event that is emmitted if there's no error while running the command
	 * @param result The result of command's run
	 * @param command The command's piece
	 * @param alias The alias what triggered
	 */
	CommandSuccess = 'patternCommandSuccess',
	/**
	 * Event that is emmitted if there's an error while running the command
	 * @param error The error message what happened while the command was running
	 * @param command The command's piece
	 * @param duration The duration what indicates how long running the command took
	 * @param payload PatternCommandAcceptedPayload what contains parameters, context, message, command and alias
	 */
	CommandError = 'patternCommandError',
	/**
	 * Event that is emmitted if the command is finished (whether is there an error or not)
	 * @param command The command's piece
	 * @param duration The duration what indicates how long running the command took
	 * @param payload PatternCommandAcceptedPayload what contains parameters, context, message, command and alias
	 */
	CommandFinished = 'patternCommandFinished'
}
