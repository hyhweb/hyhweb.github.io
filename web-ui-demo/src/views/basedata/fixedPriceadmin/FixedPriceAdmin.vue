<!--固定费用管理 列表-->
<template>
    <section>
            <el-col class="tool-bar">
                 <el-button-group>
                     <el-button v-if="!this.$global.isDisabled(2)" type="primary" icon="plus" size="small" @click="add" >新增</el-button>
                     <el-button v-if="!this.$global.isDisabled(7)" type="primary" icon="edit" size="small" @click="edit" >编辑</el-button>
                     <el-button v-if="!this.$global.isDisabled(71)" type="primary" icon="edit" size="small" @click="queryFixedPriceLog" >查看日志</el-button>
                 </el-button-group>
             </el-col>
            <form-box title="查询">
                 <el-form class="query-modal" :inline="true" ref="form" :model="form" label-width="85px">
                    <div class="query-params">
                        <el-form-item label="客户名称">
                            <el-select   clearable filterable default-first-option   v-model="form.customerId" placeholder="请选择客户"
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
                                            :key="item.shipCompanyId" ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="港口">
                            <el-select   clearable filterable default-first-option  v-model="form.harborId" placeholder="请选择港口"
                            @visible-change="visibleChangeHarborDataList"
                            >
                                <el-option v-for="item in harborDataList"
                                            :label="item.harborName"
                                            :value="item.harborId"
                                            :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>



                        <el-form-item  label="码头">
                            <el-select   clearable filterable default-first-option
                                    v-model="form.dockId" placeholder="请选择码头"
                                    @visible-change="visibleChangeShipHarborDataList"
                                    >
                                <el-option v-for="item in dockDataList"
                                    :key="item.dockId"
                                            :label="item.name"
                                            :value="item.dockId"
                                            ></el-option>
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
                                            :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="query-btns">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit"  :disabled="this.$global.isDisabled(1)">查询</el-button>
                            <el-button @click="resetForm"  :disabled="this.$global.isDisabled(1)">清空</el-button>
                        </el-form-item>
                    </div>
                 </el-form>
            </form-box>
            <el-table  id="fixedPriceTable" ref="table"
                border
                :max-height="tableMaxHeight"
                :data="handleFixedpriceList"
                style="width: 100%"
                highlight-current-row
                @selection-change="handleSelectionChange"
                @row-click="handleRowClick">
            <el-table-column type="selection">
            </el-table-column>

            <el-table-column fixed
                    class-name="cell-group-5"
                    label=""
                    >
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
            <el-table-column fixed
                     class-name="cell-group-5"
                    label="基础项"
                    prop="customerName"
                    width="200"
                    >
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
            <el-table-column fixed
                     class-name="cell-group-5"
                    prop="cdVoList[0].cabinetType"
                    label="箱型"
                    >
                <template scope="scope">
                    <div class="content-rowspan">

                        <div>&nbsp;</div>
                        <div>{{"20GP"}}</div>
                        <div>{{"20HQ"}}</div>
                        <div>{{"40GP"}}</div>
                        <div>{{"40HQ"}}</div>

                    </div>
                </template>
            </el-table-column>

            <el-table-column fixed
            class-name="cell-group-9"
            prop=""
            label="任务类型"
            >
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


        <el-table-column prop="updateDate" label="最后更新时间" width="180">
        </el-table-column>

        <el-table-column prop="operator" label="操作人">
        </el-table-column>

       <el-table-column prop="remark" label="备注"/>

        <el-table-column
                label="是否禁用">
                <template scope="scope">
                    <el-switch
                      v-model="scope.row.enable"
                      on-color="#13ce66"
                      off-color="#ff4949"
                      on-text="正常"
                      off-text="禁用"
                      @change="changeSwitchCost(scope.row)">
                      </el-switch>
                </template>
        </el-table-column>


       </el-table>

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

        <Edit ref="edit"></Edit>
        <FixedPriceLog ref="fixedPriceLog"></FixedPriceLog>
    </section>
</template>
<script>

    import {mapGetters, mapActions} from 'vuex'
    import pagination  from '../../../common/mixins/pagination'
    import Edit  from './Edit.vue'
    import FixedPriceLog  from './FixedPriceLog.vue'

    export default {
        mixins: [pagination],
        components: {Edit,FixedPriceLog},
        data() {
            return {
                newFixedpricedialogVisible: false,
                initEditData:[],
                selectData: [],
                form: {
                    dockId:'',
                    customerId: '',
                    harborId: '',
                    shipCompanyId:'',
                    operatorId: ''
                },

                customerDataList:[], //客户下拉列表数据
                shipcompanyDataList:[], //船公司下拉列表数据
                harborDataList:[], //港口下拉列表数据
                dockDataList:[], //码头下拉列表数据
                userInfoDataList:[] //操作人下拉列表数据

            }
        },
        computed: {
            ...mapGetters([
               'fixedpriceList','allshipcompanyList','alldockList','harborBelongList','customList', 'userInfoList'
            ]),
            handleFixedpriceList(){
                if(typeof(this.fixedpriceList.data)!="undefined") {
                  // [1,11,12,13,14,15,16,18]
                    this.fixedpriceList.data.forEach((val, key) => {
                        let cdVoList = val.cdVoList;
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

                    return this.fixedpriceList.data
                }
            }
        },

        methods: {
            ...mapActions([
                'getFixedpriceList','HarborBelongList','getallShipcompanyList','getalldockList', 'getCustomList','costIsForbidden'
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
            init(){
                this.$store.dispatch('getallShipcompanyList')
                this.$store.dispatch('HarborBelongList')
                this.$store.dispatch('getalldockList')
                this.$store.dispatch('getCustomList')
                this.$store.dispatch('getUserInfoListByDeptId')
            },
            handleSelectionChange(val){
                this.selectData = val;
                console.log(val)
            },
            getList(){
                this.pageHandler(this.form, this.getFixedpriceList)
            },
            changeSwitchCost(row){
              let param = {
                id:row.id,
                flag:(!row.enable)
              }
              this.costIsForbidden(param).then((res)=>{
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
            },
            add(){
                this.$refs.edit.newDialogVisible = true;
                this.$refs.edit.mode = "add"
                this.$refs.edit.detail = this.initEditData
            },
            edit(){
                if (this.selectData.length == 1) {
                    this.$refs.edit.newDialogVisible = true;
                    this.$refs.edit.mode = "edit"
                    this.$refs.edit.detail = this.selectData[0]
                } else {
                    this.$confirm('请选择一条数据进行编辑')
                }
            },

            //查询
            onSubmit() {
                this.getList();
            },

          //查看固定费用日志
          queryFixedPriceLog(){
            if(this.selectData.length<=1){
              this.$refs.fixedPriceLog.FixedPriceLogVisible = true;
              this.$refs.fixedPriceLog.detail = this.selectData[0];
//              this.$refs.CustompriceLog.customerLog = true;
//              this.$refs.CustompriceLog.detail = this.selectData[0];
            } else {
              this.$confirm('只能选中0或者1条')
            }
          },

          //重置
          resetForm(){
              this.form.dockId = '',
              this.form.customerId = '',
              this.form.harborId = '',
              this.form.shipCompanyId = '',
              this.form.operatorId = ''
          }
        },
        created(){
            this.getList()
          this.init()
        },
        mounted(){
           this.initEditData = Object.assign({},this.$refs.edit.newFixedpriceList[0])
        }
    }
</script>

<style type="text/css">
  @import '../../../styles/custom-theme/query-modal.css'
  /*#fixedPriceTable td {
    border-bottom: 2px solid #edf7ff;
  }*/
</style>
