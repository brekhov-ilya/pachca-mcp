import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { safeTool } from '../common.js';

const schema = z.object({});

export function registerUserProfileGetTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'user-profile-get',
		{
			description: 'Получение профиля текущего пользователя/бота Pachca',
			inputSchema: schema,
		},
		safeTool(async () => toJsonResult(await client.profile.getProfile())),
	);
}
