import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';

import { registerReactionListTool } from './reaction-list.js';

export function registerReactionTools(server: McpServer, client: PachcaClient): void {
	registerReactionListTool(server, client);
}
