import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'
import { getProductos, createProducto, updateProducto, deleteProducto } from '../utils/api'

const Admin = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProducto, setEditingProducto] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    categoria: '',
    fabricante: '',
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
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock)
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
      fabricante: producto.fabricante || '',
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
      fabricante: '',
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? 'Cancelar' : '+ Agregar Producto'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingProducto ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Código del IC</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Ej: LM358, NE555, etc."
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  placeholder="Ej: Amplificador, Timer, etc."
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Fabricante</label>
                <input
                  type="text"
                  name="fabricante"
                  value={formData.fabricante}
                  onChange={handleChange}
                  placeholder="Ej: Texas Instruments, STMicroelectronics, etc."
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Especificaciones</label>
                <textarea
                  name="especificaciones"
                  value={formData.especificaciones}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Especificaciones técnicas del IC"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">URL de Imagen</label>
                <input
                  type="url"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            
            <div className="mt-4 flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {editingProducto ? 'Actualizar' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      ) : productos.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">No hay productos registrados</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Agregar Primer Producto
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Código</th>
                  <th className="px-4 py-3 text-left">Categoría</th>
                  <th className="px-4 py-3 text-left">Fabricante</th>
                  <th className="px-4 py-3 text-left">Precio</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto._id || producto.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{producto.nombre}</td>
                    <td className="px-4 py-3 font-mono text-sm">{producto.codigo || 'N/A'}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {producto.categoria || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{producto.fabricante || 'N/A'}</td>
                    <td className="px-4 py-3 font-semibold">${producto.precio?.toLocaleString('es-AR')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        producto.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {producto.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(producto)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(producto)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
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

