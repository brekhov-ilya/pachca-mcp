import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';

import type { Config } from '../config.js';
import { registerChatTools } from './chats/index.js';
import { registerImageTools } from './images/index.js';
import { registerMessageTools } from './messages/index.js';
import { registerReactionTools } from './reactions/index.js';
import { registerSearchTools } from './search/index.js';
import { registerThreadTools } from './threads/index.js';
import { registerUserTools } from './users/index.js';

export function registerPachcaTools(server: McpServer, client: PachcaClient, config: Config): void {
	registerChatTools(server, client);
	registerUserTools(server, client);
	registerThreadTools(server, client);
	registerSearchTools(server, client);
	registerMessageTools(server, client);
	registerReactionTools(server, client);
	registerImageTools(server, client, config);
}
