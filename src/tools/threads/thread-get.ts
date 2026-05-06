import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const schema = z.object({
	threadId: positiveInt,
});

export function registerThreadGetTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'thread-get',
		{
			description: 'Получение треда Pachca по идентификатору',
			inputSchema: schema,
		},
		safeTool(async ({ threadId }) => toJsonResult(await client.threads.getThread(threadId))),
	);
}
