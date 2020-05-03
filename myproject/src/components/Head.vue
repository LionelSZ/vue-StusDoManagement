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
        <!-- <el-tooltip class="item" effect="dark" content="给出姓名或学号执行插入后，查询是否被插入" placement="right">
          <el-menu-item index="2-2">插入</el-menu-item>
        </el-tooltip>-->
        <el-tooltip class="item" effect="dark" content="给出姓名或学号执行删除后，查询是否被删除" placement="right">
          <el-menu-item index="2-3">删除</el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="给出两学生的姓名或学号执行交换后，查询是否被交换" placement="right">
          <el-menu-item index="2-4">交换</el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="给出房间号，列出该房间的入住学生即可" placement="right">
          <el-menu-item index="2-5">查询</el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="宿舍没住满情况显示" placement="right">
          <el-menu-item index="2-6">统计</el-menu-item>
        </el-tooltip>
      </el-submenu>
      <!-- <el-menu-item index="3"></el-menu-item> -->
    </el-menu>

    <!-- 删除模块 -->
    <div>
      <el-dialog title="删除" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="学生ID" :label-width="formLabelWidth">
            <el-input v-model="form.sId" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="DelBysId">确定删除</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 查询模块 -->
    <div>
      <!-- <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button> -->

      <el-dialog title="宿舍号列表" :visible.sync="outerVisible">
        <el-form :model="form">
          <el-form-item label="宿舍ID" :label-width="formLabelWidth">
            <el-input v-model="form.dId" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer"></div>
        <el-dialog width="50%" title="学生信息列表" :visible.sync="innerVisible" append-to-body>
          <el-table :data="tableData" height="300" border style="width: 100%">
            <el-table-column property="SID" label="学号" width="150"></el-table-column>
            <el-table-column property="DID" label="宿舍编号" width="200"></el-table-column>
            <el-table-column property="SNAME" label="名字"></el-table-column>
            <el-table-column property="SGENDER" label="性别"></el-table-column>
            <el-table-column property="SDEPARTMENT" label="院系"></el-table-column>
          </el-table>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="queryStusDoByDid">查询</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DelStus from "@/components/DelStus.vue";
import axios from "axios";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      dialogFormVisible: false,
      form: {
        sId: "",
        dId: ""
      },
      formLabelWidth: "120px",
      outerVisible: false,
      innerVisible: false,
      tableData: []
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == "2-1") {
        this.$router.push("/AddStuPage");
      } else if (key == "2-3") {
        this.dialogFormVisible = true;
      } else if (key == "2-4") {
        this.$router.push("/ExChange");
      } else if (key == "2-5") {
        this.outerVisible = true;
      } else if (key == "2-6") {
        this.$router.push("/Dormitory");
      }
    },
    DelBysId() {
      //   alert(this.form.sId)
      axios
        .get("http://localhost:8888/DelStusDo", {
          params: {
            sId: this.form.sId
          }
        })
        .then(res => {
          console.log(res.data);
          if (res.data > 0) {
            this.open2();
            this.$router.push("/index");
            setTimeout(() => {
              window.location.reload();
            }, 600);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    open2() {
      this.$message({
        message: "恭喜你，删除成功",
        type: "success"
      });
    },
    queryStusDoByDid() {
      this.innerVisible = true;
      axios
        .get("http://localhost:8888/getDormitoryNumberByDid", {
          params: {
            dId: this.form.dId
          }
        })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
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
