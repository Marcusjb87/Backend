const socket = io()

const ulProducts = document.querySelector('#products')

document.querySelector('#carga')?.addEventListener('submit', event => {
  event.preventDefault()
  const carga = document.querySelector('input')
  if (carga?.value) {
    socket.emit('nuevoProduct', carga?.value)
    carga.value = ''
  }
})

socket.on('products', products => {
  if (ulProducts) {
    ulProducts.innerHTML = ''
    for (const product of products) {
      const liProduct = document.createElement('li')
      liProduct.innerHTML = product
      ulProducts?.appendChild(liProduct)
    }
  }
})