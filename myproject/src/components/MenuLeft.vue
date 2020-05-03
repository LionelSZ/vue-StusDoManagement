<template>
  <el-row class="tac">
    <el-col>
      <!-- <h5>自定义颜色</h5> -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <i class="el-icon-plus"></i>
          <span slot="title">录入</span>
        </el-menu-item>
        <el-menu-item index="2" disabled>
          <i class="el-icon-delete" ></i>
          <span slot="title">删除</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-refresh"></i>
          <span slot="title">交换</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-search"></i>
          <span slot="title">查询</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-document-copy"></i>
          <span slot="title">统计</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath){
      console.log(keyPath);
      if (key == "1") {
        this.$router.push("/AddStuPage");
      } else if (key == "2") {
        // this.dialogFormVisible = true;
      } else if (key == "3") {
        this.$router.push("/ExChange");
      } else if (key == "4") {
        // this.outerVisible = true;
      } else if (key == "5") {
        this.$router.push("/Dormitory");
      }
      
    }
  }
};
</script>