const db = require("../helper/db.helper");

exports.readAllProductCategory = async () => {
  try {
    const sql = `SELECT * FROM "productCategory"`;
    const productCategory = await db.query(sql);
    return productCategory.rows;
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.readProductCategory = async (id) => {
  try {
    const sql = `SELECT * FROM "productCategory" WHERE id = $1`;
    const values = [id];
    const productCategory = await db.query(sql, values);
    return productCategory.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.createProductCategory = async (data) => {
  try {
    const sql = `INSERT INTO "productCategory" ("productId", "categoryId") VALUES ($1, $2) RETURNING *`;
    const values = [data.productId, data.categoryId];
    const productCategory = await db.query(sql, values);
    return productCategory.rows[0];
  } catch (error) {
    if(error) throw new Error(error)
  }
};

exports.updateProductCategory = async (id, data) => {
  try {
    const sql = `UPDATE "productCategory" SET "productId"=COALESCE(NULLIF($1, '')::INTEGER, "productId"),
    "categoryId"=COALESCE(NULLIF($1, '')::INTEGER, "categoryId"),"updatedAt"=$3 WHERE "id" = $4 RETURNING *`;
    const values = [data.productId, data.categoryId, new Date(), id];
    const productCategory = await db.query(sql, values);
    return productCategory.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.deleteProductCategory = async (id) => {
  try {
    const sql = `DELETE FROM "productCategory" WHERE "productId" = $1 RETURNING *`;
    const values = [id];
    const productCategory = await db.query(sql, values);
    return productCategory.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};
