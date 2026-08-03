import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'sajjad_cloth_house_super_secret_jwt_key_2026', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};
