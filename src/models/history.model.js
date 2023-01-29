const db = require("../helper/db.helper");

exports.readAllHistory = async () => {
  try {
    const sql = `SELECT p.*, o.status, o."totalPrice" FROM "product" p 
    JOIN "orderedProduct" op ON op."productId" = p.id
    JOIN "order" o ON o.id = op."orderId"`;
    const history = await db.query(sql);
    return history.rows;
  } catch (error) {
    if (error) throw new Error(error);
  }
};

exports.readHistoryByUserId = async (id) => {
  try {
    const sql = `SELECT o.*, p.name, p.picture FROM "order" o JOIN "orderedProduct" op ON o.id = op."orderId" JOIN "product" p ON op."productId" = p.id WHERE o."userId" = $1 AND o.status = 'done'`;
    const values = [id];
    const history = await db.query(sql, values);
    return history.rows
  } catch (error) {
    if (error) throw new Error(error);
  }
};