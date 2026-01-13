const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/ic_catalogo',
      {
        // Opciones para versiones más nuevas de Mongoose
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    )
    console.log(`MongoDB conectado: ${conn.connection.host}`)
  } catch (error) {
    console.error('Error al conectar MongoDB:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB

