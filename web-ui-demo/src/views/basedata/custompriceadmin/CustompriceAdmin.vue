<!-- 客户报价管理 列表 -->
<template>
  <section class="ke_hu_bao_jia">
    <ToolBarBox>
      <el-col class="tool-bar">
        <el-button-group>
          <el-button type="primary" icon="plus" size="small" @click="newCustomprice"
                     :disabled="this.$global.isDisabled(2)">新增
          </el-button>
          <el-button type="primary" icon="edit" size="small" @click="updateCustomprice"
                     :disabled="this.$global.isDisabled(7)">修改
          </el-button>
          <el-button type="primary" icon="delete" size="small" @click.prevent="deleteCustompriceHandle"
                     :disabled="this.$global.isDisabled(9)">删除
          </el-button>
          <el-button type="primary" icon="edit" size="small" @click="queryCustomerLog"
                     :disabled="this.$global.isDisabled(61)">查看日志
          </el-button>
          <el-button type="primary" icon="edit" size="small" @click="copyPrice"
                     :disabled="this.$global.isDisabled(63)">批量复制报价
          </el-button>
          <el-button type="primary" icon="edit" size="small" @click="editValidateDate"
                     :disabled="this.$global.isDisabled(30)">批量修改日期
          </el-button>

          <el-button type="primary" icon="upload2" size="small" @click="toImportExcel"
                     :disabled="this.$global.isDisabled(68)">批量导入报价
          </el-button>
        </el-button-group>
      </el-col>

      <form-box title="查询">
        <el-form class="query-modal linesmall" :inline="true" ref="form" :model="form">
        <div class="query-params">
          <el-form-item class="combine-inline-input" label="地区" :label-width="labelWidth">
            <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionOne" placeholder="请选择省级地区" @change="changeRegionOne">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in regionBelongPList.data"
                         :label="item.regionName+'('+(item.regionQrycode)+')'"
                         :value="item.regionCode "
                         :key="item.regionCode">
              </el-option>
            </el-select>
            -
            <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionTow" placeholder="请选择市级地区" @change="changeRegionTow">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in regionBelongCityData"
                         :key="item.value"
                         :label="item.text"
                         :value="item.value">
              </el-option>
            </el-select>
            -
            <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionThird" placeholder="请选择县级地区" @change="changeRegionThird">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in  regionBelongDistrictData "
                         :key="item.value"
                         :label="item.text"
                         :value="item.value">
              </el-option>
            </el-select>
            -
            <el-select clearable filterable default-first-option v-model="addressSelectedArr.regionFourth" placeholder="请选择镇级地区" @change="changeRegionFourth">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in regionBelongStreetData"
                         :key="item.value"
                         :label="item.text"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="港口" prop="harborId" :label-width="labelWidth">
            <el-select  clearable filterable default-first-option v-model="form.harborId" placeholder="请选择港口">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in harborBelongListByOrgCode" :label="item.harborName+'('+(item.harborCode)+')'"
                         :value="item.harborId"
                         :key="item.harborId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="客户名称" prop="customerId" :label-width="labelWidth">
            <el-select  clearable filterable default-first-option  v-model="form.customerId" placeholder="请选择用户">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in customListInCustom"
                         :label="item.customerName+'('+(item.customerCode)+')'"
                         :value="item.customerId"
                         :key="item.customerId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="combine-inline-input-sm" label="船公司" prop="shipCompanyId">
            <el-select  clearable filterable default-first-option  v-model="form.shipCompanyId" placeholder="请选择">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in allshipcompanyList"
                         :label="item.shipCompanyName+'('+(item.shipCompanyCode)+')'"
                         :value="item.shipCompanyId"
                         :key="item.shipCompanyId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="combine-inline-input" label="生效日期" prop="updateDate" :label-width="labelWidth">
            <el-date-picker type="date" placeholder="生效日期(始)" v-model="form.validityStartDateStart"/>
            <el-date-picker type="date" placeholder="生效日期(终)" v-model="form.validityStartDateEnd"/>
          </el-form-item>

          <el-form-item class="combine-inline-input-sm" label="操作人" prop="operUserId">
            <el-select clearable filterable default-first-option  v-model="form.operUserId" placeholder="请选择">
              <el-option value="">请选择</el-option>
              <el-option v-for="item in userInfoList"
                         :label="item.text"
                         :value="item.value"
                         :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="combine-inline-input" label="失效日期" prop="updateDate" :label-width="labelWidth">
            <el-date-picker type="date" placeholder="失效日期(始)" v-model="form.validityEndDateStart"/>
            <el-date-picker type="date" placeholder="失效日期(终)" v-model="form.validityEndDateEnd"/>
          </el-form-item>

          <el-form-item class="combine-inline-input" label="更新日期" prop="updateDate" :label-width="labelWidth">
            <el-date-picker type="date" placeholder="更新日期(始)" v-model="form.updateTimeStart"/>
            <el-date-picker type="date" placeholder="更新日期(终)" v-model="form.updateTimeEnd"/>
          </el-form-item>
          <!--<el-form-item label="更新日期(始)" prop="updateDate" :label-width="labelWidth">-->
            <!--<el-date-picker type="datetime" placeholder="更新日期" v-model="form.updateTimeStart"/>-->
          <!--</el-form-item>-->
          <!--&lt;!&ndash;至&ndash;&gt;-->
          <!--<el-form-item label="更新日期(终)" :label-width="labelWidth">-->
            <!--<el-date-picker type="datetime" placeholder="更新日期" v-model="form.updateTimeEnd"/>-->
          <!--</el-form-item>-->
        </div>

        <div class="query-btns">
          <el-form-item >
            <el-button type="primary" @click="onSubmit" :disabled="isDisabled(1)">查询</el-button>
          </el-form-item>
          <el-form-item >
            <el-button  @click="resetForm" :disabled="isDisabled(1)">清空</el-button>
          </el-form-item>
        </div>
        </el-form>
      </form-box>
    </ToolBarBox>

    <TableBox>
      <el-table ref="table"
      highlight-current-row
      border
      :max-height="460"
      :data="custompriceList.data"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column
        prop="harborName"
        label="港口">
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

      <el-table-column class-name="cell-group"
        prop="isInvoice"
        label="是否专票" width="60">
        <template scope="scope">
          <span v-show="scope.row.isInvoice">是</span>
          <span v-show="!scope.row.isInvoice">否</span>
        </template>
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
                       prop="shipCompanyCode" label-class-name="line-wrap"
                       label="20GP报价" width="60">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._20GPStatus}">{{scope.row.cqdVoList[0]._20GP}}</div>
            <div v-if="scope.row.cqdVoList[0]._20GP=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._20GPStatus}">{{scope.row.cqdVoList[1]._20GP}}</div>
            <div v-if="scope.row.cqdVoList[1]._20GP=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode"
                       label="2*20GP报价" width="55">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._2x20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._2x20GPStatus}">{{scope.row.cqdVoList[0]._2x20GP}}</div>
            <div v-if="scope.row.cqdVoList[0]._2x20GP=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._2x20GP!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._2x20GPStatus}">{{scope.row.cqdVoList[1]._2x20GP}}</div>
            <div v-if="scope.row.cqdVoList[1]._2x20GP=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode" label-class-name="line-wrap"
                       label="40GP报价" width="60">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._40GP!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._40GPStatus}">{{scope.row.cqdVoList[0]._40GP}}</div>
            <div v-if="scope.row.cqdVoList[0]._40GP=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._40GP!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._40GPStatus}">{{scope.row.cqdVoList[1]._40GP}}</div>
            <div v-if="scope.row.cqdVoList[1]._40GP=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode" label-class-name="line-wrap"
                       label="40HQ报价" width="60">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._40HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._40HQStatus}">{{scope.row.cqdVoList[0]._40HQ}}</div>
            <div v-if="scope.row.cqdVoList[0]._40HQ=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._40HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._40HQStatus}">{{scope.row.cqdVoList[1]._40HQ}}</div>
            <div v-if="scope.row.cqdVoList[1]._40HQ=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode" label-class-name="line-wrap"
                       label="20HQ报价" width="60">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._20HQStatus}">{{scope.row.cqdVoList[0]._20HQ}}</div>
            <div v-if="scope.row.cqdVoList[0]._20HQ=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._20HQStatus}">{{scope.row.cqdVoList[1]._20HQ}}</div>
            <div v-if="scope.row.cqdVoList[1]._20HQ=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column class-name="cell-group"
                       prop="shipCompanyCode"
                       label="2*20HQ报价" width="60">
        <template scope="scope">
          <div class="content-rowspan">
            <div v-if="scope.row.cqdVoList[0]._2x20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[0]._2x20HQStatus}">{{scope.row.cqdVoList[0]._2x20HQ}}</div>
            <div v-if="scope.row.cqdVoList[0]._2x20HQ=='0'">&nbsp</div>
            <div v-if="scope.row.cqdVoList[1]._2x20HQ!='0'" :class="{'warning-text': scope.row.cqdVoList[1]._2x20HQStatus}">{{scope.row.cqdVoList[1]._2x20HQ}}</div>
            <div v-if="scope.row.cqdVoList[1]._2x20HQ=='0'">&nbsp</div>
          </div>
        </template>
      </el-table-column>


      <el-table-column id="editTableLabelText"
        prop="updateTime"
        label="最后更新时间"
        label-class-name="line-wrap"
        align="center">
        <template scope="scope">
          <p>{{ scope.row.updateTime.substr(0, 10) }}</p>
          <p>{{ scope.row.updateTime.substring(10) }}</p>
        </template>
      </el-table-column>


      <el-table-column
        prop="validityStartDate"
        label="生效日期">
      </el-table-column>

      <el-table-column
        prop="validityEndDate"
        label="失效日期"
      >
      </el-table-column>

      <el-table-column
        prop="remark"
        label="备注"
      >
      </el-table-column>

      <el-table-column
        prop="operUserName"
        label="操作人">
      </el-table-column>


      <el-table-column v-if="showEdit"
                       prop="contactInfo"
                       label="操作" width="80" fixed="right">
        <template scope="scope">
          <el-button size="small" type="primary" @click="toEditTask(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    </TableBox>

    <PaginationBox>
      <el-col style="text-align:center;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       :current-page="pageNo"
                       :page-size="pageSize"
                       :total="pageCount"
                       :page-sizes="pagesizes">
        </el-pagination>
      </el-col>
    </PaginationBox>


        <!-- <el-form-item label="生效日期(始)" prop="updateDate" :label-width="labelWidth">
          <el-date-picker type="date" placeholder="生效日期" v-model="form.validityStartDateStart"/>
        </el-form-item>
        <el-form-item label="失效日期(终)" :label-width="labelWidth">
          <el-date-picker type="date" placeholder="生效日期" v-model="form.validityStartDateEnd"/>
        </el-form-item> -->





    <el-dialog title="批量修改日期" v-model="editValidateDateVisible">
      <el-form :model="editValidateDateForm" :rules="editValidateDateRules" ref="editValidateDateForm">
        <el-form-item label="生效日期" prop="updateDate">
          <el-date-picker type="date" placeholder="生效日期" v-model="editValidateDateForm.validityStartDate"/>
        </el-form-item>

        <el-form-item label="失效日期">
          <el-date-picker type="date" placeholder="失效日期" v-model="editValidateDateForm.validityEndDate"/>
        </el-form-item>

        <el-form-item label="" label-width="100px">
            <el-button type="primary" @click="editValidateDateHandle" :disabled="this.$global.isDisabled(30)">确定修改</el-button>
        </el-form-item>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="copyPriceHandle">确定修改</el-button>
      </div> -->
    </el-dialog>

    <el-dialog title="批量复制客户报价" v-model="dialogVisible">
      <el-form :model="copyForm" :rules="rules" ref="copyForm">
        <el-form-item label="报价被复制的港口" prop="harborId" label-width="150px">
          <el-select clearable filterable default-first-option v-model="copyForm.harborId" placeholder="请选择港口" class='control-width'>
            <el-option value="">请选择</el-option>
            <el-option v-for="item in harborBelongList"
                        :label="item.harborName+'('+(item.harborCode)+')'"
                        :value="item.harborId"
                        :key="item.harborId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="报价被复制的客户" prop="customerId"  label-width="150px">
          <el-select  clearable filterable default-first-option  v-model="copyForm.customerId" placeholder="请选择用户">
            <el-option value="">请选择</el-option>
            <el-option v-for="item in customList"
                        :label="item.customerName+'('+(item.customerCode)+')'"
                        :value="item.customerId"
                        :key="item.customerId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="需要复制报价的港口" prop="toHarborId" label-width="150px">
          <el-select clearable filterable default-first-option v-model="copyForm.toHarborId" placeholder="请选择港口" class='control-width'>
            <el-option value="">请选择</el-option>
            <el-option v-for="item in harborBelongList"
                        :label="item.harborName+'('+(item.harborCode)+')'"
                        :value="item.harborId"
                        :key="item.harborId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="需要复制报价的客户" prop="toCustomerId"  label-width="150px">
          <el-select clearable filterable default-first-option  v-model="copyForm.toCustomerId" placeholder="请选择用户">
            <el-option value="">请选择</el-option>
            <el-option v-for="item in customList"
                        :label="item.customerName+'('+(item.customerCode)+')'"
                        :value="item.customerId"
                        :key="item.customerId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=""  label-width="100px">
          <el-button type="primary"  @click="copyPriceHandle" :disabled="this.$global.isDisabled(63)">确定复制</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="客户报价导入" v-model="importExcelVisible" size="tiny">
      <el-form>
        <el-form-item prop="fileList" label-width="25px" style="text-align: center">
          <el-upload
            ref="upload"
            :action="actionPath"
            :show-file-list="true"
            :auto-upload="false"
            :data="uploadForm"
            :on-change="onChagenFile"
            :before-upload="beforeUploadFile"
            :on-success="successMethod">
            <div>
              <el-button size="small" type="primary" style="display: inline-block">选取文件<i class="el-icon-upload el-icon--right"></i></el-button>
              <div style="padding-left: 10px; display: inline-block;">只能上传Excel文件</div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label-width="25px" style="text-align: center">
          <el-button type="primary"  @click="uploadSubmit" :disabled="this.$global.isDisabled(68)">导入到数据库
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <CustompriceSave ref="custompricesave"></CustompriceSave>
    <CustompriceUpdata ref="custompriceupdata"></CustompriceUpdata>
    <CustompriceLog ref="CustompriceLog"></CustompriceLog>

  </section>
</template>
<script>

  import {mapGetters, mapActions} from 'vuex'
  import pagination  from '../../../common/mixins/pagination'
  import global  from '../../../common/global/global'
  import CustompriceSave  from './CustompriceSave.vue'
  import CustompriceUpdata  from './CustompriceUpdata.vue'
  import util from '../../../common/js/util'
  import '../../../styles/themes/blur-black.scss'
  import CustompriceLog from '../customerpriceadlog/CustompriceLog.vue'

  const token = sessionStorage.getItem('id_token');
  export default {
    mixins: [pagination],
    components: {CustompriceSave, CustompriceUpdata, CustompriceLog},
    data() {
      return {
        labelWidth: '90px',
        actionPath: this.$global.baseURL() + '/ygb-base-service/api/quote/customerQuote/uploadExcel',
        showEdit: false,
        newCustompricedialogVisible: false,
        dialogVisible:false,
        editValidateDateVisible:false,
        importExcelVisible:false,
        selectData: [],
        regionBelongCityData: [],
        regionBelongDistrictData: [],
        regionBelongStreetData: [],
        regionList: this.allRegionList,
        addressSelectedArr: {
          regionOne: '',
          regionTow: '',
          regionThird: '',
          regionFourth: ''

        },
        form: {
          regionCode: '',
          customerId: '',
          harborId: '',
          harborName: '',
          shipCompanyId: '',
          operUserId: '',
          updateTimeStart: '',
          updateTimeEnd: '',
          validityStartDateStart: '',
          validityStartDateEnd: '',
          validityEndDateStart: '',
          validityEndDateEnd: ''
        },
        copyForm:{
          harborId: '',
          customerId: '',
          toHarborId:'',
          toCustomerId:''
        },
        editValidateDateForm:{
          validityStartDate: '',
          validityEndDate: '',
          // ids: []
          ids: ''
        },
        uploadForm:{
            fileList:[],
            Authorization: 'Bearer ' + token,
        },
        rules:{
           harborId:[{required: true, message: '请选择报价被复制的港口', trigger: 'blur,change'}],
           customerId: [{required: true, message: '请选择报价被复制的客户', trigger: 'blur,change'}],
           toHarborId:[{required: true, message: '请选择需要复制报价的港口', trigger: 'blur,change'}],
           toCustomerId:[{required: true, message: '请选择需要复制报价的客户', trigger: 'blur,change'}]
        },
        editValidateDateRules: {
          validityStartDate: [{required: true, message: '请选择生效日期'}]
        }

      }
    },
    computed: {
      ...mapGetters([
        'custompriceList',
        'harborBelongList',
        'harborBelongListByOrgCode',
        'regionBelongPList',
        'customList',
        'customListInCustom',
        'allshipcompanyList',
        'userInfoList',
        'allRegionList'
      ])
    },

    methods: {
      ...mapActions([
        'getCustompriceList',
        'getRegionListByRegionCode',
        'deleteCustomprice',
        'HarborBelongList',
        'getHarborBelongListByOrgCode',
        'getCustomList',
        'getCustomListInCustom',
        'getallShipcompanyList',
        'getAllRegionByRegionCode',
        'quoteCopySubmit',
        'editValidateDateSubmit'
      ]),


      // saveIds (item) {
      //   this.editValidateDateForm["ids"].push(item.id);
      // },
      editValidateDate() {
        if (this.selectData.length > 0) {
          this.editValidateDateVisible = true;
          var tempArr = [];
          // this.editValidateDateForm["ids"].push(this.selectData[0].id);
          this.selectData.forEach(function(item) {
              tempArr.push(item.id);
          });
          // this.selectData.forEach(this.saveIds);
          this.editValidateDateForm["ids"] = tempArr.join();
          this.editValidateDateForm["validityStartDate"] = '';
          this.editValidateDateForm["validityEndDate"] = '';
          console.log(this.editValidateDateForm);
          // this.editValidateDateForm={
          //   validityStartDate: this.form.harborId,
          //   validityEndDate: this.form.customerId,
          //   ids: []
          // }
        } else {
          this.$confirm('请选择最少一条数据进行编辑')
        }

      },
      copyPrice(){
        this.dialogVisible = true;
        this.copyForm={
          harborId: this.form.harborId,
          customerId: this.form.customerId,
          toHarborId:'',
          toCustomerId:''
        }
      },



      toImportExcel(){
        this.importExcelVisible = true;
      },
      uploadSubmit(){
          this.$refs.upload.submit();
      },

      onChagenFile(file, fileList){
          if(fileList.length>1){
            this.$message.error('每次只能上传一个文件!');
            fileList.pop();   //去掉最后一位
          }
          this.uploadForm.fileList = fileList;
      },
      beforeUploadFile(file){
          console.log(file);
          let name = file.name;
          console.log("name="+name);
          let suffix = name.split(".")[1];
          console.log("suffix="+suffix);
          if(suffix!="xls" && suffix!="xlsx"){
            this.$message.error('只能上传Excel文件！');
            return false;
          }
          return true;
      },
      successMethod(response, file, fileList){
          if(response.success){
              this.importExcelVisible = false;
              this.getCustompriceList();
              this.$message({
                  message:response.message,
                  type:'success'
              });
          }else {
            this.$message({
                message:response.message,
                type:'warning'
            });
          }
      },

      copyPriceHandle(){
        this.$refs.copyForm.validate((valid) => {
        if (valid) {
                let param = this.copyForm;
              this.quoteCopySubmit(param).then((res)=>{
                if(res.success){
                    this.$message({
                      message:res.message,
                      type:'success'
                    })
                    this.dialogVisible = false;
                    this.getList()
                }else{
                    this.$message({
                      message:res.message,
                      type:'warning'
                    })
                }
              })
        }})
      },
      editValidateDateHandle(){
        this.$refs.editValidateDateForm.validate((valid) => {
        if (valid) {
              this.editValidateDateForm.validityStartDate = (typeof(this.editValidateDateForm.validityStartDate) == "string" ? this.editValidateDateForm.validityStartDate : util.formatDate.format(this.editValidateDateForm.validityStartDate, 'yyyy-MM-dd hh:mm:ss'));
              this.editValidateDateForm.validityEndDate = (typeof(this.editValidateDateForm.validityEndDate) == "string" ? this.editValidateDateForm.validityEndDate : util.formatDate.format(this.editValidateDateForm.validityEndDate, 'yyyy-MM-dd hh:mm:ss'));
              let param = this.editValidateDateForm;
              console.log(param);
              this.editValidateDateSubmit(param).then((res)=>{
                if(res.success){
                    this.$message({
                      message:res.message,
                      type:'success'
                    })
                    this.editValidateDateVisible = false;
                    this.getList()
                }else{
                    this.$message({
                      message:res.message,
                      type:'warning'
                    })
                }
              })
        }})
      },

      init(){
        this.$store.dispatch('RegionBelongPList');          //地区-省级下拉列表数据
        this.$store.dispatch('getUserInfoListByDeptId');   //操作人下拉列表数据
        this.$store.dispatch('HarborBelongList');           //所有港口列表
        this.$store.dispatch('getHarborBelongListByOrgCode');           //所有港口列表
        this.$store.dispatch('getCustomList');               //客户名称下拉列表
        this.$store.dispatch('getCustomListInCustom');      //客户名称下拉列表
        this.$store.dispatch('getallShipcompanyList');      //船公司下拉列表
      },

      handleSelectionChange(val){
        this.selectData = val;
      },

      changeRegionOne(val){
        this.addressSelectedArr.regionOne = val
        let param = {regionCode: val}
        this.getRegionListByRegionCode(param).then((res) => {
          this.regionBelongCityData = res.data
          this.regionBelongDistrictData = this.regionBelongStreetData = []
          this.addressSelectedArr.regionTow = ""
          this.addressSelectedArr.regionThird = ""
          this.addressSelectedArr.regionFourth = ""
        })
      },

      changeRegionTow(val){
        this.addressSelectedArr.regionTow = val
        let param = {regionCode: val}
        this.getRegionListByRegionCode(param).then((res) => {
          this.regionBelongDistrictData = res.data
          this.regionBelongStreetData = []
          this.addressSelectedArr.regionThird = ""
          this.addressSelectedArr.regionFourth = ""
        })
      },

      changeRegionThird(val){
        this.addressSelectedArr.regionThird = val
        let param = {regionCode: val}
        this.getRegionListByRegionCode(param).then((res) => {
          this.regionBelongStreetData = res.data
          this.addressSelectedArr.regionFourth = ""
        })
      },

      //查看客户报价日志
      queryCustomerLog(){
        if(this.selectData.length<=1){
          this.$refs.CustompriceLog.customerLog = true;
          this.$refs.CustompriceLog.detail = this.selectData[0];
        } else {
          this.$confirm('只能选中0或者1条')
        }
      },

      changeRegionFourth(val){
        this.addressSelectedArr.regionFourth = val
      },

      selectRegion(val){
        this.second = true;
        let param = {regionCode: val}
        this.getAllRegionByRegionCode(param).then((res) => {
          console.log(res.data)
          this.regionBelongCityData = res.data
        })
        this.allRegionList.data.forEach((val, key) => {
          if (val.value === this.form.regionCode) {
            this.form.regionName1 = val.regionName
          }
        })
        this.form.selectedRegionSecond = ""
      },

      selectRegionsecond(val){
        console.log(this.form.selectedRegionSecond)
        this.third = true;
        let param = {regionCode: val}
        this.getAllRegionByRegionCode(param).then((res) => {
          console.log(res.data)
          this.regionBelongDistrictData = res.data
        })
        this.regionBelongCList.data.forEach((val, key) => {
          if (val.regionId === this.form.selectedRegionSecond) {
            this.form.regionName2 = val.regionName
          }
        })
        this.form.selectedRegionThird = ""
      },

      getList(){
        var temp;
        if (this.addressSelectedArr.regionTow == "") {
          temp = this.addressSelectedArr.regionOne;
        } else if (this.addressSelectedArr.regionThird == "") {
          temp = this.addressSelectedArr.regionTow;
        } else if (this.addressSelectedArr.regionFourth == "") {
          temp = this.addressSelectedArr.regionThird;
        } else {
          temp = this.addressSelectedArr.regionFourth;
        }
        this.form.regionCode = temp;
        this.form.updateTimeStart = (typeof(this.form.updateTimeStart) == "string" ? this.form.updateTimeStart : util.formatDate.format(this.form.updateTimeStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form.updateTimeEnd = (typeof(this.form.updateTimeEnd) == "string" ? this.form.updateTimeEnd : util.formatDate.format(this.form.updateTimeEnd, 'yyyy-MM-dd hh:mm:ss'));
        this.form.validityStartDateStart = (typeof(this.form.validityStartDateStart) == "string" ? this.form.validityStartDateStart : util.formatDate.format(this.form.validityStartDateStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form.validityStartDateEnd = (typeof(this.form.validityStartDateEnd) == "string" ? this.form.validityStartDateEnd : util.formatDate.format(this.form.validityStartDateEnd, 'yyyy-MM-dd hh:mm:ss'));
        this.form.validityEndDateStart = (typeof(this.form.validityEndDateStart) == "string" ? this.form.validityEndDateStart : util.formatDate.format(this.form.validityEndDateStart, 'yyyy-MM-dd hh:mm:ss'));
        this.form.validityEndDateEnd = (typeof(this.form.validityEndDateEnd) == "string" ? this.form.validityEndDateEnd : util.formatDate.format(this.form.validityEndDateEnd, 'yyyy-MM-dd hh:mm:ss'));
        this.pageHandler(this.form, this.getCustompriceList);
      },

      newCustomprice(){
        if(this.selectData.length <= 1) {
          Object.assign(this.$refs.custompricesave.form,this.form);

          this.$refs.custompricesave.form.regionOne = this.addressSelectedArr.regionOne;
          this.$refs.custompricesave.form.regionTow = this.addressSelectedArr.regionTow;
          this.$refs.custompricesave.form.regionThird = this.addressSelectedArr.regionThird;
          this.$refs.custompricesave.form.regionFourth = this.addressSelectedArr.regionFourth;
          // this.$refs.custompricesave.addressSelectedArr.regionOne = this.addressSelectedArr.regionOne;
          // this.$refs.custompricesave.addressSelectedArr.regionTow = this.addressSelectedArr.regionTow;
          // this.$refs.custompricesave.addressSelectedArr.regionThird = this.addressSelectedArr.regionThird;
          // this.$refs.custompricesave.addressSelectedArr.regionFourth = this.addressSelectedArr.regionFourth;
          this.$refs.custompricesave.regionBelongCityData = this.regionBelongCityData;
          this.$refs.custompricesave.regionBelongDistrictData = this.regionBelongDistrictData;
          this.$refs.custompricesave.regionBelongStreetData = this.regionBelongStreetData;

          this.$refs.custompricesave.newCustompricedialogVisible = true;
          this.$refs.custompricesave.$store.dispatch('getCustomListInCustom');

          if (this.selectData.length == 1) {
            // this.$refs.custompricesave.detail = this.selectData[0];

            this.$refs.custompricesave.form.harborId =  this.selectData[0].harborId;
            this.$refs.custompricesave.form.customerId =  this.selectData[0].customerId;
//            this.$refs.custompricesave.form.validityStartDate =  this.selectData[0].validityStartDate + ' 00:00:00';
            this.$refs.custompricesave.form.validityStartDate =  new Date(this.selectData[0].validityStartDate);
            console.log(this.$refs.custompricesave.form.validityStartDate);
            this.$refs.custompricesave.form.isInvoice =  this.selectData[0].isInvoice.toString();

            this.$refs.custompricesave.form.regionOne =  this.selectData[0].regionCode.substring(0, 2);
            this.$refs.custompricesave.form.regionTow =  this.selectData[0].regionCode.substring(0, 4);
            this.$refs.custompricesave.form.regionThird =  this.selectData[0].regionCode.substring(0, 6);
            // this.$refs.custompricesave.form.regionFourth =  this.selectData[0].regionCode;
            this.$refs.custompricesave.form.regionFourth =  this.selectData[0].regionCode.length>6?this.selectData[0].regionCode:'';

            let param1 = {regionCode: this.$refs.custompricesave.form.regionOne}
            this.getRegionListByRegionCode(param1).then((res) => {
              console.log('splitRegionCode-1()');
              this.$refs.custompricesave.debugInfo();
              this.$refs.custompricesave.regionBelongCityData = res.data
            })
            let param2 = {regionCode: this.$refs.custompricesave.form.regionTow}
            this.getRegionListByRegionCode(param2).then((res) => {
              console.log('splitRegionCode-2()');
              this.$refs.custompricesave.debugInfo();
              this.$refs.custompricesave.regionBelongDistrictData = res.data
            })
            let param3 = {regionCode: this.$refs.custompricesave.form.regionThird}
            this.getRegionListByRegionCode(param3).then((res) => {
              console.log('splitRegionCode-3()');
              this.$refs.custompricesave.debugInfo();
              this.$refs.custompricesave.regionBelongStreetData = res.data
            })

            // this.$refs.custompricesave.splitRegionCode();
          }
        } else if (this.selectData.length > 1) {
          this.$confirm('请选择一条数据进行编辑')
        }
      },

      toEditTask(row){
        this.$refs.custompriceupdata.newCustompricedialogVisible = true;
        this.$refs.custompriceupdata.detail = row
        this.getCustompriceList()
        console.log(this.selectData[0])
        this.updateCustompricedialogVisible = true;
      },

      updateCustomprice(){
        if (this.selectData.length == 1) {
          this.$refs.custompriceupdata.newCustompricedialogVisible = true;
          this.$refs.custompriceupdata.detail = this.selectData[0]
          //console.log(this.selectData[0])
          this.updateCustompricedialogVisible = true;
        } else {
          this.$confirm('请选择一条数据进行编辑')
        }
      },

      deleteCustompriceHandle(){
        if (this.selectData.length >= 1) {
          this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个用户, 是否继续?', '提示', {type: 'warning'})
            .then(() => {
              console.log(this.selectData);
              var ids = "ids=" + this.selectData.map(item => item.id).join(",");
              this.deleteCustomprice({id: ids}).then(res => {
                if (res.success) {
//                  this.$refs['form'].resetFields()
                  this.getCustompriceList()
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '删除失败',
                    type: 'error'
                  })
                }
              });
            })
        } else {
          this.$confirm('请选择删除数据')
        }
      },

      //查询
      onSubmit() {
        this.pageNo=1;
        console.log('submit!');
        this.getList();
      },

      //重置
      resetForm(){
          // this.$refs[formName].resetFields();
          this.addressSelectedArr.regionOne = '';
          this.addressSelectedArr.regionTow = '';
          this.addressSelectedArr.regionThird = '';
          this.addressSelectedArr.regionFourth = '';
          this.form.regionCode = '',
          this.form.customerId='',
          this.form.harborId = '',
          this.form.harborName = '',
          this.form.shipCompanyId = '',
          this.form.operUserId = '',
          this.form.updateTimeStart = '',
          this.form.updateTimeEnd = '',
          this.form.validityStartDateStart = '',
          this.form.validityStartDateEnd = '',
          this.form.validityEndDateStart = '',
          this.form.validityEndDateEnd = ''
      }
    },

    created(){
      this.getList();
      this.init();
      this.showEdit = !global.isDisabled(7);
      console.log("===========>" + this.showEdit);
    },

    mounted(){
     // this.selectDept();
    }
  }
</script>

<style>
  @import '../../../styles/custom-theme/query-modal.css';

  .combine-inline-input> .el-form-item__content {
    width: auto !important;
  }
  .combine-inline-input> .el-form-item__content> .el-select {
    width: 150px;
  }
  .combine-inline-input-sm> .el-form-item__content {
    width: auto !important;
  }
  .combine-inline-input-sm> .el-form-item__content> .el-select {
    width: 111px;
  }
  .combine-inline-input-sm> .el-form-item__label {
    width: 60px !important;
    padding: 0 !important;
    padding-right: 8px !important;
  }

  .combine-inline-input> .el-form-item__content> .el-input {
    width: 130px !important;
  }


  .warning-text {
    color: red;
  }

  .line-wrap {
    padding-right: 10px !important;
    margin-left: 0px !important;
    text-align: center !important;
  }
</style>
