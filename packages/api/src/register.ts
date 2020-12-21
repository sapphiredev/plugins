import { postInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import { Api } from './lib/Api';

SapphireClient.plugins.registerPostInitializationHook(Api[postInitialization], 'API-PostInitialization');
SapphireClient.plugins.registerPreLoginHook(Api[preLogin], 'API-PreLogin');
