const db = require("../helpers/db.helper");

exports.getAllSize = async () => {
  try {
    const sql = 'SELECT * FROM "size"';
    const newSize = await db.query(sql);
    return newSize.rows;
  } catch (error) {
    if (error) throw error;
  }
};

exports.createSize = async (data) => {
  try {
    const sql = `INSERT INTO "size" (name) VALUES ($1) RETURNING *`;
    const values = [
      data.name
    ];
    const newSize = await db.query(sql, values);
    return newSize.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.getSizeById = async (id) => {
  try {
    const sql = `SELECT * FROM "size" WHERE id = $1`;
    const newSize = await db.query(sql, [id]);
    return newSize.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.updateSize = async (id, data) => {
  try {
    const sql = `UPDATE "size" SET "name" = COALESCE(NULLIF($1, ''), "name") WHERE id = $2 RETURNING *`;
    const values = [
      data.name,
      id,
    ];
    const newSize = await db.query(sql, values)
    return newSize.rows[0]
  } catch (error) {
    if (error) throw error;
  }
};

exports.deleteSize = async (id) => {
  try {
    const sql = `DELETE FROM "size" WHERE id = $1 RETURNING *`;
    const newSize = await db.query(sql, [id]);
    return newSize.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};
