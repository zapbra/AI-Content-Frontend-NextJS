import { queryRows, exec } from "@/lib/db/sql";
import { RowDataPacket } from "mysql2";

export interface ArticleRow extends RowDataPacket {
    id: number;
    title: string;
    status: string;
}

export async function listArticles(limit = 20) {
    return await queryRows<ArticleRow[]>(
        "SELECT id, title, status FROM articles ORDER BY id DESC LIMIT ?",
        [limit]
    );
}

export async function createArticle(input: {
    title: string;
    summary?: string | null;
    contentMd?: string | null; // <- add this
}) {
    const { title, summary = null, contentMd = null } = input;

    const res = await exec(
        `INSERT INTO articles (title, status, summary, content_md)
     VALUES (?, 'draft', ?, ?)`,
        [title, summary, contentMd]
    );

    const [row] = await queryRows<ArticleRow[]>(
        `SELECT id, title, status FROM articles WHERE id = ?`,
        [res.insertId]
    );
    return row;
}
