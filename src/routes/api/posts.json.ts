export const GET = async () => {
	const allPostFiles: Record<string, unknown> = import.meta.glob(
		'../blog/*.md',
		{ eager: true }
	);
  
	const iterablePostFiles = Object.entries(allPostFiles);

	return {
		body: iterablePostFiles
			.map(([path, { metadata }]) => {
				const postPath = path.slice(2, -3);

				return {
					meta: metadata,
					path: postPath
				};
			})
			.sort((a, b) => {
				return (
					new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
				);
			})
	};

};
