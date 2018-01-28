<!-- 系统管理——下单客户管理 -->
<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button v-if="!this.$global.isDisabled(2)" type="primary" icon="plus"  size="small" @click="add">新增</el-button>
          <el-button  v-if="!this.$global.isDisabled(7)" type="primary" icon="edit" size="small" @click="edit">编辑</el-button>
          <el-button  v-if="!this.$global.isDisabled(9)" type="primary" icon="delete" size="small" @click="handleDelete">删除</el-button>
          <el-button  v-if="!this.$global.isDisabled(58)"  type="primary" icon="settleon" size="small" @click="putSettle">加入结算</el-button>
          <el-button  v-if="!this.$global.isDisabled(59)"  type="primary" icon="settledown" size="small" @click="cancelSettle">取消结算</el-button>
          <el-button  v-if="!this.$global.isDisabled(107)"  type="primary" icon="settleon" size="small" @click="batchDetainingCargoHandler">批量扣货</el-button>
          <el-button  v-if="!this.$global.isDisabled(108)"  type="primary" icon="settleon" size="small" @click="cancelDetainingCargoHandler">取消扣货</el-button>
          <el-button  v-if="!this.$global.isDisabled(70)" type="primary" size="small" @click="exportCustomer">导出</el-button>
          <el-button  v-if="!this.$global.isDisabled(119)" type="primary" size="small" @click="showWechatBindingList">关联微信管理</el-button>
        </el-button-group>
      </el-col>
      <el-col>
        <form-box title="查询">
          <el-form :inline="true"  :model="form" ref="form" @submit.prevent="onSubmit">
          <el-form-item label="客户名称" :label-width="labelWidth" prop="orderNo">
            <el-input v-model="form.customerName" class='control-width'></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="labelWidth" prop="phone">
            <el-input v-model="form.phone" class='control-width'></el-input>
          </el-form-item>

          <el-form-item label="业务员" :label-width="labelWidth" prop="salesmanId">
            <el-select clearable filterable default-first-option v-model="form.salesmanId" placeholder="请选择">
              <el-option v-for="item in userList.userDropDwonList"
                :key="item.value"
                :label="item.text"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="结算天数" :label-width="labelWidth" prop="settleDay">
            <el-select clearable filterable default-first-option allow-create v-model="form.settleDay" placeholder="请选择">
              <el-option v-for="item in settleDaySelect"
                :key="item.value"
                :label="item.text"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否扣货" :label-width="labelWidth" prop="isDetainingCargo">
            <el-select clearable filterable default-first-option allow-create v-model="form.isDetainingCargo" placeholder="请选择">
              <el-option v-for="item in isDetainingCargoList"
                :key="item.value"
                :label="item.text"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="getList" :disabled="this.$global.isDisabled(1)">查询</el-button>
          </el-form-item>

        </el-form>
       </form-box>
      </el-col>
    </ToolBarBox>

    <TableBox>
     <!--列表-->
      <el-col>
        <el-table ref="table"
        :data="customAdminList.data"
        :max-height="tableMaxHeight"
        stripe
         @selection-change="handleSelectionChange"
         @row-click="handleRowClick">
        <el-table-column type="selection" >
          </el-table-column>
        <el-table-column width="280px"
          prop="customerName"
          label="客户名称"  >
        </el-table-column>

        <el-table-column
          prop="isTicket"
          label="票结" >
          <template scope="scope">
            <el-checkbox v-model="scope.row.isTicket" disabled></el-checkbox>
          </template>
        </el-table-column>

       <!-- <el-table-column width="160px"
          prop="customerCode"
          label="客户编码"  >
        </el-table-column>-->
        <el-table-column
          prop="customerTypeName"
          label="类型" >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱" >
        </el-table-column>
        <el-table-column
          prop="linkman"
          label="客户联系人">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"  >
        </el-table-column>
       <!--  <el-table-column
          prop="qqNumber"
          label="QQ号" >
        </el-table-column>
        <el-table-column
          prop="wechat"
          label="微信号" >
          </el-table-column>
          -->
         <el-table-column
          prop="customerState"
          label="是否扣货" >
        </el-table-column>

        <el-table-column
          prop="taxRate"
          label="改送费税点" >
        </el-table-column>

        <el-table-column
          prop="settleAccounts"
          label="是否结算" >
          <template scope="scope">
            <span v-if="scope.row.settleAccounts">是</span>
            <span v-if="!scope.row.settleAccounts">否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="requireDate"
          label="是否可用" >
          <template scope="scope">
          <span v-if="scope.row.available">是</span>
          <span v-if="!scope.row.available">否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="salesmanName"
          label="业务员名称" >
        </el-table-column>
        <el-table-column
          prop="invoicing"
          label="是否专票" >
          <template scope="scope">
            <span v-if="scope.row.invoicing">是</span>
            <span v-if="!scope.row.invoicing">否</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="invoiceProperties"
          label="发票性质" >
        </el-table-column>
        <el-table-column
          prop="customerTaxRate"
          label="运费税点" >
        </el-table-column>
        <el-table-column
          prop="invoiceRemark"
          label="杂费税点" >
        </el-table-column>

        <el-table-column
          prop="settleDay"
          label="结算天数(天)" >
        </el-table-column>
         <el-table-column
          prop="createDate"
          label="创建时间" >
          <template scope="scope">
            <div>{{scope.row.createDate}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>

      </el-table>
      </el-col>
    </TableBox>

    <PaginationBox>
      <el-col style="text-align:center;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="pageNo"
          :page-size="pageSize"
          :total="pageCount"
          :page-sizes="pagesizes">
          </el-pagination>
      </el-col>
    </PaginationBox>

    <EditCustomer ref="editcustomer"></EditCustomer>
    <el-dialog size="large" title="微信绑定列表" :visible.sync="wechatBindingListVisible">
      <el-table :data="wechatBindingListData" border>
        <el-table-column property="loginAccount" label="登录账号"></el-table-column>
        <el-table-column property="wechatNickname" label="微信昵称"></el-table-column>
        <el-table-column property="openid" label="Openid"></el-table-column>
        <el-table-column property="createTime" label="绑定时间"></el-table-column>
        <el-table-column label="操作" prop="" width="78" fixed="right">
          <template scope="scope">
            <el-button size="small" type="primary" @click="unbindWechatAccount(scope.row)" :disabled="wechatUnbindOperate">
              解除绑定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </section>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
	import EditCustomer from './EditCustomer.vue'
  import {settle, cancelSettle, getUserDropdownList, exportCustomerApi, getWechatBindingListApi, unbindWechatAccountApi} from '../../../api/modules/customer'
  import Qs from 'qs'
	export default {
		mixins:[pagination],
		components:{EditCustomer},
		data() {
			return {
			  wechatUnbindOperate: this.$global.isDisabled(119),
        wechatBindingListData: [],
        wechatBindingListVisible: false,

				labelWidth:'80px',
				newFormVisible:false,
				editLoading:false,
				editFormVisible:false,
				selectData:[],
        userList:{},
        settleDaySelect: [
          {text: '30', value: 30},
          {text: '45', value: 45},
          {text: '60', value: 60},
          {text: '75', value: 75},
          {text: '90', value: 90}
        ],
        isDetainingCargoList:[
         {text: '是', value: true},
         {text: '否', value: false}
        ],
				form: {
					customerName: '',
					phone: '',
          salesmanId: '',
          settleDay: '',
          isDetainingCargo:''
				},
        exportForm:{
          pageNo:1,
          pageSize:''
        }
			}
		},
		computed:{
			...mapGetters([
				'customAdminList'
				])
		},
		methods: {
			...mapActions([
				'getCustomerAdminList','customerDelete','batchDetainingCargo','cancelDetainingCargo'
				]),
			init(){
				this.getList()
			},
			handleSelectionChange(val){
				this.selectData = val
			},

      //关联微信绑定
      showWechatBindingList () {
        if(this.selectData.length === 1) {
          this.wechatBindingListVisible = true;
          getWechatBindingListApi({customerId: this.selectData[0].customerId}).then(res =>{
//          getWechatBindingListApi({customerId: '334348078360432640'}).then(res =>{
            this.wechatBindingListData = res.data.data;
          });
        }else{
          this.$confirm('请选择一条数据');
        }
      },
      //解绑微信账号
      unbindWechatAccount (row) {
        this.$confirm('是否确认?', '提示', {type: 'warning'}).then(() => {
          unbindWechatAccountApi({id: row.id, openid: row.openid}).then((res) => {
            if (res.data.success) {
              //解绑成功，刷新绑定列表
              getWechatBindingListApi({customerId: row.customerId}).then(res2 =>{
                this.wechatBindingListData = res2.data.data;
              });
              this.$message({
                message: '操作成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '操作失败',
                type: 'error'
              });
            }
          });
        });
      },

			add(){
				this.$refs.editcustomer.dialogVisible =  true
				this.$refs.editcustomer.mode = "add"
				this.$refs.editcustomer.form = {
					customerName:"",
					customerCode:"",
                    salesmanId:"",
					email:"",
					phone:"",
					available:true,
                    settleAccounts:true,
                    customerType:"",
                    settleDay:0,
                    invoicing:true,
                    isDetainingCargo:false,
                    isTicket: false,
                    taxRate: '0.06',
                    invoiceProperties: '',
                    customerTaxRate: '',
                    invoiceRemark: '',
                    sendcarSmsObj: '',
                    logisticsWechatSwitch: '',
                    blackList: ''
				}
			},

      edit() {
        if(this.selectData.length === 1) {
          this.$refs.editcustomer.dialogVisible = true;
          this.$refs.editcustomer.mode = 'edit';
          Object.assign(this.$refs.editcustomer.form, this.selectData[0]);

          let arr1 = this.selectData[0].sendcarSmsObj.split(',');
          console.log(arr1)
          let arr2 = arr1.map((item, index, array) => {
            return item === "1" ? index.toString() : '';
          });
          console.log(arr2)
//          arr2.forEach((item, index, array) => {
//            if (item==='') {
//              array.splice(index, 1);
//              index -= 1;
//            }
//          });
          for(let i = 0; i < arr2.length; i++) {
            if (arr2[i] === '') {
              arr2.splice(i, 1);
              i -= 1;
            }
          };
          console.log(arr2)
          this.$refs.editcustomer.elCheckboxList1 = arr2;
          console.log(this.$refs.editcustomer.elCheckboxList1);


          let arr3 = this.selectData[0].logisticsWechatSwitch.split(',');
          console.log(arr3)
          let arr4 = arr3.map((item, index, array) => {
            return item === "1" ? index.toString() : '';
          });
          console.log(arr4)
//          arr4.forEach((item, index, array) => {
//            if (item==='') {
//              array.splice(index, 1);
//              index -= 1;
//            }
//          });
          for(let i = 0; i < arr2.length; i++) {
            if (arr4[i] === '') {
              arr4.splice(i, 1);
              i -= 1;
            }
          };
          console.log(arr4)
          this.$refs.editcustomer.elCheckboxList2 = arr4;
          console.log(this.$refs.editcustomer.elCheckboxList2);
        }else{
          this.$confirm('请选择一条数据');
        }

      },

      checkMultipleSelection(){
        if(!this.selectData || this.selectData.length === 0) {
          this.$message('请先选择记录');
          return false;
        }
        return true;
      },


      putSettle(){
        if(this.checkMultipleSelection()){
          this.$confirm('确认要加入结算吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var customerIds = this.selectData.map(task => "customerIds="+task.customerId).join("&");
            settle(customerIds).then((res) =>{
              let data = res.data;
              if(data.code==1){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.getList();
              }else {
                this.$message({
                  type: 'error',
                  message: data.message
                });
              }
            });

          });
        }
      },

      cancelSettle(){
        if(this.checkMultipleSelection()){
          this.$confirm('确认要取消结算吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var customerIds = this.selectData.map(task => "customerIds="+task.customerId).join("&");
            cancelSettle(customerIds).then((res) =>{
              let data = res.data;
              if(data.code==1){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.getList();
              }else {
                this.$message({
                  type: 'error',
                  message: data.message
                });
              }
            });

          });
        }
      },
      batchDetainingCargoHandler(){
        if(this.checkMultipleSelection()){
          this.$confirm('确定批量扣货吗?', '提示', {
            type: 'warning'
          }).then(() => {
            var customerIds = this.selectData.map(task => "customerIds="+task.customerId).join("&");
            this.batchDetainingCargo(customerIds).then((res) =>{
              let data = res;
              if(data.code==1){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.getList();
              }else {
                this.$message({
                  type: 'error',
                  message: data.message
                });
              }
            });

          });
        }
      },

      cancelDetainingCargoHandler(){
          if(this.checkMultipleSelection()){
          this.$confirm('确认要取消结算吗?', '提示', {
            type: 'warning'
          }).then(() => {
            var customerIds = this.selectData.map(task => "customerIds="+task.customerId).join("&");
            this.cancelDetainingCargo(customerIds).then((res) =>{
              let data = res;
              if(data.code==1){
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
                this.getList();
              }else {
                this.$message({
                  type: 'error',
                  message: data.message
                });
              }
            });

          });
        }
      },

			//获取列表
			getList(){
				this.pageHandler(this.form,this.getCustomerAdminList)
			},
			//删除客户
			handleDelete(){
				if(this.selectData.length == 1){
					let customerId = this.selectData[0].customerId;
					this.$confirm('是否删除改客户的信息').then(()=>{
						this.customerDelete({id:customerId}).then((res)=>{
							if(res.success){
								this.$message({
									message:'删除成功',
									type:'success'
								})
								this.getList()
							}else{
								this.$message({
									message:'删除失败',
									type:'warning'
								})
							}
						})
					})
		        }else{
		            this.$confirm('请选择一条数据')
		        }
			},
			//查询
			onSubmit() {
				this.getList()
			},
			resetForm(formName) {
		        this.$refs[formName].resetFields();
		      },
      //获取用户下拉框数据
      getUserList(){
        getUserDropdownList().then((res)=>{
          this.userList = res.data.data;
        })
      },
      exportCustomer(){
        this.$confirm('确认要导出任务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = sessionStorage.getItem('id_token');
//          this.exportForm.Authorization = `Bearer ${token}`;
//          this.exportForm.pageSize = this.pageCount;
//          let params = Qs.stringify(this.exportForm);
          this.form.Authorization = `Bearer ${token}`;
          let params = Qs.stringify(this.form);
          exportCustomerApi(params)
        });
      }
		},
		created(){
		    this.getUserList();
			this.init()
		},
		mounted(){
		}
	}

</script>
