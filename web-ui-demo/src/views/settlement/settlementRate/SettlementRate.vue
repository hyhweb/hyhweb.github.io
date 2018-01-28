<template>
	<section>
        <!--查询条件-->
		<el-col>
			<form-box title="查询">
				<el-form class="query-modal" :inline="true"  :model="form" ref="form" label-width="100px">
					<div class="query-params">
						<el-form-item label="部门名称" prop="name">
							<el-input v-model="form.name"  placeholder="请输入部门名称"  class='control-width'></el-input>
						</el-form-item>
					</div>
					<div class="query-btns">
						<el-form-item style="float:rigth" >
							<el-button type="primary" @click="onSubmit" :disabled="this.$global.isDisabled(1)" icon="search">查询</el-button>
							<el-button type="success" @click="resetForm('form')" icon="setting">清空</el-button>
						</el-form-item>
					</div>
				</el-form>
			</form-box>
		</el-col>
		<!--列表-->
		<el-col>
			<el-table
					:data="settlementRateList.data" :maxHeight="tableMaxHeight"  stripe>
				<!-- fixed="left"-->
				<el-table-column
						prop="departName"
						label="部门" width="300">
				</el-table-column>
				<el-table-column
						prop="orgCode"
						label="代码" width="100">
				</el-table-column>
				<el-table-column
						prop="description"
						label="描述" width="150">
				</el-table-column>
				<el-table-column
						prop="settleType"
						label="子公司类型" width="100">
				</el-table-column>
				<el-table-column
						prop="settleRate"
						label="子公司结算比例" width="130">
				</el-table-column>
        <el-table-column
          prop="minimumGuaranteeText"
          label="是否保底" width="100">
        </el-table-column>
        <el-table-column
          prop="logisticsRate"
          label="物流公司结算比例" width="130">
        </el-table-column>
				<el-table-column label="操作" fixed="right" align="center" width="100">
					<template scope="scope">
						<el-button size="small" type="primary" @click.native="updateSettlementRate(scope.row)" :disabled="isDisabled(7)">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
		<el-col style="padding:10px 0;text-align:center;">
			<el-pagination layout="total, sizes, prev, pager, next, jumper"
						   @current-change="handleCurrentChange"
						   @size-change="handleSizeChange"
						   :current-page="pageNo"
						   :page-size="pageSize"
						   :total="pageCount"
						   :page-sizes="pagesizes">
			</el-pagination>
		</el-col>

		<SettlementRateUpdate ref="settlementRateUpdate"></SettlementRateUpdate>

	</section>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import util from '../../../common/js/util'
    import pagination  from '../../../common/mixins/pagination'
    import SettlementRateUpdate  from './SettlementRateUpdate.vue'

    export default {
        mixins:[pagination],
        components:{SettlementRateUpdate},
        data() {
            return {
                labelWidth:'80px',
                selectData:[],
                form: {
                    name:'',// 部门
                },
            }
        },
        computed:{
            ...mapGetters([
                'settlementRateList'
            ])
        },
        methods: {
            ...mapActions([
                'getSettlementRateList'
            ]),
            init(){
                this.getList()
            },
            //获取列表
            getList(){
                //部门名称
                this.form.name= this.form.name ? this.form.name.trim() : '';
                this.pageHandler(this.form,this.getSettlementRateList)
            },
            onSubmit() {
                this.getList()
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            updateSettlementRate(row){
                this.$refs.settlementRateUpdate.newSettlementRatedialogVisible = true;
				        this.$refs.settlementRateUpdate.detail = Object.assign({}, row);
			},
        },
        created(){
            this.init()
        },
    }

</script>

<style>
  @import '../../../styles/custom-theme/query-modal.css'
</style>
