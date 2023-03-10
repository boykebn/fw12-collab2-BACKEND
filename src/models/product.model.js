const db = require("../helper/db.helper");

exports.readAllProducts = async (filter) => {
  try {
    const sql = `SELECT p.*, pz.price FROM product p JOIN "productSize" pz ON pz."productId" = p.id  LEFT JOIN "productCategory" pc ON p.id = pc."productId" 
    LEFT JOIN category c ON c.id = pc."categoryId" WHERE name LIKE $1 AND pz."sizeId" = 2 AND c."nameCategory" LIKE $2  ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $3 OFFSET $4`;
    const values = [`%${filter.search}%`, `%${filter.category}%`, filter.limit, filter.offset]
    const products = await db.query(sql, values);
    return products.rows;
  } catch (error) {
    if(error) throw new Error(error);
  }
};

exports.countAllProduct = async (filter) => {
  try{
    const sql = `SELECT COUNT(*) AS "totalData" FROM product p JOIN "productSize" pz ON pz."productId" = p.id LEFT JOIN "productCategory" pc ON p.id = pc."productId" 
    LEFT JOIN category c ON c.id = pc."categoryId" WHERE name LIKE $1 AND pz."sizeId" = 2 AND c."nameCategory" LIKE $2`;
    const values = [`%${filter.search}%`, `%${filter.category}%`];
    const products = await db.query(sql, values);
    return products.rows[0].totalData
  } catch (error){
    if(error) throw new Error(error)
  }
};


exports.readProduct = async (id) => {
  try {
    const sql = `SELECT p.*, pz.price, c."nameCategory" FROM product p
    JOIN "productSize" pz ON pz."productId" = p.id
    JOIN "productCategory" pc ON pc."productId" = p.id
    JOIN "category" c ON c.id = pc."categoryId"
    WHERE p.id = $1`;
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

exports.readProductByCategory = async (category) => {
  try {
    const sql = `SELECT p.*, c."nameCategory" as category, pz.price from product p 
    LEFT JOIN "productCategory" pc ON p.id = pc."productId" 
    LEFT JOIN category c ON c.id = pc."categoryId"
    JOIN "productSize" pz ON p.id = pz."productId"
    WHERE c."nameCategory" = $1`
    const values = [category]
    const products = await db.query(sql, values)
    return products.rows
  } catch (error) {
    if(error) throw new Error(error)
  }
}

exports.readProductByIdAndSize = async(data) => {
  try {
    const sql = `
    SELECT p.name, p.picture, p.description, p.stock, c."nameCategory", ps.price FROM product p 
    LEFT JOIN "productSize" ps ON ps."productId" = p.id 
    LEFT JOIN size s ON s.id = ps."sizeId" 
    JOIN "productCategory" pc ON pc."productId" = p.id
    JOIN category c ON c.id = pc."categoryId"
    WHERE p.id = $1 AND s.id = $2`
    const values = [data.productId, data.sizeId]
    const product = await db.query(sql, values)
    return product.rows[0]
  } catch (error) {
    if(error) throw new Error(error)
  }
}

exports.createNameProduct = async (data) => {
  try {
    const sql = `INSERT INTO product ("name") VALUES ($1) RETURNING *`;
    const values = [data];
    const products = await db.query(sql, values);
    return products.rows[0];
  } catch (error) {
    if(error) throw new Error(error)
  }
};

exports.updateProductAdmin = async (id, data) => {
  try {
    const sql = `UPDATE product SET "name"=COALESCE(NULLIF($1, ''), "name"), "picture"=COALESCE(NULLIF($2, ''), "picture"), "description"=COALESCE(NULLIF($3, ''), "description"),  "stock"=COALESCE(NULLIF($4, '')::INTEGER, "stock"), "updatedAt"=$5 WHERE id = $6 RETURNING *`;
    const values = [data.name, data.picture, data.description, data.stock, new Date(),id];
    const products = await db.query(sql, values);
    return products.rows[0];
  } catch (error) {
    if(error) throw new Error(error);
  }
};