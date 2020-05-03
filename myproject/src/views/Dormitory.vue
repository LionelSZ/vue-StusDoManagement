<template>
  <div>
      <el-button type="primary" @click="toIndex" icon="el-icon-arrow-left" style="float:left">返回首页</el-button>
      <h1>宿舍详情信息</h1>
      <!-- <el-divider></el-divider> -->
      <!-- <el-divider></el-divider> -->
      <!-- <el-h1>111111</el-h1> -->
    
    <el-table :data="tableData" border style="width: 100%" @row-click="rowFun">
      <el-table-column prop="DID" label="宿舍编号" width="400"></el-table-column>
      <el-table-column prop="COUNT(*)" label="人数" width="400"></el-table-column>
    </el-table>
    <div>
      <el-dialog title="宿舍详情人数" :visible.sync="dialogTableVisible">
        <el-table :data="StusDoNumberData">
          <el-table-column property="SID" label="学号" width="150"></el-table-column>
          <el-table-column property="DID" label="宿舍编号" width="200"></el-table-column>
          <el-table-column property="SNAME" label="名字"></el-table-column>
          <el-table-column property="SGENDER" label="性别"></el-table-column>
          <el-table-column property="SDEPARTMENT" label="院系"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  methods: {
    toIndex(){
      this.$router.push('/index')
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    rowFun(row, column, event) {
      console.log(row.DID);
      axios
        .get("http://localhost:8888/getDormitoryNumberByDid", {
          params: {
            dId: row.DID
          }
        })
        .then(res => {
          console.log(res.data);
          this.dialogTableVisible = true;
          this.StusDoNumberData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      tableData: [],
      StusDoNumberData: [],
        dialogTableVisible: false
    };
  },
  created() {
    axios.get("http://localhost:8888/getDormitoryIn").then(res => {
      // console.log(res.data);
      this.tableData = res.data;
    });
  }
};
</script>

<style>
* {
  margin: 0 auto;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>