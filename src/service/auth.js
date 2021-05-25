import { post } from '../utils/axios'

export function loginAPI(user) {
    return post('/login',user)
}