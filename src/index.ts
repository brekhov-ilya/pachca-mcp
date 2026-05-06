#!/usr/bin/env node
import process from 'node:process';
import { McpServer, StdioServerTransport } from '@modelcontextprotocol/server';

import { loadConfig } from './config.js';
import { createPachcaClient } from './pachcaClient.js';
import { registerPachcaTools } from './tools/index.js';

async function main() {
	const config = loadConfig();
	const client = createPachcaClient(config);
	const server = new McpServer({
		name: 'pachca-mcp',
		version: '0.1.0',
	});

	registerPachcaTools(server, client, config);

	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch(error => {
	const message = error instanceof Error ? error.message : 'Server bootstrap failed';
	console.error(message);
	process.exit(1);
});
