import type { CallToolResult } from '@modelcontextprotocol/server';

type ImageResultParams = {
	data: string;
	mimeType: string;
	metadata: Record<string, unknown>;
};

export function toJsonResult<T>(data: T): CallToolResult {
	return {
		content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
		structuredContent: data as Record<string, unknown>,
	};
}

export function toErrorResult(message: string, details?: unknown): CallToolResult {
	const safeMessage = redactSecrets(message);

	return {
		isError: true,
		content: [
			{
				type: 'text',
				text: details === undefined ? safeMessage : `${safeMessage}\n${JSON.stringify(redactDetails(details), null, 2)}`,
			},
		],
	};
}

export function toImageResult({ data, mimeType, metadata }: ImageResultParams): CallToolResult {
	return {
		content: [
			{ type: 'image', data, mimeType },
			{ type: 'text', text: JSON.stringify(metadata, null, 2) },
		],
		structuredContent: metadata,
	};
}

export function redactSecrets(value: string): string {
	return value
		.replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/gi, 'Bearer [REDACTED]')
		.replace(/(Authorization\s*[:=]\s*)[^\s,;]+/gi, '$1[REDACTED]')
		.replace(/(TOKEN\s*[:=]\s*)[^\s,;]+/gi, '$1[REDACTED]');
}

function redactDetails(details: unknown): unknown {
	if (typeof details === 'string') {
		return redactSecrets(details);
	}

	if (details === null || typeof details !== 'object') {
		return details;
	}

	if (Array.isArray(details)) {
		return details.map(redactDetails);
	}

	return Object.fromEntries(
		Object.entries(details).map(([key, value]) => {
			if (/token|authorization/i.test(key)) {
				return [key, '[REDACTED]'];
			}

			return [key, redactDetails(value)];
		}),
	);
}
