import pool from '../config/db.js';

// Update user's location in the database
export const updateUserLocation = async (phoneNumber, lat, lng) => {
  // Validate the latitude and longitude before executing the query
  if (isNaN(lat) || isNaN(lng)) {
    throw new Error('Invalid latitude or longitude values');
  }

  const query = `
    UPDATE users
    SET latitude = $1, longitude = $2
    WHERE phone_number = $3
    RETURNING phone_number, latitude, longitude;  // Optional: return only needed fields
  `;

  try {
    const result = await pool.query(query, [lat, lng, phoneNumber]);
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    return result.rows[0];  // Return updated user details
  } catch (error) {
    console.error('❌ Database error in updateUserLocation:', error);
    throw error;
  }
};

// Get user by phone number
export const getUserByPhoneNumber = async (phoneNumber) => {
  const query = `SELECT * FROM users WHERE phone_number = $1`;

  try {
    const result = await pool.query(query, [phoneNumber]);
    return result.rows.length ? result.rows[0] : null;
  } catch (error) {
    console.error('❌ Database error in getUserByPhoneNumber:', error);
    throw error;
  }
};
