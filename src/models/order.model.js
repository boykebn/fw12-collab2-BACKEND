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
    "deliveryMethodId", 
    "paymentMethodId",
    "promoId",
    "address",
    "phoneNumberRecipient",
    "tax",
    "totalPrice",
    "time",
    "subTotal",
    "shipping")
    VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
    const values = [
      data.userId,
      data.status,
      data.deliveryMethodId,
      data.paymentMethodId,
      data.promoId,
      data.address,
      data.phoneNumberRecipient,
      data.tax,
      data.totalPrice,
      data.time,
      data.subTotal,
      data.shipping
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

exports.readOrderedProductOnProcess = async (id) => {
  try {
    const sql = `SELECT o.id, p.name, p.picture, op.price, op.quantity, s.name as size FROM "order" o LEFT JOIN "orderedProduct" op ON op."orderId" = o.id LEFT JOIN product p ON p.id = op."productId" LEFT JOIN size s ON s.id = op."sizeId" WHERE "userId" = $1 AND o.status = 'unpaid'`
    const values = [id]
    const order = await db.query(sql, values)
    return order.rows[0]
  } catch (error) {
    if(error) throw new Error(error)
  }
}

exports.readOrderedProductOnConfirm = async (id) => {
  try {
    const sql = `SELECT o.id, u."displayName",  o.address, o."paymentMethodId", o."phoneNumberRecipient", o."subTotal", o.tax, o.shipping, o."totalPrice" , p.name, p.picture, op.price, op.quantity, s.name as size FROM "order" o LEFT JOIN "orderedProduct" op ON op."orderId" = o.id LEFT JOIN product p ON p.id = op."productId" LEFT JOIN size s ON s.id = op."sizeId" LEFT JOIN users u ON u.id = o."userId" WHERE o.status = 'paid'`
    const order = await db.query(sql)
    return order.rows[0]
  } catch (error) {
    if(error) throw new Error(error)
  }
}

exports.updateOrder = async (id, data) => {
  try {
    const sql = `UPDATE "order" SET "userId" = COALESCE(NULLIF($1, '')::INTEGER, "userId"), "status" = COALESCE(NULLIF($2, ''), "status"), "deliveryMethodId" = COALESCE(NULLIF($3, '')::INTEGER, "deliveryMethodId"), "paymentMethodId" = COALESCE(NULLIF($4, '')::INTEGER, "paymentMethodId"), "promoId" = COALESCE(NULLIF($5, '')::INTEGER, "promoId"),  "address" = COALESCE(NULLIF($6, ''), "address"), "phoneNumberRecipient" = COALESCE(NULLIF($7, ''), "phoneNumberRecipient"), "tax" = COALESCE(NULLIF($8, '')::INTEGER, "tax"), "totalPrice" = COALESCE(NULLIF($9, '')::INTEGER, "totalPrice"), "subTotal" = COALESCE(NULLIF($10, '')::INTEGER, "subTotal"), "shipping" = COALESCE(NULLIF($11, '')::INTEGER, "shipping") WHERE id = $12 RETURNING *`;
    const values = [
      data.userId,
      data.status,
      data.deliveryMethodId,
      data.paymentMethodId,
      data.promoId,
      data.address,
      data.phoneNumberRecipient,
      data.tax,
      data.totalPrice,
      data.subTotal,
      data.shipping,
      id
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