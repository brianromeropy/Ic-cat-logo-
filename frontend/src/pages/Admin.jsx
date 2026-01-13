import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'
import { getProductos, createProducto, updateProducto, deleteProducto } from '../utils/api'
import { formatPrice } from '../utils/format'

const Admin = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProducto, setEditingProducto] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    categoria: '',
    modelo_iphone: '',
    fabricante: '',
    costo: '',
    precio: '',
    stock: '',
    descripcion: '',
    especificaciones: '',
    imagen: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
    loadProductos()
    
    // Escuchar cambios en el estado de autenticación
    const handleAuthChange = () => {
      checkAuth()
    }
    
    window.addEventListener('authStateChanged', handleAuthChange)
    
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange)
    }
  }, [])

  const checkAuth = async () => {
    const user = await isAuthenticated()
    if (!user || user.role !== 'admin') {
      navigate('/')
    }
  }

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productoData = {
        ...formData,
        costo: formData.costo ? parseFloat(formData.costo) : 0,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        modelo_iphone: formData.modelo_iphone ? formData.modelo_iphone.split(',').map(m => m.trim()) : []
      }

      if (editingProducto) {
        const id = editingProducto._id || editingProducto.id
        await updateProducto(id, productoData)
        alert('Producto actualizado correctamente')
      } else {
        await createProducto(productoData)
        alert('Producto creado correctamente')
      }
      resetForm()
      await loadProductos()
    } catch (error) {
      console.error('Error:', error)
      alert('Error al guardar producto. Verifica los datos.')
    }
  }

  const handleEdit = (producto) => {
    setEditingProducto(producto)
    setFormData({
      nombre: producto.nombre || '',
      codigo: producto.codigo || '',
      categoria: producto.categoria || '',
      modelo_iphone: Array.isArray(producto.modelo_iphone) ? producto.modelo_iphone.join(', ') : (producto.modelo_iphone || ''),
      fabricante: producto.fabricante || '',
      costo: producto.costo || '',
      precio: producto.precio || '',
      stock: producto.stock || '',
      descripcion: producto.descripcion || '',
      especificaciones: producto.especificaciones || '',
      imagen: producto.imagen || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (producto) => {
    if (!confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) return
    
    try {
      const id = producto._id || producto.id
      await deleteProducto(id)
      alert('Producto eliminado correctamente')
      await loadProductos()
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar producto')
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      codigo: '',
      categoria: '',
      modelo_iphone: '',
      fabricante: '',
      costo: '',
      precio: '',
      stock: '',
      descripcion: '',
      especificaciones: '',
      imagen: ''
    })
    setEditingProducto(null)
    setShowForm(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white">
            <span className="text-gold">Panel de</span> Administración
          </h1>
          <p className="text-gray-400 text-sm">Gestiona tu catálogo de productos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 rounded-lg bg-gold-gradient text-dark-bg hover:shadow-gold transition-all duration-300 font-bold transform hover:scale-105"
        >
          {showForm ? 'Cancelar' : '+ Agregar Producto'}
        </button>
      </div>

      {showForm && (
        <div className="bg-dark-surface rounded-xl border border-gold/20 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-white">
            {editingProducto ? (
              <>
                <span className="text-gold">Editar</span> Producto
              </>
            ) : (
              <>
                <span className="text-gold">Nuevo</span> Producto
              </>
            )}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Nombre</label>
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
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Código del IC
                </label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Ej: TRISTAR-82, PMIC-338S"
                  className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all font-mono"
                  style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Categoría
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
                  style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
                >
                  <option value="" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>Seleccionar categoría</option>
                  <option value="IC de carga" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>IC de carga</option>
                  <option value="PMIC" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>PMIC</option>
                  <option value="IC de audio" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>IC de audio</option>
                  <option value="IC de imagen" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>IC de imagen</option>
                  <option value="IC de touch" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>IC de touch</option>
                  <option value="IC de cámara" style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}>IC de cámara</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Modelos de iPhone
                </label>
                <input
                  type="text"
                  name="modelo_iphone"
                  value={formData.modelo_iphone}
                  onChange={handleChange}
                  placeholder="Ej: iPhone 12, iPhone 13, iPhone 14"
                  className="w-full px-4 py-2.5 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors"
                  style={{ backgroundColor: '#1E1E1E', color: '#ffffff' }}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Fabricante
                </label>
                <input
                  type="text"
                  name="fabricante"
                  value={formData.fabricante}
                  onChange={handleChange}
                  placeholder="Ej: Apple, Texas Instruments"
                  className="w-full px-4 py-2.5 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors"
                  style={{ backgroundColor: '#1E1E1E', color: '#ffffff' }}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Costo (GS)
                </label>
                <input
                  type="number"
                  name="costo"
                  value={formData.costo}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  placeholder="Costo de compra"
                  className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all font-mono"
                  style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Precio de Venta (GS)
                </label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1"
                  placeholder="Precio de venta"
                  className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all font-mono"
                  style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all font-mono"
                  style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2 text-sm font-medium">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-3 bg-dark-bg border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all resize-none"
                  style={{ backgroundColor: '#0A0A0A', color: '#ffffff' }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2 text-sm font-medium">Especificaciones</label>
                <textarea
                  name="especificaciones"
                  value={formData.especificaciones}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Especificaciones técnicas del IC"
                  className="w-full px-4 py-2.5 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors resize-none font-mono text-sm"
                  style={{ backgroundColor: '#1E1E1E', color: '#ffffff' }}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2 text-sm font-medium">URL de Imagen</label>
                <input
                  type="url"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-dark-surface border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors font-mono text-sm"
                  style={{ backgroundColor: '#1E1E1E', color: '#ffffff' }}
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg bg-gold-gradient text-dark-bg hover:shadow-gold transition-all duration-300 font-bold transform hover:scale-105"
              >
                {editingProducto ? 'Actualizar' : 'Crear Producto'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-lg border border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 bg-dark-surface rounded-xl border border-gold/20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mb-4"></div>
          <p className="text-gray-400">Cargando productos...</p>
        </div>
      ) : productos.length === 0 ? (
        <div className="bg-dark-surface rounded-xl border border-gold/20 p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gold/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-400 text-lg mb-4">No hay productos registrados</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-lg bg-gold-gradient text-dark-bg hover:shadow-gold transition-all duration-300 font-bold transform hover:scale-105"
          >
            + Agregar Primer Producto
          </button>
        </div>
      ) : (
        <div className="bg-dark-surface rounded-xl border border-gold/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-card border-b border-gold/20">
                <tr>
                  <th className="px-4 py-4 text-left text-gold text-sm font-bold">Nombre</th>
                  <th className="px-4 py-4 text-left text-gold text-sm font-bold font-mono">Código</th>
                  <th className="px-4 py-4 text-left text-gold text-sm font-bold">Categoría</th>
                  <th className="px-4 py-4 text-left text-gold text-sm font-bold">Modelos iPhone</th>
                  <th className="px-4 py-4 text-left text-gold text-sm font-bold">Fabricante</th>
                  <th className="px-4 py-4 text-left text-gold text-sm font-bold">Costo</th>
                  <th className="px-4 py-4 text-left text-gold text-sm font-bold">Precio</th>
                  <th className="px-4 py-4 text-left text-gold text-sm font-bold">Stock</th>
                  <th className="px-4 py-4 text-left text-gold text-sm font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, index) => (
                  <tr 
                    key={producto._id || producto.id} 
                    className={`border-b border-gold/10 hover:bg-dark-card transition-colors ${
                      index % 2 === 0 ? 'bg-dark-surface' : 'bg-dark-bg'
                    }`}
                  >
                    <td className="px-4 py-4 font-medium text-white">{producto.nombre}</td>
                    <td className="px-4 py-4 font-mono text-sm text-gold">{producto.codigo || 'N/A'}</td>
                    <td className="px-4 py-4">
                      <span className="bg-gold/10 text-gold px-3 py-1 rounded-lg text-xs border border-gold/30 font-medium">
                        {producto.categoria || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-400">
                      {Array.isArray(producto.modelo_iphone) && producto.modelo_iphone.length > 0
                        ? producto.modelo_iphone.join(', ')
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300">{producto.fabricante || 'N/A'}</td>
                    <td className="px-4 py-4 text-sm text-gray-400 font-mono">
                      {producto.costo ? formatPrice(producto.costo) : 'N/A'}
                    </td>
                    <td className="px-4 py-4 font-bold text-gold text-lg">{formatPrice(producto.precio || 0)}</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                        producto.stock > 0 
                          ? 'bg-gold/10 text-gold border-gold/30' 
                          : 'bg-red-900/30 text-red-400 border-red-600/50'
                      }`}>
                        {producto.stock}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(producto)}
                          className="px-4 py-1.5 rounded-lg text-sm border border-gold text-gold hover:bg-gold hover:text-dark-bg transition-all duration-200 font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(producto)}
                          className="px-4 py-1.5 rounded-lg text-sm border border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-200 font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin

