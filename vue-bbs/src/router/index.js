import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Doc from '@/components/Doc'
import Download from '@/components/Download'
import Article from '@/components/Article'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            name:'home',
            component:Main
        },
        {
            path:'/doc',
            name:'doc',
            component:Doc
        },
        {
            path:'/download',
            name:'download',
            component:Download
        },
        {
            path:'/article/:id',
            name:'article',
            component:Article,
        },
    ]
})
