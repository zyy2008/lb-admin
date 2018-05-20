import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/web/search_user',
    method: 'post',
    data: data
  })
}

export function fetchArticle(data) {
  return request({
    url: '/web/alarm_list',
    method: 'post',
    data: data
  })
}

export function fetchChecked(data) {
  return request({
    url: '/web/un_checked',
    method: 'post',
    data: data
  })
}

export function updateChecked(data) {
  return request({
    url: '/web/update_checked',
    method: 'post',
    data: data
  })
}

// export function createArticle(data) {
//   return request({
//     url: '/article/create',
//     method: 'post',
//     data
//   })
// }

// export function updateArticle(data) {
//   return request({
//     url: '/article/update',
//     method: 'post',
//     data
//   })
// }
