<template>
<section>
<el-dialog size="large" :title="dialogTitle" v-model="dialogVisible" top="5%"
 :close-on-click-modal="false"  ref="newDialog" v-loading="loading">

<!--列表-->
   <el-col >
		<el-table
      ref="table" @row-click="handleRowClick"
	    :data="costByCabIdList"

      border
	    >
      <el-table-column
        prop="costTypeName"
        label="费用类型">

      </el-table-column>
      <el-table-column
                       prop="payAmount"
                       label="应付金额/元">

      </el-table-column>

      <el-table-column
                       prop="payObject"
                       label="应付对象">
      </el-table-column>

      <el-table-column
                       prop="payTypeName"
                       label="支付方式">
      </el-table-column>

      <el-table-column
                       prop="incomeAmount"
                       label="应收金额">
      </el-table-column>

      <el-table-column
                       prop="incomeObject"
                       label="应收对象">
      </el-table-column>

      <el-table-column
                       prop="customerName"
                       label="真实收送货客户">
       <!-- <template scope="scope">
          <span
            v-for="item in addCabinetCostData.orderUserList"
            v-if="scope.row.customerId==item.value"  >{{item.text}}
          </span>
        </template>-->
      </el-table-column>

      <el-table-column
                       prop="agencyfundText"
                       label="司机代收款">
      </el-table-column>

      <el-table-column
        prop="remark"
        width="150"
        label="备注">
      </el-table-column>


  </el-table>
  </el-col>
   <el-col style="margin:10px 0">
		<el-table
	    :data="totalData"
	    border
	    >
	    </el-table-column>
	    <el-table-column
	      width="160"
	      align="center"
	      prop="payperson"
	      label="应付办单员合计(元)" >
	      <template scope="scope">
	      		<span class="c1">{{scope.row.payperson}}</span>
	      </template>
	      </el-table-column>
	      <el-table-column
	      width="145"
	      align="center"
	      prop="paydriver"
	      label="应付司机合计(元)" >
	      <template scope="scope">
	      		<span class="c1">{{scope.row.paydriver}}</span>
	      </template>
	      </el-table-column>
	      <el-table-column
	      align="center"
	      prop="paygetharbor"
	      label="应付提柜码头合计(元)" >
	      <template scope="scope">
	      		<span class="c1">{{scope.row.paygetharbor}}</span>
	      </template>
	      </el-table-column>
	      <el-table-column
	      align="center"
	      prop="payreturnharbor"
	      label="应付还柜码头合计(元)" >
	      <template scope="scope">
	      		<span class="c1">{{scope.row.payreturnharbor}}</span>
	      </template>
	      </el-table-column>
	      <el-table-column
	      align="center"
	      prop="payship"
	      label="应付船公司合计(元)" >
	      <template scope="scope">
	      		<span class="c1">{{scope.row.payship}}</span>
	      </template>
	      </el-table-column>
	      <el-table-column
	      width="160"
	      align="center"
	      prop="incomecustomer"
	      label="应收客户合计(元)" >
	      <template scope="scope">
	      		<span class="c1">{{scope.row.incomecustomer}}</span>
	      </template>
	      </el-table-column>
	      <el-table-column
	      align="center"
	      prop="incomedelivery"
	      label="应收收送货人合计(元)" >
	      <template scope="scope">
	      		<span class="c1">{{scope.row.incomedelivery}}</span>
	      </template>
	      </el-table-column>
	    </el-table>
</el-col>
	<el-button type="primary" @click="dialogVisible=false" style="float:right ">确定</el-button>
<el-col>



</el-col>
</el-dialog>
</section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	export default {
		mixins:[pagination],
		data() {
			return {
				labelWidth:'80px',
				dialogVisible:false,
				batdialogVisible:false,
				selectData:[],
				cabinetCostId:[],
				delCostIds:"",
				addOrEdit:"add", //add,edit
				transferSelected:[],
				titles:['所有箱号','选中的箱号'],
				switchData:{
					on:1,
					off:0
				},
				form: {
					cabinetId:'',
					orderId:this.$route.params.orderId
				},
				costDataByCabIdList:{},
        loading:false
			}
		},
		computed:{
			...mapGetters([
				'addCabinetCostInitList'
				]),
			costTypeList(){
				let data = []
				if(this.addCabinetCostInitList.costTypeList != undefined){
					data =	this.addCabinetCostInitList.costTypeList.map((val,key)=>{
						if(val.value == "8"){
							val.disabled = true;
						}
						return val;
					})
				}
				return data;
			},
			costByCabIdList(){
					if(typeof(this.costDataByCabIdList.data) !="undefined"){
					 let costData = this.costDataByCabIdList.data;
            let data = costData.map((val,key)=>{
						//val.incomeObjectType = val.incomeObjectType+"";
						//val.payObjectType = val.payObjectType+"";
						if(val.costTypeCode == "25"){
							val.useragencyfund = true
						}else{
							val.useragencyfund = false
						}
						if(val.incomeObjectType == "1"){
							val.agencyfundIsDisabled = true
						}else{
							val.agencyfundIsDisabled = false
						}
						if(val.costTypeCode == "26"){
							if(val.payObjectType== "null"){
								val.payObjectType =""
							}
							if(val.incomeObjectType== "null"){
								val.incomeObjectType =""
							}
						}

						return val
					})

					return data
					}
			},
      totalData(){
        var total=[{
          payperson:0, //应付办单员合计(元)
          paydriver:0,//应付司机合计(元)
          payship:0,//应付船公司合计(元)
          paygetharbor:0,//应付提柜码头合计(元)
          payreturnharbor:0,//应付还柜码头合计(元)
          incomecustomer:0,//应收客户合计(元)
          incomedelivery:0//应收收送货人合计(元)
        }]
        if(typeof(this.costDataByCabIdList.data)!="undefined" && this.costDataByCabIdList.data.length !=0){
          this.costDataByCabIdList.data.forEach((val,key) =>{
            if(val.payObjectType =="1"){   //司机
              total[0].paydriver += Number(val.payAmount)
            }else if(val.payObjectType =="2"){ //办单员
              total[0].payperson +=  Number(val.payAmount)
            }else if(val.payObjectType =="3"){//南山一期提柜(内贸)
              total[0].paygetharbor +=  Number(val.payAmount)
            }else if(val.payObjectType =="4"){//南山一期还柜(内贸)
              total[0].payreturnharbor +=  Number(val.payAmount)
            }else if(val.payObjectType =="5"){//中远集装箱运输有限公司
              total[0].payship +=  Number(val.payAmount)
            }
            if(val.incomeObjectType =="1"){  //客户
              total[0].incomecustomer += Number(val.incomeAmount)
            }else if(val.incomeObjectType =="2"){ //收送货人
              total[0].incomedelivery += Number(val.incomeAmount)
            }
          })
        }
        return total
      },
			addCabinetCostData(){
				return this.addCabinetCostInitList
			},
			dialogTitle(){
          return '查看费用'
			}
		},
		methods: {
			...mapActions([
				'getCostDataByCabIdList',
				'getCostDataByCabIdListData',
				'getAddCabinetCostInitDataList',
				'saveCost',
				'saveCostDataTow'
				]),
			//初始化函数
			init(){
			    this.loading=true
					this.getList()
					this.cabinetCostId=[];
        this.loading=false

			},
			changeCostType(index,row){
				if(row.costTypeCode == ""){return}
				if(row.costTypeCode == "25"){
					if(typeof(this.costByCabIdList[index])!="undefined"){
						for(let key in this.costByCabIdList[index]){
							/*if(key != "costTypeCode" || key != "useragencyfund" || key != "incomeAmount" || key != "remark" || key != "cabinetId"){

							}*/

							this.costByCabIdList[index].payAmount = "";
							this.costByCabIdList[index].payObjectType = "";
							this.costByCabIdList[index].payType = "";
							this.costByCabIdList[index].incomeObjectType = "";
							this.costByCabIdList[index].customerId = "";
							this.costByCabIdList[index].agencyfund = "";

							if(key == "useragencyfund"){
								this.costByCabIdList[index][key] = true
							}
						}
					}
				}else{
					if(typeof(this.costByCabIdList[index])!="undefined"){
						this.costByCabIdList[index].useragencyfund = false
					}
				}
				this.dataTotal()
			},
			changePayObjectType(val){
				this.dataTotal()
			},
			changeIncomeObjectType(index,row){
				if(row.incomeObjectType == ""){return}
				if(row.incomeObjectType == "1"){
					if(typeof(this.costByCabIdList[index])!="undefined"){
						this.costByCabIdList[index].agencyfundIsDisabled = true
						this.costByCabIdList[index].customerId = ""
						this.costByCabIdList[index].agencyfund = ""
					}
				}else{
					if(typeof(this.costByCabIdList[index])!="undefined"){
						this.costByCabIdList[index].agencyfundIsDisabled = false
					}
				}
				this.dataTotal()
			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.getCostDataByCabIdList);
				this.getCostDataByCabIdListData(this.form).then((res)=>{
					this.costDataByCabIdList = res.data
				})
			},
			addCostByCab(){
				this.$refs.table.clearSelection();
				if(this.form.cabinetId ==""){
					this.$message({
						message:"请先选择箱号",
						type:"warning"
					})
					return
				}
				let selectedCabinetInfo = this.addCabinetCostData.cabinetNoList.filter((val,index,arr)=>{
					if(val.value == this.form.cabinetId){
						return val
					}

				})
				let row  = {
					"cabinetNo":selectedCabinetInfo[0].text,
					"cabinetCostId": "", //费用ID
					"cabinetId": this.form.cabinetId, //集装箱id
			        "costTypeCode": "",//费用类型编码
			        "payAmount": "",//应付金额
			        "incomeAmount": "",//应收金额
			        "payObjectType": "",//应付对象类型
			        "payType":"",//支付方式
			        "payObjectId": "",//应付对象ID
			        "payObject": "",//应付对象
			        "incomeObjectType": "",//应收对象类型
			        "incomeObject": "",//应收对象
			        "customerId":"",//真实收送货客户
			        "agencyfund":"",//司机代收款
			        "remark": "",//备注
			        "useragencyfund":false, // 费用为客户代收款，控制其他字段不可编辑
			        "agencyfundIsDisabled":false  //司机代收款不可编辑控制


				}
				this.costByCabIdList.push(row)
			},
			handAddBatCostByCab(){

				this.transferSelected.forEach((val,key)=>{
					let rowItemArr = this.addCabinetCostData.cabinetNoList.filter((item,key)=>{
						if(item.value == val){
						 return  item
						}
					})
					let row  = {
					"cabinetNo":rowItemArr[0].text,
					"cabinetCostId": "", //费用ID
					"cabinetId": val, //集装箱id
			        "costTypeCode": "",//费用类型编码
			        "payAmount": "",//应付金额
			        "incomeAmount": "",//应收金额
			        "payObjectType": "",//应付对象类型
			        "payType":"",//支付方式
			        "payObjectId": "",//应付对象ID
			        "payObject": "",//应付对象
			        "incomeObjectType": "",//应收对象类型
			        "incomeObject": "",//应收对象
			        "customerId":"",//真实收送货客户
			        "agencyfund":"",//司机代收款
			        "remark": "",//备注
			        "useragencyfund":false, // 费用为客户代收款，控制其他字段不可编辑
			        "agencyfundIsDisabled":false  //司机代收款不可编辑控制


				}
				Object.assign(row,this.selectData[0])
				Object.assign(row,{cabinetNo:rowItemArr[0].text,cabinetId: val,cabinetCostId: ""})
				this.costByCabIdList.push(row)
				})
				this.dataTotal()
				this.batdialogVisible = false
				this.transferSelected = []

			},
			//提交
			onSubmit() {

			},
			//重置查询表单函数
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		     },
		    /*confirmDialog(){
		    	if(this.selectData.length !=1){
		    		this.$message({
		    			message:'请选择一条数据',
		    			type:'warning'
		    		})
		    		return;
		    	}
		    	let param = {code:this.selectData[0].regionCode}
		    	this.getAddressByRegion(param).then((res)=>{
		    		if(res.success){
						this.$parent.form.addressBefore=res.data
						this.$parent.form.addressOther=this.selectData[0].address.slice(res.data.length)
		    		}

		    	})
		    	this.$parent.form.regionCode=this.selectData[0].regionCode
		    	//this.$parent.form.address=this.selectData[0].address
		      	this.dialogVisible= false
		    },*/
		},
		watch:{
			 '$route' (to, from) {
				this.form.orderId = this.$route.params.orderId
			}
		},
		created(){

		},
		mounted(){
		},
		/*activated(){
			//this.selectData = []
			setTimeout(()=>{

			},100)

		}*/
	}

</script>
