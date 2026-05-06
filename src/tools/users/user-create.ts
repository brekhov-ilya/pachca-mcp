import type { McpServer } from '@modelcontextprotocol/server';
import type { PachcaClient } from '@pachca/sdk';
import { UserRoleInput } from '@pachca/sdk';
import * as z from 'zod/v4';

import { toJsonResult } from '../../mcpResponse.js';
import { positiveInt, safeTool } from '../common.js';

const customProperty = z.object({
	id: positiveInt,
	value: z.string(),
});

const schema = z.object({
	email: z.string().email(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	phoneNumber: z.string().optional(),
	nickname: z.string().optional(),
	department: z.string().optional(),
	title: z.string().optional(),
	role: z.enum(UserRoleInput).optional(),
	suspended: z.boolean().optional(),
	listTags: z.array(z.string()).optional(),
	customProperties: z.array(customProperty).optional(),
	skipEmailNotify: z.boolean().optional(),
});

export function registerUserCreateTool(server: McpServer, client: PachcaClient): void {
	server.registerTool(
		'user-create',
		{
			description: 'Создание нового пользователя Pachca',
			inputSchema: schema,
		},
		safeTool(async ({ skipEmailNotify, ...user }) =>
			toJsonResult(await client.users.createUser({ user, skipEmailNotify })),
		),
	);
}
