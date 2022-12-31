const db = require("../helper/db.helper");

exports.readAllDeliveryTime = async () => {
  try {
    const sql = `SELECT * FROM "deliveryTime"`;
    const category = await db.query(sql);
    return category.rows;
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.readDeliveryTime = async (id) => {
  try {
    const sql = `SELECT * FROM "deliveryTime" WHERE id = $1`;
    const values = [id];
    const category = await db.query(sql, values);
    return category.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.createDeliveryTime = async (data) => {
  try {
    const sql = `INSERT INTO "deliveryTime" ("startDay", "endDay", "startHour", "endHour", "productId") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [data.startDay, data.endDay, data.startHour, data.endHour, data.productId];
    const category = await db.query(sql, values);
    return category.rows[0];
  } catch (error) {
    if(error) throw new Error(error)
  }
};

exports.updateDeliveryTime = async (id, data) => {
  try {
    const sql = `UPDATE "deliveryTime" SET "startDay"=COALESCE(NULLIF($1, ''), "startDay"),
    "endDay"=COALESCE(NULLIF($2, ''), "endDay"),
    "startHour"=COALESCE(NULLIF($3, '')::TIME, "startHour"),
    "endHour"=COALESCE(NULLIF($4, '')::TIME, "endHour"),
    "productId"=COALESCE(NULLIF($5, '')::INTEGER, "productId"),  "updatedAt"=$6 WHERE id = $7 RETURNING *`;
    const values = [data.startDay, data.endDay, data.startHour, data.endHour, data.productId, new Date(), id];
    const category = await db.query(sql, values);
    return category.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.deleteDeliveryTime = async (id) => {
  try {
    const sql = `DELETE FROM "deliveryTime" WHERE id = $1 RETURNING *`;
    const values = [id];
    const category = await db.query(sql, values);
    return category.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};
