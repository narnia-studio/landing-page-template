import {Client} from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { marked } from 'marked';
import slugify from 'slugify';

module.exports = async () => {
    // connection + get data notion
    const notion = new Client({auth: import.meta.env.NOTION_TOKEN});
    const n2m = new NotionToMarkdown({notionClient: notion});

    const databaseId = import.meta.env.NOTION_BLOG_ID;
    const db = await notion.databases.query({
        database_id: databaseId,
        filter: {
           property: "Draft",
            checkbox: {
                equals: false
            }
        },
        sorts: [
            {
                property: "Date",
                direction: "descending"
            }
        ]
    })
}