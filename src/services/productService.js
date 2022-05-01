import axios from 'axios';

const KEYS = {
    products: 'products',
    productId: 'productId'
}

export const getTypesCollection = () => ([
    { id: '1', title: 'Drinks' },
    { id: '2', title: 'Food' },
]);

export function insertProduct(data) {
    let products = getAllProducts();
    data['id'] = generateProductId()
    products.push(data)
    localStorage.setItem(KEYS.products, JSON.stringify(products))
}

export function updateProduct(data) {
    let products = getAllProducts();
    let recordIndex = products.findIndex(x => x.id === data.id);
    products[recordIndex] = { ...data }
    localStorage.setItem(KEYS.products, JSON.stringify(products));
}

export function generateProductId() {
    if (localStorage.getItem(KEYS.productId) === null)
        localStorage.setItem(KEYS.productId, '0')
    var id = parseInt(localStorage.getItem(KEYS.productId))
    localStorage.setItem(KEYS.productId, (++id).toString())
    return id;
}

export function removeProduct(item) {
    const products = JSON.parse(localStorage.getItem(KEYS.products));
    const filtered = products.filter(itm => itm.id !== item.id);
    localStorage.setItem(KEYS.products, JSON.stringify(filtered));
}

export function getfromApi() {
    localStorage.setItem(KEYS.products, JSON.stringify([]));
    axios.get(`http://localhost:3300/products`)
      .then(res => {
        const items = res.data;
        localStorage.setItem(KEYS.products, JSON.stringify(items.products));
        localStorage.setItem(KEYS.productId, (items.totalProducts).toString())
      })
}

export function getAllProducts() {
    if (localStorage.getItem(KEYS.products) === null)
        localStorage.setItem(KEYS.products, JSON.stringify([]))
    let products = JSON.parse(localStorage.getItem(KEYS.products));
    //map typeID to Types title
    let types = getTypesCollection();
    return products.map(x => ({
        ...x,
        type: types[x.typeId - 1]?.title
    }))
}