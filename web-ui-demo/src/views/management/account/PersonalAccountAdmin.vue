<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button  v-if="!this.$global.isDisabled(70)" type="primary" size="small" @click="exportPersonalAccountList" :disabled="this.$global.isDisabled(21)">导出</el-button>
        </el-button-group>
      </el-col>
      <el-col>
        <form-box title="查询">
          <el-form class="query-modal" :inline="true"  :model="form" ref="form" @submit.prevent="onSubmit">
            <div class="query-params">
              <el-form-item label="手机号码" :label-width="labelWidth" prop="phone">
                <el-input v-model="form.phone" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="微信昵称" :label-width="labelWidth" prop="wechatNickname">
                <el-input v-model="form.wechatNickname" class='control-width'></el-input>
              </el-form-item>
              <el-form-item label="注册时间" :label-width="labelWidth" prop="createTimeStart" style="margin-right:2px">
                <el-date-picker type="date" icon="" placeholder="选择日期(始)" v-model="form.createTimeStart" style="width:150px"></el-date-picker>
              </el-form-item>
              <label style="display: inline-block; padding-right:0;padding-top:11px;">-</label>
              <el-form-item label="" :label-width="labelWidth" prop="createTimeEnd">
                <el-date-picker type="date" placeholder="选择日期(终)" v-model="form.createTimeEnd" style="width:150px"></el-date-picker>
              </el-form-item>
            </div>
            <div class="query-btns">
              <el-form-item>
                <el-button type="primary" @click="getList" :disabled="this.$global.isDisabled(1)">查询</el-button>
                <el-button type="success" @click="resetForm('form')" icon="setting">清空</el-button>
              </el-form-item>
            </div>
          </el-form>
        </form-box>
      </el-col>
    </ToolBarBox>

    <TableBox>
     <!--列表-->
      <el-col>
        <el-table ref="table"
        :data="personalAccountList.data"
        :max-height="tableMaxHeight"
        stripe border
         @selection-change="handleSelectionChange"
         @row-click="handleRowClick">
        <!--<el-table-column type="selection"></el-table-column>-->
        <el-table-column
          prop="phone"
          label="手机号码"  >
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="注册时间" >
        </el-table-column>

        <el-table-column
          prop="wechatNickname"
          label="微信昵称" >
        </el-table-column>

        <el-table-column width="250"
          prop="openid"
          label="Openid" >
        </el-table-column>

        <el-table-column width="80"
          prop="unCompletedCabinetCount"
          label="未完成箱数">
        </el-table-column>

        <el-table-column width="80"
          prop="completedCabinetCount"
          label="已完成箱数">
        </el-table-column>

          <el-table-column label="删除" prop="" width="80" fixed="right">
            <template scope="scope">
              <el-button size="small" type="primary" @click="delPersonalAccount(scope.row)" :disabled="delPersonalAccountAccess">
                删除
              </el-button>
            </template>
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

  </section>
</template>

<style>
  @import '../../../styles/custom-theme/query-modal.css';
</style>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import util from '../../../common/js/util'
	import pagination  from '../../../common/mixins/pagination'
  import {settle,cancelSettle,getUserDropdownList,exportPersonalAccountListApi} from '../../../api/modules/customer'
  import {getPersonalAccountListApi, delPersonalAccountApi} from '../../../api/modules/customer'
  import Qs from 'qs'
	export default {
		mixins:[pagination],
		components:{},
		data() {
			return {
        delPersonalAccountAccess: this.$global.isDisabled(9),
				labelWidth:'90px',
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
					phone: '',
          wechatNickname: '',
          createTimeStart: '',
          createTimeEnd:''
				},
        exportForm:{
          pageNo:1,
          pageSize:''
        }
			}
		},
		computed:{
			...mapGetters([
				'customAdminList',
        'personalAccountList'
				])
		},
		methods: {
			...mapActions([
				'getCustomerAdminList','customerDelete','batchDetainingCargo','cancelDetainingCargo',
        'getPersonalAccountList'
				]),
      delPersonalAccount (row) {
        this.$confirm('是否确认?', '提示', {type: 'warning'}).then(() => {
          delPersonalAccountApi({id:row.id, openid: row.openid}).then(res => {
            if (res.data.success) {
              this.getList();
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              return true;
            } else {
              this.$message({
                message: '操作失败',
                type: 'error'
              })
              return false;
            }
          });
        });
      },
			init(){
				this.getList()
			},
			handleSelectionChange(val){
				this.selectData = val
			},


      checkMultipleSelection(){
        if(!this.selectData || this.selectData.length === 0) {
          this.$message('请先选择记录');
          return false;
        }
        return true;
      },

			//获取列表
			getList(){
        this.form.createTimeStart = (typeof(this.form.createTimeStart) == "string" ? this.form.createTimeStart : util.formatDate.format(this.form.createTimeStart, 'yyyy-MM-dd'));
        this.form.createTimeEnd = (typeof(this.form.createTimeEnd) == "string" ? this.form.createTimeEnd : util.formatDate.format(this.form.createTimeEnd, 'yyyy-MM-dd'));
//        console.log(this.form.createTimeStart)
//        console.log(this.form.createTimeEnd)

//				this.pageHandler(this.form,this.getCustomerAdminList)
				this.pageHandler(this.form,this.getPersonalAccountList)
//				this.pageHandler(this.form,getPersonalAccountListApi)
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
      exportPersonalAccountList(){
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
          exportPersonalAccountListApi(params)

//          this.download({
//            params: params,
//            handle: exportPersonalAccountListApi,
//            callback () {
//            }
//          });

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
