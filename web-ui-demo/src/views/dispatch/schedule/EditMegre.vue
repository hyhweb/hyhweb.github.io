<template>

    <div class="contentBox">
        <div class="trailerCar">
            <el-form ref="mergeForm"  :model="form" :rules="rules"  label-width="80px" style="padding-top: 10px">
                <table class="taskTable">
                    <thead>
                    <th width="150">车型：不限</th>
                    <th>装货 <i class="el-icon-d-caret"  v-show="shipList.length==2" @click="reverseShipList"></i></th>
                    <th>送货 <i class="el-icon-d-caret"  v-show="deliveryList.length==2" @click="reverseDeliveryList"></i></th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>任务详情</td>
                        <td class="shipTables">

                            <table  v-for="item in shipList">
                                <tr >
                                    <td class="label">行程类型</td>
                                    <td>
                                        {{item.orderType==0 ? '装货' : '送货'}} {{item.cabinetType}}
                                    </td>
                                </tr>
                                <tr >
                                    <td class="label">行程 ID</td>
                                    <td>
                                       {{item.scheduleId}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label">任务编号</td>
                                    <td>
                                        {{item.taskNo}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label">订单编号</td>
                                    <td>{{item.orderNo}}</td>
                                </tr>
                                <tr>
                                    <td class="label">箱号</td>
                                    <td>{{item.cabinetNo}}</td>
                                </tr>
                                <tr>
                                    <td class="label">联系人</td>
                                    <td>{{item.contactName}}</td>
                                </tr>
                                <tr>
                                    <td class="label">船公司</td>
                                    <td> {{item.shipCompanyName}}</td>
                                </tr>
                                <tr>
                                    <td class="label">地址编号</td>
                                    <td>{{item.regionCode}}</td>
                                </tr>
                                <tr>
                                    <td class="label">地址</td>
                                    <td>{{item.address}}</td>
                                </tr>
                                <tr>
                                    <td class="label">码头</td>
                                    <td>{{item.getDockName}}</td>
                                </tr>
                                <tr>
                                    <td class="label">实际运费</td>
                                    <td>￥{{item.realFreight}} 元</td>
                                </tr>
                                <tr>
                                    <td class="label">参考运费</td>
                                    <td><span style="color: red">￥{{item.refFreight}} 元</span></td>
                                </tr>

                                <tr>
                                    <td class="label">要求装送货时间</td>
                                    <td>
                                      {{formatDate(item.requireDate)}}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <div class="pubBtn pubBtn-gray tx" v-show="shipList.length>0 && deliveryList.length>0"><i class="fa fa-arrows-h"></i><div >{{actionTitle}}</div></div>
                                    </td>
                                </tr>
                            </table>
                            <table v-show="shipList.length==1 && deliveryList.length==2" style="height: 390px"></table>
                        </td>
                        <td>
                            <table  v-for="item in deliveryList">
                                <tr >
                                    <td class="label">行程类型</td>
                                    <td>
                                        {{item.orderType==0 ? '装货' : '送货'}} {{item.cabinetType}}
                                    </td>
                                </tr>
                                <tr >
                                    <td class="label">行程 ID</td>
                                    <td>
                                        {{item.scheduleId}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label">任务编号</td>
                                    <td>
                                        {{item.taskNo}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label">订单编号</td>
                                    <td>{{item.orderNo}}</td>
                                </tr>
                                <tr>
                                    <td class="label">箱号</td>
                                    <td>{{item.cabinetNo}}</td>
                                </tr>
                                <tr>
                                    <td class="label">联系人</td>
                                    <td>{{item.contactName}}</td>
                                </tr>
                                <tr>
                                    <td class="label">船公司</td>
                                    <td> {{item.shipCompanyName}}</td>
                                </tr>
                                <tr>
                                    <td class="label">地址编号</td>
                                    <td>{{item.regionCode}}</td>
                                </tr>
                                <tr>
                                    <td class="label">地址</td>
                                    <td>{{item.address}}</td>
                                </tr>
                                <tr>
                                    <td class="label">码头</td>
                                    <td>{{item.getDockName}}</td>
                                </tr>
                                <tr>
                                    <td class="label">实际运费</td>
                                    <td>￥{{item.realFreight}} 元</td>
                                </tr>
                                <tr>
                                    <td class="label">参考运费</td>
                                    <td  style="color: red">￥{{item.refFreight}} 元</td>
                                </tr>

                                <tr>
                                    <td class="label">要求装送货时间</td>
                                    <td>
                                        {{formatDate(item.requireDate)}}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="height: 36px;">
                                    </td>
                                </tr>
                            </table>
                            <table v-show="deliveryList.length==1 && shipList.length==2" style="height: 390px"></table>
                        </td>
                    </tr>
                    <tr>
                        <td>运费总计</td>
                        <td colspan="2" style="padding: 5px;">
                            ￥{{mergeData.totalRealFreight}} 元
                        </td>
                    </tr>
                    <tr>
                        <td>合并后运费总计(参考)</td>
                        <td colspan="2" style="padding: 5px;">
                            <span style="color: red;">￥{{mergeData.totalRefFreight}} 元</span>
                        </td>
                    </tr>
                    <tr>
                        <td>合并后运费总计</td>
                        <td colspan="2" style="padding: 5px;">
                                <el-input v-model="form.totalRealFreight"   class='control-width'></el-input>
                        </td>
                    </tr>
               <!--     <tr>
                        <td>执行日期</td>
                        <td colspan="2" >
                                <el-date-picker
                                        type="date"

                                        style="width: 250px;"
                                        @change="handleSelectDate"
                                        v-model="form.selectDate"
                                        placeholder="选择日期">
                                </el-date-picker>

                        </td>
                    </tr>-->
                    <tr> 
                        <td>指派司机</td>
                        <td colspan="2" style="padding: 5px;">
                            <el-select @change="handleCarTeamSelect" v-model="form.carteamId" placeholder="请选择"  class='control-width' filterable clearable>
                                <el-option v-for="item in carTeamsWithoutCashSettlement"   :key="item.id" :label="item.value" :value="item.id"></el-option>
                            </el-select>
                            <el-select v-model="form.trailerId" placeholder="请选择"  class='control-width' filterable  >
                                <el-option v-for="item in trailers"  :key="item.trailerId" :label="getDriverInfo(item)" :value="item.trailerId"></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>是否发布</td>
                        <td colspan="2" style="padding: 5px;">
                          <el-switch
                            v-model="form.isPublish"
                            on-text="是"
                            off-text="否"
                            on-color="#13ce66"
                            off-color="#ff4949">
                          </el-switch>
                        </td>
                    </tr>
                    <tr>
                        <td>操作</td>
                        <td colspan="2" style="padding: 5px;">
                            <el-button  type="primary" @click="merge('mergeForm')" >保存{{actionTitle}}</el-button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </el-form>
        </div>

    </div>
</template>
<style scoped  >
 table {
        margin: 10px auto 0;
        width: 96%;
        table-layout: fixed;
        border-right: none;
        border-bottom: none;
     border-collapse: collapse;
    }
 th, td{border:1px solid #b8b8b8 }
 .trailerCar td .tx {
     width: 36px;
     position: relative;
     z-index: 1000;
     text-align: center;
     left: 101%;
     cursor: initial;
     border: solid 1px ;
     top: -150px;
     background-color: darkgreen;
     color: white;
     font-size: 12px;
 }
   td.label{
        width: 120px;
       text-align: right;
    }
    .taskTable td, th{
        padding: 2px;
    }
    .el-icon-d-caret{
        cursor:pointer;
    }
    .el-form-item{
        margin-bottom: 0px;
    }
    .el-form-item__content{
        margin-left: 0px !important;
    }

    .el-form-item__error {
        display: block;
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 40%;
        left: 260px;
    }

</style>
<script>
    import util from '../../../common/js/util'
    import {getListByCarTeamId}  from '../../../api/modules/logistics'
    import {mergeSchedule,doubleDrag,doubleMerge}  from '../../../api/modules/dispatch'
    export default {
        props:["mergeData","carTeamsWithoutCashSettlement","mergeType"],
        data() {
            return {
                trailers:[],
                trailer: null,
                shipList2: [],
                reverseShip:false,
                reverseDelivery:false,
                deliveryList2: [],

                form:{
                    isPublish: true,
                    scheduleIdOne:'',
                    scheduleIdTwo:'',
                    executeDate: '',
                    selectDate:'',
                    trailerId: '',
                    driverId: '',
                    plateNumber: '',
                    carteamId: '',
                    driverName: '',
                    driverPhone: '',
                    totalRealFreight: this.mergeData.totalRefFreight,
//                    isHeavyBackCalculate: "0",
                    mergeType:''
                },
                rules:{
                    selectDate: [{  type: 'date', required: true, message: '请选择执行日期', trigger: 'blur' }],
                    totalRealFreight: [ {required: true, message: '请输入实际运费', trigger: 'blur' }]
                }

            }
        },
        watch: {
            mergeData: function () {
                this.form={
                        scheduleIdOne:'',
                        scheduleIdTwo:'',
                        executeDate: '',
                        selectDate:'',
                        trailerId: '',
                        driverId: '',
                        plateNumber: '',
                        carteamId: '',
                        driverName: '',
                        driverPhone: '',
                        scheduleIds: [],
                        shipIds:[],
                        deliveryIds:[],
                        totalRealFreight: this.mergeData.totalRefFreight,
                        isHeavyBackCalculate: "0",
                        isPublish:true
                }
                this.trailer=null;
            }
        },
        computed: {
            actionTitle: function(){
                return this.mergeType==1 ? '双拖' : '套箱';
            },
            //装货
            shipList: function(){
               let list = this.mergeData.shipList ? this.mergeData.shipList : [];
                this.shipList2 = this.reverseShip ? list.reverse() : list;
               return this.reverseShip ? list.reverse() : list;
            },
            //送货
            deliveryList: function(){
                let list = this.mergeData.deliveryList ? this.mergeData.deliveryList : [];
                this.deliveryList2 = this.reverseDelivery ? list.reverse() : list;
                return this.deliveryList2;
            }
        },
        methods: {
          formatDate(date){
            if(date)
              return util.formatDate.format(new Date(date), 'yyyy-MM-dd hh:mm:ss');
          },
            reverseShipList(){
                this.reverseShip=!this.reverseShip;
            },
            reverseDeliveryList(){
                this.reverseDelivery=!this.reverseDelivery;
            },
            handleSelectDate(date){
              this.form.executeDate=date;
            },
            //获取列表
            handleCarTeamSelect(){
                this.trailer=null;
                if(this.form.carteamId){
                    getListByCarTeamId(this.form.carteamId).then((res) => {
                        if(res.data.code==="1"){
                            this.trailers=res.data.data;

                        }
                    });
                }
            },
            getDriverInfo (item) {
                return item.driverName+"/"+item.plateNumber;
            },
            merge(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确定要进行'+this.actionTitle+'操作吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'info'
                        }).then(() => {
                            this.form.scheduleIds=this.mergeData.scheduleIds;
                            this.form.deliveryIds=this.deliveryList.map(task => task.id);
                            this.form.shipIds=this.shipList.map(task => task.id);
                            this.form.mergeType = this.mergeType;
                            if(this.form.trailerId){
                                this.trailers.forEach((res => {
                                    if(res.trailerId == this.form.trailerId){
                                      this.form.plateNumber=res.plateNumber;
                                      this.form.driverId=res.driverId;
                                      this.form.carteamId=res.carteamId;
                                      this.form.driverName=res.driverName;
                                      this.form.driverPhone=res.phone;
                                      return;
                                    }
                                }));

                            }
                            mergeSchedule(this.form).then((res)=>{
                                if(res.data.success){
                                    this.$alert('操作成功', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.$refs[formName].resetFields();
                                            this.$emit('closeEditMerge');
                                        }
                                    });
                                }else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data.message
                                    });
                                }
                            });
                        });


                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>


