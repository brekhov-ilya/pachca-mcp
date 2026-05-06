import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const schema = z.object({
	userId: positiveInt,
});

export function registerUserGetTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'user-get',
		{
			description: 'Получение пользователя Pachca по идентификатору',
			inputSchema: schema,
		},
		safeTool(async ({ userId }) => toJsonResult(await client.users.getUser(userId))),
	);
}
