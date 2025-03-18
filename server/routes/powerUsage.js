import express from "express";
import { createMySQLConnection, queryDatabase } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT
        obsmonth,
        MAX(CASE WHEN dgname = 'fuel' THEN nvalue END) AS fuel,
        MAX(CASE WHEN dgname = 'general' THEN nvalue END) AS general,
        MAX(CASE WHEN dgname = 'heater' THEN nvalue END) AS heater,
        MAX(CASE WHEN dgname = 'nutsys' THEN nvalue END) AS nutsys,
        MAX(CASE WHEN dgname = 'storage' THEN nvalue END) AS storage
      FROM
        engmonth
      WHERE
        nvalue IS NOT NULL
      GROUP BY
        obsmonth
      ORDER BY
        obsmonth;
    `;

    const connection = await createMySQLConnection();
    const results = await queryDatabase(query, [], connection);

    res.json(results);
  } catch (error) {
    res.status(500).send("서버 에러: " + error);
  }
});

router.get("/day", async (req, res) => {
  const { month, dgname } = req.query;

  if (!month || !dgname) {
    return res.status(400).send("month와 dgname 파라미터를 제공해야 합니다.");
  }

  try {
    const query = `
      SELECT
        obsday,
        MAX(CASE WHEN dgname = ? THEN nvalue END) AS data_value
      FROM
        engday
      WHERE
        DATE_FORMAT(obsday, '%Y-%m') = ?  
        AND dgname = ?  
      GROUP BY
        obsday
      ORDER BY
        obsday;
    `;

    const connection = await createMySQLConnection();
    const results = await queryDatabase(
      query,
      [dgname, month, dgname],
      connection
    );

    res.json(results);
  } catch (error) {
    res.status(500).send("서버 에러: " + error);
  }
});

export default router;
