<template>
  <el-dialog title="现金收款" v-model="dialogVisible">
    <el-col>
      <el-form :label-width="labelWidth">
        <el-form-item label="费用类型" prop="costTypeName">
          <el-input v-model.trim="form.costTypeName" class='control-width' :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="应收金额" prop="payAmount">
          <el-input v-model.trim="form.payAmount" class='control-width' :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="实收金额" prop="incomeAmount">
          <el-input v-model.trim="form.incomeAmount" class='control-width'></el-input>
        </el-form-item>
        <el-form-item label="收款日期" prop="updateTime">
          <el-date-picker type="datetime" icon="" v-model.trim="form.updateTime" class='control-width'></el-date-picker>
        </el-form-item>
        <el-form-item label="确认人" prop="operateor">
          <el-input v-model.trim="form.operateor" class='control-width' :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submitHandler">确认收款</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col>
    </el-col>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      labelWidth: '100px',
      dialogVisible: false,
      form: {
        costTypeName: '',
        payAmount: '',
        incomeAmount:'',
        updateTime:'',
        operateor:''
      },
      selectedData:{

      }
    }
  },
  computed: {

  },
  methods: {
  	...mapActions(['incomeCabinetCostUpdate']),
  	submitHandler(){
  		this.form.updateTime = this.dateFormatHandle(this.form.updateTime,'yyyy-MM-dd hh:mm:ss');
  		this.incomeCabinetCostUpdate({data:JSON.stringify(this.form)}).then((res)=>{
  			if(res.success){
  				this.$message({
	  				message:res.message,
	  				type:'success'
	  			})
	  			this.$parent.getList();
	  			this.dialogVisible = false;
  			}else{
  				this.$message({
	  				message:res.message,
	  				type:'warning'
	  			})
  			}
  		})
  	}
  },
  created() {

  },
  mounted() {

  }

}

</script>
