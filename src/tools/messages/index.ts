import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';

import { registerMessageGetTool } from './message-get.js';
import { registerMessageListTool } from './message-list.js';
import { registerMessageSendChatTool } from './message-send-chat.js';
import { registerMessageSendPersonalTool } from './message-send-personal.js';

export function registerMessageTools(server: McpServer, client: PachcaClient): void {
	registerMessageSendChatTool(server, client);
	registerMessageSendPersonalTool(server, client);
	registerMessageListTool(server, client);
	registerMessageGetTool(server, client);
}
