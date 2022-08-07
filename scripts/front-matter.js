import matter from 'gray-matter';

import * as fs from 'node:fs/promises';
import glob from 'glob';

async function readFile(filePath) {
	try {
		const data = await fs.readFile(filePath);
		return data.toString();
	} catch (error) {
		console.error(`Got an error trying to read the file: ${error.message}`);
	}
}

async function openFile() {
	try {
		const csvHeaders = 'name,quantity,price';
		await fs.writeFile('groceries.csv', csvHeaders);
	} catch (error) {
		console.error(`Got an error trying to write to a file: ${error.message}`);
	}
}

async function addGroceryItem(name, quantity, price) {
	try {
		const csvLine = `\n${name},${quantity},${price}`;
		await fs.writeFile('groceries.csv', csvLine, { flag: 'a' });
	} catch (error) {
		console.error(`Got an error trying to write to a file: ${error.message}`);
	}
}

glob('src/routes/blog/*.md', null, function (er, files) {
	files.forEach(async (file) => {
		console.log(matter(await readFile(file)));

		const frontMatter = matter(await readFile(file).data);
	});
});

// readFile('src/routes/blog/midi-machine.md');
