import process from 'node:process';
import * as z from 'zod/v4';

const EnvSchema = z.object({
	TOKEN: z.string().min(1),
	PACHCA_API_URL: z.string().url().optional(),
	PACHCA_IMAGE_MAX_BYTES: z.coerce.number().int().positive().default(5_000_000),
	PACHCA_IMAGE_FETCH_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
});

export type Config = {
	token: string;
	baseUrl?: string;
	imageMaxBytes: number;
	imageFetchTimeoutMs: number;
};

export function loadConfig(env: Record<string, string | undefined> = process.env): Config {
	const result = EnvSchema.safeParse(env);

	if (!result.success) {
		const missingToken = result.error.issues.some(issue => issue.path[0] === 'TOKEN');
		if (missingToken) {
			throw new Error('TOKEN is required');
		}

		const invalidFields = result.error.issues
			.map(issue => issue.path.join('.'))
			.filter(Boolean)
			.join(', ');

		throw new Error(`Invalid environment configuration: ${invalidFields}`);
	}

	return {
		token: result.data.TOKEN,
		baseUrl: result.data.PACHCA_API_URL,
		imageMaxBytes: result.data.PACHCA_IMAGE_MAX_BYTES,
		imageFetchTimeoutMs: result.data.PACHCA_IMAGE_FETCH_TIMEOUT_MS,
	};
}
