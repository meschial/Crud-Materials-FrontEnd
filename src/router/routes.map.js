import Home from '@/views/Home'
import Error404 from '@/views/Error404'

const routes = [
    { path: '/', name:'home', component: Home },
    { path: '*', name:'error404', component: Error404 },
  ]
  
  export default routes