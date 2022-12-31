const db = require("../helper/db.helper");

exports.readAllProducts = async () => {
  try {
    const sql = `SELECT * FROM product`;
    const products = await db.query(sql);
    return products.rows;
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.readProduct = async (id) => {
  try {
    const sql = `SELECT * FROM product WHERE id = $1`;
    const values = [id];
    const products = await db.query(sql, values);
    return products.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.createProduct = async (data) => {
  try {
    const sql = `INSERT INTO product ("name", "picture", "description",  "stock") VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [data.name, data.picture, data.description, data.stock];
    const products = await db.query(sql, values);
    return products.rows[0];
  } catch (error) {
    if(error) throw new Error(error)
  }
};

exports.updateProduct = async (id, data) => {
  try {
    const sql = `UPDATE product SET "name"=COALESCE(NULLIF($1, ''), "name"), "picture"=COALESCE(NULLIF($2, ''), "picture"), "description"=COALESCE(NULLIF($3, ''), "description"),  "stock"=COALESCE(NULLIF($4, '')::INTEGER, "stock"), "updatedAt"=$5 WHERE id = $6 RETURNING *`;
    const values = [data.name, data.picture, data.description, data.stock, new Date(),id];
    const products = await db.query(sql, values);
    return products.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.deleteProduct = async (id) => {
  try {
    const sql = `DELETE FROM product WHERE id = $1 RETURNING *`;
    const values = [id];
    const products = await db.query(sql, values);
    return products.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};
