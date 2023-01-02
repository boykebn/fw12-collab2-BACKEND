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
    const sql = `INSERT INTO "orderedProduct" ("productId", "quantity", "price")
    VALUES ($1,$2, $3) RETURNING *`;
    const values = [data.productId, data.quantity, data.price];
    const newOrderedProduct = await db.query(sql, values);
    return newOrderedProduct.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.readOrderedProduct = async (id) => {
  try {
    const sql = `SELECT * FROM "orderedProduct" WHERE id = $1`;
    const newOrderedProduct = await db.query(sql, [id]);
    return newOrderedProduct.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.updateOrderedProduct = async (id, data) => {
  try {
    const sql = `UPDATE "orderedProduct" SET "productId" = COALESCE(NULLIF($1, '')::INTEGER, "productId"), "quantity" = COALESCE(NULLIF($2, '')::INTEGER, "quantity"), "price" = COALESCE(NULLIF($3, '')::INTEGER, "price") WHERE id = $4 RETURNING *`;
    const values = [
      data.productId,
      data.quantity,
      data.price,
      id,
    ];
    const newOrderedProduct = await db.query(sql, values);
    return newOrderedProduct.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.deleteOrderedProduct = async (id) => {
  try {
    const sql = `DELETE FROM "orderedProduct" WHERE id = $1 RETURNING *`;
    const newOrderedProduct = await db.query(sql, [id]);
    return newOrderedProduct.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};