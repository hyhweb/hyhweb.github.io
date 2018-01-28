<template>
  <el-dialog :visible.sync="dialogVisible">
    <el-form :model="form" :label-width="formLabelWidth">
      <el-form-item label="船名航次:" prop="voyageName">
        <el-input v-model="CargoDetail.voyageName" class='control-width1' :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="运单号:" prop="bookSpaceNo" :label-width="formLabelWidth">
        <el-input v-model="CargoDetail.bookSpaceNo" class='control-width1' :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="总柜量:" :label-width="formLabelWidth">
        <el-input v-model="CargoDetail.total_20GP" style="width:78px;padding-right:5px;" :disabled="true"></el-input>20GP
        <el-input v-model="CargoDetail.total_40GP" style="width:78px;padding-right:5px;" :disabled="true"></el-input>40GP
      </el-form-item>
      <el-form-item label="已送柜量:" :label-width="formLabelWidth">
        <el-input v-model="CargoDetail.send_20GP" style="width:78px;padding-right:5px;" :disabled="true"></el-input>20GP
        <el-input v-model="CargoDetail.send_40GP" style="width:78px;padding-right:5px;" :disabled="true"></el-input>40GP
      </el-form-item>
      <el-form-item label="需扣柜数:" prop="quantity" :label-width="formLabelWidth">
        <el-select clearable filterable default-first-option @input="changeHandle" v-model="form.quantity" class='control-width1'>
          <el-option v-for="item in CargoDetail.totalList" :key="item" :text="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="remark" :label-width="formLabelWidth">
      <el-input type="textarea" v-model="form.remark" style="width:200px" ></el-input>
      </el-form-item>

      <el-form-item :label-width="formLabelWidth">
        <el-button type="primary" @click="submit">确认</el-button>
      </el-form-item>
    </el-form>
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
      dialogVisible: false,
      formLabelWidth: '120px',
      form: {
        bookSpaceNo: "",
        quantity: "",
        remark:""
      },
      CargoDetail: {
        bookSpaceNo: "",
        send_20GP: "",
        send_40GP: "",
        totalList: [],
        total_20GP: "",
        total_40GP: "",
        voyageName: "",
        remark:""
      }

    }
  },
  computed: {},
  methods: {
    ...mapActions(['getInitAddDetainingCargoDetail', 'updateDetainingCargoSet']),
    //初始化函数
    init() {
      this.getInitAddDetainingCargoDetail(this.form).then((res) => {
        this.form.quantity = res.data.detainingCargoNum;
        this.form.remark = res.data.remark;
        Object.assign(this.CargoDetail, res.data)
      })
    },
    changeHandle(val) {
      this.form.quantity = val;
    },

    submit() {
      if (this.form.quantity === "") {
        this.$message({
          message: "需扣柜数不能为空",
          type: 'warning'
        })
        return;
      }
      this.updateDetainingCargoSet(this.form).then((res) => {
        if (res.success) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogVisible = false;
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
    }
  },
  created() {},
  mounted() {

  }
}

</script>
