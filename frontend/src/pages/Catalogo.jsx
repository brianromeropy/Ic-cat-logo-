import { useState, useEffect } from 'react'
import CardProducto from '../components/CardProducto'
import { getProductos } from '../utils/api'

const Catalogo = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategoria, setFilterCategoria] = useState('')
  const [filterModelo, setFilterModelo] = useState('')
  const [filterFabricante, setFilterFabricante] = useState('')

  useEffect(() => {
    loadProductos()
  }, [])

  const loadProductos = async () => {
    try {
      setLoading(true)
      console.log('Cargando productos...')
      const data = await getProductos()
      console.log('Productos cargados:', data.length, data)
      setProductos(data)
    } catch (error) {
      console.error('Error al cargar productos:', error)
      console.error('Detalles del error:', error.response?.data || error.message)
      alert('Error al cargar productos. Verifica la consola para más detalles.')
    } finally {
      setLoading(false)
    }
  }

  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (producto.codigo && producto.codigo.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategoria = !filterCategoria || producto.categoria === filterCategoria
    const matchesModelo = !filterModelo || (Array.isArray(producto.modelo_iphone) && producto.modelo_iphone.includes(filterModelo))
    const matchesFabricante = !filterFabricante || producto.fabricante === filterFabricante
    return matchesSearch && matchesCategoria && matchesModelo && matchesFabricante
  })

  const categoriasUnicas = [...new Set(productos.map(p => p.categoria).filter(Boolean))]
  const modelosUnicos = [...new Set(productos.flatMap(p => Array.isArray(p.modelo_iphone) ? p.modelo_iphone : []).filter(Boolean))]
  const fabricantesUnicos = [...new Set(productos.map(p => p.fabricante).filter(Boolean))]

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-3 text-white">
          <span className="text-gold">Catálogo</span> de Productos
        </h1>
        <p className="text-gray-400 text-lg">Encuentra el componente que necesitas</p>
      </div>

      {/* Filtros */}
      <div className="bg-dark-surface p-6 rounded-xl border border-gold/20 mb-8">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-white mb-1">
            <span className="text-gold">Filtros</span> de Búsqueda
          </h3>
          <p className="text-gray-400 text-sm">Encuentra exactamente lo que buscas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Buscar producto
            </label>
            <input
              type="text"
              placeholder="Nombre o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all duration-200"
              style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Categoría
            </label>
            <select
              value={filterCategoria}
              onChange={(e) => setFilterCategoria(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all duration-200"
              style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
            >
              <option value="" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>Todas las categorías</option>
              {categoriasUnicas.map(categoria => (
                <option key={categoria} value={categoria} style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>{categoria}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Modelo iPhone
            </label>
            <select
              value={filterModelo}
              onChange={(e) => setFilterModelo(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all duration-200"
              style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
            >
              <option value="" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>Todos los modelos</option>
              {modelosUnicos.map(modelo => (
                <option key={modelo} value={modelo} style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>{modelo}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Fabricante
            </label>
            <select
              value={filterFabricante}
              onChange={(e) => setFilterFabricante(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all duration-200"
              style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
            >
              <option value="" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>Todos los fabricantes</option>
              {fabricantesUnicos.map(fabricante => (
                <option key={fabricante} value={fabricante} style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>{fabricante}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mb-4"></div>
          <p className="text-gray-400">Cargando productos...</p>
        </div>
      ) : filteredProductos.length === 0 ? (
        <div className="text-center py-20 bg-dark-surface rounded-xl border border-gold/20 p-12">
          <svg className="w-16 h-16 mx-auto mb-4 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 text-lg">No se encontraron productos</p>
          <p className="text-gray-500 text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProductos.map(producto => (
            <CardProducto key={producto._id || producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalogo

