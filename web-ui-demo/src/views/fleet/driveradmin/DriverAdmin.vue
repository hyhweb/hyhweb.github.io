<template>
  <section>
  <ToolBarBox>
    <el-col class="tool-bar">
      <el-button-group>
        <el-button v-if="!this.$global.isDisabled(2)" type="primary" icon="plus"  size="small" @click="add">新增</el-button>
        <el-button v-if="!this.$global.isDisabled(7)" type="primary" icon="edit" size="small" @click="edit">编辑</el-button>
        <el-button v-if="!this.$global.isDisabled(66)" type="primary" icon="edit" size="small" @click="toResetPassword">重置密码</el-button>
        <!--<el-button v-if="!this.$global.isDisabled(9)" type="primary" icon="delete" size="small" @click="handleDelete">删除</el-button>-->
      </el-button-group>
    </el-col>
    <el-col>
      <form-box title="查询">
        <el-form :inline="true"  :model="form" ref="form" @submit.prevent="onSubmit">
          <el-form-item label="姓名" :label-width="labelWidth" prop="driverName">
            <el-input v-model="form.driverName" class='control-width'></el-input>
          </el-form-item>
          <el-form-item label="登录名" :label-width="labelWidth" prop="loginName">
            <el-input v-model="form.loginName" class='control-width'></el-input>
          </el-form-item>
          <el-form-item label="车牌" :label-width="labelWidth" prop="plateNumber">
            <el-input v-model="form.plateNumber" class='control-width'></el-input>
          </el-form-item>
          <el-form-item label="是否禁用:" prop="status" :label-width="labelWidth">
            <el-select
              clearable filterable default-first-option
              v-model="form.status"
              class='control-width'>
              <el-option  label="是" :value="0"></el-option>
              <el-option  label="否" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="司机类型" :label-width="labelWidth">
            <el-select
              clearable filterable default-first-option
              v-model="form.driverType"
              class='control-width'>
              <el-option  label="专职" :value="1"></el-option>
              <el-option  label="兼职" :value="2"></el-option>
              <el-option  label="协议" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门" :label-width="labelWidth">
            <el-select
              clearable filterable default-first-option
              v-model="form.orgCode"
              class='control-width'>
              <el-option v-for="item in departmentDataList"
                         :key="item.value"
                         :label="item.text"
                         :value="item.other">
              </el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="子公司" prop="orgIdLevelTwo" :label-width="labelWidth">
            <el-select
              clearable filterable default-first-option
              v-model="form.orgIdLevelTwo">
              <el-option value="">请选择</el-option>
              <el-option
                v-for="item in allSubCompanyList"
                :label="item.text"
                :value="item.value"
                :key="item.text"
              ></el-option>
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
                :data="driverAdminList.data"
                :max-height="tableMaxHeight"
                stripe
                @selection-change="handleSelectionChange"
                @row-click="handleRowClick">
        <el-table-column type="selection" >
        </el-table-column>
        <el-table-column
          prop="driverName"
          label="姓名" >
        </el-table-column>
        <el-table-column width="130px"
                         prop="loginName"
                         label="登录名" >
        </el-table-column>

        <el-table-column width="70px"
                         prop="customerCode"
                         label="性别" >
          <template scope="scope">
            <span v-if="scope.row.gender == 1">男</span>
            <span v-if="scope.row.gender == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column width="120px"
                         prop="plateNumber"
                         label="车牌号" >
        </el-table-column>

        <el-table-column
          prop="phone"
          label="联系电话"  width="130px">
        </el-table-column>
        <el-table-column
          prop="identificationCard"
          label="身份证"  width="200px">
        </el-table-column>
        <el-table-column width="200px"
                         prop="orgName"
                         label="所属部门">
        </el-table-column>


        <el-table-column width="100px" align="center"
                         prop="status"
                         label="是否禁用">
          <template scope="scope">
            <span v-if="scope.row.status == 0 ">是</span>
            <span v-if="scope.row.status == 1 ">否</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center"
                         prop="driverType"
                         label="司机类型">
          <template scope="scope">
            <span v-if="scope.row.driverType == 1 ">专职</span>
            <span v-if="scope.row.driverType == 2 ">兼职</span>
            <span v-if="scope.row.driverType == 3 ">协议</span>
          </template>
        </el-table-column>
        <el-table-column width="180px"
                         prop="loginDate"
                         label="最后登录时间">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日" width="120px">
        </el-table-column>
        <el-table-column width="170px"
                         prop="email"
                         label="邮箱" >
        </el-table-column>

        <el-table-column label="收款帐号" prop="bankAccount" width="170px"></el-table-column>
        <el-table-column label="开户人" prop="bankAccountOwner" width="170px"></el-table-column>
        <el-table-column label="开户银行" prop="openAccountBankName" width="170px"></el-table-column>
        <el-table-column label="开户网点" prop="openAccountBankAddress" width="170px"></el-table-column>

        <el-table-column
          prop="orgNameLevelTwo"
          label="子公司名称"
          width="180">
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
    <EditDriver ref="editdriver"></EditDriver>

    <el-dialog title="重置密码" v-model="dialogVisible" size="tiny">
      <el-form :model="passwordForm" :rules="formRules" ref="passwordForm">
        <el-form-item label="密码" prop="password" :label-width="labelWidth">
          <el-input type="password" v-model="passwordForm.password" class="control-width2"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" :label-width="labelWidth">
          <el-input type="password" v-model="passwordForm.confirmPassword" class="control-width2"/>
        </el-form-item>
        <el-form-item label=""  label-width="100px">
          <el-button type="primary"  @click="resetPd"
                     :disabled="this.$global.isDisabled(66)">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </section>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import util from '../../../common/js/util'
  import pagination  from '../../../common/mixins/pagination'
  import EditDriver from './EditDriver.vue'

  export default {
    mixins:[pagination],
    components:{EditDriver},
    data() {
      const validatePass = (rule, value, callback) => {
        if (value !== this.passwordForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        detail:{},
        labelWidth:'80px',
        newFormVisible:false,
        editLoading:false,
        editFormVisible:false,
        dialogVisible:false,
        selectData:[],
        form: {
          driverName: '',
          loginName:'',
          plateNumber:'',
          status: '',
          orgCode:'',
          driverType:'',
          orgIdLevelTwo:''
        },
        passwordForm:{
          userId:'',
          password:''
        },
        formRules: {
          confirmPassword: [
            { validator: validatePass, trigger: 'change' },
          ],
        }
      }
    },
    computed:{
      ...mapGetters([
        'driverAdminList','departmentDataList','allSubCompanyList'
      ])
    },
    methods: {
      ...mapActions([
        'getDriverInfoList','driverInfoDelete','getDeptItemByLevel','getSubCompanyList','driverResetPassword'
      ]),
      init(){
        this.getList()
        this.getDeptItemByLevel()
        this.$store.dispatch('getSubCompanyList')
      },

      toResetPassword(){
        if(this.selectData.length == 1){
          this.dialogVisible = true;
          this.passwordForm={
            userId : this.selectData[0].userId
          }
        }else{
          this.$confirm('请选择一条数据')
        }
      },
      resetPd(){
        let param = this.passwordForm;
        this.driverResetPassword(param).then((res)=>{
          if(res.success){
            this.$message({
              message:res.message,
              type:'success'
            })
            this.dialogVisible = false;
            this.getList();
          }else{
            this.$message({
              message:res.message,
              type:'warning'
            })
          }
        })
      },

      handleSelectionChange(val){
        this.selectData = val
      },
      add(){
        this.$refs.editdriver.dialogVisible =  true
        this.$refs.editdriver.mode = "add"
        this.$refs.editdriver.getBankList();
//        this.$refs.editdriver.$store.dispatch('getBankList');
        this.$refs.editdriver.form = {
          driverName:"",
          username:"",
          password:"",
          gender:"",
          email:"",
          phone:"",
          birthday:"",
          orgCode:"",
          status:"1",
          driverType:"",

          bankAccount: '',
          bankAccountOwner: '',
          openAccountBankName: '',
          openAccountBankAddress: ''
        }

      },

      edit(){
        if(this.selectData.length == 1){
          this.$refs.editdriver.dialogVisible =  true
          this.$refs.editdriver.mode = "edit"
          this.$refs.editdriver.getBankList();
          Object.assign(this.$refs.editdriver.form,this.selectData[0])
          this.$refs.editdriver.form.status =  this.$refs.editdriver.form.status+''


        }else{
          this.$confirm('请选择一条数据')
        }

      },
      //获取列表
      getList(){
        this.pageHandler(this.form,this.getDriverInfoList)

      },

      //删除客户
      handleDelete(){
        if(this.selectData.length == 1){
          let driverInfoId = this.selectData[0].driverInfoId;
          this.$confirm('是否删除改司机的信息').then(()=>{
            this.driverInfoDelete({id:driverInfoId}).then((res)=>{
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
      }
    },

    created(){
      this.init()
    },
    mounted(){
    }
  }

</script>
