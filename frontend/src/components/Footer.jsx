const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-gold/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-white">
              <span className="text-gold">RC</span> TIENDA <span className="text-gold-light">TECNOLÓGICA</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Tu tienda de confianza para circuitos integrados y componentes de iPhone. 
              Calidad garantizada y envíos rápidos.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Contacto</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contacto@rctienda.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gold">Enlaces</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/catalogo" className="hover:text-gold transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-gold transition-colors">
                  Iniciar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gold/20 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; 2026 <span className="text-gold">RC TIENDA TECNOLÓGICA</span>. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

