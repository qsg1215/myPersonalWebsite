import request from '@/utils/request'

// 文章列表
export function getArticalListApi (params) {
  return request({
    url: '/artical/getArtical',
    method: 'get',
    params: params
  });
}

// 文章列表
export function addArticalItemApi (params) {
  return request({
    url: '/artical/new',
    method: 'post',
    data: params
  });
}

// 文章详情
export function getArticalItemDetailApi (id) {
  return request({
    url: `/artical/getArtical/${id}`,
    method: 'get'
  })
}

// 获取文章评论
export function getArticalItemCommentApi (params) {
  return request({
    url: `/comment/getComment/web`,
    method: 'get',
    params: params
  })
}

// 添加文章评论
export function addArticalCommentApi (params) {
  return request({
    url: `/comment/new`,
    method: 'post',
    data: params
  })
}

// 分类
export function getClassifylistApi (params) {
  return request({
    url: `/classify/getClassify`,
    method: 'get',
    params: params
  })
}
