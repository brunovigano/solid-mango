export const env = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/solid-mongo',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'bj#vWk6J9!fxBR',
  salt: Number(process.env.SALT) || 12,
}
