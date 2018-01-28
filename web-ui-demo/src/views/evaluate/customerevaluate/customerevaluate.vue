<template>
  <section>
    <el-col>
      <form-box title="查询">
        <el-form :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
          <el-form-item label="订单编号" :label-width="labelWidth" prop="orderNo">
            <el-input v-model="form.orderNo" class='control-width'></el-input>
          </el-form-item>

          <el-form-item label="司机名字" :label-width="labelWidth" prop="driverName">
            <el-input v-model="form.driverName" class='control-width'></el-input>
          </el-form-item>

          <el-form-item label="箱号" :label-width="labelWidth" prop="cabinetNo">
            <el-input v-model="form.cabinetNo" class='control-width'></el-input>
          </el-form-item>

          <el-form-item label="创建日期" :label-width="labelWidth" prop="createDateStart" style="margin-right:2px">
            <el-date-picker size="small" type="date" placeholder="选择日期" v-model="form.createDateStart"
                            style="width:120px" @change="createDateStartChange"></el-date-picker>
          </el-form-item>
          <label style="padding-right:0;padding-top:11px;">-</label>
          <el-form-item label="" :label-width="labelWidth" prop="createDateEnd">
            <el-date-picker size="small" type="date" placeholder="选择日期" v-model="form.createDateEnd" style="width:120px"
                            @change="createDateEndChange"></el-date-picker>
          </el-form-item>

          <!--<el-form-item label="是否按地址统计" :label-width="labelWidth" prop="orderStatus">-->
          <!--<el-select clearable filterable v-model="form.orderStatus" placeholder="请选择订单状态" class='control-width'>-->
          <!--<el-option value="1">是</el-option>-->
          <!--<el-option value="2">否</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </form-box>
    </el-col>
    <el-col style="padding:10px;">
      <el-button-group>
        <el-button :disabled="selectData.length!=1" type="primary" size="small" @click="showUpdate">修改</el-button>
        <el-button :disabled="selectData.length<1" type="primary" size="small" @click="showDetele">删除</el-button>
      </el-button-group>
    </el-col>


    <!--列表-->
    <el-col>
      <el-table ref="table" highlight-current-row :data="customerEvaluateList.data" :max-height="tableMaxHeight"
                @selection-change="handleSelectionChange" @row-click="handleRowClick">
        <el-table-column type="selection" v-model="selectData">
        </el-table-column>
        <el-table-column prop="orderNo" label="订单编号" width="300" sortable>
        </el-table-column>
        <el-table-column prop="cabinetNo" label="箱号" width="250" sortable>
        </el-table-column>
        <el-table-column prop="driverName" label="司机名称" width="300">
        </el-table-column>
        <el-table-column prop="start" label="评分" width="250">
        </el-table-column>
        <el-table-column prop="content" label="内容" width="260">
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" width="250" sortable>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col style="padding:10px 0;text-align:center;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
                     @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount"
                     :page-sizes="pagesizes">
      </el-pagination>
    </el-col>

  </section>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import util from '../../../common/js/util';
  import pagination from '../../../common/mixins/pagination';
  import {getCustomerEvaluateUpdateApi,getCustomerEvaluateDeteleApi} from '../../../api/modules/customer'

  export default {
    mixins: [pagination],
    //components: {UpdateCabinet},
    data() {
      return {
        classButton: {},
        labelWidth: '80px',
        newFormVisible: false,
        editLoading: false,
        editFormVisible: false,
        selectData: [],
        rowData: {},
        statusToBtn: {
          edit: false,
          cancel: false,
          audit: false,
          cost: false,
        },
        form: {
          orderNo: '',
          cabinetNo: '',
          driverName: '',
          start: '',
          content: '',
          createTime: '',
          createDateStart: '',
          createDateEnd: '',
        },
      };
    },
    computed: {
      ...mapGetters([
        'customerEvaluateList'
      ]),
    },
    methods: {
      ...mapActions([
        'getCustomerEvaluateList'
      ]),
      init() {
        this.getList()
//        this.$store.dispatch('getOrderStatus');
        this.$global.recorderTableData(this);
      },
      // 获取下单开始日期
      createDateStartChange(val) {
        this.form.createDateStart = val;
      },
      // 获取下单结束日期
      createDateEndChange(val) {
        this.form.createDateEnd = val;
      },
      //删除客户评价
      showDetele(){
        if (this.selectData.length == 1) {
          this.$confirm('确认要删除这条评论吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var customerIds = this.selectData.map(item => item.customerEvaluateId);
            getCustomerEvaluateDeteleApi(customerIds).then((res)=>{
               if(res.data!=0) {
                 this.$message({
                   message:'删除成功',
                   type:'success'
                 })
                 this.getList();
               } else {
                 this.$message({
                   message:'删除失败',
                   type:'error'
                 })
               }
            });
          });
        } else {
          this.$confirm('请选择一条数据进行修改')
        }
      },
      //修改客户评价
      showUpdate(){
        if (this.selectData.length == 1) {
          this.$refs.updateCabinet.updateCabinetVisible = true;
          this.$refs.updateCabinet.detail = this.selectData[0];
        } else {
          this.$confirm('请选择一条数据进行修改')
        }
      },
      // 获取要求装送货结束日期
      requireDateEndChange(val) {
        this.form.requireDateEnd = val;
      },
      // 获取列表选中的数据
      handleSelectionChange(val) {
        this.selectData = val;
        if (this.selectData.length == 0) {
          this.statusToBtn = {
            edit: false,
            cancel: false,
            audit: false,
            cost: false,
          };
          return;
        }

      },
      // 获取列表
      getList() {
        this.pageHandler(this.form, this.getCustomerEvaluateList);
      },
      // 查询
      onSubmit() {
        this.getList();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    created() {
      this.init();
    },
    mounted() {
    },
  };

</script>
