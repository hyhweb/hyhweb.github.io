<template>
        <div>

            <el-tabs v-model="activeName"  type="card"  @tab-click="handleClick">
                <el-tab-pane label="送货列表" name="first">
                </el-tab-pane>
                <!-- 装货列表 -->
                <el-tab-pane label="装货列表" name="second">

                </el-tab-pane>

            </el-tabs>
          <v-dispatchList ref="dispatchList"   :order-type="activeType" :init-data="initData">></v-dispatchList>
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
    import dispatchList  from './DispatchList.vue'
    import {getDispatchListInit} from '../../../api/modules/dispatch';


    export default {
        data() {
            return {
                activeName: "first",
                activeType: 2,
              initData:{
                shipCompanys:[]
              }
            }
        },
        components: {
            'v-dispatchList': dispatchList

        },
        methods: {
            handleClick(tab){
                this.activeType= tab.name=='first' ? 2 : 1;


            },
          getDispatchListInit(){
            getDispatchListInit().then((res) =>{
              let data = res.data;
              if(data.code==1){
                this.initData=data.data;
              }
            });
          }
        },
      mounted(){
        this.getDispatchListInit();
      },
      beforeDestroy(){
        console.log("DispatchIndex.vue beforeDestroy");
        this.$refs.dispatchList.$destroy();
      }


    }

</script>


