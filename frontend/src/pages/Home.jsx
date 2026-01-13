import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-24 rounded-2xl mb-12 relative overflow-hidden border border-gold/20 bg-gradient-to-br from-dark-surface to-dark-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="text-gold">RC</span>
            <span className="text-white"> TIENDA</span>
            <br />
            <span className="text-gold-light">TECNOLÓGICA</span>
          </h1>
          <p className="text-2xl mb-4 text-gray-300 font-light">
            Circuitos Integrados para iPhone
          </p>
          <p className="text-lg mb-10 text-gray-400 max-w-2xl mx-auto">
            Tu tienda de confianza para componentes de calidad. Envíos rápidos y atención personalizada.
          </p>
          <Link
            to="/catalogo"
            className="inline-block px-10 py-4 rounded-xl font-bold bg-gold-gradient text-dark-bg hover:shadow-gold transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Ver Catálogo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-8 bg-dark-surface rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 hover:shadow-gold-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Calidad Garantizada</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Productos originales y de alta calidad para tus reparaciones
          </p>
        </div>
        
        <div className="text-center p-8 bg-dark-surface rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 hover:shadow-gold-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Envío Rápido</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Despachamos tu pedido el mismo día. Llega rápido y seguro
          </p>
        </div>
        
        <div className="text-center p-8 bg-dark-surface rounded-xl border border-gold/20 hover:border-gold transition-all duration-300 hover:shadow-gold-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">Atención 24/7</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Soporte por WhatsApp. Resolvemos tus dudas al instante
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark-surface rounded-xl p-10 text-center border border-gold/20">
        <h2 className="text-3xl font-bold mb-4 text-white">¿Eres técnico profesional?</h2>
        <p className="text-gray-400 mb-8 text-lg">
          Regístrate y accede a precios especiales, descuentos exclusivos y atención prioritaria
        </p>
        <Link
          to="/login"
          className="inline-block px-8 py-4 rounded-xl font-bold bg-gold-gradient text-dark-bg hover:shadow-gold transition-all duration-300 transform hover:scale-105"
        >
          Crear Cuenta Gratis
        </Link>
      </section>
    </div>
  )
}

export default Home

