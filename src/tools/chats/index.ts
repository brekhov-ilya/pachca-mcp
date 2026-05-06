import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';

import { registerChatCreateTool } from './chat-create.js';
import { registerChatGetTool } from './chat-get.js';
import { registerChatListTool } from './chat-list.js';
import { registerChatMembersAddTool } from './chat-members-add.js';
import { registerChatMembersListTool } from './chat-members-list.js';

export function registerChatTools(server: McpServer, client: PachcaClient): void {
	registerChatListTool(server, client);
	registerChatGetTool(server, client);
	registerChatCreateTool(server, client);
	registerChatMembersListTool(server, client);
	registerChatMembersAddTool(server, client);
}
