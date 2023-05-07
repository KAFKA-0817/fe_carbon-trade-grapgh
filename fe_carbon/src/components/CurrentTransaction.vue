<template>
  <el-container>
    <el-header style="margin-top: 50px">
      <el-descriptions title="当前事务详情" border>
        <template #extra>
          <el-button type="primary" @click="changeTransaction">
            Change
          </el-button>
        </template>
        <el-descriptions-item label="事务标题">{{
          description.title
        }}</el-descriptions-item>
        <el-descriptions-item label="总经济成本">{{
          description.totalC
        }}</el-descriptions-item>
        <el-descriptions-item label="总碳排放量">{{
          description.totalE
        }}</el-descriptions-item>
        <el-descriptions-item label="事务结点">
          <span v-for="item in description.vertices">{{ item.name }},</span>
        </el-descriptions-item>
        <el-descriptions-item label="select transaction">
          <el-select
            v-model="transactionId"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in allTransactions"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
    </el-header>

    <el-main style="margin-top: 100px">
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="18"></el-col>
        <el-col :span="2"
          ><el-button link type="primary" @click="addDialogVisible = true">
            Add Nodes
          </el-button></el-col
        >
        <el-col :span="2"
          ><el-button link type="primary" @click="caculateModel">
            calculate
          </el-button></el-col
        >
        <el-col :span="2"
          ><el-button link type="primary" @click="save">
            Save
          </el-button></el-col
        >
      </el-row>
      <div ref="chartRef" style="width: 1500px; height: 700px"></div>
    </el-main>

    <el-footer></el-footer>
  </el-container>

  <el-dialog v-model="addDialogVisible" title="Add Nodes">
    <el-form :model="addForm">
      <el-form-item label="nodes" :label-width="formLabelWidth">
        <el-select
          v-model="addForm.nodes"
          multiple
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in allNodes"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAdd"> Add </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { onMounted, ref, reactive, watch } from "vue";
import * as echarts from "echarts";
import {
  getCurrentTransaction,
  getAllTransactions,
  getAllNodeNames,
  addNodes,
  calculate,
  saveTransaction,
} from "../service/api";

export default {
  name: "CurrentTransaction",
  setup() {
    const formLabelWidth = "140px";
    const chartRef = ref(null);

    const description = ref({});
    const allNodes = ref([]);
    const allTransactions = ref([]);

    const addForm = reactive({
      nodes: [],
    });

    const save = () => {
      let req = {
        totalC: description.value.totalC,
        totalE: description.value.totalE,
      };
      console.log(req);

      saveTransaction(req).then((res) => {
        if (res.data.code === 200) {
          alert("success");
          location.reload();
        }
      });
    };

    const caculateModel = () => {
      calculate().then((res) => {
        if (res.data.code === 200) {
          alert("success");
          description.value = res.data.data;
        }
      });
    };

    const confirmAdd = () => {
      addDialogVisible.value = false;
      addNodes(addForm).then((res) => {
        if (res.data.code === 200) {
          alert("success");
          location.reload();
        }
      });
    };

    const addDialogVisible = ref(false);

    onMounted(() => {
      getCurrentTransaction().then((res) => {
        description.value = res.data.data;
      });

      getAllTransactions().then((res) => {
        allTransactions.value = res.data.data;
      });

      getAllNodeNames().then((res) => {
        allNodes.value = res.data.data;
      });
    });

    watch(description, (newValue, oldValue) => {
      const chart = echarts.init(chartRef.value);
      const option = {
        title: {
          text: "当前事务路径可视化图",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 30,
            roam: true,
            label: {
              show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            data: newValue.vertices,
            links: newValue.edges,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };
      // 初始化echarts实例后，可以进行相应的配置和数据绑定操作
      chart.setOption(option);
    });

    const transactionId = ref("");

    const changeTransaction = () => {
      console.log(transactionId.value);
    };

    return {
      save,
      caculateModel,
      allNodes,
      allTransactions,
      formLabelWidth,
      addForm,
      addDialogVisible,
      confirmAdd,
      description,
      transactionId,
      changeTransaction,
      chartRef,
    };
  },
};
</script>
