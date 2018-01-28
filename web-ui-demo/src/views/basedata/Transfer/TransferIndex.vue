<template>
 	<section>
    	<el-col>
      		<ToolBarBox>
      			<el-form label-width="90px" :model="form" ref="form" :rules="formRules">
      				<div style="width: 30%;border:1px solid #ccc;display: inline-block;margin-right: 3%;height:850px;">
      					<h3 style="font-size: 20px;text-align: center;color: #1d90e6;margin:10px 0">下单信息</h3>
						<el-form-item label="下单客户" prop="customerId">
	              			<el-select clearable filterable default-first-option v-model="form.customerId" @change="changeCustomer" style="width:200px;">
	                			<el-option
		                           v-for="item in customer.orderUserList"
		                           :key="item.value"
		                           :label="item.text"
		                           :value="item.value"
	                			></el-option>
	              			</el-select>
	            		</el-form-item>
						<el-form-item prop="invoicing" label="是否专票" >
	              			<el-radio-group v-model="form.invoicing" :disabled="true">
	                			<el-radio label="1">是</el-radio>
	                			<el-radio label="0">否</el-radio>
	              			</el-radio-group>
	            		</el-form-item>
						<el-form-item prop="orderType" label="订单类型" >
	              			<el-radio-group v-model="form.orderType">
	                			<el-radio label="0">装货</el-radio>
	                			<el-radio label="1">送货</el-radio>
	              			</el-radio-group>
	            		</el-form-item>
						<el-form-item label="报价港口" prop="harborId">
	              			<el-select clearable filterable default-first-option size="small" v-model="form.harborId" style="width:200px;">
	                    		<el-option
	                               v-for="item in customer.harborList"
	                               :key="item.value"
	                               :label="item.text"
	                               :value="item.value"
	                    		></el-option>
	                  		</el-select>
	            		</el-form-item>
						<el-row>
	                    	<el-col>
	                      		<span style="position: absolute;left: 10px;top:8px;color:#ff4949;">*</span><el-form-item label="装送地址" prop="regionOne" style="float:left;width:100px;">
	                        		<el-select clearable filterable default-first-option v-model="regionOne" @input="changeRegionOne" style="width:100px;">
	                          			<el-option v-for="item in addressSelectedArr['1']" :key="item.value" :label="item.text" :value="item.value">
	                          			</el-option>
	                    			</el-select>
	                      		</el-form-item>
								<el-form-item label="" prop="regionTow"  style="float:left;display:inline;margin-left:10px;">
	                        		<el-select clearable filterable default-first-option v-model="regionTow" @input="changeRegionTwo" style="width:100px;">
	                          			<el-option v-for="item in addressSelectedArr['2']" :key="item.value" :label="item.text" :value="item.value">
	                          			</el-option>
	                        		</el-select>
	                      		</el-form-item>
	                    	</el-col>
	                    	<el-col>
	                      		<el-form-item label="" prop="regionThird" style="float:left;width:100px;">
	                        		<el-select clearable filterable default-first-option v-model="regionThird" @input="changeRegionThird" style="width:100px;">
	                          			<el-option v-for="item in addressSelectedArr['3']" :key="item.value" :label="item.text" :value="item.value">
	                          			</el-option>
	                        		</el-select>
	                      		</el-form-item>
								<el-form-item label="" prop="regionCode" style="float:left;display:inline;margin-left:10px;">
	                        		<el-select clearable filterable default-first-option v-model="form.regionCode" @input="changeRegionFourth" style="width:100px;">
	                          			<el-option v-for="item in addressSelectedArr['4']" :key="item.value" :label="item.text" :value="item.value">
	                          			</el-option>
	                        		</el-select>
	                      		</el-form-item>
	                    	</el-col>
	                  	</el-row>
						<el-form-item label="20GP:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceOldMap['20GP']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="20HQ:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceOldMap['20HQ']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="2*20HQ:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceOldMap['2*20HQ']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="2*20GP:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceOldMap['2*20GP']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="40GP:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceOldMap['40GP']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="40HQ:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceOldMap['40HQ']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="生效日期(始):">
                			<el-date-picker type="date" style="width:200px;" :disabled="true" v-model="startDate" @change="handleStartDate"></el-date-picker>
              			</el-form-item>
              			<el-form-item label="生效日期(终):">
                			<el-date-picker type="date" :disabled="true" @change="handleEndDate" style="width:200px;" v-model="endDate"
                			></el-date-picker>
          				</el-form-item>
					</div>
					<div style="width: 30%;border:1px solid #ccc;display: inline-block;height:850px;">
      					<h3 style="font-size: 20px;text-align: center;color: #1d90e6;margin:10px 0">改送信息</h3>
						<el-form-item label="真实客户" prop="realCustomerId">
	              			<el-select clearable filterable default-first-option v-model="form.realCustomerId" @change="changeCustomerReal" style="width:200px;">
	                			<el-option
		                           v-for="item in customer.orderUserList"
		                           :key="item.value"
		                           :label="item.text"
		                           :value="item.value"
	                			></el-option>
	              			</el-select>
	            		</el-form-item>
						<el-form-item prop="invoicingReal" label="是否专票" >
	              			<el-radio-group v-model="form.invoicingReal" :disabled="true">
	                			<el-radio label="1">是</el-radio>
	                			<el-radio label="0">否</el-radio>
	              			</el-radio-group>
	            		</el-form-item>
						<el-form-item prop="orderType" label="订单类型" >
	              			<el-radio-group v-model="form.orderType" :disabled="true">
	                			<el-radio label="0">装货</el-radio>
	                			<el-radio label="1">送货</el-radio>
	              			</el-radio-group>
	            		</el-form-item>
						<el-form-item label="报价港口" prop="harborId">
	              			<el-select clearable filterable default-first-option size="small" v-model="form.harborId" :disabled="true" style="width:200px;">
	                    		<el-option
	                               v-for="item in customer.harborList"
	                               :key="item.value"
	                               :label="item.text"
	                               :value="item.value"
	                    		></el-option>
	                  		</el-select>
	            		</el-form-item>
						<el-row>
	                    	<el-col>
	                      		<span style="position: absolute;left: 10px;top:8px;color:#ff4949;">*</span><el-form-item label="装送地址" prop="realRegionOne" style="float:left;width:100px;">
	                        		<el-select clearable filterable default-first-option v-model="realRegionOne" @input="changeRegionOneReal" style="width:100px;">
	                          			<el-option v-for="item in addressSelectedArrReal['1']" :key="item.value" :label="item.text" :value="item.value">
	                          			</el-option>
	                    			</el-select>
	                      		</el-form-item>
								<el-form-item label="" prop="realRegionTow" style="float:left;display:inline;margin-left:10px;">
	                        		<el-select clearable filterable default-first-option v-model="realRegionTow" @input="changeRegionTwoReal" style="width:100px;">
	                          			<el-option v-for="item in addressSelectedArrReal['2']" :key="item.value" :label="item.text" :value="item.value">
	                          			</el-option>
	                        		</el-select>
	                      		</el-form-item>
	                    	</el-col>
	                    	<el-col>
	                      		<el-form-item label="" prop="realRegionThird" style="float:left;width:100px;">
	                        		<el-select clearable filterable default-first-option v-model="realRegionThird" @input="changeRegionThirdReal" style="width:100px;">
	                          			<el-option v-for="item in addressSelectedArrReal['3']" :key="item.value" :label="item.text" :value="item.value">
	                          			</el-option>
	                        		</el-select>
	                      		</el-form-item>
								<el-form-item label="" prop="regionCodeReal" style="float:left;display:inline;margin-left:10px;">
	                        		<el-select clearable filterable default-first-option v-model="form.regionCodeReal" @input="changeRegionFourthReal" style="width:100px;">
	                          			<el-option v-for="item in addressSelectedArrReal['4']" :key="item.value" :label="item.text" :value="item.value">
	                          			</el-option>
	                        		</el-select>
	                      		</el-form-item>
	                    	</el-col>
	                  	</el-row>
						<el-form-item label="20GP:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceNewMap['20GP']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="20HQ:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceNewMap['20HQ']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="2*20HQ:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceNewMap['2*20HQ']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="2*20GP:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceNewMap['2*20GP']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="40GP:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceNewMap['40GP']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="40HQ:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="userPriceNewMap['40HQ']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="生效日期(始):">
                			<el-date-picker type="date" style="width:200px;" :disabled="true" v-model="startDate" @change="handleStartDate"></el-date-picker>
              			</el-form-item>
              			<el-form-item label="生效日期(终):">
                			<el-date-picker type="date" :disabled="true" @change="handleEndDate" style="width:200px;" v-model="endDate"
                			></el-date-picker>
          				</el-form-item>
	      			</div>
					<div style="width: 30%;border:1px solid #ccc;display: inline-block;float: right;margin-right: 3%;height: 850px;">
      					<h3 style="font-size: 20px;text-align: center;color: #1d90e6;margin:10px 0">改送费信息</h3>
      					<div style="text-align: center;display: inline-block;width: 100%;margin-top: 100px;"><el-button style="background: #20a0ff;color:#fff;" @click="getTransfer('form')">查询改送费</el-button></div>
						<el-form-item label="20GP:" prop="" style="margin-top: 190px;">
	        				<input class="matexia_input" style="width:200px;" v-model="toSendCustomerMap['20GP']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="20HQ:" prop="">
	        				<input class="matexia_input" style="width:200px;" v-model="toSendCustomerMap['20HQ']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="2*20HQ:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="toSendCustomerMap['2*20HQ']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="2*20GP:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="toSendCustomerMap['2*20GP']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="40GP:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="toSendCustomerMap['40GP']" :disabled="true"></input>
	      				</el-form-item>
						<el-form-item label="40HQ:" prop="">
	        				<input  class="matexia_input" style="width:200px;" v-model="toSendCustomerMap['40HQ']" :disabled="true"></input>
	      				</el-form-item>
	      			</div>
      			</el-form>
      		</ToolBarBox>
      	</el-col>
    </section>
</template>
<script type="text/ecmascript-6">
	import util from '../../../common/js/util'
	import {addOrderAllListApi,allRegionByRegionCodeApi,areaInfoListApi,getCustomerQuoteByInput} from '../../../api/modules/order';
	export default {
		data() {
            return {
            	formRules:{
            		customerId: [ {required: true, message: '必填', trigger: 'blur' }],
            		realCustomerId: [ {required: true, message: '必填', trigger: 'blur' }],
            		orderType: [ {required: true, message: '必填', trigger: 'blur' }],
            		harborId: [ {required: true, message: '必填', trigger: 'blur' }],
            		// regionOne: [ {required: true, message: '必填', trigger: 'blur' }],
            		// regionTow: [ {required: true, message: '必填', trigger: 'blur' }],
            		// regionThird: [ {required: true, message: '必填', trigger: 'blur' }],
            		regionCode: [ {required: true, message: '必填', trigger: 'blur' }],
					// realRegionOne: [ {required: true, message: '必填', trigger: 'blur' }],
            		// realRegionTow: [ {required: true, message: '必填', trigger: 'blur' }],
            		// realRegionThird: [ {required: true, message: '必填', trigger: 'blur' }],
            		regionCodeReal: [ {required: true, message: '必填', trigger: 'blur' }],

            	},
            	customer:{},
            	addressSelectedArr:{
            		1:[],
            		2:[],
            		3:[],
            		4:[]
            	},
				addressSelectedArrReal:{
            		1:[],
            		2:[],
            		3:[],
            		4:[]
            	},
				startDate:'',
        		endDate:'',
        		realRegionOne:'',//真实省份
        		realRegionTow:'',//真实市区
        		realRegionThird:'',//真实县
				regionOne:'',//省份
				regionTow:'',//市区
				regionThird:'',//县
				scheduleFreightFO:'',
				userPriceNewMap: {
	      			"20GP": '',
	            	"20HQ": '',
	            	"2*20GP": '',
	            	"2*20HQ": '',
	            	"40GP": '',
	            	"40HQ": ''
    			},
    			userPriceOldMap: {
      				"20GP": '',
      				"20HQ": '',
      				"2*20GP": '',
      				"2*20HQ": '',
      				"40GP": '',
      				"40HQ": ''
    			},
    			toSendCustomerMap: {
			      	"20GP": '',
			      	"20HQ": '',
			      	"2*20GP": '',
			      	"2*20HQ": '',
			      	"40GP": '',
			      	"40HQ": ''
    			},
	            form:{
	            	scheduleFreight:'',
	            	scheduleFreightO:'',
	            	scheduleFreightT:'',
	            	scheduleFreightTH:'',
	            	scheduleFreightF:'',
					customerId:'',//下单客户
					invoicing:'',//是否开票
					orderType:'',//订单类型
					harborId:'',//报价港口
					regionCode:'',//地区编码
					realCustomerId:'',//真实收货人
					invoicingReal:'',//真实是否开票
					regionCodeReal:'',//真实地区编码
					startDate:'',
					endDate:'',

	            }
            }
        },
        methods:{
        	changeCustomerReal(val){
				this.customer.orderUserList.forEach((item,key)=>{
		          	if(item.value == val){
			            this.form.invoicingReal=item.invoicing;
		          	}
		        })
        	},
        	changeCustomer(val){
				this.customer.orderUserList.forEach((item,key)=>{
		          	if(item.value == val){
			            this.form.invoicing=item.invoicing;
		          	}
		        })
        	},
			handleStartDate(val){
				  this.form.startDate=val;
	      	},
			handleEndDate(val){
	        	this.form.endDate=val;
	      	},
			changeRegionOne(val){
				areaInfoListApi({code:val}).then((res)=>{
	        		this.addressSelectedArr['2'] = res.data.data
		        })
		        if (val == '' || val == null) {
		        	this.regionTow='';
		        	this.regionThird='';
		        	this.form.regionCode='';
		        }
			},
			changeRegionOneReal(val){
				areaInfoListApi({code:val}).then((res)=>{
	        		this.addressSelectedArrReal['2'] = res.data.data
		        })
		        if (val == '' || val == null) {
					this.realRegionTow='';
		        	this.realRegionThird=''
		        	this.form.regionCodeReal=''
		        }
			},
			changeRegionTwo(val){
				areaInfoListApi({code:val}).then((res)=>{
	        		this.addressSelectedArr['3'] = res.data.data
		        })
				if (val == '' || val == null) {
		        	this.regionThird='';
		        	this.form.regionCode='';
		        }
			},
			changeRegionTwoReal(val){
				areaInfoListApi({code:val}).then((res)=>{
	        		this.addressSelectedArrReal['3'] = res.data.data
		        })
				if (val == '' || val == null) {
					this.realRegionThird='';
		        	this.form.regionCodeReal='';
		        }
			},
			changeRegionThird(val){
				areaInfoListApi({code:val}).then((res)=>{
	        		this.addressSelectedArr['4'] = res.data.data
		        })
				if (val == '' || val == null) {
		        	this.form.regionCode='';
		        }
			},
			changeRegionThirdReal(val){
				areaInfoListApi({code:val}).then((res)=>{
	        		this.addressSelectedArrReal['4'] = res.data.data
		        })
				if (val == '' || val == null) {
		        	this.form.regionCodeReal='';
		        }
			},
			changeRegionFourth(val){
				this.form.regionCode = val;
			},
			changeRegionFourthReal(val){
				this.form.regionCodeReal = val;
			},
        	getList(){
        		addOrderAllListApi().then((res) =>{
		          	this.customer = res.data.data;
		        })
		        allRegionByRegionCodeApi({code:0}).then((res)=>{
	        		this.addressSelectedArr['1'] = res.data.data['1']
	        		this.addressSelectedArrReal['1'] = res.data.data['1']
		        })

        	},
        	getTransfer(formName){
        		this.$refs[formName].validate((valid) => {
        			if (valid) {
        				getCustomerQuoteByInput(this.form).then((res)=>{
							let data = res.data;
							if (data.code == 1) {
								this.userPriceNewMap = data.data.userPriceNewMap;
								this.toSendCustomerMap = data.data.toSendCustomerMap;
								this.userPriceOldMap = data.data.userPriceOldMap;
                    		} else {
                        		this.$message({
                            		type: 'error',
                            		message: data.message
                        		});
                    		}
						})
        			}
        		})

        	}
        },
 		mounted(){
      		this.$nextTick(function () {
        		this.getList();
      		});
    	}
    }
</script>
<style scoped>
.matexia_input{
	color:#1f2d3d !important;
	text-align:center !important;
	height: 36px;
	width: 200px;
	background-color: #eef1f6;
    border-color: #d1dbe5;
    color: #bbb;
    cursor: not-allowed;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1)
}
</style>
