import pool from '../config/db.js';

export const createUser = async (name, phoneNumber, lat, lng) => {
  console.log('🛠️ Creating or updating user:', { name, phoneNumber, lat, lng });

  const query = `
    INSERT INTO users (name, phone_number, latitude, longitude)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (phone_number) -- 🔥 Handle conflict on phone number
    DO UPDATE SET 
      name = EXCLUDED.name,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [name, phoneNumber, lat, lng]);
    console.log('✅ User created/updated:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('❌ Database error:', error);
    throw error;
  }
};

export const getUserByPhoneNumber = async (phoneNumber) => {
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
