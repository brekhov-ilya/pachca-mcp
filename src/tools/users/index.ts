import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';

import { registerUserCreateTool } from './user-create.js';
import { registerUserGetTool } from './user-get.js';
import { registerUserListTool } from './user-list.js';
import { registerUserProfileGetTool } from './user-profile-get.js';

export function registerUserTools(server: McpServer, client: PachcaClient): void {
	registerUserListTool(server, client);
	registerUserGetTool(server, client);
	registerUserProfileGetTool(server, client);
	registerUserCreateTool(server, client);
}
