import Vue from 'vue';
import Router from 'vue-router';
import FormTable from './pages/FormTable';
import MultiSelect from './pages/MultiSelect';


Vue.use(Router);

const router = new Router({
routes:[
  {
  path:'/formtable',
  component: FormTable,
  },
  {
  path:'/multiselect',
  component: MultiSelect,
  },
]
})
export default router;