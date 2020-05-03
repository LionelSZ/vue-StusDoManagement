<template>
  <div class="mg">
    <div style="height:70px">
      <el-divider></el-divider>
      <el-page-header @back="goBack" content="添加页面"></el-page-header>
      <el-divider></el-divider>
    </div>
    <br />
    <br />
    <br />

    <el-form ref="form" :model="form" label-width="300px">
      <el-form-item label="宿舍号:" style="width:800px">
        <el-input v-model="form.dId"></el-input>
      </el-form-item>
      <el-form-item label="性别:" style="width:800px">
        <el-input v-model="form.sGender"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" style="width:800px">
        <el-input v-model="form.sName"></el-input>
      </el-form-item>
      <el-form-item label="院系:" style="width:800px">
        <el-input v-model="form.sDepartments"></el-input>
      </el-form-item>

      <el-form-item style="width:75%">
        <el-button type="primary" @click="onSubmit">录入</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      <!-- <el-button :plain="true" @click="open2">成功</el-button> -->
    </el-form>
    
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        dId: "",
        sGender: "",
        sName: "",
        sDepartments: ""
      },
       value: new Date()
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      if(this.form.dId == "" || this.form.sGender == "" || this.form.sName == "" || this.form.sDepartments == ""){
        this.open3();
        return;
      }
      axios
        .get("http://localhost:8888/AddStusDo", {
          params: {
            dId: this.form.dId,
            sGender: this.form.sGender,
            sName: this.form.sName,
            sDepartments: this.form.sDepartments
          }
        })
        .then(res => {
          //   console.log(res.data);
          if (parseInt(res.data) > 0) {
            this.open2();
            this.$router.push("/index");
          }
        });
    },
    goBack() {
    //   console.log("go back");
        this.$router.push('/index')
    },
    open2() {
      this.$message({
        message: "恭喜你，添加成功",
        type: "success"
      });
    },
    open3() {
      this.$message({
        message: "不能为空!!",
        type: "warning"
      });
    }
  }
};
</script>
<style>
.mg {
  margin-top: -40px;
  padding: 0;
}
</style>