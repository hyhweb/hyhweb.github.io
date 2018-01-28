<template>
  <el-dialog size="full" title="固定费用日志" v-model="FixedPriceLogVisible">

    <form-box>
      <el-form :inline="true" ref="form" :model="form" label-width="85px">
        <el-form-item label="客户名称">
          <el-select clearable filterable default-first-option   v-model="form.customerId" placeholder="请选择客户"
          @visible-change="visibleChangeCustomerDataList"
          >
            <el-option v-for="item in customerDataList"
                       :label="item.customerName"
                       :value="item.customerId"
                       :key="item.customerId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="船公司">
          <el-select  clearable filterable default-first-option  v-model="form.shipCompanyId" placeholder="请选择船公司"
          @visible-change="visibleChangeShipcompanyDataList"
          >
            <el-option v-for="item in shipcompanyDataList"
                       :label="item.shipCompanyName"
                       :value="item.shipCompanyId"
                       :key="item.shipCompanyId" >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="港口">
          <el-select   clearable filterable default-first-option  v-model="form.harborId" placeholder="请选择港口"
          @visible-change="visibleChangeHarborDataList">
            <el-option v-for="item in harborDataList"
                       :label="item.harborName"
                       :value="item.harborId"
                       :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item  label="码头">
          <el-select   clearable filterable default-first-option
                       v-model="form.dockId" placeholder="请选择码头"
                       @visible-change="visibleChangeShipHarborDataList">
            <el-option v-for="item in dockDataList"
                       :key="item.dockId"
                       :label="item.name"
                       :value="item.dockId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="操作人" prop="operatorId">
          <el-select  clearable filterable default-first-option  v-model="form.operatorId" placeholder="请选择操作人"
           @visible-change="visibleChangeUserInfoDataList"
           >
            <el-option value="">请选择</el-option>
            <el-option v-for="item in userInfoDataList"
                       :label="item.text"
                       :value="item.value"
                       :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit"  :disabled="this.$global.isDisabled(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </form-box>

    <el-table ref="table" border :data="handleFixedpriceList" :max-height="tableMaxHeight" style="width: 100%">
      <el-table-column fixed class-name="cell-group-5" label="">
        <template scope="scope">
          <div class="content-rowspan">
            <div>收付对象</div>
            <div>客户</div>
            <div>船公司</div>
            <div>港口</div>
            <div>码头</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed class-name="cell-group-5" label="基础项" prop="customerName" width="200">
        <template scope="scope">
          <div class="content-rowspan">
            <div></div>
            <div>{{scope.row.customerName}}</div>
            <div>{{scope.row.shipCompanyName}}</div>
            <div>{{scope.row.harborName}}</div>
            <div>{{scope.row.dockName}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed class-name="cell-group-5" label="箱型" prop="cdlDtoList[0].cabinetType">
        <template scope="scope">
          <div class="content-rowspan">
            <div></div>
            <div>{{"20GP"}}</div>
            <div>{{"20HQ"}}</div>
            <div>{{"40GP"}}</div>
            <div>{{"40HQ"}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed class-name="cell-group-9" label="任务类型" prop="">
        <template scope="scope">
          <div class="fullwith">
            <div class="content-rowspan">
              <div>&nbsp;</div>
              <div>装</div>
              <div>送</div>
              <div>装</div>
              <div>送</div>
              <div>装</div>
              <div>送</div>
              <div>装</div>
              <div>送</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="办单费(元)">
        <el-table-column
          class-name="cell-group-9"
          label="应收"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['1'].receiveTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['1'] &&
                          scope.row.cdVoInfo['20GP']['1']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['1']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['1'] &&
                          scope.row.cdVoInfo['20GP']['1']['1']
                          ">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['1']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['1'] &&
                          scope.row.cdVoInfo['20HQ']['1']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['1']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['1'] &&
                          scope.row.cdVoInfo['20HQ']['1']['1']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['1']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['1'] &&
                          scope.row.cdVoInfo['40GP']['1']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['1']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['1'] &&
                          scope.row.cdVoInfo['40GP']['1']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['1']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['1'] &&
                          scope.row.cdVoInfo['40HQ']['1']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['1']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['1'] &&
                          scope.row.cdVoInfo['40HQ']['1']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['1']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column class-name="cell-group-9"
                         label="应付"
                         width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['1'].payTypeName}}</div>

              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['1'] &&
                          scope.row.cdVoInfo['20GP']['1']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['1']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['1'] &&
                          scope.row.cdVoInfo['20GP']['1']['1']
                          ">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['1']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['1'] &&
                          scope.row.cdVoInfo['20HQ']['1']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['1']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['1'] &&
                          scope.row.cdVoInfo['20HQ']['1']['1']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['1']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['1'] &&
                          scope.row.cdVoInfo['40GP']['1']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['1']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['1'] &&
                          scope.row.cdVoInfo['40GP']['1']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['1']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['1'] &&
                          scope.row.cdVoInfo['40HQ']['1']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['1']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['1'] &&
                          scope.row.cdVoInfo['40HQ']['1']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['1']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>

            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="吊柜费(元)">
        <el-table-column class-name="cell-group-9"
                         label="应收"
                         width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['11'].receiveTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['11'] &&
                          scope.row.cdVoInfo['20GP']['11']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['11']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['11'] &&
                          scope.row.cdVoInfo['20GP']['11']['1']
                          ">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['11']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['11'] &&
                          scope.row.cdVoInfo['20HQ']['11']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['11']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['11'] &&
                          scope.row.cdVoInfo['20HQ']['11']['1']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['11']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['11'] &&
                          scope.row.cdVoInfo['40GP']['11']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['11']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['11'] &&
                          scope.row.cdVoInfo['40GP']['11']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['11']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['11'] &&
                          scope.row.cdVoInfo['40HQ']['11']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['11']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['11'] &&
                          scope.row.cdVoInfo['40HQ']['11']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['11']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>

        </el-table-column>
        <el-table-column
          class-name="cell-group-9"
          prop="city"
          label="应付"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['11'].payTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['11'] &&
                          scope.row.cdVoInfo['20GP']['11']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['11']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['11'] &&
                          scope.row.cdVoInfo['20GP']['11']['1']
                          ">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['11']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['11'] &&
                          scope.row.cdVoInfo['20HQ']['11']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['11']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['11'] &&
                          scope.row.cdVoInfo['20HQ']['11']['1']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['11']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['11'] &&
                          scope.row.cdVoInfo['40GP']['11']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['11']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['11'] &&
                          scope.row.cdVoInfo['40GP']['11']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['11']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['11'] &&
                          scope.row.cdVoInfo['40HQ']['11']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['11']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['11'] &&
                          scope.row.cdVoInfo['40HQ']['11']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['11']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>

        </el-table-column>
      </el-table-column>

      <el-table-column label="THC/THD费(元)">
        <el-table-column
          class-name="cell-group-9"
          prop="province"
          label="应收"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['12'].receiveTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['12'] &&
                          scope.row.cdVoInfo['20GP']['12']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['12']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['12'] &&
                          scope.row.cdVoInfo['20GP']['12']['1']
                          ">
                &nbsp;{{ scope.row.cdVoInfo['20GP']['12']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['12'] &&
                          scope.row.cdVoInfo['20HQ']['12']['0']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['12']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['12'] &&
                          scope.row.cdVoInfo['20HQ']['12']['1']">
                &nbsp;{{ scope.row.cdVoInfo['20HQ']['12']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['12'] &&
                          scope.row.cdVoInfo['40GP']['12']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['12']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['12'] &&
                          scope.row.cdVoInfo['40GP']['12']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40GP']['12']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['12'] &&
                          scope.row.cdVoInfo['40HQ']['12']['0']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['12']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['12'] &&
                          scope.row.cdVoInfo['40HQ']['12']['1']">
                &nbsp;{{ scope.row.cdVoInfo['40HQ']['12']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          class-name="cell-group-9"
          prop="city"
          label="应付"
          width="120">

          <template scope="scope" >
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['12'].payTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['12'] &&
                          scope.row.cdVoInfo['20GP']['12']['0']">
                {{ scope.row.cdVoInfo['20GP']['12']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['12'] &&
                          scope.row.cdVoInfo['20GP']['12']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['12']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['12'] &&
                          scope.row.cdVoInfo['20HQ']['12']['0']">
                {{ scope.row.cdVoInfo['20HQ']['12']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['12'] &&
                          scope.row.cdVoInfo['20HQ']['12']['1']">
                {{ scope.row.cdVoInfo['20HQ']['12']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['12'] &&
                          scope.row.cdVoInfo['40GP']['12']['0']">
                {{ scope.row.cdVoInfo['40GP']['12']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['12'] &&
                          scope.row.cdVoInfo['40GP']['12']['1']">
                {{ scope.row.cdVoInfo['40GP']['12']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['12'] &&
                          scope.row.cdVoInfo['40HQ']['12']['0']">
                {{ scope.row.cdVoInfo['40HQ']['12']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['12'] &&
                          scope.row.cdVoInfo['40HQ']['12']['1']">
                {{ scope.row.cdVoInfo['40HQ']['12']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="港建费(元)">
        <el-table-column class-name="cell-group-9"
                         prop="province"
                         label="应收"
                         width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['13'].receiveTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['13'] &&
                          scope.row.cdVoInfo['20GP']['13']['0']">
                {{ scope.row.cdVoInfo['20GP']['13']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['13'] &&
                          scope.row.cdVoInfo['20GP']['13']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['13']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['13'] &&
                          scope.row.cdVoInfo['20HQ']['13']['0']">
                {{ scope.row.cdVoInfo['20HQ']['13']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['13'] &&
                          scope.row.cdVoInfo['20HQ']['13']['1']">
                {{ scope.row.cdVoInfo['20HQ']['13']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['13'] &&
                          scope.row.cdVoInfo['40GP']['13']['0']">
                {{ scope.row.cdVoInfo['40GP']['13']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['13'] &&
                          scope.row.cdVoInfo['40GP']['13']['1']">
                {{ scope.row.cdVoInfo['40GP']['13']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['13'] &&
                          scope.row.cdVoInfo['40HQ']['13']['0']">
                {{ scope.row.cdVoInfo['40HQ']['13']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['13'] &&
                          scope.row.cdVoInfo['40HQ']['13']['1']">
                {{ scope.row.cdVoInfo['40HQ']['13']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          class-name="cell-group-9"
          prop="city"
          label="应付"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['13'].payTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['13'] &&
                          scope.row.cdVoInfo['20GP']['13']['0']">
                {{ scope.row.cdVoInfo['20GP']['13']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['13'] &&
                          scope.row.cdVoInfo['20GP']['13']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['13']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['13'] &&
                          scope.row.cdVoInfo['20HQ']['13']['0']">
                {{ scope.row.cdVoInfo['20HQ']['13']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['13'] &&
                          scope.row.cdVoInfo['20HQ']['13']['1']">
                {{ scope.row.cdVoInfo['20HQ']['13']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['13'] &&
                          scope.row.cdVoInfo['40GP']['13']['0']">
                {{ scope.row.cdVoInfo['40GP']['13']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['13'] &&
                          scope.row.cdVoInfo['40GP']['13']['1']">
                {{ scope.row.cdVoInfo['40GP']['13']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['13'] &&
                          scope.row.cdVoInfo['40HQ']['13']['0']">
                {{ scope.row.cdVoInfo['40HQ']['13']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['13'] &&
                          scope.row.cdVoInfo['40HQ']['13']['1']">
                {{ scope.row.cdVoInfo['40HQ']['13']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="进出闸口费(元)">
        <el-table-column
          class-name="cell-group-9"
          prop="province"
          label="应收"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['14'].receiveTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['14'] &&
                          scope.row.cdVoInfo['20GP']['14']['0']">
                {{ scope.row.cdVoInfo['20GP']['14']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['14'] &&
                          scope.row.cdVoInfo['20GP']['14']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['14']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['14'] &&
                          scope.row.cdVoInfo['20HQ']['14']['0']">
                {{ scope.row.cdVoInfo['20HQ']['14']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['14'] &&
                          scope.row.cdVoInfo['20HQ']['14']['1']">
                {{ scope.row.cdVoInfo['20HQ']['14']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['14'] &&
                          scope.row.cdVoInfo['40GP']['14']['0']">
                {{ scope.row.cdVoInfo['40GP']['14']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['14'] &&
                          scope.row.cdVoInfo['40GP']['14']['1']">
                {{ scope.row.cdVoInfo['40GP']['14']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['14'] &&
                          scope.row.cdVoInfo['40HQ']['14']['0']">
                {{ scope.row.cdVoInfo['40HQ']['14']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['14'] &&
                          scope.row.cdVoInfo['40HQ']['14']['1']">
                {{ scope.row.cdVoInfo['40HQ']['14']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          class-name="cell-group-9"
          prop="city"
          label="应付"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['14'].payTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['14'] &&
                          scope.row.cdVoInfo['20GP']['14']['0']">
                {{ scope.row.cdVoInfo['20GP']['14']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['14'] &&
                          scope.row.cdVoInfo['20GP']['14']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['14']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['14'] &&
                          scope.row.cdVoInfo['20HQ']['14']['0']">
                {{ scope.row.cdVoInfo['20HQ']['14']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['14'] &&
                          scope.row.cdVoInfo['20HQ']['14']['1']">
                {{ scope.row.cdVoInfo['20HQ']['14']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['14'] &&
                          scope.row.cdVoInfo['40GP']['14']['0']">
                {{ scope.row.cdVoInfo['40GP']['14']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['14'] &&
                          scope.row.cdVoInfo['40GP']['14']['1']">
                {{ scope.row.cdVoInfo['40GP']['14']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['14'] &&
                          scope.row.cdVoInfo['40HQ']['14']['0']">
                {{ scope.row.cdVoInfo['40HQ']['14']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['14'] &&
                          scope.row.cdVoInfo['40HQ']['14']['1']">
                {{ scope.row.cdVoInfo['40HQ']['14']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="打单费(元)">
        <el-table-column
          class-name="cell-group-9"
          prop="province"
          label="应收"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['15'].receiveTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['15'] &&
                          scope.row.cdVoInfo['20GP']['15']['0']">
                {{ scope.row.cdVoInfo['20GP']['15']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['15'] &&
                          scope.row.cdVoInfo['20GP']['15']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['15']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['15'] &&
                          scope.row.cdVoInfo['20HQ']['15']['0']">
                {{ scope.row.cdVoInfo['20HQ']['15']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['15'] &&
                          scope.row.cdVoInfo['20HQ']['15']['1']">
                {{ scope.row.cdVoInfo['20HQ']['15']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['15'] &&
                          scope.row.cdVoInfo['40GP']['15']['0']">
                {{ scope.row.cdVoInfo['40GP']['15']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['15'] &&
                          scope.row.cdVoInfo['40GP']['15']['1']">
                {{ scope.row.cdVoInfo['40GP']['15']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['15'] &&
                          scope.row.cdVoInfo['40HQ']['15']['0']">
                {{ scope.row.cdVoInfo['40HQ']['15']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['15'] &&
                          scope.row.cdVoInfo['40HQ']['15']['1']">
                {{ scope.row.cdVoInfo['40HQ']['15']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          class-name="cell-group-9"
          prop="city"
          label="应付"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['15'].payTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['15'] &&
                          scope.row.cdVoInfo['20GP']['15']['0']">
                {{ scope.row.cdVoInfo['20GP']['15']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['15'] &&
                          scope.row.cdVoInfo['20GP']['15']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['15']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['15'] &&
                          scope.row.cdVoInfo['20HQ']['15']['0']">
                {{ scope.row.cdVoInfo['20HQ']['15']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['15'] &&
                          scope.row.cdVoInfo['20HQ']['15']['1']">
                {{ scope.row.cdVoInfo['20HQ']['15']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['15'] &&
                          scope.row.cdVoInfo['40GP']['15']['0']">
                {{ scope.row.cdVoInfo['40GP']['15']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['15'] &&
                          scope.row.cdVoInfo['40GP']['15']['1']">
                {{ scope.row.cdVoInfo['40GP']['15']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['15'] &&
                          scope.row.cdVoInfo['40HQ']['15']['0']">
                {{ scope.row.cdVoInfo['40HQ']['15']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['15'] &&
                          scope.row.cdVoInfo['40HQ']['15']['1']">
                {{ scope.row.cdVoInfo['40HQ']['15']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="港杂费(元)">
        <el-table-column
          class-name="cell-group-9"
          prop="province"
          label="应收"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['16'].receiveTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['16'] &&
                          scope.row.cdVoInfo['20GP']['16']['0']">
                {{ scope.row.cdVoInfo['20GP']['16']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['16'] &&
                          scope.row.cdVoInfo['20GP']['16']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['16']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['16'] &&
                          scope.row.cdVoInfo['20HQ']['16']['0']">
                {{ scope.row.cdVoInfo['20HQ']['16']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['16'] &&
                          scope.row.cdVoInfo['20HQ']['16']['1']">
                {{ scope.row.cdVoInfo['20HQ']['16']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['16'] &&
                          scope.row.cdVoInfo['40GP']['16']['0']">
                {{ scope.row.cdVoInfo['40GP']['16']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['16'] &&
                          scope.row.cdVoInfo['40GP']['16']['1']">
                {{ scope.row.cdVoInfo['40GP']['16']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['16'] &&
                          scope.row.cdVoInfo['40HQ']['16']['0']">
                {{ scope.row.cdVoInfo['40HQ']['16']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['16'] &&
                          scope.row.cdVoInfo['40HQ']['16']['1']">
                {{ scope.row.cdVoInfo['40HQ']['16']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          class-name="cell-group-9"

          label="应付"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['16'].payTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['16'] &&
                          scope.row.cdVoInfo['20GP']['16']['0']">
                {{ scope.row.cdVoInfo['20GP']['16']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['16'] &&
                          scope.row.cdVoInfo['20GP']['16']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['16']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['16'] &&
                          scope.row.cdVoInfo['20HQ']['16']['0']">
                {{ scope.row.cdVoInfo['20HQ']['16']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['16'] &&
                          scope.row.cdVoInfo['20HQ']['16']['1']">
                {{ scope.row.cdVoInfo['20HQ']['16']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['16'] &&
                          scope.row.cdVoInfo['40GP']['16']['0']">
                {{ scope.row.cdVoInfo['40GP']['16']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['16'] &&
                          scope.row.cdVoInfo['40GP']['16']['1']">
                {{ scope.row.cdVoInfo['40GP']['16']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['16'] &&
                          scope.row.cdVoInfo['40HQ']['16']['0']">
                {{ scope.row.cdVoInfo['40HQ']['16']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['16'] &&
                          scope.row.cdVoInfo['40HQ']['16']['1']">
                {{ scope.row.cdVoInfo['40HQ']['16']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="码头作业费(元)">
        <el-table-column
          class-name="cell-group-9"

          label="应收"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['18'].receiveTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['18'] &&
                          scope.row.cdVoInfo['20GP']['18']['0']">
                {{ scope.row.cdVoInfo['20GP']['18']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['18'] &&
                          scope.row.cdVoInfo['20GP']['18']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['18']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['18'] &&
                          scope.row.cdVoInfo['20HQ']['18']['0']">
                {{ scope.row.cdVoInfo['20HQ']['18']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['18'] &&
                          scope.row.cdVoInfo['20HQ']['18']['1']">
                {{ scope.row.cdVoInfo['20HQ']['18']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['18'] &&
                          scope.row.cdVoInfo['40GP']['18']['0']">
                {{ scope.row.cdVoInfo['40GP']['18']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['18'] &&
                          scope.row.cdVoInfo['40GP']['18']['1']">
                {{ scope.row.cdVoInfo['40GP']['18']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['18'] &&
                          scope.row.cdVoInfo['40HQ']['18']['0']">
                {{ scope.row.cdVoInfo['40HQ']['18']['0']['receive'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['18'] &&
                          scope.row.cdVoInfo['40HQ']['18']['1']">
                {{ scope.row.cdVoInfo['40HQ']['18']['1']['receive']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          class-name="cell-group-9"
          label="应付"
          width="120">
          <template scope="scope">
            <div class="content-rowspan" v-if="scope.row.cdVoInfo">
              <div >{{scope.row.cdVoInfo['20GP']['18'].payTypeName}}</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['18'] &&
                          scope.row.cdVoInfo['20GP']['18']['0']">
                {{ scope.row.cdVoInfo['20GP']['18']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['18'] &&
                          scope.row.cdVoInfo['20GP']['18']['1']
                          ">
                {{ scope.row.cdVoInfo['20GP']['18']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['18'] &&
                          scope.row.cdVoInfo['20HQ']['18']['0']">
                {{ scope.row.cdVoInfo['20HQ']['18']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['18'] &&
                          scope.row.cdVoInfo['20HQ']['18']['1']">
                {{ scope.row.cdVoInfo['20HQ']['18']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['18'] &&
                          scope.row.cdVoInfo['40GP']['18']['0']">
                {{ scope.row.cdVoInfo['40GP']['18']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['18'] &&
                          scope.row.cdVoInfo['40GP']['18']['1']">
                {{ scope.row.cdVoInfo['40GP']['18']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['18'] &&
                          scope.row.cdVoInfo['40HQ']['18']['0']">
                {{ scope.row.cdVoInfo['40HQ']['18']['0']['pay'] }}
              </div>
              <div  v-else>&nbsp;</div>
              <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['18'] &&
                          scope.row.cdVoInfo['40HQ']['18']['1']">
                {{ scope.row.cdVoInfo['40HQ']['18']['1']['pay']  }}
              </div>
              <div  v-else>&nbsp;</div>


            </div>
            <div  class="content-rowspan" v-else>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
              <div >&nbsp;</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="180">
      </el-table-column>

      <el-table-column prop="operator" label="操作人">
      </el-table-column>
      <el-table-column prop="actiontypeName" label="操作类型"/>
      <el-table-column label="是否禁用" >
        <template scope="scope">
          <span v-if="scope.row.isEnable">否</span>
          <span v-if="!scope.row.isEnable">是</span>
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="备注"/>

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

  </el-dialog>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import pagination  from '../../../common/mixins/pagination';

    export default{
        mixins:[pagination],
        components:{},
        data(){
            return{
                detail:{},           //装载父页面勾选的某一行值
                FixedPriceLogVisible:false,     //控制页面显示OR隐藏
                form:{                      //查询条件
                    costId : '',
                    dockId : '',
                    harborId : '',
                    shipCompanyId : '',
                    customerId : '',
                    operatorId : ''
                },
                customerDataList:[], //客户下拉列表数据
                shipcompanyDataList:[], //船公司下拉列表数据
                harborDataList:[], //港口下拉列表数据
                dockDataList:[], //码头下拉列表数据
                userInfoDataList:[] //操作人下拉列表数据
            }
        },
        computed:{
          ...mapGetters([
            'costLogListGetter',
            'allshipcompanyList',
            'alldockList',
            'harborBelongList',
            'customList',
            'userInfoList'
          ]),
          handleFixedpriceList(){
            if(typeof(this.costLogListGetter.data)!="undefined") {
              this.costLogListGetter.data.forEach((val, key) => {
                let cdVoList = val.cdlDtoList;
                let cdVoInfo = {
                  "20GP": {
                    "1":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },
                    "11":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "12":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "13":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "14":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "15":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "16":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "18":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },


                  },
                  "20HQ": {
                    "1":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },
                    "11":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "12":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "13":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "14":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "15":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "16":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "18":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                  },
                  "40GP": {
                    "1":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },
                    "11":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "12":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "13":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "14":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "15":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "16":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "18":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },


                  },
                  "40HQ": {
                    "1":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },
                    "11":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "12":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "13":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "14":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "15":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "16":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },

                    "18":{
                      "1":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "0":{
                        "receive":"",
                        "pay":"",
                        "id":""
                      },
                      "payType":"",
                      "receiveType":"",
                      "payTypeName":"",
                      "receiveTypeName":""
                    },


                  }
                }

                cdVoList.forEach((item, i) => {
                  let type = item.cabinetType
                  let orderType = item.orderType
                  let costType = item.costTypeCode
                  if(cdVoInfo[type] == undefined){
                    cdVoInfo[type] = {}
                  }
                  if(cdVoInfo[type][costType] == undefined){
                    cdVoInfo[type][costType] = {}
                  }
                  if(cdVoInfo[type][costType][orderType]== undefined){
                    cdVoInfo[type][costType][orderType] = {}
                  }

                  cdVoInfo[type][costType][orderType].pay = item.pay
                  cdVoInfo[type][costType][orderType].receive = item.receive
                  cdVoInfo[type][costType][orderType].id = item.id


                  cdVoInfo[type][costType].payType = item.payType
                  cdVoInfo[type][costType].receiveType = item.receiveType
                  cdVoInfo[type][costType].payTypeName = item.payTypeName,
                    cdVoInfo[type][costType].receiveTypeName= item.receiveTypeName

                  if(item.receiveTypeName !="" || typeof(item.receiveTypeName) == "undefined"){
                    cdVoInfo['20GP'][costType].payType = item.payType
                    cdVoInfo['20GP'][costType].receiveType = item.receiveType
                    cdVoInfo['20GP'][costType].payTypeName = item.payTypeName,
                      cdVoInfo['20GP'][costType].receiveTypeName= item.receiveTypeName
                  }
                  val.cdVoInfo = cdVoInfo
                })
              })
              return this.costLogListGetter.data
            }
          }
        },

        methods:{
            ...mapActions([
                'getCostLogPageList'
            ]),
             //客户名称选择优化
            visibleChangeCustomerDataList(){
              this.customerDataList = this.customList
            },
             //港口选择优化
            visibleChangeHarborDataList(){
              this.harborDataList = this.harborBelongList
            },
             //船公司选择优化
            visibleChangeShipcompanyDataList(){
              this.shipcompanyDataList = this.allshipcompanyList
            },
             //码头选择优化
            visibleChangeShipHarborDataList(){
              this.dockDataList = this.alldockList
            },

            //操作人选择优化
            visibleChangeUserInfoDataList(){
              this.userInfoDataList = this.userInfoList
            },
            getList(){
              this.pageHandler(this.form, this.getCostLogPageList);
            },
            onSubmit() {
              this.getList();
            }
        },

        watch:{
            detail(val){
                if(val){
                    this.form.costId = val.id;
                }else {
                  this.form.costId = '';
                }
                this.getList();
            }
        }
    }
</script>

