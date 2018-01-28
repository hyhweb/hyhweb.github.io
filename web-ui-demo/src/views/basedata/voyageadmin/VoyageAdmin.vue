<template>
<section>
      <form-box  title="查询">
      <el-form inline ref="form" :model="form" label-width="80px">
        <el-form-item label="地区名称 ">
          <el-input v-model="form.full_name" class="control-width"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
       </el-form-item>
      </el-form>
      </form-box>
      <el-table ref="table"
      :data="regionList.data"
      :max-height="tableMaxHeight"
      @row-click="handleRowClick">
      <el-table-column
        prop="fullName"
        label="全称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="regionName"
        label="区域"
        width="180">
      </el-table-column>
      <el-table-column
        prop="regionCode"
        label="区域编码">
      </el-table-column>
    </el-table>
    <el-col style="padding:10px 0;text-align:center;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="pageNo"
      :page-size="pageSize"
      :total="rowCount"
      :page-sizes="pagesizes">
      </el-pagination>
  </el-col>
</section>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  export default {
    mixins:[pagination],
    components:{},
    data() {
      return {
        form: {
          full_name: ''
        }

      }
    },
    computed:{
      ...mapGetters([
        'regionList'
        ])
    },

    methods: {
      ...mapActions([
        'getRegionList'
        ]),
      getList(){
        let param = Object.assign(this.paginationParams(),this.form)
        this.getRegionList(param)
      },
      handleCurrentChange(val){
         this.pageNo = val
         this.getList();
         this.total = this.regionList.rowCount
      },
      handleSizeChange(val){
        this.pageSize = val
        this.getList()
        this.rowCount = this.regionList.rowCount
      },
      onSubmit() {
        console.log('submit!');
      }
    },
    created(){
      this.$store.dispatch('getRegionList')
      this.rowCount = this.regionList.rowCount
    },
    mounted(){
      console.log(this.page)
    }
  }
</script>
