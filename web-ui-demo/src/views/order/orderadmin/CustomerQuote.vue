<template>
<el-dialog  :visible.sync="customerQuoteDialog" size="large" >
 <el-col>
	<el-table ref="table"
      highlight-current-row
      border
      :max-height="tableMaxHeight"
      :data="custompriceList.data"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column type="selection" fixed>
      </el-table-column>


      <el-table-column class-name="cell-group"
                       prop="cqdVoList._20GP"
                       label="类型" width="40">
        <template scope="scope">
          <div class="fullwith">
            <div class="content-rowspan">
              <div>装</div>
              <div>送</div>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode"
                       label="20GP报价" width="90">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._20GP!='0'">{{scope.row.cqdVoList[0]._20GP}}</div>
            <div v-if="scope.row.cqdVoList[0]._20GP=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._20GP!='0'">{{scope.row.cqdVoList[1]._20GP}}</div>
            <div v-if="scope.row.cqdVoList[1]._20GP=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode"
                       label="2*20GP报价" width="90">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._2x20GP!='0'" :class="{'c1': scope.row.cqdVoList[0]._20GPStatus}">{{scope.row.cqdVoList[0]._2x20GP}}</div>
            <div v-if="scope.row.cqdVoList[0]._2x20GP=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._2x20GP!='0'" :class="{'c1': scope.row.cqdVoList[1]._20GPStatus}">{{scope.row.cqdVoList[1]._2x20GP}}</div>
            <div v-if="scope.row.cqdVoList[1]._2x20GP=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode"
                       label="40GP报价" width="90">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._40GP!='0'"
            :class="{'c1': scope.row.cqdVoList[0]._40GPStatus}">{{scope.row.cqdVoList[0]._40GP}}</div>
            <div v-if="scope.row.cqdVoList[0]._40GP=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._40GP!='0'"
            :class="{'c1': scope.row.cqdVoList[1]._40GPStatus}"
            >{{scope.row.cqdVoList[1]._40GP}}</div>
            <div v-if="scope.row.cqdVoList[1]._40GP=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode"
                       label="40HQ报价" width="90">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._40HQ!='0'"
            :class="{'c1': scope.row.cqdVoList[0]._40HQStatus}"
            >{{scope.row.cqdVoList[0]._40HQ}}</div>
            <div v-if="scope.row.cqdVoList[0]._40HQ=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._40HQ!='0'"
            :class="{'c1': scope.row.cqdVoList[1]._40HQStatus}"
            >{{scope.row.cqdVoList[1]._40HQ}}</div>
            <div v-if="scope.row.cqdVoList[1]._40HQ=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode"
                       label="20HQ报价" width="90">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._20HQ!='0'"
            :class="{'c1': scope.row.cqdVoList[0]._20HQStatus}"
            >{{scope.row.cqdVoList[0]._20HQ}}</div>
            <div v-if="scope.row.cqdVoList[0]._20HQ=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._20HQ!='0'"
            :class="{'c1': scope.row.cqdVoList[1]._20HQStatus}"
            >{{scope.row.cqdVoList[1]._20HQ}}</div>
            <div v-if="scope.row.cqdVoList[1]._20HQ=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode"
                       label="2*20HQ报价" width="90">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._2x20HQ!='0'"
              :class="{'c1': scope.row.cqdVoList[0]._2x20HQStatus}"
            >{{scope.row.cqdVoList[0]._2x20HQ}}</div>
            <div v-if="scope.row.cqdVoList[0]._2x20HQ=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._2x20HQ!='0'"
             :class="{'c1': scope.row.cqdVoList[1]._2x20HQStatus}"
            >{{scope.row.cqdVoList[1]._2x20HQ}}</div>
            <div v-if="scope.row.cqdVoList[1]._2x20HQ=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>

	  <el-table-column
        prop="harborName"
        label="港口">
      </el-table-column>

      </el-table-column>
      <el-table-column
        prop="regionName"
        label="地区" width="120">
      </el-table-column>
      <el-table-column
        prop="customerName"
        label="客户名称" width="110">
      </el-table-column>
      <el-table-column
        prop="shipCompanyName"
        label="船公司"
      >
      </el-table-column>

      <el-table-column
        prop="isInvoice"
        label="开发票" width="40">
        <template scope="scope">
          <span v-show="scope.row.isInvoice">是</span>
          <span v-show="!scope.row.isInvoice">否</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="updateTime"
        label="最后更新时间"
        width="140">
      </el-table-column>


      <el-table-column
        prop="validityStartDate"
        label="生效日期"
      >
      </el-table-column>

      <el-table-column
        prop="validityEndDate"
        label="失效日期"
      >
      </el-table-column>

 <!--      <el-table-column
   prop="remark"
   label="备注"
 >
 </el-table-column>

 <el-table-column
   prop="operUserName"
   label="操作人">
 </el-table-column> -->





    </el-table>
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
  </el-col>
  <div slot="footer">
  	<div >
    <el-button @click="customerQuoteDialog = false">取 消</el-button>
    <el-button type="primary" @click="submitHandle">确 定</el-button>
    </div>
  </div>
  </el-dialog>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import util from '../../../common/js/util';
  import pagination from '../../../common/mixins/pagination';
  import tool from '../../../common/mixins/tool';
	export default {
		mixins: [pagination],
		data(){
			return{
				customerQuoteDialog:false,
				form:{
					regionCode:'',
					harborId:'',
					orderType:'',
					customerId:'',
					invoicing:'',
					shipCompanyId:'',
          isSendFree:0
				},
				selectData: [],
			}
		},
		methods:{
			...mapActions([
	        'getCustompriceList',
	        'getOrderQuoteById'
	      ]),
		   getList(){
		   	this.pageHandler(this.form, this.getCustompriceList);
		   },
		    handleSelectionChange(val){
	        this.selectData = val;
	      },
		   submitHandle(){
		   	if(this.selectData.length != 1){
		   		this.$message({
		   			message:'请选择一条数据进行操作',
		   			type:'warning'
		   		})
		   		return;
		   	}
		   	let param = {
		   		customerQuoteId:this.selectData[0].id,
          orderType:this.$parent.orderInfo[0].orderType,
          orderId:this.$parent.orderInfo[0].orderId
		   	}
        if(this.form.isSendFree ==1){
          param.harborId = this.form.harborId;
          param.regionCode = this.form.regionCode;
        }
		   	this.getOrderQuoteById(param).then((res)=>{
		   		this.$parent.updateQuote(res);
		   		if(res.success){
		   			this.$parent.customerQuoteId = this.selectData[0].id;
		   			this.customerQuoteDialog = false
		   		}else{
		   			this.$message({
		   				message:res.message,
		   				type:'warning'
		   			})
		   		}
		   	})
		   }
		},
		 computed: {
	      ...mapGetters([
	        'custompriceList'
	      ])
	    },
	    created(){

	    },
	    mounted(){

	    }
	}
</script>
