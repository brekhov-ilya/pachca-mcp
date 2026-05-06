import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const schema = z.object({
	messageId: positiveInt,
});

export function registerMessageGetTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'message-get',
		{
			description: 'Получение сообщения Pachca по идентификатору',
			inputSchema: schema,
		},
		safeTool(async ({ messageId }) => toJsonResult(await client.messages.getMessage(messageId))),
	);
}
