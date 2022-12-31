const db = require('../helper/db.helper');





exports.createUser = async (data) => {
    try {

        const sql = 'INSERT INTO users("firstName", "lastName", "birthDate", "gender", "address", "phoneNumber", "email", "password", "picture", "displayName", "role") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';

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
            data.role
        ];
    
        const newUsers = await db.query(sql, values);
        return newUsers.rows[0];
    } catch (error) {
        if (error) throw (error);
    }
};



exports.getUsers = async () => {
    try {
        const sql = 'SELECT * FROM "users"';
        const newUsers = await db.query(sql);
        return newUsers.rows;
    } catch (error) {
        if (error) throw error;
    }
};



exports.getUserById = async (id) => {
    try {
        const sql = 'SELECT * FROM "users" WHERE id = $1';
        const newUsers = await db.query(sql, [id])
        return newUsers.rows[0];
    } catch (error) {
        if (error) throw error;
    }
};


exports.updateUser = async (data, id) => {
    try {
        const sql = `UPDATE "users" SET "firstName" = COALESCE(NULLIF($1, ''), "firstName"),
        "lastName"=COALESCE(NULLIF($2, ''), "lastName"), "birthDate" = (NULLIF($3, ''), "birthDate"), "gender=(NULLIF($4, ''), "gender"), "address" =(NULIFF($5, ''), "address"), "phoneNumber"=(NULLIF($6, '')::INTEGER, "phoneNumber"), "email"=(NULLIF($7, ''), "email"), "password"=(NULLIF($8, ''), "password"), "picture"=(NULLIF($9, ''), "picture"), "displayName"=(NULLIF($10, ''), "displayNamme"),"role"=(NULLIF($11, '')::INTEGER, "role") WHERE id = $12 RETURNING *`;

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
            id
        ];
        const newUser = await db.query(sql, values);
        return newUser.rows[0]

    } catch (error) {
        if (error) throw error;
    }
};


exports.deleteUser = async (id) => {
    try {
        const sql = 'DELETE FROM "users" WHERE id = $1 RETURNING *';
        const newUser = await db.query(sql, [id]);
        return newUser.rows[0]
    } catch (error) {
        if (error) throw error;
    }
    
};
