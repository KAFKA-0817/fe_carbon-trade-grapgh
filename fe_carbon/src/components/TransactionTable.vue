<template>
  <div class="common-layout">
    <el-container>
      <el-header style="margin-top: 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="Transation Name">
            <el-input placeholder="输入事务标题" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">Query</el-button>
          </el-form-item>
        </el-form>
      </el-header>

      <el-main>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="title" label="事务标题" />
          <el-table-column prop="totalE" label="总碳排放量" />
          <el-table-column prop="totalC" label="总经济成本" />
          <el-table-column prop="status" label="事务状态" />
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleGraph(scope)"
                >graph</el-button
              >
              <el-button
                link
                type="danger"
                size="small"
                @click="handleDelete(scope)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>

      <el-footer>
        <el-pagination
          background
          style="margin-left: 35%; margin-top: 20px"
          layout="prev, pager, next"
          :total="1"
        />
      </el-footer>
    </el-container>
  </div>

  <el-dialog v-model="deleteDialogVisible" title="Delete Client">
    <el-form :model="deleteForm" />
    <span>Are you sure to delete?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="confirmDelete"> Delete </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="graphDialogVisible" title="事务路径图">
    <span>图</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="graphDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="graphDialogVisible = false">
          OK
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { getAllTransactions } from "../service/api.js";

export default {
  name: "TransactionTable",
  setup() {
    const tableData = ref([]);

    onMounted(() => {
      getAllTransactions().then((res) => {
        tableData.value = res.data.data;
      });
    });

    const deleteForm = reactive({
      id: "",
    });

    const onSubmit = () => {
      console.log("submit!");
    };

    const handleDelete = (scope) => {
      deleteDialogVisible.value = true;
      deleteForm.id = scope.row.id;
    };

    const handleGraph = (scope) => {
      graphDialogVisible.value = true;
      //绘图
    };

    const confirmDelete = () => {
      deleteDialogVisible.value = false;
      console.log(deleteForm.id);
      // location.reload();
    };

    const deleteDialogVisible = ref(false);
    const graphDialogVisible = ref(false);
    const formLabelWidth = "140px";

    return {
      formLabelWidth,
      tableData,
      deleteForm,
      onSubmit,
      deleteDialogVisible,
      graphDialogVisible,
      confirmDelete,
      handleDelete,
      handleGraph,
    };
  },
};
</script>
