import type { CallToolResult } from '@modelcontextprotocol/server';
import { FileType } from '@pachca/sdk';

import type { Config } from '../../config.js';
import { toErrorResult, toImageResult, toJsonResult } from '../../mcpResponse.js';

export type ImageFile = {
	id: number;
	key: string;
	name: string;
	fileType: FileType;
	url: string;
	width?: number | null;
	height?: number | null;
};

type SourceFile = {
	fileType: FileType;
	id: number;
	key: string;
	name: string;
	url: string;
	width?: number | null;
	height?: number | null;
};

export function getImageFiles(files: SourceFile[]): ImageFile[] {
	return files
		.filter(file => file.fileType === FileType.Image)
		.map(({ id, key, name, fileType, url, width, height }) => ({ id, key, name, fileType, url, width, height }));
}

export function imageMetadata(file: ImageFile) {
	return {
		id: file.id,
		key: file.key,
		name: file.name,
		fileType: file.fileType,
		url: file.url,
		width: file.width,
		height: file.height,
	};
}

export function getMimeType(contentType: string | null, filename: string): string {
	const mimeType = contentType?.split(';')[0]?.trim();
	if (mimeType) {
		return mimeType;
	}

	const extension = filename.split('.').pop()?.toLowerCase();
	switch (extension) {
		case 'jpg':
		case 'jpeg':
			return 'image/jpeg';
		case 'png':
			return 'image/png';
		case 'gif':
			return 'image/gif';
		case 'webp':
			return 'image/webp';
		case 'svg':
			return 'image/svg+xml';
		default:
			return 'application/octet-stream';
	}
}

export async function fetchImage(file: ImageFile, config: Config, withAuthorization = false): Promise<CallToolResult> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), config.imageFetchTimeoutMs);

	try {
		const response = await fetch(file.url, {
			signal: controller.signal,
			headers: withAuthorization
				? {
						Authorization: `Bearer ${config.token}`,
					}
				: undefined,
		});

		if ((response.status === 401 || response.status === 403) && !withAuthorization) {
			return await fetchImage(file, config, true);
		}

		if (!response.ok) {
			return toErrorResult(`Image fetch failed with status ${response.status}`, imageMetadata(file));
		}

		const contentLength = response.headers.get('content-length');
		if (contentLength && Number(contentLength) > config.imageMaxBytes) {
			return toJsonResult({
				...imageMetadata(file),
				tooLarge: true,
				size: Number(contentLength),
				maxBytes: config.imageMaxBytes,
			});
		}

		const bytes = Buffer.from(await response.arrayBuffer());
		if (bytes.byteLength > config.imageMaxBytes) {
			return toJsonResult({
				...imageMetadata(file),
				tooLarge: true,
				size: bytes.byteLength,
				maxBytes: config.imageMaxBytes,
			});
		}

		return toImageResult({
			data: bytes.toString('base64'),
			mimeType: getMimeType(response.headers.get('content-type'), file.name),
			metadata: {
				...imageMetadata(file),
				tooLarge: false,
				size: bytes.byteLength,
			},
		});
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			return toErrorResult('Image fetch timed out', imageMetadata(file));
		}

		return toErrorResult(error instanceof Error ? error.message : 'Image fetch failed', imageMetadata(file));
	} finally {
		clearTimeout(timeout);
	}
}
