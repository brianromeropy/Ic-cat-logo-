import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Catálogo de Circuitos Integrados
        </h1>
        <p className="text-xl mb-8">
          Amplia variedad de ICs para técnicos y profesionales
        </p>
        <Link
          to="/catalogo"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
        >
          Ver Catálogo
        </Link>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-xl font-bold mb-2">Para Técnicos</h3>
          <p className="text-gray-600">
            Productos especializados para profesionales de reparación
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">🔌</div>
          <h3 className="text-xl font-bold mb-2">Circuitos Integrados</h3>
          <p className="text-gray-600">
            Amplio catálogo de ICs de diferentes fabricantes y categorías
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-bold mb-2">Pedido por WhatsApp</h3>
          <p className="text-gray-600">
            Confirmación rápida y atención personalizada
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">¿Eres técnico?</h2>
        <p className="text-gray-600 mb-6">
          Regístrate para acceder a precios especiales y realizar pedidos
        </p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
        >
          Crear Cuenta
        </Link>
      </section>
    </div>
  )
}

export default Home

