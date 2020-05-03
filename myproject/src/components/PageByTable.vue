<template>
  <div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column prop="SID" label="学生编号"></el-table-column>
      <el-table-column prop="DID" label="宿舍号"></el-table-column>
      <el-table-column prop="SGENDER" label="性别"></el-table-column>
      <el-table-column prop="SNAME" label="名字"></el-table-column>
      <el-table-column prop="SDEPARTMENT" label="院系"></el-table-column>
      <el-table-column label="操作">
        <el-button type="text" @click="Del_Alert">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1,2,3,5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes,prev, pager, next"
        :total="tableData.length"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
      tableData: [] //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("http://localhost:8888/getStusDo").then(
        response => {
          console.log(response.data);
          this.tableData = response.data;
        },
        response => {
          console.log("error");
        }
      );
    },
    //每页下拉显示数据
    handleSizeChange: function(size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
    },
    Del_Alert() {
      const h = this.$createElement;
      this.$msgbox({
        title: "警告",
        message: h("p", null, [
          h("span", null, "您确定删除吗？")
          // h('i', { style: 'color: teal' }, '')
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 700);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "info",
          message: "删除成功"
        });
      });
    }
  }
};
</script>