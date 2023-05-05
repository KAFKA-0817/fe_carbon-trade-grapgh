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
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                    <el-table-column fixed="right" label="Operations" width="120">
                        <template #default>
                            <el-button link type="primary" size="small" @click="handleClick">Edit</el-button>
                            <el-button link type="danger" size="small" @click="handleClick">Delete</el-button>
                        </template>
                    </el-table-column>
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

const handleClick = () => {
    console.log("onClick!");
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
    name: "ProducerTable",
    data() {
        return {
            tableData: tableData,
        };
    },
    methods: {
        onSubmit,
        onclick
    },
};
</script>
  