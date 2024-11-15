import { createSlice } from '@reduxjs/toolkit'

const currentCart = JSON.parse(localStorage.getItem('cart') ?? '[]')

const initialState = {
    cart: currentCart,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            const newProduct = action.payload
            console.log(newProduct)

            const foundIndex = state.cart.findIndex(
                (item) => item.id === newProduct.id
            )

            if (foundIndex === -1) {
                state.cart.push({ ...newProduct, quantity: 1 })
            } else {
                state.cart[foundIndex].quantity += 1
            }

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeCart: (state, action) => {
            const productId = action.payload
            const foundIndex = state.cart.findIndex(
                (item) => item.id === productId
            )

            state.cart.splice(foundIndex, 1)

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        incrementQuantity: (state, action) => {
            const productId = action.payload
            const foundIndex = state.cart.findIndex(
                (item) => item.id === productId
            )

            state.cart[foundIndex].quantity++

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload
            const foundIndex = state.cart.findIndex(
                (item) => item.id === productId
            )

            state.cart[foundIndex].quantity--

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
    },
})

// Action creators are generated for each case reducer function
export const { addCart, removeCart, incrementQuantity, decrementQuantity } =
    cartSlice.actions

export default cartSlice.reducer
