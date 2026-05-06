import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import { MessageEntityType } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const schema = z.object({
	userId: positiveInt,
	content: z.string().min(1),
	linkPreview: z.boolean().optional(),
	skipInviteMentions: z.boolean().optional(),
	displayName: z.string().optional(),
	displayAvatarUrl: z.string().url().optional(),
});

export function registerMessageSendPersonalTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'message-send-personal',
		{
			description: 'Отправка личного сообщения пользователю Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ userId, content, linkPreview, skipInviteMentions, displayName, displayAvatarUrl }) =>
			toJsonResult(
				await client.messages.createMessage({
					message: {
						entityType: MessageEntityType.User,
						entityId: userId,
						content,
						skipInviteMentions,
						displayName,
						displayAvatarUrl,
					},
					linkPreview,
				}),
			),
		),
	);
}
