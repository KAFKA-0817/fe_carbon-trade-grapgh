import { createRouter, createWebHashHistory } from "vue-router";
import ClientTable from "../components/ClientTable.vue";

const routes = [
  {
    path: "/client",
    component: ClientTable,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
