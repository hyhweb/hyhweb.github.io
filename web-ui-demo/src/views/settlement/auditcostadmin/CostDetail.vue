<template>
<section>
<el-dialog size="large" title="费用详情" v-model="dialogVisible" top="5%" ref="newDialog">

<!--列表-->
   <el-col class="editcost">
		<el-table
     	 ref="table" @row-click="handleRowClick"
	    :data="costByCabIdList"
	    max-height="400"
	    stripe
	    >
	    </el-table-column>
	     <el-table-column
	      prop="cabinetNo"
	      label="箱号" >
	      	<template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.cabinetNo}}</span>
	     	</template>
	     </el-table-column>

	    <el-table-column width="120px"
	      prop="costTypeName"
	      label="费用类型" >
	      <template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.costTypeName}}</span>
	     	</template>
	    </el-table-column>
	    <el-table-column width="110px"
	      prop="payAmount"
	      label="应付金额/元">
	       <template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.payAmount}}</span>
	     	</template>
	    </el-table-column>
		<el-table-column width="120px"
	      prop="payObject"
	      label="应付对象">
	      <template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.payObject}}</span>
	     	</template>
	    </el-table-column>
	    <el-table-column width="120px"
	      prop="payTypeName"
	      label="支付方式">
	       <template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.payTypeName}}</span>
	     	</template>
	    </el-table-column>
		 <el-table-column width="120px"
	      prop="incomeAmount"
	      label="应收金额">
	       <template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.incomeAmount}}</span>
	     	</template>
	    </el-table-column>
	    <el-table-column width="120px"
	      prop="incomeObject"
	      label="应收对象">
	       <template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.incomeObject}}</span>
	     	</template>
	    </el-table-column>
	    <el-table-column width="120px"
	      prop="customerName"
	      label="真实收送货客户">
	       <template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.customerName}}</span>
	     	</template>
	    </el-table-column>
	    <el-table-column width="100px"
	      prop="agencyfundText"
	      label="司机代收款">
	      <template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.agencyfundText}}</span>
	     	</template>
	    </el-table-column>
	    <el-table-column
	      prop="remark"
	      width="150"
	      label="备注">
	      <template scope="scope">
	     	<span :class="(scope.row.costStatus == 1 || scope.row.costStatus == 2)?'c1':''">{{scope.row.remark}}</span>
	     	</template>
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
				delCostIds:"",
				form: {
					cabinetId:'',
					orderId:''
				},
				totalData:[{
					payperson:0, //应付办单员合计(元)
					paydriver:0,//应付司机合计(元)
					payship:0,//应付船公司合计(元)
					paygetharbor:0,//应付提柜码头合计(元)
					payreturnharbor:0,//应付还柜码头合计(元)
					incomecustomer:0,//应收客户合计(元)
					incomedelivery:0//应收收送货人合计(元)
				}]
			}
		},
		computed:{
			...mapGetters([
				'costDataByCabIdListView'
				]),

			costByCabIdList(){
					if(typeof(this.costDataByCabIdListView.data) !="undefined"){
					 let costData = this.costDataByCabIdListView.data;
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
				
			}
		},
		methods: {
			...mapActions([
				'getCostDataByCabIdListView'
				]),
			//初始化函数
			init(){
					this.getList()
					setTimeout(()=>{
						this.dataTotal()
					},1000)
			},
			
			dataTotal(){
				this.totalData=[{
					payperson:0, //应付办单员合计(元)
					paydriver:0,//应付司机合计(元)
					payship:0,//应付船公司合计(元)
					paygetharbor:0,//应付提柜码头合计(元)
					payreturnharbor:0,//应付还柜码头合计(元)
					incomecustomer:0,//应收客户合计(元)
					incomedelivery:0//应收收送货人合计(元)
				}]
				if(typeof(this.costByCabIdList)!="undefined" && this.costByCabIdList.length !=0){
					this.costByCabIdList.forEach((val,key) =>{
						if(val.payObjectType =="1"){   //司机
							this.totalData[0].paydriver += Number(val.payAmount)
						}else if(val.payObjectType =="2"){ //办单员
							this.totalData[0].payperson +=  Number(val.payAmount)
						}else if(val.payObjectType =="3"){//南山一期提柜(内贸)
							this.totalData[0].paygetharbor +=  Number(val.payAmount)
						}else if(val.payObjectType =="4"){//南山一期还柜(内贸)
							this.totalData[0].payreturnharbor +=  Number(val.payAmount)
						}else if(val.payObjectType =="5"){//中远集装箱运输有限公司
							this.totalData[0].payship +=  Number(val.payAmount)
						}
						if(val.incomeObjectType =="1"){  //客户
							this.totalData[0].incomecustomer += Number(val.incomeAmount)
						}else if(val.incomeObjectType =="2"){ //收送货人
							this.totalData[0].incomedelivery += Number(val.incomeAmount)
						}
					})
				}
			},
			//获取列表
			getList(){
				this.pageHandler(this.form,this.getCostDataByCabIdListView)
			},
			
			

			
			
			
		},
		created(){

		},
		mounted(){
		}
	}

</script>
