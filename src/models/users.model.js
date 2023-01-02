const db = require("../helper/db.helper");

exports.createUsers = async (data, cb) => {
  try {
    const sql =
      'INSERT INTO users("firstName", "lastName", "birthDate", "gender", "address", "phoneNumber", "email", "password", "picture", "displayName", "role") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';

    const values = [
      data.firstName,
      data.lastName,
      data.birthDate,
      data.gender,
      data.address,
      data.phoneNumber,
      data.email,
      data.password,
      data.picture,
      data.displayName,
      1,
    ];

    const newUsers = await db.query(sql, values, cb);
    return newUsers.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.getAllUsers = async () => {
  try {
    const sql = 'SELECT * FROM "users"';
    const newUsers = await db.query(sql);
    return newUsers.rows;
  } catch (error) {
    if (error) throw error;
  }
};

exports.getUsersById = async (id) => {
  try {
    const sql = 'SELECT * FROM "users" WHERE id = $1';
    const newUsers = await db.query(sql, [id]);
    return newUsers.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.updateUsers = async (data, id) => {
  try {
    const sql = `UPDATE "users" SET "firstName" = COALESCE(NULLIF($1, ''), "firstName"),
        "lastName" = COALESCE(NULLIF($2, ''), "lastName"), "birthDate" =  COALESCE(NULLIF($3, ''), "birthDate"), "gender" = COALESCE(NULLIF($4, ''), "gender"), "address" = COALESCE(NULLIF($5, ''), "address"), "phoneNumber" =  COALESCE(NULLIF($6, ''), "phoneNumber"), "email" =  COALESCE(NULLIF($7, ''), "email"), "password" =  COALESCE(NULLIF($8, ''), "password"), "picture" = COALESCE(NULLIF($9, ''), "picture"), "displayName" =  COALESCE(NULLIF($10, ''), "displayName"),"role" =  COALESCE(NULLIF($11, ''), "role") WHERE id = $12 RETURNING *`;

    const values = [
      data.firstName,
      data.lastName,
      data.birthDate,
      data.gender,
      data.address,
      data.phoneNumber,
      data.email,
      data.password,
      data.picture,
      data.displayName,
      data.role,
      id,
    ];
    const newUser = await db.query(sql, values);
    return newUser.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.deleteUsers = async (id) => {
  try {
    const sql = 'DELETE FROM "users" WHERE id = $1 RETURNING *';
    const newUser = await db.query(sql, [id]);
    return newUser.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.selectUserByEmail = async (email) => {
  try {
    const sql = `SELECT * FROM users WHERE email=$1`;
    const emailUser = await db.query(sql, [email]);
    return emailUser.rows[0];
  } catch (error) {
    if (error) throw error;
  }
};

exports.getProfile = (id, cb) => {
  const sql = `SELECT * FROM users WHERE id=$1`;
  const value = [id];
  db.query(sql, value, cb);
};

exports.updateProfile = async (data, id, cb) => {
  const sql = `UPDATE "users" SET "firstName" = COALESCE(NULLIF($1, ''), "firstName"),
        "lastName" = COALESCE(NULLIF($2, ''), "lastName"), "birthDate" =  COALESCE(NULLIF($3, ''), "birthDate"), "gender" = COALESCE(NULLIF($4, ''), "gender"), "address" = COALESCE(NULLIF($5, ''), "address"), "phoneNumber" =  COALESCE(NULLIF($6, ''), "phoneNumber"), "email" =  COALESCE(NULLIF($7, ''), "email"), "password" =  COALESCE(NULLIF($8, ''), "password"), "picture" = COALESCE(NULLIF($9, ''), "picture"), "displayName" =  COALESCE(NULLIF($10, ''), "displayName"),"role" =  COALESCE(NULLIF($11, ''), "role") WHERE id = $12 RETURNING *`;

  const values = [
    data.firstName,
    data.lastName,
    data.birthDate,
    data.gender,
    data.address,
    data.phoneNumber,
    data.email,
    data.password,
    data.picture,
    data.displayName,
    data.role,
    id,
  ];
  db.query(sql, values, cb);
};
