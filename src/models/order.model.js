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
    const sql = `INSERT INTO "order" ("userId", 
    "status", 
    "productId", 
    "paymentMethodId",
    "promoId",
    "name",
    "address",
    "phoneNumberRecipient",
    "tax",
    "amount",
    "totalPrice")
    VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
    const values = [
      data.userId,
      data.status,
      data.productId,
      data.paymentMethodId,
      data.promoId,
      data.name,
      data.address,
      data.phoneNumberRecipient,
      data.tax,
      data.amount,
      data.totalPrice,
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
    const sql = `UPDATE "order" SET "userId" = COALESCE(NULLIF($1, '')::INTEGER, "userId"), "status" = COALESCE(NULLIF($2, ''), "status"), "productId" = COALESCE(NULLIF($3, '')::INTEGER, "productId"), "paymentMethodId" = COALESCE(NULLIF($4, '')::INTEGER, "paymentMethodId"), "promoId" = COALESCE(NULLIF($5, '')::INTEGER, "promoId"), "name" = COALESCE(NULLIF($6, ''), "name"), "address" = COALESCE(NULLIF($7, ''), "address"), "phoneNumberRecipient" = COALESCE(NULLIF($8, ''), "phoneNumberRecipient"), "tax" = COALESCE(NULLIF($9, ''), "tax"), "amount" = COALESCE(NULLIF($10, ''), "amount"), "totalPrice" = COALESCE(NULLIF($11, ''), "totalPrice") WHERE id = $12 RETURNING *`;
    const values = [
      data.userId,
      data.statusId,
      data.productId,
      data.paymentMethodId,
      data.promoId,
      data.name,
      data.address,
      data.phoneNumberRecipient,
      data.tax,
      data.amount,
      data.totalPrice,
      id,
    ];
    const newOrder = await db.query(sql, values);
    return newOrder.rows[0];
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

exports.countOrderPaidByUserId = async (id) => {
  try {
    const sql = `SELECT COUNT(*) AS "totalOrder" FROM "order" WHERE "order"."userId" = $1 AND "order"."status" = 'paid'`
    const values = [id]
    return totalOrder = await db.query(sql, values)
  } catch (error) {
    if(error) throw error 
  }
}