import { createRouter, createWebHashHistory } from "vue-router";
import ClientTable from "../components/ClientTable.vue";
import DistributorTable from "../components/DistributorTable.vue";
import ProducerTable from "../components/ProducerTable.vue";
import SupplierTable from "../components/SupplierTable.vue";


const routes = [
  {
    path: "/client",
    component: ClientTable,
  },
  {
    path: "/distributor",
    component: DistributorTable,
  },
  {
    path: "/producer",
    component: ProducerTable,
  }, {
    path: "/supplier",
    component: SupplierTable,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
