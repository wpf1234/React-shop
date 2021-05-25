import axios from 'axios'
import { getToken } from './auth'

const instance = axios.create(
    {
        baseURL: 'http://127.0.0.1:12345/v1/test',
        timeout: 5000
    }
)

// Add a request interceptor
// 全局请求拦截，发送请求之前执行
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] =  getToken()
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

/**
 * 配置 get 请求
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export function get( url, params) {
    return instance.get( url, {
        params
    })
}

/**
 * 配置 post 请求
 * @param {*} url 
 * @param {*} data 传输的数据
 * @returns 
 */
export function post( url, data) {
    return instance.post( url, data)
}

export function put( url, data) {
    return instance.put( url, data)
}

export function del( url) {
    return instance.delete( url)
}