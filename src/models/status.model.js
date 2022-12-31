const db = require("../helper/db.helper");

exports.getAllStatus = async () => {
  try {
    const sql = 'SELECT * FROM "status"';
    const newstatus = await db.query(sql);
    return newstatus.rows;
  } catch (error) {
    if (error) throw error;
  }
};

exports.createStatus = async (data) => {
  try {
    const sql = `INSERT INTO "status" (name) VALUES ($1) RETURNING *`;
    const values = [
      data.name
    ];
    const newstatus = await db.query(sql, values);
    return newstatus.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.getStatusById = async (id) => {
  try {
    const sql = `SELECT * FROM "status" WHERE id = $1`;
    const newstatus = await db.query(sql, [id]);
    return newstatus.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.updateStatus = async (id, data) => {
  try {
    const sql = `UPDATE "status" SET "name" = COALESCE(NULLIF($1, ''), "name") WHERE id = $2 RETURNING *`;
    const values = [
      data.name,
      id,
    ];
    const newstatus = await db.query(sql, values)
    return newstatus.rows[0]
  } catch (error) {
    if (error) throw error;
  }
};

exports.deleteStatus = async (id) => {
  try {
    const sql = `DELETE FROM "status" WHERE id = $1 RETURNING *`;
    const newstatus = await db.query(sql, [id]);
    return newstatus.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};
