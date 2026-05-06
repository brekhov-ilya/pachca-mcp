import { PachcaClient } from '@pachca/sdk';

import type { Config } from './config.js';

export function createPachcaClient(config: Config): PachcaClient {
	if (!config.token) {
		throw new Error('TOKEN is required');
	}

	return new PachcaClient({
		headers: {
			Authorization: `Bearer ${config.token}`,
		},
		baseUrl: config.baseUrl,
	});
}
