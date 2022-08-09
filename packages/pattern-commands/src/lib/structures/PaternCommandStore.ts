import { AliasStore } from '@sapphire/pieces';
import { PatternCommand } from './PatternCommand';

export class PatternCommandStore extends AliasStore<PatternCommand> {
	public constructor() {
		super(PatternCommand, { name: 'pattern-commands' });
	}
}
