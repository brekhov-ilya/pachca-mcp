import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';

import { registerChatSearchTool } from './chat-search.js';
import { registerMessageSearchTool } from './message-search.js';
import { registerUserSearchTool } from './user-search.js';

export function registerSearchTools(server: McpServer, client: PachcaClient): void {
	registerUserSearchTool(server, client);
	registerChatSearchTool(server, client);
	registerMessageSearchTool(server, client);
}
