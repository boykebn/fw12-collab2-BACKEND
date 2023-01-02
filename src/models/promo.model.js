const db = require("../helper/db.helper");

exports.getAllPromo = async () => {
  try {
    const sql = 'SELECT * FROM "promo"';
    const newPromo = await db.query(sql);
    return newPromo.rows;
  } catch (error) {
    if (error) throw error;
  }
};

exports.createPromo = async (data) => {
  try {
    const sql = `INSERT INTO "promo" (discount, code, name, description, "sizeId", picture, "deliveryMethodId", price, "startDate", "endDate") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9. $10) RETURNING *`;
    const values = [
      data.discount,
      data.code,
      data.name,
      data.description,
      data.sizeId,
      data.picture,
      data.deliveryMethodId,
      data.price,
      data.startDate,
      data.endDate,
    ];
    const newPromo = await db.query(sql, values);
    return newPromo.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.getPromoById = async (id) => {
  try {
    const sql = `SELECT * FROM "promo" WHERE id = $1`;
    const newPromo = await db.query(sql, [id]);
    return newPromo.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.updatePromo = async (id, data) => {
  try {
    const sql = `UPDATE "promo" SET "discount" = COALESCE(NULLIF($1, ''), "discount"), "code" = COALESCE(NULLIF($2, ''), "code"), "name" = COALESCE(NULLIF($3, ''), "name"), "description" = COALESCE(NULLIF($4, ''), "description"), "sizeId" = COALESCE(NULLIF($5, '')::INTEGER, "sizeId"),"picture" = COALESCE(NULLIF($6, ''), "picture") WHERE id = $7 RETURNING *`;
    const values = [
      data.discount,
      data.code,
      data.name,
      data.description,
      data.sizeId,
      data.picture,
      id,
    ];
    const newPromo = await db.query(sql, values);
    return newPromo.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.deletePromo = async (id) => {
  try {
    const sql = `DELETE FROM "promo" WHERE id = $1 RETURNING *`;
    const newPromo = await db.query(sql, [id]);
    return newPromo.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};
