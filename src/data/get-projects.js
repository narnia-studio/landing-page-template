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

export const getProjects = async () => {
	// connects to notion API
	const notion = new Client({ auth: import.meta.env.NOTION_KEY });
	const n2m = new NotionToMarkdown({ notionClient: notion });

	const databaseId = import.meta.env.NOTION_PROJECTS_ID;
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

	const projects = db.results.map((result) => {
		console.log(result);

		/*
title: string;
	body: string;
	href: string;
	cover?: string;
	coverAlt?: string;
	repo: string;		
		*/
		return {
			id: result.id,
			name: result.properties["name"].title.pop().plain_text,
			content: "",
			repo: result.properties["repo"].url,
			liveProject: result.properties["liveProject"].url,
			cover: result.cover?.file?.url || result.cover?.external?.url,
			coverAlt:
				result.properties["coverAlt"]?.rich_text.pop()?.plain_text ||
				"",
			date: formatDate(result["last_edited_time"]),
			description:
				result.properties["description"]?.rich_text.pop()?.plain_text ||
				"",
			slug: "",
			permalink: "",
		};
	});

	for (let i = 0; i < projects.length; i++) {
		const _page = projects[i];
		const _mdContent = await getContent(_page.id);
		_page.content = marked(_mdContent);
		// _page.description = marked(_page.description);
		_page.slug = slugify(_page.name, {
			lower: true,
			remove: /[*+~.()'"!:@]/g,
		});
		_page.permalink = `${import.meta.env.PERMALINK}/posts/${_page.slug}`;
	}

	return projects;
};
