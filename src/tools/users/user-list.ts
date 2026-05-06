import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { cursor, limit, safeTool } from '../common.js';

const schema = z.object({
	query: z.string().optional(),
	limit,
	cursor,
});

export function registerUserListTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'user-list',
		{
			description: 'Получение списка пользователей Pachca',
			inputSchema: schema,
		},
		safeTool(async args => toJsonResult(await client.users.listUsers(args))),
	);
}
