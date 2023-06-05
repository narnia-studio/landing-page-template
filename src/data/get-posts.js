const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const { marked } = require("marked");
const slugify = require("slugify");

module.exports = async () => {
	// connection + get data notion
	const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
	const n2m = new NotionToMarkdown({ notionClient: notion });

	const databaseId = import.meta.env.NOTION_BLOG_ID;
	const db = await notion.databases.query({
		database_id: databaseId,
		filter: [
			{
				property: "draft",
				checkbox: {
					equals: false,
				},
			},
			{
				property: "publish",
				checkbox: {
					equals: false,
				},
			},
		],
		sorts: [
			{
				property: "date",
				direction: "descending",
			},
		],
	});
};
