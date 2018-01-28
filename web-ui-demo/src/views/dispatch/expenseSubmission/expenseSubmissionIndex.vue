<template>
  <div>

    <el-tabs v-model="activeName"  type="card"  @tab-click="handleClick">

      <el-tab-pane label="待提交" name="un_submission">
      </el-tab-pane>
      <el-tab-pane label="已提交" name="submission">
      </el-tab-pane>
      <el-tab-pane label="全部" name="all">
      </el-tab-pane>
    </el-tabs>
   <v-expenseSubmissionList ref="expenseSubmissionList" :submission-status="activeStatus" :initData="initData"></v-expenseSubmissionList>
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
    import {getListExpenseByCS} from '../../../api/modules/dispatch'
    import expenseSubmissionList  from './expenseSubmissionList.vue'
    export default{
      data(){
      return {
            activeName: "un_submission",
            activeStatus: "un_submission",
            params:{},
        initData:{
          dispatchTypes: [],
                trailers: [],
                costTypes:[],
                users:[]
            }
          }
      },
    components: {
          'v-expenseSubmissionList': expenseSubmissionList
      },
    methods: {
      handleClick(tab){
        this.activeStatus = tab.name;
      },
      getListInit(){
            getListExpenseByCS().then((res) =>{
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
          console.log("expenseSubmissionList.vue beforeDestroy");
          this.$refs.expenseSubmissionList.$destroy();
      }
    }
</script>


