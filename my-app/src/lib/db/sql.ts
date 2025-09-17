import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "./pool";

type QueryParams = ReadonlyArray<
    string | number | boolean | Date | Buffer | null
>;

export async function queryRows<R extends RowDataPacket[]>(
    sql: string,
    params?: QueryParams
): Promise<R> {
    const [rows] = await pool.execute<R>(sql, params);
    return rows;
}

export async function exec(
    sql: string,
    params?: QueryParams
): Promise<ResultSetHeader> {
    const [res] = await pool.execute<ResultSetHeader>(sql, params);
    return res;
}
