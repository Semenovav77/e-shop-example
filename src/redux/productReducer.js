const SET_SHOPPING_ITEM = 'SET_SHOPPING_ITEM';

let initialState = {
    items: Array(40).fill(null).map(() => ({
        id: ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)),
        imgBook: 'https://cv9.litres.ru/pub/c/elektronnaya-kniga/cover_415/128391-dmitriy-gluhovskiy-metro-2033.jpg',
        title: 'Метро ' + (Math.random() * 2033 + 10).toFixed(),
        autor: 'Дмитрий глуховский',
        rating: (Math.random() * 5 + 1).toFixed(1),
        price: {
            new: Number((Math.random() * 700 + 1).toFixed()),
            old: Number((Math.random() * 700 + 1).toFixed()),
        }
    })),
    shoppingProd: []
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOPPING_ITEM:
            let add = false;
            let newShoppingProd = state.shoppingProd.map(item => {
                if (item.id === action.idItem) {
                    add = true;
                    return {
                        ...item,
                        count: item.count + 1,
                    };
                }
                return {...item}
            });
            if (add) {
                return {
                    ...state,
                    shoppingProd: newShoppingProd,
                }
            } else return {
                ...state,
                shoppingProd: [...state.shoppingProd, {id: action.idItem, count: 1, price: action.price.new}],
            };
        default:
            return state;
    }
};

export const addItem = (idItem, price) => ({
    type: SET_SHOPPING_ITEM,
    idItem,
    price
});

export default productReducer;
