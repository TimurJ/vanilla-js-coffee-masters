import { getProductById } from './Menu.js'

export async function addToCart(id) {
  const product = await getProductById(id)
  const results = app.store.cart.filter((productInCart) => productInCart.product.id == id)

  if (results.length > 0) {
    app.store.cart = app.store.cart.map((product) =>
      product.product.id == id ? { ...product, quantity: product.quantity + 1 } : product
    )
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }]
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((product) => product.product.id != id)
}
