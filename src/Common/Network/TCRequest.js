/**
 * Created by Sam on 2016/12/13.
 */

/*  弃用 ……………………

 - url:
 - params: {} 或者 string
 - base：默认用config.api.base (支持自己指定)
 */

// import {config} from './TCRequestConfig';
// import queryString from 'query-string';
// import _ from 'lodash';
//
// let request = {
// };
//
// request.get = (url, params, base) => {
//
//     let u = getServerUrl(base, url);
//
//     if (typeof params == 'string') {
//         u += '/' + params
//     } else if (params) {
//         u += '?' + queryString.stringify(params)
//     }
//
//     JXLog('\nget 请求 url: ---\n' + u + '\n')
//
//     addHeadersAuthorization()
//
//     return fetch(u,config.mapGet)
//         .then((res) => {
//             if (res.status >= 200 && res.status < 300) {
//                 if (res.status === 204) {
//                     return {"rs": true}
//                 }
//                 return (res.json())
//             }
//         })
//         .then((res)=>{
//
//             var map = _.assignIn({"content":res},{"rs": true})
//             console.log(map)
//             return map
//         })
//         .catch(function(err) {
//             console.log(err);
//         });
// }
//
//
//
// request.post = (url, body, base) => {
//
//     addHeadersAuthorization()
//     let map = _.assignIn(config.map, {
//         body: JSON.stringify(body)
//     })
//
//     console.log('---',map)
//
//     let u = getServerUrl(base, url);
//
//     JXLog('\npost 请求 url--- \n' + u + '\n' + ',请求参数:', body);
//
//     return fetch(u, map)
//         .then((response) => {
//             return checkStatus(response)
//         })
// }
//
// request.put = (url, body) => {
//
//     addHeadersAuthorization()
//     let map = _.assignIn(config.mapPut, {
//         body: JSON.stringify(body)
//     })
//
//     let u = getServerUrl(base, url);
//
//     JXLog(' \n put 请求 url --- ' + u + '\n' + ',请求参数:', map)
//
//     return fetch(u, map)
//         .then((response) => {
//             return parseData(response)
//         })
//
// }
//
// request.parseData = (response,status) => {
//     console.log('返回字符串',response)
//
//     if (status >= 200 && status < 300) {
//         if (status === 204) {
//             return {"rs": true}
//         }
//         let res = _.assignIn({"content":response},{"rs": true})
//         res = JSON.stringify(res);
//         JXLog(' \n 返回结果 \n'+ res)
//         return res?res:{"rs": false}
//
//     } else if (status >= 400) {
//         return {"rs": false};
//     }
//
//     JXLog({"rs": false})
//     return {"rs": false}
// }
//
// function addHeadersAuthorization() {
//     if (TCUSER_DATA.oauthToken) {
//         config.map.headers.Authorization = 'bearer ' + TCUSER_DATA.oauthToken.access_token;
//     }else {
//         config.map.headers.Authorization = '';
//     }
// }
//
// function getServerUrl(base, url) {
//     let u = '';
//     if (base) {
//         u = base + url;
//     } else {
//         u = config.api.base + url;
//     }
//     return u
// }
//
//
// module.export = request