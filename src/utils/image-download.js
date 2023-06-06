import fs from "fs";
import fetch from "node-fetch";
import path, { resolve } from "path";

export function isImage(url) {
	return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

/**
 *
 * @param {String} uri
 * @param {String} fileName
 * @returns {String}
 */
export async function imageDownload(uri, fileName) {
	const [url, _] = uri.split("?");

	if (!isImage(url)) {
		return uri;
	}

	const imageType = url.split(".").pop();
	const imageUrl = `/images/${fileName}.${imageType}`;
	const filePath = path.join(
		process.cwd(),
		"public",
		"images",
		`${fileName}.${imageType}`
	);

	return new Promise(async (resolve, reject) => {
		try {
			let fileExists = false;
			fs.readFile(filePath, async (err, _) => {
				// check if file exists
				fileExists = !err;

				if (fileExists) {
					return resolve(imageUrl);
				}
				const response = await fetch(uri);

				const blob = await response.blob();
				const arrayBuffer = await blob.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);

				fs.writeFile(filePath, buffer, { flag: "wx" }, () =>
					console.log("finished downloading!")
				);

				return resolve(imageUrl);
			});
		} catch (error) {
			return reject(error);
		}
	});
}
