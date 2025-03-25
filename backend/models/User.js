const pool = require('../config/db');

const createUser = async (name, phoneNumber, lat, lng) => {
  console.log('🛠️ Creating user:', { name, phoneNumber, lat, lng });

  const query = `
    INSERT INTO users (name, phone_number, latitude, longitude)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [name, phoneNumber, lat, lng]);
    console.log('✅ User created:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Database error:', error);
    throw error;
  }
};

const getUserByPhoneNumber = async (phoneNumber) => {
  console.log('🔍 Searching user by phone:', phoneNumber);

  const query = `SELECT * FROM users WHERE phone_number = $1`;

  try {
    const result = await pool.query(query, [phoneNumber]);
    if (result.rows.length) {
      console.log('✅ User found:', result.rows[0]);
      return result.rows[0];
    } else {
      console.log('⚠️ No user found with this phone number');
      return null;
    }
  } catch (error) {
    console.error('❌ Database error:', error);
    throw error;
  }
};

module.exports = { createUser, getUserByPhoneNumber };
