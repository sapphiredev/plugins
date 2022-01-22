/**
 * Events emitted during the parsing and command run.
 * You can use these events for debugging and logging purposes.
 */
export enum PatternCommandEvents {
	/**
	 * Event that is emitted when the RNG doesn't love the command
	 * @param message The message where the command was triggered
	 * @param command The command's piece
	 * @param alias The alias that triggered the command
	 */
	CommandNoLuck = 'patternCommandNoLuck',
	/**
	 * Event that is emitted when an alias triggered the command but before parsing the preconditions
	 * @param payload PatternCommandRunPayload which contains message, command and alias
	 */
	PreCommandRun = 'patternCommandPreRun',
	/**
	 * Event that is emitted after the preconditions if none of them denied the command
	 * @param payload PatternCommandAcceptedPayload which contains parameters, context, message, command and alias
	 */
	CommandAccepted = 'patternCommandAccepted',
	/**
	 * Event that is emitted after the preconditions if at least one of them denied the command
	 * @param error The error of the precondition which denied the command
	 * @param payload PatternCommandDeniedPayload which contains parameters, context, message, command and alias
	 */
	CommandDenied = 'patternCommandDenied',
	/**
	 * Event that is emitted just before the command is ran
	 * @param message The message where the command was triggered
	 * @param command The command's piece
	 * @param alias The alias that triggered the command
	 */
	CommandRun = 'patternCommandRun',
	/**
	 * Event that is emitted if there's no error while running the command
	 * @param result The result of command's run
	 * @param command The command's piece
	 * @param alias The alias that triggered the command
	 * @param duration The duration which indicates how long it took the command to run
	 */
	CommandSuccess = 'patternCommandSuccess',
	/**
	 * Event that is emitted if there's an error while running the command
	 * @param error The error message which happened while the command was running
	 * @param command The command's piece
	 * @param payload PatternCommandAcceptedPayload which contains parameters, context, message, command and alias
	 */
	CommandError = 'patternCommandError',
	/**
	 * Event that is emitted if the command has finished, regardless of whether an error occurred or not
	 * @param command The command's piece
	 * @param duration The duration which indicates how long it took the command to run
	 * @param payload PatternCommandAcceptedPayload which contains parameters, context, message, command and alias
	 */
	CommandFinished = 'patternCommandFinished'
}
