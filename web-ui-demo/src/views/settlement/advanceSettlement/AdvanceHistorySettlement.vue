<template>
<el-col>
  <!--列表-->
  <el-col>
    <el-table border height="400" ref="table" @row-click="handleRowClick" :data="AdvanceHistorySettlement" stripe
    >
      <el-table-column type="selection" width="40" fixed >
      </el-table-column>
      <el-table-column
        prop="prepayTime"
        label="预支时间" >
      </el-table-column>
      <el-table-column  class="tableWidth"
        prop="prepayNo"
        label="预支编号" >
      </el-table-column>
      <el-table-column  class="tableWidth"
        prop="deptName"
        label="子公司" >
      </el-table-column>
      <el-table-column  class="tableWidth"
        prop="userName"
        label="操作人" >
      </el-table-column>
      <el-table-column  class="tableWidth"
        prop="carTeamName"
        label="车队" >
      </el-table-column>
      <el-table-column  class="tableWidth"
        prop="driverName"
        label="司机" >
      </el-table-column>
      <el-table-column
        prop="withdraw"
        label="提现金额(元)" class="tableWidth">
      </el-table-column>
      <el-table-column
        prop="freight"
        label="预支运费金额（元）" class="tableWidth">
      </el-table-column>
      <el-table-column
        prop="tsfs"
        label="服务费金额（元）" class="tableWidth">
      </el-table-column>
      <el-table-column
        prop="oilcard"
        label="充油卡金额（元）" class="tableWidth">
      </el-table-column>
      <el-table-column
        prop="intrest"
        label="预支收取利息（元）" class="tableWidth">
      </el-table-column>
      <el-table-column
        prop="carSupplyFunds"
        label="供车款金额（元）" class="tableWidth">
      </el-table-column>
      <el-table-column
        prop="downPayment"
        label="车款首付押金金额（元）" class="tableWidth">
      </el-table-column>
      <el-table-column
        prop="otherCost"
        label="其他费用金额（元）" class="tableWidth">
      </el-table-column>
      <el-table-column
        prop="adjustInterest"
        label="调整利息金额（元）" class="tableWidth">
      </el-table-column>
      <el-table-column  class="tableWidth"
        label="预支状态">
        <template scope="scope">
          <span>{{scope.row.status == 2 ? '审核通过' : '审核失败' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" fixed="right">
        <template scope="scope">
          <el-button size="small" type="primary" @click.native="showDetail(scope.row)" :disabled="isDisabled(29)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>

  <el-col style="padding:10px 0;text-align:center;">
    <el-pagination layout="total, sizes, prev, pager, next, jumper"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange"
                   :current-page="pageNo"
                   :page-size="pageSize"
                   :total="pageCount"
                   :page-sizes="pagesizes">
    </el-pagination>
  </el-col>
  <!-- 预支详情-->
  <AdvanceSettlementDetail ref="advanceSettlementDetail"></AdvanceSettlementDetail>
</el-col>
</template>
<style>
  .tableWidth{
    width:100%
  }

</style>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import AdvanceSettlementDetail  from './AdvanceSettlementDetail.vue'
  import Qs from 'qs'
  export default {
    mixins: [pagination],
    components:{AdvanceSettlementDetail},
    data(){
      return {
        labelWidth: '90px',
        selectData: [],
        initData: {},
        form: {
          user: '',//操作人
          carteam: '',  //车队名称
          driver: '',  //司机名称
          prepayNo: '',//预支编号
          Authorization: '',//token
          yearTime: '',
          monthTime: []
        },
        detail:{}
      }
    },
    computed: {
      ...mapGetters(['hisDataList']),
      AdvanceHistorySettlement(){
        if (this.hisDataList.data == undefined) {
          return []
        } else {
          return this.hisDataList.data
        }

      }
    },
    methods: {
      ...mapActions(['getHisDataList']),
      getList(){
        this.pageHandler(this.form, this.getHisDataList)
      },
      showDetail(row){
//        alert("test"+row.prepayNo);
        this.$refs.advanceSettlementDetail.DetailDialogVisible = true;
        //this.$refs.advanceSettlementDetail.advanceSettlementDialogVisible = true;
        //console.log("enene--"+row.prepayNo)
        this.$refs.advanceSettlementDetail.detail = Object.assign({}, row);
      },


    },

    mounted(){

    }

  }
</script>
