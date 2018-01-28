 <template>
  <div>

    <el-tabs v-model="activeName"  type="card"  @tab-click="handleClick">

      <el-tab-pane label="待调度核单" name="dispatch" :disabled="this.$global.isDisabled(200)" v-if="jurisdictionDis">
      </el-tab-pane>
      <el-tab-pane label="待子公司财务核单" name="finance" :disabled="this.$global.isDisabled(201)" v-if="jurisdictionFin">
      </el-tab-pane>
      <el-tab-pane label="待子公司总监核单" name="inspector" :disabled="this.$global.isDisabled(202)" v-if="jurisdictionIns">
      </el-tab-pane>
      <el-tab-pane label="待总公司出纳转账核单" name="cashier" :disabled="this.$global.isDisabled(203)" v-if="jurisdictionCas">
      </el-tab-pane>
      <el-tab-pane label="已支付" name="already" :disabled="this.$global.isDisabled(204)" v-if="jurisdictionAlr">
      </el-tab-pane>
      <el-tab-pane label="全部" name="all" :disabled="this.$global.isDisabled(205)" v-if="jurisdictionAll">
      </el-tab-pane>
    </el-tabs>
    <v-CashSettlementList ref="CashSettlementList" :cash-status="activeStatus"  :initData="initData"></v-CashSettlementList>
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
  import {getCashSettlementListInit} from '../../../api/modules/settlement'
  import CashSettlementList  from './CashSettlementList.vue'

  export default {
    data() {
      return {
        jurisdictionDis:true,
        jurisdictionFin:true,
        jurisdictionIns:true,
        jurisdictionCas:true,
        jurisdictionAlr:true,
        jurisdictionAll:true,
        activeName: "dispatch",
        activeStatus: "dispatch",
        params:{},
        initData:{
          childCompanys:[],//子公司
           plateNumbers:[],//车牌
           bankNames:[]//银行
        }
      }
    },
    components: {
      'v-CashSettlementList': CashSettlementList
    },
    methods: {
      handleClick(tab){
        this.activeStatus = tab.name;
      },
      getCashSettlementListInit(){
        // const permissions = JSON.parse(sessionStorage.getItem('permissions'));
        // console.log(permissions[this.$route.path])
        getCashSettlementListInit().then((res) =>{
          let data = res.data;
          if(data.code==1){
            this.initData=data.data;
          }
        });
      }
    },
    mounted(){
      this.getCashSettlementListInit();
      // 根据权限显示tab页面
      if (this.$global.isDisabled(200) == true) {
        this.jurisdictionDis =false;
      }
      if (this.$global.isDisabled(201) == true) {
        this.jurisdictionFin =false;
      }
      if (this.$global.isDisabled(202) == true) {
        this.jurisdictionIns =false;
      }
      if (this.$global.isDisabled(203) == true) {
        this.jurisdictionCas =false;
      }
      if (this.$global.isDisabled(204) == true) {
        this.jurisdictionAlr =false;
      }
      if (this.$global.isDisabled(205) == true) {
        this.jurisdictionAll =false;
      }
      // 根据权限，显示不同页面
      // 超级管理员
      const permissions = JSON.parse(sessionStorage.getItem('permissions'));
      if ('*' in permissions) {
        this.activeName = 'dispatch'
        this.activeStatus = 'dispatch'
        return
      }
      var isDisabled = this.$global.isDisabled(200) == false && this.$global.isDisabled(201) == false && this.$global.isDisabled(202) == false && this.$global.isDisabled(203) == false && this.$global.isDisabled(204) == false && this.$global.isDisabled(205) == false
      if (isDisabled) {
        // 现结tab全部显示权限
        this.activeName = 'dispatch'
        this.activeStatus = 'dispatch'
      }else if (this.$global.isDisabled(203) == false) {
        // 总公司财务
        this.activeName = 'cashier'
        this.activeStatus = 'cashier'
      }else if (this.$global.isDisabled(202) == false) {
        // 子公司总监
        this.activeName = 'inspector'
        this.activeStatus = 'inspector'
      }else if (this.$global.isDisabled(201) == false) {
        // 子公司财务
        this.activeName = 'finance'
        this.activeStatus = 'finance'
      }else if (this.$global.isDisabled(200) == false) {
        // 子公司调度
        this.activeName = 'dispatch'
        this.activeStatus = 'dispatch'
      }
    },
    beforeDestroy(){
      console.log("ScheduleIndex.vue beforeDestroy");
      this.$refs.CashSettlementList.$destroy();
    }


  }

</script>


