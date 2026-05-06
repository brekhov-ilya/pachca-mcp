import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';
import { getImageFiles } from './image-utils.js';

const schema = z.object({
	messageId: positiveInt,
});

export function registerMessageImagesListTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'message-images-list',
		{
			description: 'Получение изображений из сообщения Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ messageId }) => {
			const message = await client.messages.getMessage(messageId);
			return toJsonResult({
				messageId,
				images: getImageFiles(message.files),
			});
		}),
	);
}
