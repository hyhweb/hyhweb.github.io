<template>
  <div>

    <el-tabs v-model="activeName"  type="card"  @tab-click="handleClick">

      <el-tab-pane label="未指派" name="un_assign">
      </el-tab-pane>
      <el-tab-pane label="未发布" name="un_release">
      </el-tab-pane>
      <el-tab-pane label="已发布" name="assigned">
      </el-tab-pane>
      <el-tab-pane label="执行中" name="execution">
      </el-tab-pane>
      <el-tab-pane label="已挂起" name="hang_up">
      </el-tab-pane>
      <el-tab-pane label="已完成" name="completed">
      </el-tab-pane>
      <el-tab-pane label="全部" name="all">
      </el-tab-pane>
    </el-tabs>
    <v-scheduleList ref="scheduleList" :schedule-status="activeStatus"  :initData="initData"></v-scheduleList>
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
  import {getListInit} from '../../../api/modules/dispatch'
  import scheduleList  from './ScheduleList.vue'

  export default {
    data() {
      return {
        activeName: "un_assign",
        activeStatus: "un_assign",
        params:{},
        initData:{
          dispatchTypes: [],
          docks: [],
          shipCompanys:[],
          carTeams:[],
          trailers: [],
          carTeamsWithoutCashSettlement:[]
        }
      }
    },
    components: {
      'v-scheduleList': scheduleList
    },
    methods: {
      handleClick(tab){
        this.activeStatus = tab.name;
      },
      getListInit(){
        getListInit().then((res) =>{
          let data = res.data;
          if(data.code==1){
            this.initData=data.data;
          }
        });
      }
    },
    mounted(){
      this.getListInit();
    },
    beforeDestroy(){
      console.log("ScheduleIndex.vue beforeDestroy");
      this.$refs.scheduleList.$destroy();
    }


  }

</script>


