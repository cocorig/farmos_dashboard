import express from "express";
import { createMySQLConnection, queryDatabase } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { page = 1, pageSize = 4 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const query = `
    SELECT 
          d.name AS device_name,
          JSON_ARRAYAGG(
              JSON_OBJECT(
                  'data_name', di.name,
                  'nvalue', ROUND(o.nvalue, di.sigdigit),
                  'unit', di.unit,
                  'obs_time', DATE_FORMAT(o.obs_time, '%Y-%m-%d %H:%i:%s')
              )
          ) AS data_options
      FROM devices d
      JOIN dataindexes di ON d.id = di.device_id
      JOIN \`observations_2025-01\` o ON di.id = o.data_id
      WHERE o.obs_time = (
          SELECT MAX(obs_time)
          FROM \`observations_2025-01\`
          WHERE data_id = di.id
      )
      AND o.nvalue IS NOT NULL
      GROUP BY d.name
      ORDER BY d.name
      LIMIT ? OFFSET ?;  
    `;

    const countQuery = `
      SELECT COUNT(*) AS total FROM devices;
    `;

    const connection = await createMySQLConnection();
    const totalResults = await queryDatabase(countQuery, [], connection);
    const total = totalResults[0]?.total || 0;

    const results = await queryDatabase(
      query,
      [parseInt(pageSize), parseInt(offset)],
      connection
    );

    res.json({
      data: results,
      total,
      totalPages: Math.ceil(total / pageSize),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).send("서버 에러: " + error);
  }
});

router.get("/:deviceName", async (req, res) => {
  const { deviceName } = req.params;
  const { date, optionData } = req.query;
  if (!date || !optionData) {
    return res
      .status(400)
      .send("date와 optionData 파라미터를 모두 제공해야 합니다.");
  }

  try {
    const query = `
    SELECT 
        DATE_FORMAT(o.obs_time, '%Y-%m-%d %H:%i:%s') AS obs_time,
        ROUND(o.nvalue, di.sigdigit) AS nvalue,
        di.unit
      FROM devices d
      JOIN dataindexes di ON d.id = di.device_id
      JOIN \`observations_2025-01\` o ON di.id = o.data_id
      WHERE d.name = ?
        AND di.name = ?
        AND DATE(o.obs_time) = ? 
        AND o.nvalue IS NOT NULL
      ORDER BY o.obs_time ASC;
    `;

    const connection = await createMySQLConnection();
    const results = await queryDatabase(
      query,
      [deviceName, optionData, date],
      connection
    );
    res.json(results);
  } catch (error) {
    res.status(500).send("서버 에러: " + error);
  }
});

export default router;
