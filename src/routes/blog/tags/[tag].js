export async function GET({ params }) {
	const currentTag = params.tag;
	console.log(currentTag);

	const allPostFiles = import.meta.glob('../*.md', { eager: true });

	const posts = Object.entries(allPostFiles)
		.filter(([, { metadata }]) => {
			if ('tags' in metadata) {
				return metadata.tags.includes(currentTag);
			} else return false;
		})
		.map(([path, { metadata }]) => [
			metadata.title,
			path.split('/').slice(-1)[0].split('.')[0]
		]);

	return {
		body: { posts }
	};
}
