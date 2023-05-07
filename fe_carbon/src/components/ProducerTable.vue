<template>
  <div class="common-layout">
    <el-container>
      <el-header style="margin-top: 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="Producer Name">
            <el-input placeholder="输入生产部门结点名" />
          </el-form-item>
          <el-form-item label="Producer Coordinate">
            <el-input placeholder="输入生产部门结点坐标" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Query</el-button>
          </el-form-item>
        </el-form>
      </el-header>

      <el-main>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="名称" width="180" />
          <el-table-column prop="capacity" label="生产能力" width="180" />
          <el-table-column prop="epp" label="单位生产碳排放" />
          <el-table-column prop="cpp" label="单位生产成本" />
          <el-table-column prop="coordinate" label="坐标" />
          <el-table-column fixed="right" label="Operations" width="120">
            <template #header>
              <el-button
                button
                type="primary"
                size="large"
                @click="addDialogVisible = true"
                >Add</el-button
              >
            </template>
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleEdit(scope)"
                >Edit</el-button
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
          layout="prev, pager, next"
          :page-count="pages"
          v-model:current-page="current"
          @current-change="reloadTable"
          style="margin-left: 35%; margin-top: 20px"
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

  <el-dialog v-model="addDialogVisible" title="Shipping address">
    <el-form :model="addForm">
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="capacity" :label-width="formLabelWidth">
        <el-input v-model="addForm.capacity" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="cpp" :label-width="formLabelWidth">
        <el-input v-model="editForm.cpp" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="epp" :label-width="formLabelWidth">
        <el-input v-model="editForm.epp" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="x" :label-width="formLabelWidth">
        <el-input v-model="addForm.x" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="y" :label-width="formLabelWidth">
        <el-input v-model="addForm.y" autocomplete="off" size="small" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAdd"> Add </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="editDialogVisible" title="Shipping address">
    <el-form :model="editForm">
      <el-form-item label="id" :label-width="formLabelWidth">
        <el-input v-model="editForm.id" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="capacity" :label-width="formLabelWidth">
        <el-input v-model="editForm.capacity" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="cpp" :label-width="formLabelWidth">
        <el-input v-model="editForm.cpp" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="epp" :label-width="formLabelWidth">
        <el-input v-model="editForm.epp" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="x" :label-width="formLabelWidth">
        <el-input v-model="editForm.x" autocomplete="off" size="small" />
      </el-form-item>
      <el-form-item label="y" :label-width="formLabelWidth">
        <el-input v-model="editForm.y" autocomplete="off" size="small" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmEdit"> Edit </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { getAllProducers } from "../service/api.js";

export default {
  name: "ProducerTable",
  setup() {
    const tableData = ref([]);
    const current = ref(0);
    const pages = ref(0);
    const size = 10;

    onMounted(() => {
      getAllProducers({ current: "1", size: size }).then((res) => {
        tableData.value = res.data.data.records;
        current.value = res.data.data.current;
        pages.value = res.data.data.pages;
      });
    });

    const reloadTable = () => {
      getAllProducers({ current: current.value, size: size }).then((res) => {
        tableData.value = res.data.data.records;
        current.value = res.data.data.current;
        pages.value = res.data.data.pages;
      });
    };

    const deleteForm = reactive({
      id: "",
    });

    const addForm = reactive({
      name: "",
      capacity: "",
      cpp: "",
      epp: "",
      x: "",
      y: "",
    });

    const editForm = reactive({
      id: "",
      name: "",
      capacity: "",
      cpp: "",
      epp: "",
      x: "",
      y: "",
    });

    const onSubmit = () => {
      console.log("submit!");
    };

    const handleDelete = (scope) => {
      deleteDialogVisible.value = true;
      deleteForm.id = scope.row.id;
    };

    const handleEdit = (scope) => {
      editDialogVisible.value = true;
      editForm.id = scope.row.id;
      editForm.name = scope.row.name;
      editForm.demand = scope.row.demand;
      editForm.cpp = scope.row.cpp;
      editForm.epp = scope.row.epp;
      editForm.x = scope.row.x;
      editForm.y = scope.row.y;
    };

    const confirmEdit = () => {
      editDialogVisible.value = false;
      console.log(editForm);
    };

    const confirmAdd = () => {
      addDialogVisible.value = false;
      console.log(addForm);
    };

    const confirmDelete = () => {
      deleteDialogVisible.value = false;
      console.log(deleteForm.id);
      // location.reload();
    };

    const deleteDialogVisible = ref(false);
    const addDialogVisible = ref(false);
    const editDialogVisible = ref(false);
    const formLabelWidth = "140px";

    return {
      reloadTable,
      current,
      pages,
      formLabelWidth,
      tableData,
      confirmAdd,
      deleteForm,
      addForm,
      editForm,
      onSubmit,
      deleteDialogVisible,
      addDialogVisible,
      editDialogVisible,
      confirmDelete,
      handleDelete,
      handleEdit,
      confirmEdit,
    };
  },
};
</script>
