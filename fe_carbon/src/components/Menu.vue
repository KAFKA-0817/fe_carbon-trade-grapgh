<script>
export default {
  name: "Menu",
};
</script>

<template>
  <el-row style="height: 100%">
    <el-menu default-active="/client" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/current" style="height: 10%">
        <i class="el-icon-menu"></i>
        <span style="font-size: 15px">当前事务路径图</span>
      </el-menu-item>
      <el-menu-item index="/transactionList" style="height: 10%">
        <i class="el-icon-menu"></i>
        <span style="font-size: 15px">历史事务查询</span>
      </el-menu-item>
      <el-menu-item index="/client" style="height: 10%">
        <i class="el-icon-menu"></i>
        <span style="font-size: 15px">客户结点</span>
      </el-menu-item>
      <el-menu-item index="/distributor" style="height: 10%">
        <i class="el-icon-document"></i>
        <span slot="title" style="font-size: 15px">配送部门结点</span>
      </el-menu-item>
      <el-menu-item index="/producer" style="height: 10%">
        <i class="el-icon-document"></i>
        <span slot="title" style="font-size: 15px">生产部门结点</span>
      </el-menu-item>
      <el-menu-item index="/supplier" style="height: 10%">
        <i class="el-icon-document"></i>
        <span slot="title" style="font-size: 15px">采购部门结点</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>
