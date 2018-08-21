import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/views/root/index'
import Web from '@/views/web/index'

import webIndex from '@/views/web/index/index'
import ArticalList from '@/views/web/index/articalList'
import TecArtical from '@/views/web/tecArtical/index'
import EssayArtical from '@/views/web/essayArtical/index'
import Media from '@/views/web/media/index'
import ArticalDetail from '@/views/web/articalDetail'

import End from '@/views/end/index'
import NewArtical from '@/views/end/main/newArtical/index'
import ArticalClassify from '@/views/end/main/classifyMag/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root,
      redirect: {name: 'web'},
      children: [
        {
          path: '/web',
          name: 'web',
          component: Web,
          redirect: {name: 'index'},
          children: [
            {
              path: '/web/index',
              name: 'index',
              component: webIndex,
              redirect: {name: 'articalList'},
              children: [
                {
                  path: '/web/index/articalList',
                  name: 'articalList',
                  component: ArticalList
                },
                {
                  path: '/web/index/articalDeatil',
                  name: 'articalDeatil',
                  component: ArticalDetail
                }

              ]
            },
            {
              path: '/web/tecArtical',
              name: 'tecArtical',
              component: TecArtical
            },
            {
              path: '/web/essayArtical',
              name: 'essayArtical',
              component: EssayArtical
            },
            {
              path: '/web/media',
              name: 'media',
              component: Media
            }]
        },
        {
          path: '/end',
          name: 'end',
          component: End,
          redirect: {name: 'newArtical'},
          children: [
            {
              path: '/end/newArtical',
              name: 'newArtical',
              component: NewArtical
            },
            {
              path: '/end/articalClassify',
              name: 'articalClassify',
              component: ArticalClassify
            },
          ]
        }
      ]
    }]
})
