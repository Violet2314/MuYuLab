declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module './router' {
  import { Router } from 'vue-router';
  const router: Router;
  export default router;
}

declare module './store' {
  import { Store } from 'vuex';
  const store: Store<any>;
  export default store;
} 