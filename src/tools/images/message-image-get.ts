import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import * as z from 'zod/v4';

import type { Config } from '../../config.js';
import { toErrorResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';
import { fetchImage, getImageFiles } from './image-utils.js';

const schema = z
	.object({
		messageId: positiveInt,
		fileId: positiveInt.optional(),
		key: z.string().min(1).optional(),
	})
	.refine(args => args.fileId !== undefined || args.key !== undefined, {
		message: 'Either fileId or key is required',
	});

export function registerMessageImageGetTool(server: McpServer, client: PachcaClient, config: Config): void {
	server.registerTool(
		'message-image-get',
		{
			description: 'Получение изображения из сообщения Pachca как MCP image content',
			inputSchema: schema,
		},
		safeTool(async ({ messageId, fileId, key }) => {
			const message = await client.messages.getMessage(messageId);
			const file = getImageFiles(message.files).find(image => image.id === fileId || image.key === key);

			if (!file) {
				return toErrorResult('Selected file was not found or is not an image');
			}

			return await fetchImage(file, config);
		}),
	);
}
