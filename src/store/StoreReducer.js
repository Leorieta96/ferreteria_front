const types = {
    authLogin: '',
    authLogout: '',
    productDeleteAll: '',
    productChange: ''
}


export const initialstore = {
    user: { id:1, name: 'Gustavo'},
    products: [
        { id: 1, title: 'Products1'},
        { id: 2, title: 'Products2'},
    ]
}

export const storeReducer = (state, action) => {
    switch (action.type) {

        default:
            return state;
    }
}