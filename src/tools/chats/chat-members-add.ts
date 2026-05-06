import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const schema = z.object({
	chatId: positiveInt,
	memberIds: z.array(positiveInt).min(1),
	silent: z.boolean().optional(),
});

export function registerChatMembersAddTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'chat-members-add',
		{
			description: 'Добавление участников в чат Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ chatId, memberIds, silent }) => {
			await client.members.addMembers(chatId, { memberIds, silent });
			return toJsonResult({ chatId, addedMemberIds: memberIds, silent: silent ?? false });
		}),
	);
}
