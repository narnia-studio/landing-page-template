
const uploadNotionImagesToCloudinary = require('upload-notion-images-to-cloudinary').default;

require('dotenv').config();

exports.default = (async () => {
	await uploadNotionImagesToCloudinary({
		notionToken: process.env.NOTION_KEY,
		notionDatabaseId: process.env.NOTION_PROJECTS_ID,
		cloudinaryUrl: process.env.CLOUDINARY_URL,
		cloudinaryUploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || "",
		logLevel: "debug",
	});

	await uploadNotionImagesToCloudinary({
		notionToken: process.env.NOTION_KEY,
		notionDatabaseId: process.env.NOTION_BLOG_ID,
		cloudinaryUrl: process.env.CLOUDINARY_URL,
		cloudinaryUploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || "",
		logLevel: "debug",
	});
})();
