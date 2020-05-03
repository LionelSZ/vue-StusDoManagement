<template>
  <div>
    <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"> -->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#FFEBCD"
    >
      <el-menu-item index="1">Home</el-menu-item>
      <el-submenu index="2">
        <template slot="title">登记</template>
        <el-tooltip class="item" effect="dark" content="录入信息（学号，宿舍号，性别，姓名，所属院系等）" placement="right">
          <el-menu-item index="2-1">录入</el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="给出姓名或学号执行插入后，查询是否被插入" placement="right">
          <el-menu-item index="2-2">插入</el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="给出姓名或学号执行删除后，查询是否被删除" placement="right">
          <el-menu-item index="2-3">删除</el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="给出两学生的姓名或学号执行交换后，查询是否被交换" placement="right">
          <el-menu-item index="2-4">交换</el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="给出房间号，列出该房间的入住学生即可" placement="right">
          <el-menu-item index="2-5">查询</el-menu-item>
        </el-tooltip>
      </el-submenu>
      <el-menu-item index="3"></el-menu-item>
    </el-menu>
    
    <!-- 删除模块 -->
    <div>
        <el-dialog title="删除" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学生ID" :label-width="formLabelWidth">
          <el-input v-model="form.sId" autocomplete="off" el-type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确定删除</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import DelStus from "@/components/DelStus.vue";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      dialogFormVisible: false,
        form: {
          sId: '',
        //   type: [],
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == "2-1") {
        // alert('123')
        this.$router.push("/AddStuPage");
      }else if(key == '2-3'){
          this.dialogFormVisible = true
      }
    }
  },
  components: {
    DelStus
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
