<template>
  <div>
    <el-tabs v-model="activeName"  type="card"  @tab-click="handleClick">
      <el-tab-pane label="未完成" name="un_completed">
      </el-tab-pane>
      <el-tab-pane label="已完成" name="completed">
      </el-tab-pane>      
    </el-tabs>
    <v-shipVoyageList ref="shipVoyageList" :complete-status="activeStatus"></v-shipVoyageList>
  </div>
</template>
<style scoped>
  .el-tabs__header{
    margin: 0px;
  }
  #content-container{
    padding-top: 4px;
  }
</style>
<script>
  import {mapGetters, mapActions} from 'vuex' 
  import shipVoyageList  from './shipVoyageList.vue'
  export default {
    data() {
      return {
        activeName: "un_completed",
        activeStatus: "un_completed",
        params:{},
      }
    },
    components: {
      'v-shipVoyageList': shipVoyageList
    },
    methods: {
      handleClick(tab){
        this.activeStatus = tab.name;
      },
    },
    beforeDestroy(){
      this.$refs.shipVoyageList.$destroy();
    }


  }

</script>


