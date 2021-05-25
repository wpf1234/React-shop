import { del, get, post, put } from '../utils/axios'

// 封装 products 页面所需要的请求
export function listAPI( page, size) {
    return get('/auth/products', {
        page,
        size
    })
}

export function createAPI( data ){
    return post('/auth/products',data)
}

// 更具 id 获取数据
export function getOnByID( id ){
    return get('/auth/products/one', {
        id
    })
}

export function modifyAPI( data){
    return put('/auth/products', data)
}

export function deleteAPI( id ){
    return del(`/auth/products?id=${id}`)
}