<template>
    <el-dialog
            size="full"
            title="预支详情"
            v-model="DetailDialogVisible">
        <el-form ref="form" :model="form"  label-width="0px">
            <el-form-item label="预支编号"  prop="prepayNo" v-show="false">
                <el-input v-model="form.prepayNo"></el-input>
            </el-form-item>
        </el-form>
      <el-col>
        <form-box title="查询">
          <el-form class="query-modal-lg" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
            <div class="query-params">
            <el-form-item label="订单号" :label-width="labelWidth" prop="orderNo">
              <el-input v-model="form.orderNo" placeholder="请输入订单号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
              <el-input v-model="form.cabinetNo" placeholder="请输入箱号" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="订舱单号" :label-width="labelWidth" prop="bookSpaceNo">
              <el-input v-model="form.bookSpaceNo" placeholder="请输入订舱单号" class='control-width'></el-input>
            </el-form-item>
                <el-form-item label="行程结束日期" prop="endDateStart" style="margin-right:2px">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateStart" style="width:150px" @change="endDateStartChange"></el-date-picker>
                </el-form-item>
                <label style="padding-right:0;padding-top:11px;">-</label>
                <el-form-item label="" :label-width="labelWidth" prop="endDateEnd">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.endDateEnd" style="width:150px" @change="endDateEndChange"></el-date-picker>
                </el-form-item>
            </div>
            <div class="query-btns">
            <el-form-item style="float:rigth">
              <el-button type="primary" icon="search" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
              <el-button type="success" icon="setting" @click="resetForm('form')">清空</el-button>
            </el-form-item>
            </div>
          </el-form>
        </form-box>
      </el-col>


      <div>当前页总计: <span style="color:red">{{pageTotalAmount}}元</span>&nbsp;总计:<span style="color:red"> {{advancedDetailAmount}}元</span></div>
        <el-table border maxHeight="600" :data="detailDataList.data" stripe>
            <el-table-column prop="deptName" label="子公司" width="100"></el-table-column>
            <el-table-column prop="carTeamName" label="物流公司" width="100"></el-table-column>
            <el-table-column prop="orderModel" label="订单模式" width="40"></el-table-column>
            <el-table-column prop="driver" label="司机/车牌" width="100"></el-table-column>
            <el-table-column prop="orderNo" label="订单号" width="100"></el-table-column>
            <el-table-column prop="conType" label="箱型" width="50"></el-table-column>
            <el-table-column prop="bookspaceNo" label="订舱单号" width="100"></el-table-column>
            <el-table-column prop="cabinetNo" label="柜号" width="100"></el-table-column>
            <el-table-column prop="orderTypeText" label="任务类型" width="40"></el-table-column>
            <el-table-column prop="address" label="送货地址" width="130"></el-table-column>
          <el-table-column label="应付" align="center">
            <el-table-column prop="freight" label="实际运费（元）" width="120"></el-table-column>
            <el-table-column prop="overtimeCost" label="超时费（元）" width="120"></el-table-column>
            <el-table-column prop="nightCost" label="压夜费（元）" width="120"></el-table-column>
            <el-table-column prop="othersEndCost" label="改送费（元）" width="120"></el-table-column>
            <el-table-column prop="morepointCost" label="多门点服务费（元）" width="140"></el-table-column>
            <el-table-column prop="adjustCost" label="调整运费（元）" width="120"></el-table-column>
          </el-table-column>
            <el-table-column prop="total" label="合计应付（元）" width="120"></el-table-column>
            <el-table-column prop="date" label="日期" width="100"></el-table-column>
        </el-table>
      <el-col style="padding:0px 0;text-align:center;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       :current-page="pageNo"
                       :page-size="pageSize"
                       :total="pageCount"
                       :page-sizes="pagesizes">
        </el-pagination>

      </el-col>
      <el-col style="padding:10px 0;text-align:right;">
        <el-button type="primary" icon="close" @click="closeDialog">关闭</el-button>
      </el-col>
    </el-dialog>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import pagination  from '../../../common/mixins/pagination'


    export default {
        mixins:[pagination],
        components:{},
        advance:'',
        data() {
            return {
                labelWidth:'100px',
                DetailDialogVisible:false,
                form: {
                    advanceId:'',//预支id
                    orderNo:'',//订单号
                    cabinetNo:'',//箱号
                    bookSpaceNo:'',//定舱单号
                  endDateStart:'',
                  endDateEnd:''
                },
                detail:{}
            }
        },
        computed:{
            ...mapGetters([
                'detailDataList','advancedDetailAmount'
            ]),
          pageTotalAmount: function () {
                let total = 0;
            this.detailDataList.data &&  this.detailDataList.data.forEach((res)=>{
                if(res.freight){
                    total = total+parseFloat(res.freight);
                }
                if(res.overtimeCost){
                  total = total+parseFloat(res.overtimeCost);
                }
              if(res.nightCost){
                total = total+parseFloat(res.nightCost);
              }
              if(res.othersEndCost){
                total = total+parseFloat(res.othersEndCost);
              }
              if(res.morepointCost){
                total = total+parseFloat(res.morepointCost);
              }
              if(res.adjustCost){
                total = total+parseFloat(res.adjustCost);
              }
            });
            return total;
          }
        },
        methods: {
            ...mapActions([
                'getDetailDataList','getAdvancedDetailAmount'
            ]),
          // 获取行程开始日期
          endDateStartChange(val) {
            this.form.endDateStart = val;
          },
          // 获取行程结束日期
          endDateEndChange(val) {
            this.form.endDateEnd = val;
          },
            init(){
                this.getAmunt();
                this.getList()
            },
            getList(){
               this.pageHandler(this.form,this.getDetailDataList)
            },
            getAmunt(){
              this.getAdvancedDetailAmount(this.form);
            },
            onSubmit() {
                console.log(this.form);
                this.init()
            },
            closeDialog(){
                this.DetailDialogVisible = false;
                //this.$refs['form'].resetFields()
            },
            resetForm(formName) {
              this.$refs[formName].resetFields();
            }

        },
        watch:{
            detail(val){
                //this.form.prepayNo = val.prepayNo
//                Object.assign(this.form,val)
                for(var o in this.form){
                  this.form[o]='';
                }
                if(val != null){
                    this.form.advanceId = val.advanceId;
                }
               // this.$refs.advanceSettlementDetail.form.prepayNo = row.prepayNo
                this.init()
            }
        },
       /* created(){
            this.init()
        },*/
       beforeRouteEnter(to,from,next){
        next(vm=>{
          vm.init()
        })
        }
//        mounted(){
//            console.log(this.page)
//        }
    }
</script>
<style>
  @import '../../../styles/custom-theme/query-modal-lg.css';
</style>
