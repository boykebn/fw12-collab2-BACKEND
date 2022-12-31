const db = require("../helper/db.helper");

exports.getAllProductSize = async () => {
  try {
    const sql = 'SELECT * FROM "productSize"';
    const newSize = await db.query(sql);
    return newSize.rows;
  } catch (error) {
    if (error) throw error;
  }
};

exports.createProductSize = async (data) => {
  try {
    const sql = `INSERT INTO "productSize" ("productId", "sizeId") VALUES ($1, $2) RETURNING *`;
    const values = [
      data.productId,
      data.sizeId
    ];
    const newSize = await db.query(sql, values);
    return newSize.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.getProductSizeById = async (id) => {
  try {
    const sql = `SELECT * FROM "productSize" WHERE id = $1`;
    const newSize = await db.query(sql, [id]);
    return newSize.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.updateProductSize = async (id, data) => {
  try {
    const sql = `UPDATE "productSize" SET "productId" = COALESCE(NULLIF($1, '')::INTEGER, "productId"), "sizeId" = COALESCE(NULLIF($2, '')::INTEGER, "sizeId") WHERE id = $3 RETURNING *`;
    const values = [
      data.productId,
      data.sizeId,
      id,
    ];
    const newSize = await db.query(sql, values)
    return newSize.rows[0]
  } catch (error) {
    if (error) throw error;
  }
};

exports.deleteProductSize = async (id) => {
  try {
    const sql = `DELETE FROM "productSize" WHERE id = $1 RETURNING *`;
    const newSize = await db.query(sql, [id]);
    return newSize.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};