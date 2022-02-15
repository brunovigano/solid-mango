export const env = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/solid-mango',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'bj#vWk6J9!fxBRu',
  salt: Number(process.env.SALT) || 12,
}
