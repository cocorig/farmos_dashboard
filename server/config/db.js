import mysql from "mysql2";
import dotenv from "dotenv";
import { connectSSH } from "./ssh.js";

dotenv.config();

export async function createMySQLConnection() {
  try {
    const sshStream = await connectSSH();

    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      stream: sshStream,
    });
  } catch (error) {
    throw new Error("SSH 연결 실패: " + error);
  }
}

export function queryDatabase(query, params, connection) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}
