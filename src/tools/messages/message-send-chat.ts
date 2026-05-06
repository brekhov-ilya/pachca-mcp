import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import { MessageEntityType } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const schema = z.object({
	chatId: positiveInt,
	content: z.string().min(1),
	linkPreview: z.boolean().optional(),
	parentMessageId: positiveInt.optional(),
	skipInviteMentions: z.boolean().optional(),
	displayName: z.string().optional(),
	displayAvatarUrl: z.string().url().optional(),
});

export function registerMessageSendChatTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'message-send-chat',
		{
			description: 'Отправка сообщения в чат или канал Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ chatId, content, linkPreview, parentMessageId, skipInviteMentions, displayName, displayAvatarUrl }) =>
			toJsonResult(
				await client.messages.createMessage({
					message: {
						entityType: MessageEntityType.Discussion,
						entityId: chatId,
						content,
						parentMessageId,
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
