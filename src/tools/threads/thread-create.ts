import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const schema = z.object({
	messageId: positiveInt,
});

export function registerThreadCreateTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'thread-create',
		{
			description: 'Создание треда у сообщения Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ messageId }) => toJsonResult(await client.threads.createThread(messageId))),
	);
}
