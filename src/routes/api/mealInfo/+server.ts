export async function GET() {
	try {

	} catch (e: unknown) {
		return new Response(JSON.stringify({ message: (e as Error).message }), {
			status: 500,
			headers: { 'content-type': 'application/json' },
		});
	}
}