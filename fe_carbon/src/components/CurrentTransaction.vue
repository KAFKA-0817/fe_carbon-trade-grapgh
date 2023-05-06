<template>
  <el-container>
    <el-header style="margin-top: 50px">
      <el-descriptions title="当前事务详情" border>
        <template #extra>
          <el-button type="primary" @click="changeTransaction">
            Change
          </el-button>
        </template>
        <el-descriptions-item label="title">{{
          description.title
        }}</el-descriptions-item>
        <el-descriptions-item label="total_cost">{{
          description.cost
        }}</el-descriptions-item>
        <el-descriptions-item label="total_emission">{{
          description.emission
        }}</el-descriptions-item>
        <el-descriptions-item label="nodes">
          <span v-for="item in description.nodes">{{ item.name }},</span>
        </el-descriptions-item>
        <el-descriptions-item label="select transaction">
          <el-select
            v-model="transactionId"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>
        </el-descriptions-item>
      </el-descriptions>
    </el-header>

    <el-main style="margin-top: 150px">
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="20"></el-col>
        <el-col :span="2"
          ><el-button link type="primary" @click="addDialogVisible = true">
            Add Nodes
          </el-button></el-col
        >
        <el-col :span="2"
          ><el-button link type="primary" @click="changeTransaction">
            Save
          </el-button></el-col
        >
      </el-row>
      <div ref="chartRef" style="width: 800px; height: 500px"></div>
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
            v-for="item in description.nodes"
            :key="item.name"
            :label="item.name"
            :value="item.name"
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
import { onMounted, ref, reactive } from "vue";
import * as echarts from "echarts";

export default {
  name: "CurrentTransaction",
  setup() {
    const formLabelWidth = "140px";
    const chartRef = ref(null);

    const description = {
      title: "transaction_20230430",
      cost: "867991.89",
      emission: "1340",
      nodes: [
        {
          name: "S1",
        },
        {
          name: "S2",
        },
        {
          name: "P1",
        },
        {
          name: "P7",
        },
        {
          name: "D2",
        },
        {
          name: "C1",
        },
        {
          name: "C4",
        },
      ],
    };

    const addForm = reactive({
      nodes: ["S1", "S2"],
    });

    const confirmAdd = () => {
      addDialogVisible.value = false;
      console.log(addForm);
    };

    const addDialogVisible = ref(false);

    onMounted(() => {
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
            data: [
              {
                name: "C1",
                x: 104.47,
                y: 856.72,
              },
              {
                name: "C4",
                x: 766.64,
                y: 254.04,
              },
              {
                name: "S1",
                x: 556.91,
                y: 547.93,
              },
              {
                name: "S2",
                x: 920.29,
                y: 302.05,
              },
              {
                name: "D2",
                x: 621.24,
                y: 633.03,
              },
              {
                name: "P1",
                x: 348.53,
                y: 844.04,
                value: 1000,
              },
              {
                name: "P7",
                x: 756.35,
                y: 4.107,
              },
            ],
            links: [
              {
                source: "S1",
                target: "P1",
                value: 1000,
              },
              {
                source: "S2",
                target: "P7",
                value: 1000,
              },
              {
                source: "P1",
                target: "D2",
                value: 1000,
              },
              {
                source: "P7",
                target: "D2",
                value: 1000,
              },
              {
                source: "D2",
                target: "C1",
                value: 1000,
              },
              {
                source: "D2",
                target: "C4",
                value: 1000,
              },
            ],
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

    const options = [
      {
        label: "transaction1",
        id: "1",
      },
      {
        label: "transaction2",
        id: "2",
      },
      {
        label: "transaction3",
        id: "3",
      },
    ];

    return {
      formLabelWidth,
      addForm,
      addDialogVisible,
      confirmAdd,
      description,
      options,
      transactionId,
      changeTransaction,
      chartRef,
    };
  },
};
</script>
