<template>
<section>
<el-dialog size="large" :title="dialogTitle" v-model="dialogVisible" top="5%"
 :close-on-click-modal="false"  ref="newDialog">
	<el-col style="padding:0 0 10px 0">
		<el-form>
			<el-form-item label="箱号">
				<el-select   clearable filterable default-first-option
					size="small"
					v-model="form.cabinetId"
					:disabled="addOrEdit == 'edit'"
					>
						<el-option
						v-for="item in addCabinetCostData.cabinetNoList"
						:key="item.value"
						:label="item.text"
						:value="item.value">
						</el-option>
				</el-select>
				<el-button size="small" type="primary" @click="addCostByCab">添加</el-button>
				<el-button size="small" type="primary" @click="addBatCostByCab">批量复制</el-button>
			</el-form-item>
		</el-form>


	 </el-col>

<!--列表-->
   <el-col class="editcost">
		<el-table
      ref="table" @row-click="handleRowClick"
	    :data="costByCabIdList"
	    @selection-change="handleSelectionChange"
	    stripe
	    >
	    <el-table-column type="selection">
        </el-table-column>
	     <el-table-column fixed="right" width="70px"
	      label="操作">
	      <template scope="scope">
				<el-button :disabled="scope.row.isEdit==0 || scope.row.payableStatus === 1 || scope.row.incomeStatus === 1 || scope.row.costTypeCode == '8'" size="small" type="text" @click="deleteCost(scope.$index,scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	     <el-table-column
	      prop="cabinetNo"
	      label="箱号" >
	      	<template scope="scope">
	     	<span>{{scope.row.cabinetNo}}</span>
	     	</template>
	     </el-table-column>

	    <el-table-column width="120px"
	      prop="costTypeCode"
	      label="费用类型" >
	       <template scope="scope">
				<el-select   clearable filterable default-first-option
				size="small"
				v-model="scope.row.costTypeCode"
				:disabled="scope.row.isEdit==0  || scope.row.payableStatus === 1 || scope.row.incomeStatus === 1 || scope.row.costTypeCode == '8'"
				@change="changeCostType(scope.$index,scope.row,costTypeList)"
				>
					<el-option v-if="scope.row.costTypeCode=='26'"
					key="26"
					label="运费"
					value="26">
					</el-option>
					<el-option v-else
					v-for="item in costTypeList"
					:key="item.value"
					:label="item.text"
					:value="item.value"
					:disabled="item.disabled">
					</el-option>
				</el-select>
	       </template>
	    </el-table-column>
	    <el-table-column width="110px"
	      prop="payAmount"
	      label="应付金额/元">
	       <template scope="scope">
	       		<el-input
	       		size="small"
	       		v-model="scope.row.payAmount"
	       		:disabled="scope.row.isEdit==0 || scope.row.useragencyfund  || scope.row.payableStatus === 1 || scope.row.costTypeCode == '8'"
	       		@change="dataTotal()"></el-input>
	       </template>()
	    </el-table-column>
		<el-table-column width="120px"
	      prop="payObjectType"
	      label="应付对象">
	      	<template scope="scope">
				<el-select
				  clearable filterable default-first-option
				size="small"
				v-model="scope.row.payObjectType"
				:disabled="scope.row.isEdit==0 || scope.row.useragencyfund  || scope.row.payableStatus === 1"
				@change="changePayObjectType">
					<el-option
					v-for="item in scope.row.payObjectTypeList"
					:key="item.value"
					:label="item.text"
					:value="item.value|number">
					</el-option>
				</el-select>
	       </template>
	    </el-table-column>
	    <el-table-column width="120px"
	      prop="payType"
	      label="支付方式">
		 <template scope="scope">
				<el-select   clearable filterable default-first-option  size="small"
				v-model="scope.row.payType"

				:disabled="scope.row.isEdit==0 || scope.row.useragencyfund  || scope.row.payableStatus === 1 || scope.row.incomeStatus === 1 "
				>
				<el-option
					label="月结"
					:value="1">
				</el-option>
				<el-option
					label="现结"
					:value="2">
				</el-option>
				</el-select>
	       </template>
	    </el-table-column>
		 <el-table-column width="120px"
	      prop="incomeAmount"
	      label="应收金额">
		   <template scope="scope">
	       		<el-input
	       		size="small"
	       		v-model="scope.row.incomeAmount"
	       		:disabled="scope.row.isEdit==0  || scope.row.incomeStatus === 1 || scope.row.costTypeCode == '8'"
	       		@change="dataTotal()"></el-input>
	       </template>

	    </el-table-column>
	    <el-table-column width="120px"
	      prop="incomeObjectType"
	      label="应收对象">
	      <template scope="scope">
				<el-select   clearable filterable default-first-option  size="small"
				v-model="scope.row.incomeObjectType"
				:disabled="scope.row.isEdit==0 || scope.row.useragencyfund || scope.row.incomeStatus === 1 "
				@change="changeIncomeObjectType(scope.$index,scope.row)"
				>
				<el-option
					v-for="item in addCabinetCostData.incomeObjectTypeList"
					:key="item.value"
					:label="item.text"
					:value="item.value|number">
					</el-option>
				</el-select>
	       </template>
	    </el-table-column>
	    <el-table-column width="120px"
	      prop="customerId"
	      label="真实收送货客户">
	      <template scope="scope">
				<el-select   clearable filterable default-first-option  size="small"
				v-model="scope.row.customerId"
				 :disabled="scope.row.isEdit==0 || scope.row.useragencyfund || scope.row.agencyfundIsDisabled  || scope.row.incomeStatus === 1 "
				>
				<el-option
					v-for="item in addCabinetCostData.orderUserList"
					:key="item.value"
					:label="item.text"
					:value="item.value">
					</el-option>
				</el-select>
	       </template>
	    </el-table-column>

      <el-table-column width="120px"
                       prop="payResponsible"
                       label="付款责任方">
        <template scope="scope">
          <el-select
            clearable filterable default-first-option
            size="small"
            v-model="scope.row.payResponsible"
            :disabled="scope.row.isEdit==0 || payResponsibleDisabled"
           >
            <el-option
              v-for="item in addCabinetCostData.payResponsibleTypeList"
              :key="item.value"
              :label="item.text"
              :value="item.value|number">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

	    <el-table-column width="100px"
	      prop="agencyfund"
	      label="司机代收款">
	      <template scope="scope">
	      <el-radio-group
	     	 :disabled="scope.row.isEdit==0 || scope.row.useragencyfund || scope.row.agencyfundIsDisabled  ||  scope.row.incomeStatus === 1 "
	       	 size="small"
	         v-model="scope.row.agencyfund">
				<el-radio-button
				:label="1" >是
				</el-radio-button>
				<el-radio-button
				:label="0" >否
				</el-radio-button>
	      </el-radio-group>
	      </template>
	    </el-table-column>
	    <el-table-column
	      prop="remark"
	      width="150"
	      label="备注">
	      <template scope="scope">
	       	<el-input size="small"  v-model="scope.row.remark" :disabled="scope.row.isEdit==0  ||  scope.row.incomeStatus === 1 || scope.row.isFixed === 1">
	       	</el-input>
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
	<el-button type="primary" @click="onSubmit">提交</el-button>
	<el-button type="warning" @click="onSubmitTow" :disabled="this.$global.isDisabled(18)">打破规则提交</el-button>
<el-col>



</el-col>
</el-dialog>
<el-dialog v-model="batdialogVisible" >
		<el-row>
		<el-col>
			 <el-transfer
		    filterable
		    filter-placeholder="请输入箱号"
		    :titles="titles"
		    v-model="transferSelected"
		    @change="changeTransfer"
		    :data="addCabinetCostData.cabinetNoList"
		    :props="{
		      key: 'value',
		      label: 'text'
		    }"
		    >

		  </el-transfer>
		</el-col>
		<el-col class="textAlign" style="padding-top:20px">
			  <el-button type="primary" @click="handAddBatCostByCab">确定批量添加</el-button>
		</el-col>
		</el-row>
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
				payResponsibleDisabled:true,
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
				totalData:[{
					payperson:0, //应付办单员合计(元)
					paydriver:0,//应付司机合计(元)
					payship:0,//应付船公司合计(元)
					paygetharbor:0,//应付提柜码头合计(元)
					payreturnharbor:0,//应付还柜码头合计(元)
					incomecustomer:0,//应收客户合计(元)
					incomedelivery:0//应收收送货人合计(元)
				}],
				costDataByCabIdList:{}
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
				if(this.addOrEdit == "edit"){
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

            let other = "";
						if(this.addCabinetCostInitList.costTypeList != undefined){
              this.addCabinetCostInitList.costTypeList.map((item,key)=>{
                if(item.value  == val.costTypeCode){
                  other = item.other;
                }
              })
            }
            if(other != ""){
              val.payObjectTypeList = this.addCabinetCostData.payObjectTypeList.filter(function (item,key,arr) {
                let indexArr = other.split(',');
                return indexArr.includes(item.value)
              })
            }else{
              val.payObjectTypeList = []
            }


						return val
					})

					return data
					}
				}else if(this.addOrEdit == "add"){
					return []
				}
			},
			addCabinetCostData(){
				return this.addCabinetCostInitList
			},
			dialogTitle(){
				if(this.addOrEdit == "add"){
					return "新增费用"
				}else if(this.addOrEdit == "edit"){
					return "编辑费用"
				}
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
				this.getAddCabinetCostInitDataList({orderId:this.form.orderId})
				if(this.addOrEdit == "edit"){
					this.getList()
					this.cabinetCostId=[];
					setTimeout(()=>{
						this.dataTotal()
					},1000)
				}else{

					this.costByCabIdList.splice(0)
					this.form.cabinetId=''
					this.form.totalData=[{
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
			 handleSelectionChange(val) {
		        this.selectData = val;
		    },
			addBatCostByCab(){
				if(this.selectData.length == 1){
					this.batdialogVisible = true
					setTimeout(()=>{
						let foot = document.getElementsByClassName('el-transfer-panel__footer')
						let span = document.createElement('span')
						span.innerHTML = '全选　'
						let span1 = document.createElement('span')
						span1.innerHTML = '全选　'
						if(foot[0].firstChild.childNodes.length ==2){
							foot[0].firstChild.insertBefore(span,foot[0].firstChild.firstChild)
						foot[1].firstChild.insertBefore(span1,foot[1].firstChild.firstChild)

						}
					},100)

				}else{
					this.$message({
						message:'请选择一条需要复制的费用数据',
						type:'warning'
					})
				}

			},
			changeTransfer(val){

			},
			changeCostType(index,row,costTypeList){


        let other = "";
        this.addCabinetCostInitList.costTypeList.map((item,key)=>{
			    if(item.value  == row.costTypeCode){
            other = item.other;
          }
        })

        if(other != ""){
          this.costByCabIdList[index].payObjectTypeList = this.addCabinetCostData.payObjectTypeList.filter(function (item,key,arr) {
            let indexArr = other.split(',');
            return indexArr.includes(item.value)
          })
        }else{
          this.costByCabIdList[index].payObjectTypeList = []
        }
				if(row.costTypeCode == "2" ||
				   row.costTypeCode == "3" ||
				   row.costTypeCode == "19" ||
				   row.costTypeCode == "20"){
					this.payResponsibleDisabled = false;
				}else{
					this.payResponsibleDisabled = true;
					this.costByCabIdList[index].payResponsible = "";

				}
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
			  if(row.costTypeCode == ""){
          return;
        }
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
              "payResponsible":"",//付款责任方
			        "agencyfund":"",//司机代收款
			        "remark": "",//备注
			        "useragencyfund":false, // 费用为客户代收款，控制其他字段不可编辑
			        "agencyfundIsDisabled":false,  //司机代收款不可编辑控制
          "payObjectTypeList":[]


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
              "payResponsible":"",//付款责任方
			        "agencyfund":"",//司机代收款
			        "remark": "",//备注
			        "useragencyfund":false, // 费用为客户代收款，控制其他字段不可编辑
			        "agencyfundIsDisabled":false,  //司机代收款不可编辑控制
            "payObjectTypeList":[]


				}
				Object.assign(row,this.selectData[0])
				Object.assign(row,{cabinetNo:rowItemArr[0].text,cabinetId: val,cabinetCostId: ""})
				this.costByCabIdList.push(row)
				})
				this.dataTotal()
				this.batdialogVisible = false
				this.transferSelected = []

			},
			//删除
			deleteCost(index,row){
				this.$confirm('确定删除该条数据？').then(()=>{
					this.costByCabIdList.splice(index,1)
					this.dataTotal()
					if(row.cabinetCostId !=""){
						this.cabinetCostId.push(row.cabinetCostId)
						this.delCostIds = this.cabinetCostId.join(',')
					}
				})

			},
			//参数预处理
			paramHandle(){
				this.costByCabIdList = this.costByCabIdList.map((val,key)=>{
					if(val.costTypeCode === ""){
						this.$message({
							message:"费用类型不能为空",
							type:'warning'
						})
						return
					}
					if(val.payObjectType !=""){
						this.addCabinetCostData.payObjectTypeList.forEach((item,i)=>{
							if(val.payObjectType == item.value){
								val.payObject = item.text
								val.payObjectId = typeof(item.other)== "undefined"?"":item.other
							}
						})
					}
					if(val.incomeObjectType !=""){
						this.addCabinetCostData.incomeObjectTypeList.forEach((item,i)=>{
							if(val.incomeObjectType == item.value){
								val.incomeObject = item.text
							}
						})
					}
					return val
				})
			},
			validateCost(isValid){
				var valid = true;
				if(isValid){
					this.costByCabIdList.map((val,key)=>{
						if(val.costTypeCode != "25"){
							if((val.payObjectType == "" || val.payObjectType == 0) && (val.incomeObjectType === ""|| val.incomeObjectType ==0)){
								valid = false
								this.$message({
									message:"应收对象和应付对象至少有一个必填",
									type:'warning'
								})
								return
							}
							if((val.payObjectType != ""  || val.payObjectType != 0) && val.payAmount ===""){
								valid = false
								this.$message({
									message:"请填写对应的应付金额",
									type:'warning'
								})
								return
							}
							if((val.payObjectType === ""  || val.payObjectType == 0) && val.payAmount !=""){
								valid = false;
								val.payAmount = "";
								this.$message({
									message:"请填写对应的应付对象",
									type:'warning'
								})
								return
							}
							if((val.incomeObjectType != "" || val.incomeObjectType != 0) && val.incomeAmount ===""){
								valid = false
								this.$message({
									message:"请填写对应的应收金额",
									type:'warning'
								})
								return
							}
							if((val.incomeObjectType === ""  || val.incomeObjectType == 0) && val.incomeAmount !=""){
								valid = false;
								val.incomeAmount = "";
								this.$message({
									message:"请填写对应的应收对象",
									type:'warning'
								})
								return
							}

						}

					});
				}
				return valid;
			},
			//提交
			onSubmit() {
				let valid = true,validCostObject = true;
				/*if(this.costByCabIdList.length==0){
					this.$message({
						message:'没有提交的数据',
						type:'warning'
					})
					return
				}*/
				this.paramHandle()
				this.costByCabIdList.map((val,key)=>{

					if(!valid) return
					if(val.costTypeCode == ""){

						valid = false
						this.$message({
							message:"费用类型不能为空",
							type:'warning'
						})
						return
					}

					if(val.costTypeCode != "25"){
							if((val.payObjectType == "" || val.payObjectType == 0) && (val.incomeObjectType === "" || val.incomeObjectType == 0)){
								valid = false
								this.$message({
									message:"应收对象和应付对象至少有一个必填",
									type:'warning'
								})
								return
							}
							if((val.payObjectType != ""  || val.payObjectType != 0) && val.payAmount ===""){
								valid = false
								this.$message({
									message:"请填写对应的应付金额",
									type:'warning'
								})
								return
							}
							if((val.payObjectType === ""  || val.payObjectType == 0) && val.payAmount !=""){
								valid = false;
								this.$message({
									message:"请填写对应的应付对象",
									type:'warning'
								})
								return
							}
							if((val.incomeObjectType != "" || val.incomeObjectType != 0) && val.incomeAmount ===""){
								valid = false
								this.$message({
									message:"请填写对应的应收金额",
									type:'warning'
								})
								return
							}
							if((val.incomeObjectType === ""  || val.incomeObjectType == 0) && val.incomeAmount !=""){
								valid = false;
								this.$message({
									message:"请填写对应的应收对象",
									type:'warning'
								})
								return
							}

						}



					//2,超时费 3,压夜费 8,改送费 9多门点服务费 10,调整运费 26运费
					/*if(val.costTypeCode == "26"
						|| val.costTypeCode == "10"
						|| val.costTypeCode == "9"
						|| val.costTypeCode == "8"
						|| val.costTypeCode == "3"
						|| val.costTypeCode == "2"
						 ){

						if(val.payObjectType == "" && val.incomeObjectType === ""){
							valid = false
							this.$message({
								message:"应收对象和应付对象至少有一个必填",
								type:'warning'
							})
							return
						}
						if(val.payObjectType != "" && val.payAmount ===""){
							valid = false
							this.$message({
								message:"请填写对应的应付金额",
								type:'warning'
							})
							return
						}
						if(val.incomeObjectType != "" && val.incomeObjectType != 0 && val.incomeAmount ===""){

							valid = false
							this.$message({
								message:"请填写对应的应收金额",
								type:'warning'
							})
							return
						}
					}else if(val.costTypeCode == "25"){
						if(val.incomeAmount ==""){
							valid = false
							this.$message({
								message:"请填写应收金额",
								type:'warning'
							})
							return
						}
					}else if(val.costTypeCode == ""){

						valid = false
						this.$message({
							message:"费用类型不能为空",
							type:'warning'
						})
						return
					}else{

						if(val.payAmount === "" || val.payObjectType === "" || val.incomeAmount === "" || val.incomeObjectType === ""){
							valid = false
							this.$message({
								message:"应付金额，应付对象，应收金额，应收对象必填",
								type:'warning'
							})
							return
						}else{
							if(val.isFixed != 1){
								if(parseInt(val.payAmount) > parseInt(val.incomeAmount)){
									valid = false
									this.$message({
										message:"应收金额不能小于应付金额",
										type:'warning'
									})
									return
								}
							}

						}
					}*/

					 // if(val.costTypeCode != "25"){
					 // 	if(val.payObjectType==="" || val.payObjectType=== 0){
						// 	val.payAmount = ""

						// }
						// if(val.incomeObjectType==="" || val.incomeObjectType===0){
						// 	val.incomeAmount = ""

						// }
					 // }


				})

				if(!valid) return

				let editCostData = this.costByCabIdList.filter((item)=>{
					return item.isEdit != 0;
				});
				let param = {cabinetCostList:editCostData,delCostIds:this.delCostIds}
				this.saveCost({data:JSON.stringify(param)}).then((res)=>{
					this.$parent.init()
					if(res.success){
						this.$message({
							message:res.message,
							type:'success'
						})
						this.dialogVisible = false
					}else{
						this.$message({
							message:res.message,
							type:'warning'
						})
					}
				})
			},
			//打破规则提交
			onSubmitTow() {
				let valid = true,validCostObject = true;
				/*if(this.costByCabIdList.length==0){
					this.$message({
						message:'没有提交的数据',
						type:'warning'
					})
					return
				}*/
				this.paramHandle();
				this.costByCabIdList.map((val,key)=>{

					if(!valid) return
						if(val.costTypeCode == ""){

						valid = false
						this.$message({
							message:"费用类型不能为空",
							type:'warning'
						})
						return
					}


					if(val.costTypeCode != "25"){
							if((val.payObjectType == "" || val.payObjectType == 0) && (val.incomeObjectType === "" || val.incomeObjectType == 0)){
								valid = false
								this.$message({
									message:"应收对象和应付对象至少有一个必填",
									type:'warning'
								})
								return
							}
							if((val.payObjectType != ""  || val.payObjectType != 0) && val.payAmount ===""){
								valid = false
								this.$message({
									message:"请填写对应的应付金额",
									type:'warning'
								})
								return
							}
							if((val.payObjectType === ""  || val.payObjectType == 0) && val.payAmount !=""){
								valid = false;
								this.$message({
									message:"请填写对应的应付对象",
									type:'warning'
								})
								return
							}
							if((val.incomeObjectType != "" || val.incomeObjectType != 0) && val.incomeAmount ===""){
								valid = false
								this.$message({
									message:"请填写对应的应收金额",
									type:'warning'
								})
								return
							}
							if((val.incomeObjectType === ""  || val.incomeObjectType == 0) && val.incomeAmount !=""){
								valid = false;
								this.$message({
									message:"请填写对应的应收对象",
									type:'warning'
								})
								return
							}

						}


					//2,超时费 3,压夜费 8,改送费 9多门点服务费 10,调整运费 26运费
					// if(val.costTypeCode == "26"
					// 	|| val.costTypeCode == "10"
					// 	|| val.costTypeCode == "9"
					// 	|| val.costTypeCode == "8"
					// 	|| val.costTypeCode == "3"
					// 	|| val.costTypeCode == "2"
					// 	 ){

					// 	if(val.payObjectType === "" && val.incomeObjectType === ""){
					// 		valid = false
					// 		this.$message({
					// 			message:"应收对象和应付对象至少有一个必填",
					// 			type:'warning'
					// 		})
					// 		return
					// 	}
					// 	if(val.payObjectType != "" && val.payObjectType != 0 && val.payAmount ===""){
					// 		valid = false
					// 		this.$message({
					// 			message:"请填写对应的应付金额",
					// 			type:'warning'
					// 		})
					// 		return
					// 	}
					// 	if(val.incomeObjectType != "" && val.incomeAmount ===""){

					// 		valid = false
					// 		this.$message({
					// 			message:"请填写对应的应收金额",
					// 			type:'warning'
					// 		})
					// 		return
					// 	}
					// }else if(val.costTypeCode == "25"){
					// 	if(val.incomeAmount ===""){
					// 		valid = false
					// 		this.$message({
					// 			message:"请填写应收金额",
					// 			type:'warning'
					// 		})
					// 		return
					// 	}
					// }else if(val.costTypeCode === ""){

					// 	valid = false
					// 	this.$message({
					// 		message:"费用类型不能为空",
					// 		type:'warning'
					// 	})
					// 	return
					// }else{

					// 	/*if(val.payAmount === "" || val.payObjectType === "" || val.incomeAmount === "" || val.incomeObjectType === ""){
					// 		valid = false
					// 		this.$message({
					// 			message:"应付金额，应付对象，应收金额，应收对象必填",
					// 			type:'warning'
					// 		})
					// 		return
					// 	}*/
					// }

					/* if(val.costTypeCode != "25"){
					 	if(val.payObjectType=="" || val.payObjectType=="0"){
							val.payAmount = ""
							valid = false
							this.$message({
								message:"应付对象不能为空",
								type:'warning'
							})
							return
						}
						if(val.incomeObjectType=="" || val.incomeObjectType=="0"){
							val.incomeAmount = ""
							valid = false
							this.$message({
								message:"应收对象不能为空",
								type:'warning'
							})
							return
						}
					 }*/


				})

				if(!valid) return
				let editCostData = this.costByCabIdList.filter((item)=>{
					return item.isEdit != 0;
				});
				let param = {cabinetCostList:editCostData,delCostIds:this.delCostIds}
				this.saveCostDataTow({data:JSON.stringify(param)}).then((res)=>{
					if(res.success){
						this.$parent.init()
						this.$message({
							message:res.message,
							type:'success'
						})
						this.dialogVisible = false
					}else{
						this.$message({
							message:res.message,
							type:'warning'
						})
					}
				})
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
