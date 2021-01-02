import { Args, Command as BaseCommand, CommandOptions } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/pieces';
import type { SubCommandOptionsResolvable } from '../utils/SubCommandsHandler';

export abstract class Command<T = Args> extends BaseCommand<T> {
	/**
	 * Sub commands which this command have.
	 * @since 1.0.0
	 */
	public subCommands: SubCommandOptionsResolvable[];

	/**
	 * If this command is a sub command for at least one other command
	 * @since 1.0.0
	 */
	public isSubCommand: boolean;

	/**
	 * @since 1.0.0
	 * @param context The context.
	 * @param options Optional Command settings.
	 */
	protected constructor(context: PieceContext, { name, ...options }: CommandOptions = {}) {
		const pieceName = (name ?? context.name).toLowerCase();
		super(context, { ...options, name: pieceName });
		const subCommands = options.subCommands ?? [];
		this.subCommands = Array.isArray(subCommands) ? subCommands : [subCommands];
		this.isSubCommand = false;
	}
}
