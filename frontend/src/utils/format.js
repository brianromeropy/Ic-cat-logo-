// Función para formatear números como guaraníes paraguayos
export const formatGS = (amount) => {
  if (!amount && amount !== 0) return '0'
  return new Intl.NumberFormat('es-PY', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Función para formatear con símbolo GS
export const formatPrice = (amount) => {
  return `${formatGS(amount)} GS`
}

