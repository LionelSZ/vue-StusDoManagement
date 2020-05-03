<template>
    <!-- <div clasCs="mp"> -->
        <!-- <test></test> -->
        <!-- <upload></upload> -->
        <!-- <page></page> -->
        
        <!-- <menu-left class="left_page"></menu-left> -->
        <!-- <PageByTable class="right_page"></PageByTable> -->
            
    <!-- </div> -->
    <div class="mg">
        <el-row :gutter="24">
            <el-col :span="24"><div class="grid-content bg-purple-dark"><Head></Head></div></el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="4"><div class="grid-content bg-purple"><menu-left></menu-left></div></el-col>
            <el-col :span="19"><div class="grid-content bg-purple-light"><PageByTable></PageByTable></div></el-col>
        </el-row>
    </div>
</template>
<script>
import Test from '@/components/Test.vue'
import Head from '@/components/Head.vue'
import AddStu from '@/components/AddStu.vue'
import MenuLeft from '@/components/MenuLeft.vue'
import Page from '@/components/Page.vue'
import PageByTable from '@/components/PageByTable.vue'
import DelStus from '@/components/DelStus.vue'
export default {
    components:{
        Head,
        Test,
        AddStu,
        MenuLeft,
        Page,
        PageByTable,
        DelStus,
    }
}
</script>
<style>
.mg {
    margin-top: -60px;
    padding: 0;
}
.el-row {
    margin-bottom: 20px;
    
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>