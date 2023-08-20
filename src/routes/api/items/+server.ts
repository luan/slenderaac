import { error, json } from '@sveltejs/kit';
import path from 'path';
import fs from 'fs';

import type { RequestHandler } from './$types';

const itemsImagesPath = './items/';
const itemsFileFormat = '.gif';

import protobuf from 'protobufjs';

const datfile = 'appearances.dat';
const protoFormat = 'appearances.proto';
export interface Object {
	id: number;
	name: string;
}

const allItems = loadDataFromProtobuf() as Object[];

function loadDataFromProtobuf() {
	try {
		const root = protobuf.loadSync(protoFormat);
		const Appearances = root.lookupType('Appearances');
		const buffer = fs.readFileSync(datfile);
		return Appearances.decode(buffer).toJSON().object;
	} catch (err) {
		console.error(err);
	}
}

export const GET = (async ({ url, request }) => {
	const headers = {
		'Cache-Control': `max-age=${60 * 60 * 24 * 365}`,
		Expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000).toUTCString(),
		'Last-Modified': new Date(1337).toUTCString(),
	};

	if (url.host) {
		const ifModifiedSince = request.headers.get('if-modified-since');
		if (ifModifiedSince) {
			return new Response(null, {
				status: 304,
				headers,
			});
		}
	}

	const itemId = url.searchParams.get('id') || '';
	if (itemId === '') {
		throw error(400, 'id is required');
	}

	const itemDataPath = path.join(
		itemsImagesPath,
		itemId.toString() + itemsFileFormat,
	);

	if (!fs.existsSync(itemDataPath)) {
		throw error(404, `Item not found: ${itemId}`);
	}

	const rawData = fs.readFileSync(itemDataPath, 'base64');

	const itemTitle = Number.isNaN(+itemId)
		? ''
		: allItems.find((item) => item.id === +itemId)?.name || '';

	return json({ src: `data:image/gif;base64,${rawData}`, alt: itemTitle });
}) satisfies RequestHandler;
