const db = require("../helper/db.helper");

exports.readAllChat = async () => {
  try {
    const sql = `SELECT * FROM chat`;
    const chat = await db.query(sql);
    return chat.rows;
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.readChat = async (id) => {
  try {
    const sql = `SELECT * FROM chat WHERE id = $1`;
    const values = [id];
    const chat = await db.query(sql, values);
    return chat.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.createChat = async (data) => {
  try {
    const sql = `INSERT INTO chat ("userId", "adminId", "message") VALUES ($1, $2, $3) RETURNING *`;
    const values = [data.userId, data.adminId, data.message];
    const chat = await db.query(sql, values);
    return chat.rows[0];
  } catch (error) {
    if(error) throw new Error(error)
  }
};

exports.updateChat = async (id, data) => {
  try {
    const sql = `UPDATE chat SET "userId"=COALESCE(NULLIF($1, '')::INTEGER, "userId"),
    "adminId"=COALESCE(NULLIF($2, '')::INTEGER, "adminId"),
    "message"=COALESCE(NULLIF($3, '')::TEXT, "message"),
    "updatedAt"=$4 WHERE id = $5 RETURNING *`;
    const values = [data.userId, data.adminId, data.message, new Date(), id];
    const chat = await db.query(sql, values);
    return chat.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.deleteChat = async (id) => {
  try {
    const sql = `DELETE FROM chat WHERE id = $1 RETURNING *`;
    const values = [id];
    const chat = await db.query(sql, values);
    return chat.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};
