<template>
  <el-dialog size="large" title="送扣情况" v-model="dialogVisible" top="5%" ref="newDialog">
    <ToolBarBox>
      <el-button-group style="padding-bottom:10px;">
        <el-button v-if="!this.$global.isDisabled(108)" size="small" type="primary" @click="batchReleaseCargoUpdateHandler">批量放货</el-button>
        <el-button v-if="!this.$global.isDisabled(107)" size="small" type="primary" @click="batchDetainingCargoUpdateHandler">批量扣货</el-button>
      </el-button-group>
      <span class="c1" style="float:right;">
      <span style="padding-right:20px;">
      已设置整票扣柜数：{{quantity}}
      </span>
      总柜数：{{total}}
      </span>
    </ToolBarBox>
    <!--列表-->
    <el-col style="padding-bottom:10px;">
      <el-table ref="table" :data="cabinetDetainingCargoList.cabinetDetainingCargoList" height="450" stripe @selection-change="handleSelectionChange" @row-click="handleRowClick">
        <el-table-column type="selection" width="40">
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号">
        </el-table-column>
        <el-table-column prop="harborName" label="港口">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="goodsName" label="品名">
        </el-table-column>
        <el-table-column prop="cabinetType" label="箱型">
        </el-table-column>
        <el-table-column prop="cabinetNo" label="箱号">
        </el-table-column>
        <el-table-column prop="scheduleStatus" label="运输状态">
        </el-table-column>
        <el-table-column prop="detainingCargo" label="扣货状态">
          <template scope="scope">
            <span v-if="scope.row.detainingCargo==1" class="c1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import util from '../../../common/js/util'
import pagination from '../../../common/mixins/pagination'
export default {
  mixins: [pagination],
  data() {
    return {
      labelWidth: '80px',
      dialogVisible: false,
      selectData: [],
      total:'0',
      quantity: '0',
      form: {
        bookSpaceNo: '',
      }
    }
  },
  computed: {
    ...mapGetters([
      'cabinetDetainingCargoList'
    ])
  },
  methods: {
    ...mapActions([
      'getCabinetDetainingCargoList',
      'batchDetainingCargoUpdate',
      'batchReleaseCargoUpdate'
    ]),
    //批量扣货
    batchDetainingCargoUpdateHandler() {

      if (this.selectData.length == 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
        return;
      }
      let cabinetIdsArr = [];
      this.selectData.forEach((val, key) => {
        cabinetIdsArr.push(val.cabinetId);
      })
      let param = { cabinetIds: cabinetIdsArr.join(',') };
      this.batchDetainingCargoUpdate(param).then((res) => {
        if (res.success) {
          this.$message({
            message: res.message,
            type: 'warning'
          })
          this.getList()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }

      })
    },
    //批量放货
    batchReleaseCargoUpdateHandler() {
      if (this.selectData.length == 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
        return;
      }
      let cabinetIdsArr = [];
      this.selectData.forEach((val, key) => {
        cabinetIdsArr.push(val.cabinetId);
      })
      let param = { cabinetIds: cabinetIdsArr.join(',') };
      this.batchReleaseCargoUpdate(param).then((res) => {
        if (res.success) {
          this.$message({
            message: res.message,
            type: 'success'
          })

          this.getList()
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    },
    //初始化函数
    init() {
      this.getList()
    },
    //获取列表选中的数据
    handleSelectionChange(val) {
      this.selectData = val;
    },
    //获取列表
    getList() {
      this.getCabinetDetainingCargoList(this.form).then((res) => {
        this.quantity = res.data.quantity;
        this.total = res.data.cabinetDetainingCargoList.length;
      })
    }

  },
  created() {

  },
  mounted() {

  }
}

</script>
