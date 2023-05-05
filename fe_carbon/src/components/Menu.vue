<script>
export default {
  name: "Menu",
};
</script>

<template>
  <el-row style="height: 100%">
    <el-menu default-active="/client" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/1" style="height: 10%">
        <i class="el-icon-menu"></i>
        <span style="font-size: 17px">事务详情查询</span>
      </el-menu-item>
      <el-menu-item index="/client" style="height: 10%">
        <i class="el-icon-menu"></i>
        <span style="font-size: 17px">客户结点</span>
      </el-menu-item>
      <el-menu-item index="/distributor" style="height: 10%">
        <i class="el-icon-document"></i>
        <span slot="title" style="font-size: 17px">配送部门结点</span>
      </el-menu-item>
      <el-menu-item index="/producer" style="height: 10%">
        <i class="el-icon-document"></i>
        <span slot="title" style="font-size: 17px">生产部门结点</span>
      </el-menu-item>
      <el-menu-item index="/supplier" style="height: 10%">
        <i class="el-icon-document"></i>
        <span slot="title" style="font-size: 17px">采购部门结点</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>
