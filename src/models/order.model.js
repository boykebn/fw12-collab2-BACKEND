const db = require("../helper/db.helper");

exports.readAllOrders = async () => {
  try {
    const sql = 'SELECT * FROM "order"';
    const newOrder = await db.query(sql);
    return newOrder.rows;
  } catch (error) {
    if (error) throw error;
  }
};

exports.createOrder = async (data) => {
  try {
    const sql = `INSERT INTO "order" (name, picture) VALUES ($1,$2) RETURNING *`;
    const values = [
      data.name,
      data.picture
    ];
    const newOrder = await db.query(sql, values);
    return newOrder.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.readOrder = async (id) => {
  try {
    const sql = `SELECT * FROM "order" WHERE id = $1`;
    const newOrder = await db.query(sql, [id]);
    return newOrder.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.updateOrder = async (id, data) => {
  try {
    const sql = `UPDATE "order" SET "name" = COALESCE(NULLIF($1, ''), "name"), "picture" = COALESCE(NULLIF($3, ''), "picture") WHERE id = $2 RETURNING *`;
    const values = [
      data.name,
      id,
      data.picture
    ];
    const newOrder = await db.query(sql, values)
    return newOrder.rows[0]
  } catch (error) {
    if (error) throw error;
  }
};

exports.deleteOrder = async (id) => {
  try {
    const sql = `DELETE FROM "order" WHERE id = $1 RETURNING *`;
    const newOrder = await db.query(sql, [id]);
    return newOrder.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};
