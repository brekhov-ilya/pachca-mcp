import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';

import type { Config } from '../../config.js';
import { registerMessageImageGetTool } from './message-image-get.js';
import { registerMessageImagesListTool } from './message-images-list.js';

export function registerImageTools(server: McpServer, client: PachcaClient, config: Config): void {
	registerMessageImagesListTool(server, client);
	registerMessageImageGetTool(server, client, config);
}
