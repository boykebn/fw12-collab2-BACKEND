const db = require("../helper/db.helper");

exports.readAllOrderedProducts = async () => {
  try {
    const sql = 'SELECT * FROM "orderedProduct"';
    const newOrderedProduct = await db.query(sql);
    return newOrderedProduct.rows;
  } catch (error) {
    if (error) throw error;
  }
};

exports.createOrderedProduct = async (data) => {
  try {
    const sql = `INSERT INTO "orderedProduct" ("productId", "quantity", "price", "sizeId", "orderId")
    VALUES ($1,$2, $3, $4, $5) RETURNING *`;
    const values = [data.productId, data.quantity, data.price, data.sizeId, data.orderId];
    const newOrderedProduct = await db.query(sql, values);
    return newOrderedProduct.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.readOrderedProduct = async (id) => {
  try {
    const sql = `SELECT * FROM "orderedProduct" op JOIN "product" p ON op."productId" = p.id  WHERE op."orderid" = $1`;
    const newOrderedProduct = await db.query(sql, [id]);
    return newOrderedProduct.rows
  } catch (error) {
    if (error) throw error;
  }
};

exports.updateOrderedProduct = async (id, data) => {
  try {
    const sql = `UPDATE "orderedProduct" SET "productId" = COALESCE(NULLIF($1, '')::INTEGER, "productId"), "quantity" = COALESCE(NULLIF($2, '')::INTEGER, "quantity"), "price" = COALESCE(NULLIF($3, '')::INTEGER, "price"),  "sizeId" = COALESCE(NULLIF($4, '')::INTEGER, "sizeId"), 
    "orderId" = COALESCE(NULLIF($5, '')::INTEGER, "orderId") WHERE id = $6 RETURNING *`;
    const values = [data.productId, data.quantity, data.price, data.sizeId, data.orderId, id];
    const newOrderedProduct = await db.query(sql, values);
    return newOrderedProduct.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.deleteOrderedProduct = async (id) => {
  try {
    const sql = `DELETE FROM "orderedProduct" WHERE "orderId" = $1 RETURNING *`;
    const newOrderedProduct = await db.query(sql, [id]);
    return newOrderedProduct.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};
