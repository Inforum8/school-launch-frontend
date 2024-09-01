import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		const imagePath = path.resolve('static/images/student-ad.jpg');

		const imageBuffer = fs.readFileSync(imagePath);

		return new Response(imageBuffer, {
			headers: {
				'Content-Type': 'image/jpeg',
			}
		});
	} catch {
		return json({ error: 'Image not found' }, { status: 404 });
	}
}