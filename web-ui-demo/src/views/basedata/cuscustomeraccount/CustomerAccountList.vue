<!-- 字典管理 列表 -->
<!-- 系统管理——客户账户信息管理 -->
<template>
  <section>
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button type="primary" icon="plus" size="small" @click="newDict" :disabled="this.$global.isDisabled(2)">新增</el-button>
          <el-button type="primary" icon="edit" size="small" @click="updateCustomerAccountHandle" :disabled="this.$global.isDisabled(7)">修改</el-button>
          <el-button type="primary" icon="edit" size="small" @click="toResetPassword" v-if="!this.$global.isDisabled(66)">重置密码</el-button>
          <!--<el-button type="primary" icon="edit" size="small" @click.prevent="deleteCustomerAccountHandle">禁用</el-button>-->
        </el-button-group>
      </el-col>
      <form-box  title="查询">
      <el-form inline ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名称 ">
          <el-input v-model="form.username" class="control-width"></el-input>
        </el-form-item>
        <el-form-item label="QQ ">
          <el-input v-model="form.qqNumber" class="control-width"></el-input>
        </el-form-item>
        <el-form-item label="微信 ">
          <el-input v-model="form.wechat" class="control-width"></el-input>
        </el-form-item>
        <el-form-item label="手机号码 ">
          <el-input v-model="form.phone" class="control-width"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table"
      :data="customerAccountList.data"
      :max-height="tableMaxHeight"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column type="selection" width="40" >      </el-table-column>

      <el-table-column
        prop="customerAccountId"
        label="客户用户编号">
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="登录账号">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="email"
        label="客户邮箱">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="客户电话">
      </el-table-column>
      <el-table-column
        prop="available"
        label="是否可用">
        <template scope="scope">
          <span v-show="scope.row.available"  >可用</span>
          <span v-show="!scope.row.available" >不可用</span>
        </template>
      </el-table-column>

      <!--<el-table-item label="是否禁用" prop="available">-->
      <!--<el-select class='control-width' v-model="available" placeholder="请选择车队类型">-->
        <!--<el-span value="">请选择</el-span>-->
        <!--<el-span label="是" value="0">是</el-span>-->
        <!--<el-span label="否" value="1">否</el-span>-->
      <!--</el-select>-->
    <!--</el-table-item>-->



      <el-table-column
        prop="createDate"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="customerName"
        label="用户所属客户名称">
      </el-table-column>
      <el-table-column
        prop="qqNumber"
        label="客户QQ">
      </el-table-column>
      <el-table-column
        prop="wechat"
        label="客户微信">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="orgId"-->
        <!--label="所属部门">-->
      <!--</el-table-column>-->
    </el-table>
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

    <CustomerAccountUpdate ref="customerAccountUpdate" v-on:closeUpdate="getList"></CustomerAccountUpdate>
    <CustomerAccountAdd  ref="CustomerAccountAdd"></CustomerAccountAdd>

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
  import pagination  from '../../../common/mixins/pagination'
  import CustomerAccountUpdate  from './CustomerAccountUpdate.vue'
  import CustomerAccountAdd  from './CustomerAccountSave.vue'


  export default {
    mixins:[pagination],
    components:{CustomerAccountUpdate,CustomerAccountAdd},
    data() {
      const validatePass = (rule, value, callback) => {
        if (value !== this.passwordForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
//        newDictdialogVisible:false,
        labelWidth:'80px',
        dialogVisible:false,
        newAddCustomerAccountdialogVisible:false,
        newACustomerAccountdialogVisible:false,
        selectData:[],
        form: {
        username:'',
          phone:''

//          value: ''

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
        'customerAccountList'
      ])
    },

    methods: {
      ...mapActions([
        'getCustomerAccountList','CustomerAccountDelete','customerAccountResetPassword'
      ]),
      handleSelectionChange(val){
        this.selectData =  val;
        console.log(val)
      },
      getList(){
        this.pageHandler(this.form,this.getCustomerAccountList)
      },
      newDict(){
//        this.$refs.CustomerAccountUpdate.newDictdialogVisible = true;
        this.$refs.CustomerAccountAdd.newAddCustomerAccountdialogVisible = true;
      },
      updateCustomerAccountHandle(){
        if(this.selectData.length == 1){

          this.$refs.customerAccountUpdate.newACustomerAccountdialogVisible = true;
          if(this.selectData[0].orgId==null){
              delete(this.selectData[0].orgId);
          }
//          if(this.selectData[0].createDate==null){---
//            delete(this.selectData[0].createDate);
//          }
          this.$refs.customerAccountUpdate.detail = this.selectData[0]
          this.getList()
          console.log(this.selectData[0])
          this.updateDictdialogVisible = true;
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }
      },
      deleteCustomerAccountHandle(){

        if(this.selectData.length == 1){
          console.log(this.selectData[0])
          this.CustomerAccountDelete({id:this.selectData[0].customerAccountId}).then((res)=>{
            if(res.success){
              this.getList()
              this.$message({
                message:'删除成功',
                type:'success'
              })
            }else{
              this.$message({
                message:'删除失败',
                type:'error'
              })
            }

          })
        }else{
          this.$confirm('请选择一条数据进行编辑')
        }

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
        this.customerAccountResetPassword(param).then((res)=>{
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

      onSubmit() {
        this.pageNo=1
        console.log('submit!');
        this.getList();
      }
    },
    created(){

      this.getList();
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>
