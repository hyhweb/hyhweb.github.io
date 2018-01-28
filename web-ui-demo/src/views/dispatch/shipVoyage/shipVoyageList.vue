<template>
	<section>
		<ToolBarBox>
			<el-col>
				<form-box title="查询"  ref="formbox">
        			<el-form class="toolbar" :inline="true" :model="form" ref="form" @submit.prevent="onSubmit">
                <el-form-item label="目的港" :label-width="labelWidth">
                  <el-select v-model="form.destHarborId" clearable filterable class='input-width' placeholder="目的港">
                    <el-option v-for="item in initData.harborList"  :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
  		          <el-form-item label="船公司" :label-width="labelWidth">
                  <el-select v-model="form.shipCompanyId" clearable filterable class='input-width' placeholder="船公司">
                    <el-option v-for="item in initData.shipCompanys"  :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="船名航次" :label-width="labelWidth">
                  <el-select v-model="form.voyageName" clearable filterable class='input-width' placeholder="船名航次">
                    <el-option v-for="item in initData.voyageList"  :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
						    <el-form-item label="实际到港日期" :label-width="labelWidth" prop="actualArriveDateStart">
          				<el-date-picker type="date" placeholder="选择开始日期" v-model.trim="form.actualArriveDateStart" @change="actualArriveDateStartChange" style="width: 120px"></el-date-picker>-
          				<el-date-picker type="date" placeholder="选择结束日期" v-model.trim="form.actualArriveDateEnd" @change="actualArriveDateEndChange" style="width: 120px"></el-date-picker>
          			</el-form-item>
						    <el-form-item label=" " :label-width="labelWidth">
            			<el-button  type="primary"  @click="getList"
                        icon="search">查询
            			</el-button>
            			<el-button icon="setting" @click="resetForm">清空</el-button>
          			</el-form-item>
              </el-form>
    		</form-box>
			</el-col>
		</ToolBarBox>
		<TableBox>
			<el-col>
      			<el-table border ref="table" :max-height="tableMaxHeight" highlight-current-row :data="shipList.data" stripe
      			@selection-change="handleSelectionChange"
       			@row-click="handleRowClick">
			        <el-table-column type="selection" v-model="selectData" width="40">
			        </el-table-column>
			        <el-table-column prop="destHarborName" label="目的港" min-width="60" align="center">
			        </el-table-column>
			        <el-table-column prop="shipCompanyName" label="船公司" min-width="180" align="center">
			        </el-table-column>
			        <el-table-column prop="voyageName" label="船名航次" min-width="80" align="center">
			        </el-table-column>
			        <el-table-column prop="expectArriveDateStr" label="预计抵港时间" min-width="100" align="center">
			        </el-table-column>
              <el-table-column  prop="actualArriveDateStr" align="center" label="实际到港日期"  min-width="100">
                <template scope="scope">
                  <el-row>
                    <span v-if="scope.row.colorFlag==0" style="color:red;">{{scope.row.actualArriveDateStr}}</span>
                    <span v-else>{{scope.row.actualArriveDateStr}}</span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column  prop="daysInYard" align="center" label="堆存天数"  min-width="80">
                <template scope="scope">
                  <el-row>
                    <span v-if="scope.row.colorFlag==0" style="color:red;">{{scope.row.daysInYard}}</span>
                    <span v-else>{{scope.row.daysInYard}}</span>
                  </el-row>
                </template>
              </el-table-column>
				      <el-table-column prop="unassignedNumber" label="未指派柜数" min-width="80" align="center">
			        </el-table-column>
			        <el-table-column prop="assignedNumber" label="已指派柜数" min-width="80" align="center">
			        </el-table-column>
				      <el-table-column prop="inExecutionNumber" label="执行中柜数" min-width="100" align="center">
			        </el-table-column>
			        <el-table-column prop="hangUpNumber" label="挂起柜数" min-width="80" align="center">
			        </el-table-column>
				      <el-table-column prop="completedNumber" label="已完成中柜数" min-width="100" align="center">
			        </el-table-column>
			        <el-table-column prop="unConfirmedNumber" label="未确定柜数" min-width="80" align="center">
			        </el-table-column>
              <el-table-column  prop="operation" align="center" label="操作" width="300">
              <template scope="scope">
                  <el-button-group>
                      <template>
                        <el-row style="margin-bottom: 3px">
                            <span v-if="scope.row.actualArriveDateStr == ''" @click="shipMaintain(scope.row)" style="cursor:pointer;color:#20a0ff;margin:0 10px;">维护到港日期</span>
                            <span v-else :display="true" style="cursor:not-allowed;color:#ccc;margin:0 10px;">维护到港日期</span>
                            <span @click="shipOrder(scope.row)" style="cursor:pointer;color:#20a0ff;margin:0 10px;">查看订单</span>
                            <span @click="shipCabinet(scope.row)" style="cursor:pointer;color:#20a0ff;margin:0 10px;">查看集装箱</span>
                        </el-row>
                      </template>
                  </el-button-group>
              </template>
            </el-table-column>
      			</el-table>
    		</el-col>
		</TableBox>
		<PaginationBox>
    		<el-col>
      			<el-pagination style="float:right"  ref="pagination" layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="pageNo" :page-size="pageSize" :total="pageCount" :page-sizes="pagesizes">
      			</el-pagination>
    		</el-col>
  	</PaginationBox>
    <el-col>
      <el-dialog title="维护实际到港日期" v-model="timeVisible" size="thin">
        <v-maintenanceTime :maintenance="maintenance" v-on:closeMintenance="closeMintenance"></v-maintenanceTime>
      </el-dialog>
    </el-col>
	</section>
</template>
<style scoped  lang="scss">
	.toolbar{
    	padding: 5px;
    	margin: 5px 0;
  	}
	.input-width{
    	width: 250px;
  	}
</style>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import util from '../../../common/js/util';
  	import pagination from '../../../common/mixins/pagination';
    import maintenanceTime from './maintenanceTime.vue'
    import {getShipListInit} from '../../../api/modules/dispatch'
  	export default {
  		mixins: [pagination],
      props:["completeStatus"],
  		data() {
  			return{
          maintenance:{},
          shipStatusName:{"un_completed":0,"completed":1},
          timeVisible:false,
  				labelWidth: '100px',
          listHeight:430,
  				form:{
            completeStatus:'',
  					destHarborId:'',
  					shipCompanyId:'',
  					voyageName:'',
 					  actualArriveDateStart: '',
      			actualArriveDateEnd: '',
  				},

  				selectData:'',
          initData:{
            harborList:[],
            voyageList: [],
            shipCompanys:[],
          }
  			}
  		},
    components:{
      'v-maintenanceTime': maintenanceTime,
    },
		computed: {
      		...mapGetters([
        		'shipList'
      		]),
    	},
      watch: {
        completeStatus: function () {
          this.getList();
        },
      },
  		methods:{
		    ...mapActions([
      		'getshipList'
    		]),
        // 下拉菜单
        getListInit(){
          getShipListInit().then((res) =>{
            let data = res.data;
            if(data.code==1){
              this.initData=data.data;
            }
          });
        },
        //维护到港日期
    		shipMaintain(val){
          this.maintenance = val;
          this.timeVisible = true;
    		},
        closeMintenance(){
          this.timeVisible=false;
          this.getList();
        },
        // 查看订单
    		shipOrder(val){
    			this.$router.push({
      			path: '/order/list',
      			name: '订单列表',
  				  params: {
              		voyageName:val.voyageName,
                  endHarborId:val.destHarborId
          		}
          	})
    		},
        // 查看集装箱
    		shipCabinet(val){
			    this.$router.push({
      			path: '/order/cabinet/list',
      			name: '集装箱列表',
  				  params: {
              		voyageName:val.voyageName,
              		endHarborId:val.destHarborId
          		}
          	})
    		},
        actualArriveDateStartChange(val) {
      		this.form.actualArriveDateStart = val;
    		},
        actualArriveDateEndChange(val) {
      		this.form.actualArriveDateEnd = val;
    		},
    		getList(){
          this.form.completeStatus= this.shipStatusName[this.completeStatus];
    			this.pageHandler(this.form, this.getshipList);
    		},
		    // 获取列表选中的数据
    		handleSelectionChange(val) {
      		this.selectData = val;
      		if (this.selectData.length == 0) {
        			return;
      		}

    		},
    		//清空
    		resetForm(){
				  for(var o in this.form){
          			this.form[o]='';
        		}
    		},
		  },
		  mounted() {
    		this.$nextTick(function () {
          this.getListInit();
      		this.getList();
          this.listHeight=window.screen.availHeight - 220;
    		});
    	},
  	}
</script>
