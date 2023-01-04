const db = require("../helper/db.helper");

exports.readAllDeliveryTime = async () => {
  try {
    const sql = `SELECT * FROM "deliveryTime"`;
    const deliveryTime = await db.query(sql);
    return deliveryTime.rows;
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.readDeliveryTime = async (id) => {
  try {
    const sql = `SELECT * FROM "deliveryTime" WHERE id = $1`;
    const values = [id];
    const deliveryTime = await db.query(sql, values);
    return deliveryTime.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.createDeliveryTime = async (data) => {
  try {
    const sql = `INSERT INTO "deliveryTime" ("startHour", "endHour", "productId") VALUES ($1, $2, $3) RETURNING *`;
    const values = [data.startHour, data.endHour, data.productId];
    const deliveryTime = await db.query(sql, values);
    return deliveryTime.rows[0];
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
    const deliveryTime = await db.query(sql, values);
    return deliveryTime.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.deleteDeliveryTime = async (id) => {
  try {
    const sql = `DELETE FROM "deliveryTime" WHERE "productId" = $1 RETURNING *`;
    const values = [id];
    const deliveryTime = await db.query(sql, values);
    return deliveryTime.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};
