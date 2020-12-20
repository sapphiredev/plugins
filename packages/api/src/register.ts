import { postInitialization, SapphireClient } from '@sapphire/framework';
import { Api } from './lib/Api';

// eslint-disable-next-line @typescript-eslint/unbound-method
SapphireClient.plugins.registerPostInitializationHook(Api[postInitialization]);
