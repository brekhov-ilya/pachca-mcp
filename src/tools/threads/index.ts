import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';

import { registerThreadCreateTool } from './thread-create.js';
import { registerThreadGetTool } from './thread-get.js';

export function registerThreadTools(server: McpServer, client: PachcaClient): void {
	registerThreadGetTool(server, client);
	registerThreadCreateTool(server, client);
}
