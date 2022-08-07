import matter from 'gray-matter';
import * as fs from 'node:fs/promises';
import glob from 'glob';

const POST_GLOB = 'src/routes/blog/*.md';

async function readFile(filePath) {
	try {
		const data = await fs.readFile(filePath);
		return data.toString();
	} catch (error) {
		console.error(`Got an error trying to read the file: ${error.message}`);
	}
}

/**
 * Call with callback that returns true if a change has been made,
 * false if not.
 */
function transformArticles(callback) {
	glob(POST_GLOB, null, function (er, files) {
		files.forEach((file) => {
			console.log(`===== ${file} =====`);
			console.log('OPENING');
			const parsedFile = matter.read(file);

			console.log('TRANSFORMING');
			const change = callback(parsedFile);

			if (change) {
				console.log('WRITING');
				fs.writeFile(file, parsedFile.stringify());
			} else {
				console.log('NO CHANGE');
			}
		});
	});
}

function makeStringTagsArrays(parsedFile) {
	if (!Array.isArray(parsedFile.data.tags) && 'tags' in parsedFile.data) {
		console.log('FOUND TAG STRING');
		parsedFile.data = {
			...parsedFile.data,
			tags: parsedFile.data.tags.split(' ')
		};
		return true;
	}
	return false;
}

transformArticles(makeStringTagsArrays);
