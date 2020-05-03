<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
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
      </el-col>
    </el-row>
    <el-dialog title="交换" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学号1">
          <el-input v-model="form.sId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号2">
          <el-input v-model="form.sId2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="exChange()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import PageByTable from "@/components/PageByTable.vue";
import axios from "axios";
export default {
  components: {
    PageByTable
  },
  data() {
    return {
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
      tableData: [], //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
      tag: false,
      dialogFormVisible: true,
      form: {
        sId: "",
        sId2: ""
      }
    };
  },
  methods: {
    exChange() {
      this.dialogFormVisible = false;
      axios
        .get("http://localhost:8888/ExChangeStusDo", {
          params: {
            sId: this.form.sId,
            sId2: this.form.sId2
          }
        })
        .then(res => {
          console.log(res.data);
          if (res.data == "200") {
            this.open2();
            axios.get("http://localhost:8888/getStusDo").then(
              response => {
                console.log(response.data);
                this.tableData = response.data;
              },
              response => {
                console.log("error");
              }
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    open2() {
      this.$message({
        message: "恭喜你，交换宿舍成功",
        type: "success"
      });
    },
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
