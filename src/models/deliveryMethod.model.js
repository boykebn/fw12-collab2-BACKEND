const db = require("../helper/db.helper");

exports.getAllDeliveryMethod = async () => {
    try {
      const sql = 'SELECT * FROM "deliveryMethod"';
      const newDeliveryMethod = await db.query(sql);
      return newDeliveryMethod.rows;
    } catch (error) {
      if (error) throw error;
    }
}

