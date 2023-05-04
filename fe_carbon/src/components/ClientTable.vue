<template>
  <div class="common-layout">
    <el-container>
      <el-header style="margin-top: 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="Approved by">
            <el-input placeholder="输入客户结点名" />
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-select placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Query</el-button>
          </el-form-item>
        </el-form>
      </el-header>

      <el-main>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </el-main>

      <el-footer>
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
const onSubmit = () => {
  console.log("submit!");
};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

export default {
  name: "ClientTable",
  data() {
    return {
      tableData: tableData,
    };
  },
  methods: {
    onSubmit,
  },
};
</script>
