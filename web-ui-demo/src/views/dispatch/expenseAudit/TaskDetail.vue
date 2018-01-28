<template>
  <div>
      <el-form :model="editForm" label-width="80px"  ref="editForm" >
          <el-form-item label="箱号" :label-width="labelWidth">
              <el-input v-model="editForm.cabinetNo" class='control-width'></el-input>
          </el-form-item>
        <el-form-item label="封号" :label-width="labelWidth">
          <el-input v-model="editForm.sealNo" class='control-width'></el-input>
        </el-form-item>
          <el-form-item label="提柜码头" :label-width="labelWidth">
              <span>{{taskDetail.getDockName}}</span>
          </el-form-item>
          <el-form-item label="还柜码头" :label-width="labelWidth">
              <span>{{taskDetail.returnDockName}}</span>
          </el-form-item>
          <el-form-item label="目的港" :label-width="labelWidth">
              <span>{{taskDetail.endHarborName}}</span>
          </el-form-item>          
          <el-form-item label="船公司" :label-width="labelWidth">
              <span>{{taskDetail.shipCompanyName}}</span>
          </el-form-item>
          <el-form-item label="联系人" :label-width="labelWidth">
              <span>{{taskDetail.contactName}}</span>
          </el-form-item>
          <el-form-item label="装卸地址" :label-width="labelWidth"  >
              <span>{{taskDetail.address}}</span>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="labelWidth">
              <span>{{taskDetail.contactPhone}}</span>
          </el-form-item>
          <el-form-item label="马力要求" :label-width="labelWidth">
              <span>{{taskDetail.horsePower}}</span>
          </el-form-item>
          <el-form-item label="要求装送货日期" :label-width="labelWidth">
              <!--<span>{{formatDate(taskDetail.requireDate)}}</span>-->
            <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" v-model="requireDate" @change="handleSelectRequireDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="要求完成日期" :label-width="labelWidth">
              <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" v-model="overDate" @change="handleSelectOverDate"></el-date-picker>
          </el-form-item>
          <el-form-item label="运费"  :label-width="labelWidth">
              <span>{{taskDetail.freight}}</span>
          </el-form-item>
          <el-form-item label="备注" :label-width="labelWidth">
              <span>{{taskDetail.orderRemark}}</span>
          </el-form-item>
          
      </el-form>
  </div>
</template> 

<script type="text/ecmascript-6">
    import util from '../../../common/js/util'
	export default {
	    props:["taskDetail"],
	    data() {
	        return {
	            labelWidth: '120px',
	            loading: false,
	            requireDate: this.formatDate(this.taskDetail.requireDate),
	            overDate: this.taskDetail.overDate,
	            editForm: {
	                taskId: this.taskDetail.id,
	                overDate: this.taskDetail.overDate,
	                sealNo: this.taskDetail.sealNo,
	                cabinetNo: this.taskDetail.cabinetNo,
	                cabinetId: this.taskDetail.cabinetId,
	                requireDate:this.formatDate(this.taskDetail.requireDate)
	            }
	        }
	    },
	  	watch: {
	        taskDetail: function () {
	          this.editForm.taskId=this.taskDetail.id;
	          this.editForm.sealNo=this.taskDetail.sealNo;
	          this.editForm.cabinetNo=this.taskDetail.cabinetNo;
	          this.editForm.cabinetId=this.taskDetail.cabinetId;
	          this.editForm.requireDate=this.taskDetail.requireDate;
	          this.editForm.overDate=this.taskDetail.overDate;
	          this.requireDate= this.formatDate(this.taskDetail.requireDate);
	        	this.overDate=this.taskDetail.overDate;
	        }
	  	},
	    methods: { 
			handleSelectRequireDate(val){
	        	this.editForm.requireDate=val;
	      	},
	      	handleSelectOverDate(val){
	            this.editForm.overDate=val;
	        },
	      	formatDate(date){
	        	return util.formatDate.format(new Date(date), 'yyyy-MM-dd hh:mm:ss');
	      	},
	    }

	}
</script>

<style  scoped lang="scss">

    .el-dialog__body{
        padding: 5px 20px;
    }
    .el-form-item{
        margin-bottom: 2px;
    }
</style>
