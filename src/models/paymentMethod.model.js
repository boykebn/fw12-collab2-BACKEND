const db = require("../helper/db.helper");

exports.readAllPaymentMethods = async () => {
  try {
    const sql = 'SELECT * FROM "paymentMethod"';
    const newpaymentMethod = await db.query(sql);
    return newpaymentMethod.rows;
  } catch (error) {
    if (error) throw error;
  }
};

exports.createPaymentMethod = async (data) => {
  try {
    const sql = `INSERT INTO "paymentMethod" (name, picture) VALUES ($1,$2) RETURNING *`;
    const values = [
      data.name,
      data.picture
    ];
    const newpaymentMethod = await db.query(sql, values);
    return newpaymentMethod.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.readPaymentMethod = async (id) => {
  try {
    const sql = `SELECT * FROM "paymentMethod" WHERE id = $1`;
    const newpaymentMethod = await db.query(sql, [id]);
    return newpaymentMethod.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.updatePaymentMethod = async (id, data) => {
  try {
    const sql = `UPDATE "paymentMethod" SET "name" = COALESCE(NULLIF($1, ''), "name"), "picture" = COALESCE(NULLIF($3, ''), "picture") WHERE id = $2 RETURNING *`;
    const values = [
      data.name,
      id,
      data.picture
    ];
    const newpaymentMethod = await db.query(sql, values)
    return newpaymentMethod.rows[0]
  } catch (error) {
    if (error) throw error;
  }
};

exports.deletePaymentMethod = async (id) => {
  try {
    const sql = `DELETE FROM "paymentMethod" WHERE id = $1 RETURNING *`;
    const newpaymentMethod = await db.query(sql, [id]);
    return newpaymentMethod.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};
