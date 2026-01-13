const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">IC Tienda</h3>
            <p className="text-gray-400">
              Circuitos integrados y repuestos para técnicos de celulares
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <p className="text-gray-400 mb-2">
              WhatsApp: +54 11 1234-5678
            </p>
            <p className="text-gray-400">
              Email: contacto@ictienda.com
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/catalogo" className="hover:text-white transition">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition">
                  Iniciar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2024 IC Tienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

