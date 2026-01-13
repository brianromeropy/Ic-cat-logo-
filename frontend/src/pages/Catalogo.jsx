import { useState, useEffect } from 'react'
import CardProducto from '../components/CardProducto'
import { getProductos } from '../utils/api'

const Catalogo = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategoria, setFilterCategoria] = useState('')
  const [filterFabricante, setFilterFabricante] = useState('')

  useEffect(() => {
    loadProductos()
  }, [])

  const loadProductos = async () => {
    try {
      setLoading(true)
      const data = await getProductos()
      setProductos(data)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (producto.codigo && producto.codigo.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategoria = !filterCategoria || producto.categoria === filterCategoria
    const matchesFabricante = !filterFabricante || producto.fabricante === filterFabricante
    return matchesSearch && matchesCategoria && matchesFabricante
  })

  const categoriasUnicas = [...new Set(productos.map(p => p.categoria).filter(Boolean))]
  const fabricantesUnicos = [...new Set(productos.map(p => p.fabricante).filter(Boolean))]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Buscar producto</label>
            <input
              type="text"
              placeholder="Nombre o código del IC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Categoría</label>
            <select
              value={filterCategoria}
              onChange={(e) => setFilterCategoria(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las categorías</option>
              {categoriasUnicas.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Fabricante</label>
            <select
              value={filterFabricante}
              onChange={(e) => setFilterFabricante(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los fabricantes</option>
              {fabricantesUnicos.map(fabricante => (
                <option key={fabricante} value={fabricante}>{fabricante}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      ) : filteredProductos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No se encontraron productos</p>
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

