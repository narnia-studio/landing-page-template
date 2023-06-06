// © Daniel Schulz - https://iamschulz.com/from-notion-to-eleventy/

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";
import slugify from "slugify";

const formatDate = (date) => {
	const dateOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const formattedDate = new Date(date).toLocaleDateString(
		"en-US",
		dateOptions
	);

	return formattedDate;
};

export const getPosts = async () => {
	// connects to notion API
	const notion = new Client({ auth: import.meta.env.NOTION_KEY });
	const n2m = new NotionToMarkdown({ notionClient: notion });

	const databaseId = import.meta.env.NOTION_BLOG_ID;
	const db = await notion.databases.query({
		database_id: databaseId,
		filter: {
			property: "publish",
			checkbox: {
				equals: true,
			},
		},
		sorts: [
			{
				timestamp: "last_edited_time",
				direction: "descending",
			},
		],
	});

	const getContent = async (id) => {
		const mdblocks = await n2m.pageToMarkdown(id);
		return n2m.toMarkdownString(mdblocks);
	};

	const posts = db.results.map((result) => {
		console.log(JSON.stringify(result, null, 2));
		return {
			id: result.id,
			title: result.properties["title"].title.pop().plain_text,
			content: "",
			cover: result.cover?.file?.url || result.cover?.external?.url,
			coverAlt:
				result.properties["coverAlt"]?.rich_text.pop()?.plain_text ||
				"",
			date: formatDate(result["last_edited_time"]),
			socialImage:
				result.properties["socialImage"]?.files[0]?.file?.url ||
				result.properties["socialImage"]?.files[0]?.external?.url,
			summary:
				result.properties["summary"]?.rich_text.pop()?.plain_text || "",
			slug: "",
			permalink: "",
		};
	});

	for (let i = 0; i < posts.length; i++) {
		const _page = posts[i];
		const _mdContent = await getContent(_page.id);
		_page.content = marked(_mdContent);
		_page.slug = slugify(_page.title, {
			lower: true,
			remove: /[*+~.()'"!:@]/g,
		});
		_page.permalink = `${import.meta.env.PERMALINK}/posts/${_page.slug}`;
	}

	return posts;
};
