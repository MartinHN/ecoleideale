import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Projet from '@/components/ProjetComponent'
import Resources from '@/components/ResourcesComponent'
import FAQ from '@/components/FAQComponent'
import Presse from '@/components/PresseComponent'
import Contact from '@/components/ContactComponent'
import Admin from '@/components/Admin'
import Login from '@/components/LoginComponent'
import ForumPostList from '@/components/ForumPostList'

import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'MainPage', component: MainPage },
    { path: '/Projet', name: 'Projet', component: Projet },
    { path: '/Resources', name: 'Resources', component: Resources },
    { path: '/FAQ', name: 'FAQ', component: FAQ },
    { path: '/Presse', name: 'Presse', component: Presse },
    { path: '/Contact', name: 'Contact', component: Contact },
    { path: '/Forum', name: 'Forum', component: ForumPostList },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/login', name: 'login', component: Login },
    { path: '*', component: NotFoundComponent }
  ]
})

// router.beforeEach((to, from, next) => {
//   console.log('to', to)
//   console.log('from', from)
//   console.log('next', next)
//   router.next(to)
//   // next(to);
//   return true
//   // `to` and `from` are both route objects
// })
export default router
