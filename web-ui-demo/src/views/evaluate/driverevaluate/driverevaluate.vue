<template>
  <section>
    <el-col>
      <form-box title="查询">
        <el-form :inline="true" :model="form" ref="form" @submit.prevent="onSubmit" class="linesmall">
          <div style="padding-right:100px;position:relative;">
            <el-form-item label="任务编号" :label-width="labelWidth" prop="taskNo">
              <el-input v-model="form.taskNo" class='control-width2'></el-input>
            </el-form-item>

            <el-form-item label="司机名字" :label-width="labelWidth" prop="driverName">
              <el-input v-model="form.driverName" class='control-width2'></el-input>
            </el-form-item>

            <el-form-item label="货主" :label-width="labelWidth" prop="ownerName">
              <el-input v-model="form.ownerName" class='control-width2'></el-input>
            </el-form-item>

            <el-form-item label="装送货地址" :label-width="labelWidth" prop="address">
              <el-input v-model="form.address" class='control-width2'></el-input>
            </el-form-item>
            <el-form-item label="要求装送货日期(始)" :label-width="labelWidth" prop="requireDateStart">
              <el-date-picker type="date" v-model="form.requireDateStart"  class='control-width2' @change="requireDateStartChange"></el-date-picker>
            </el-form-item>
            <el-form-item label="要求装送货日期(终)" :label-width="labelWidth" prop="requireDateEnd">
              <el-date-picker type="date" v-model="form.requireDateEnd"  class='control-width2' @change="requireDateEndChange"></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item style="position: absolute;right:50px;top:40px;">
            <p style="padding-bottom:10px;"><el-button style="width:90px;" type="primary" @click="onSubmit">查询</el-button></p>
            <p><el-button style="width:90px;" @click="resetForm('form')">重置</el-button></p>
          </el-form-item>
        </el-form>
      </form-box>
    </el-col>

    <!--列表-->
    <el-col>
      <el-table ref="table" highlight-current-row :data="driverEvaluateList.data" :max-height="tableMaxHeight" stripe>
        <el-table-column prop="taskNo" label="任务编号" width="120">
        </el-table-column>
<!--        <el-table-column prop="evaluateType" label="评价类型" width="180" sortable>
        </el-table-column>-->

        <el-table-column label="总评价" width="90">
          <template scope="scope">
            {{ scope.row.evaluateLevel }} 星
          </template>
        </el-table-column>

        <el-table-column label="装卸速度" width="90">
          <template scope="scope">
            {{ scope.row.stevedoringSpeedLevel }} 星
          </template>
        </el-table-column>

        <el-table-column label="路面情况" width="90">
          <template scope="scope">
            {{ scope.row.pavementLevel }} 星
          </template>
        </el-table-column>

        <el-table-column label="管理规范" width="90">
          <template scope="scope">
            {{ scope.row.manageLevel }} 星
          </template>
        </el-table-column>

        <el-table-column label="签收正规" width="90">
          <template scope="scope">
            {{ scope.row.receiptFormLevel }} 星
          </template>
        </el-table-column>

        <el-table-column label="业务规模" width="90">
          <template scope="scope">
            {{ scope.row.businessScaleLevel }} 星
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="评价时间" width="90">
        </el-table-column>
        <el-table-column label="任务类型" width="80">
          <template scope="scope">
            <span v-if="scope.row.taskType==0">装货</span>
            <span v-if="scope.row.taskType==1">送货</span>
          </template>
        </el-table-column>
        <el-table-column prop="cabinetType" label="箱型" width="70">
          <template scope="scope">
            <span v-if="scope.row.cabinetType==0">20GP</span>
            <span v-if="scope.row.cabinetType==1">20HQ</span>
            <span v-if="scope.row.cabinetType==2">40GP</span>
            <span v-if="scope.row.cabinetType==3">40HQ</span>
            <span v-if="scope.row.cabinetType==4">2*20GP</span>
            <span v-if="scope.row.cabinetType==5">2*20HQ</span>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="货物类型" width="100">
        </el-table-column>
        <el-table-column prop="returnOwnerName" label="货主" width="70">
        </el-table-column>
        <el-table-column prop="address" label="装送货地址" width="160">
        </el-table-column>
        <el-table-column prop="requireDate" label="要求装送货时间" width="100">
        </el-table-column>
        <el-table-column prop="endDate" label="任务结束时间" width="90">
        </el-table-column>
        <el-table-column prop="driverName" label="司机" width="70">
        </el-table-column>
        <el-table-column prop="plateNumber" label="车牌" width="80">
        </el-table-column>
        <el-table-column prop="carteamName" label="车队" width="100">
        </el-table-column>

      </el-table>
    </el-col>
    <el-col style="padding:10px 0;text-align:center;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
      </el-pagination>
    </el-col>

  </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import util from '../../../common/js/util';
  import pagination from '../../../common/mixins/pagination';

  export default {
    mixins: [pagination],

    data() {
      return {
        labelWidth: '150px',
        form: {
          taskNo:'',
          driverName:'',
          ownerName:'',
          address:'',
          requireDateStart: '', // 要求装送货开始日期
          requireDateEnd: '', // 要求装送货结束日期
        },
      };
    },
    computed: {
      ...mapGetters([
        'driverEvaluateList'
      ]),
    },
    methods: {
      ...mapActions([
        'getDriverEvaluateList'
      ]),
      init() {
        this.getList()
      },
      // 获取要求装送货开始日期
      requireDateStartChange(val) {
        this.form.requireDateStart = val;
      },

      // 获取要求装送货结束日期
      requireDateEndChange(val) {
        this.form.requireDateEnd = val;
      },

      // 获取列表
      getList() {
        this.pageHandler(this.form, this.getDriverEvaluateList);
      },
      // 查询
      onSubmit() {
        this.getList();
      },
      // 重置
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
