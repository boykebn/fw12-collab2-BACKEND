const db = require("../helper/db.helper");

exports.readAllHistory = async () => {
  try {
    const sql = `SELECT * FROM "history"`;
    const history = await db.query(sql);
    return history.rows;
  } catch (error) {
    if (error) throw new Error(error);
  }
};

exports.readHistory = async (id) => {
  try {
    const sql = `SELECT * FROM "history" WHERE id = $1`;
    const values = [id];
    const history = await db.query(sql, values);
    return history.rows[0];
  } catch (error) {
    if (error) throw new Error(error);
  }
};

exports.createHistory = async (data) => {
  try {
    const sql = `INSERT INTO "history" ("userId", "orderId") VALUES ($1, $2) RETURNING *`;
    const values = [data.userId, data.orderId];
    const history = await db.query(sql, values);
    return history.rows[0];
  } catch (error) {
    if (error) throw new Error(error);
  }
};

exports.updateHistory = async (id, data) => {
  try {
    const sql = `UPDATE "history" SET "userId"=COALESCE(NULLIF($1, '')::BIGINT, "userId"),
    "orderId"=COALESCE(NULLIF($2, '')::BIGINT, "orderId"), "updatedAt"=$3 WHERE id = $4 RETURNING *`;
    const values = [
      data.userId,
      data.orderId,
      new Date(),
      id,
    ];
    const history = await db.query(sql, values);
    return history.rows[0];
  } catch (error) {
    if (error) throw new Error(error);
  }
};

exports.deleteHistory = async (id) => {
  try {
    const sql = `DELETE FROM "history" WHERE id = $1 RETURNING *`;
    const values = [id];
    const history = await db.query(sql, values);
    return history.rows[0];
  } catch (error) {
    if (error) throw new Error(error);
  }
};
