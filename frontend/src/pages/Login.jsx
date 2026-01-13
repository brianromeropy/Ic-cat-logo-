import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../utils/auth'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    telefono: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        console.log('Intentando login con:', formData.email)
        const result = await login(formData.email, formData.password)
        console.log('Login exitoso:', result)
        // Pequeño delay para asegurar que el evento se dispare antes de navegar
        setTimeout(() => {
          navigate('/catalogo')
        }, 100)
      } else {
        console.log('Intentando registro con:', formData.email)
        const result = await register(formData)
        console.log('Registro exitoso:', result)
        // Pequeño delay para asegurar que el evento se dispare antes de navegar
        setTimeout(() => {
          navigate('/catalogo')
        }, 100)
      }
    } catch (err) {
      console.error('Error en login/registro:', err)
      setError(err.message || 'Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center">
      <div className="max-w-md mx-auto w-full bg-dark-surface rounded-2xl border border-gold/20 p-10 shadow-xl">
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className="text-gold text-2xl font-bold">RC</span>
            <span className="text-white text-xl"> TIENDA</span>
            <span className="text-gold-light text-xl"> TECNOLÓGICA</span>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Accede a tu cuenta' : 'Únete y obtén beneficios exclusivos'}
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-600 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-sm font-medium">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
                  style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-sm font-medium">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
                  style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
              style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
              style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-dark-bg py-3.5 rounded-lg font-bold hover:shadow-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            className="text-gold hover:text-gold-light transition-colors text-sm"
          >
            {isLogin
              ? '¿No tienes cuenta? Regístrate aquí'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

