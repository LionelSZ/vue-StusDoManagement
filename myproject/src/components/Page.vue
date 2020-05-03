<template>
  <div id="app1">
    <div v-for="item in itemList" v-bind:key="item.name">
      <span>{{item.PNAME}}</span>
      <span>{{item.PID}}</span>
    </div>
    
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "app1",
  data() {
    return {
      itemList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("http://localhost:8888/getProv2").then(
        response => {
          console.log(response.data);

          this.itemList = response.data;
        },
        response => {
          console.log("error");
        }
      );
    }
  }
};
</script>
