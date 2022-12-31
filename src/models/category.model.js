const db = require("../helper/db.helper");

exports.readAllCategory = async () => {
  try {
    const sql = `SELECT * FROM category`;
    const category = await db.query(sql);
    return category.rows;
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.readCategory = async (id) => {
  try {
    const sql = `SELECT * FROM category WHERE id = $1`;
    const values = [id];
    const category = await db.query(sql, values);
    return category.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.createCategory = async (data) => {
  try {
    const sql = `INSERT INTO category ("name") VALUES ($1) RETURNING *`;
    const values = [data.name];
    const category = await db.query(sql, values);
    return category.rows[0];
  } catch (error) {
    if(error) throw new Error(error)
  }
};

exports.updateCategory = async (id, data) => {
  try {
    const sql = `UPDATE category SET "name"=COALESCE(NULLIF($1, ''), "name"), "updatedAt"=$2 WHERE id = $3 RETURNING *`;
    const values = [data.name, new Date(), id];
    const category = await db.query(sql, values);
    return category.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.deleteCategory = async (id) => {
  try {
    const sql = `DELETE FROM category WHERE id = $1 RETURNING *`;
    const values = [id];
    const category = await db.query(sql, values);
    return category.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};
