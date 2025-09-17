import mysql from "mysql2/promise";

declare global {
    var _mysqlPool: mysql.Pool | undefined;
}

export const pool =
    global._mysqlPool ??
    (global._mysqlPool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT ?? 3306),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        connectionLimit: 10, // good default for dev
        waitForConnections: true,
    }));
