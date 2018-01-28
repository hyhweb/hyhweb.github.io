<template>
    <el-dialog size="large"  :title="title" v-model="newDialogVisible">
    <el-form  ref="editForm">

         <el-table class="fixedPriceTable"
                border
                :data="newFixedpriceList"
                 >
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
            <el-table-column fixed width="150"
                     class-name="cell-group-5"
                    label="基础项"
                    prop="customerId"
                    >
                <template scope="scope">
                    <div class="content-rowspan">
                        <div></div>
                        <div>
							<el-select
							  clearable filterable default-first-option
							size="small"
							v-model="scope.row.customerId">
							<el-option
							v-for="item in addOrderAllList.orderUserList"
							:key="item.value"
							:label="item.text"
							:value="item.value"

							></el-option>
							</el-select>
                        </div>
                        <div>
                        <el-select
				      	  clearable filterable default-first-option
				      	size="small"
				      	v-model="scope.row.shipCompanyId">
								<el-option
								v-for="item in addOrderAllList.shipCompanyList"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
						</el-select>
                        </div>
                        <div>
							<el-select   clearable filterable default-first-option  size="small" v-model="scope.row.harborId ">
							<el-option
							v-for="item in addOrderAllList.harborList"
							:key="item.value"
							:label="item.text"
							:value="item.value"
							></el-option>
							</el-select>
							</div>
                        <div>
                        <el-select   clearable filterable default-first-option  size="small" v-model="scope.row.dockId">
							<el-option
							v-for="item in addOrderAllList.allDockList"
							:key="item.value"
							:label="item.text"
							:value="item.value"
							></el-option>
							</el-select>
                        </div>

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
             <el-table-column class-name="cell-group-9" label="应收">
                 <template scope="scope">
                    <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                          <div >
                            <el-select   clearable filterable default-first-option size="small" v-model="scope.row.cdVoInfo['20GP']['1']['receiveType']" placeholder="请选择" >
								<el-option
								v-for="item in payTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['1'] &&
                          scope.row.cdVoInfo['20GP']['1']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['1']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['1'] &&
                          scope.row.cdVoInfo['20GP']['1']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['1']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['1'] &&
                          scope.row.cdVoInfo['20HQ']['1']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['1']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['1'] &&
                          scope.row.cdVoInfo['20HQ']['1']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['1']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['1'] &&
                          scope.row.cdVoInfo['40GP']['1']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['1']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['1'] &&
                          scope.row.cdVoInfo['40GP']['1']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['1']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['1'] &&
                          scope.row.cdVoInfo['40HQ']['1']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['1']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['1'] &&
                          scope.row.cdVoInfo['40HQ']['1']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['1']['1']['receive']"  ></el-input>
                          </div>

                     </div>
                 </template>
             </el-table-column>
             <el-table-column class-name="cell-group-9" label="应付">
                 <template scope="scope">
                    <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           <el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['1']['payType']" placeholder="请选择" >
								<el-option
								v-for="item in receiveTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
							</div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['1'] &&
                          scope.row.cdVoInfo['20GP']['1']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['1']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['1'] &&
                          scope.row.cdVoInfo['20GP']['1']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['1']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['1'] &&
                          scope.row.cdVoInfo['20HQ']['1']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['1']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['1'] &&
                          scope.row.cdVoInfo['20HQ']['1']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['1']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['1'] &&
                          scope.row.cdVoInfo['40GP']['1']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['1']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['1'] &&
                          scope.row.cdVoInfo['40GP']['1']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['1']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['1'] &&
                          scope.row.cdVoInfo['40HQ']['1']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['1']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['1'] &&
                          scope.row.cdVoInfo['40HQ']['1']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['1']['1']['pay']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
         </el-table-column>

         <el-table-column label="吊柜费(元)">
             <el-table-column class-name="cell-group-9"
                     label="应收">
                 <template scope="scope">
                 <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                          <div >
                          	<el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['11']['receiveType']" placeholder="请选择" >
								<el-option
								v-for="item in payTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['11'] &&
                          scope.row.cdVoInfo['20GP']['11']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['11']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['11'] &&
                          scope.row.cdVoInfo['20GP']['11']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['11']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['11'] &&
                          scope.row.cdVoInfo['20HQ']['11']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['11']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['11'] &&
                          scope.row.cdVoInfo['20HQ']['11']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['11']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['11'] &&
                          scope.row.cdVoInfo['40GP']['11']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['11']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['11'] &&
                          scope.row.cdVoInfo['40GP']['11']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['11']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['11'] &&
                          scope.row.cdVoInfo['40HQ']['11']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['11']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['11'] &&
                          scope.row.cdVoInfo['40HQ']['11']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['11']['1']['receive']"  ></el-input>
                          </div>
                     </div>
                 </template>

             </el-table-column>
             <el-table-column
             class-name="cell-group-9"
                     prop="city"
                     label="应付">
                 <template scope="scope">
                  <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                          <div >
                          	 <el-select   clearable filterable default-first-option size="small" v-model="scope.row.cdVoInfo['20GP']['11']['payType']" placeholder="请选择" >
								<el-option
								v-for="item in receiveTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['11'] &&
                          scope.row.cdVoInfo['20GP']['11']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['11']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['11'] &&
                          scope.row.cdVoInfo['20GP']['11']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['11']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['11'] &&
                          scope.row.cdVoInfo['20HQ']['11']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['11']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['11'] &&
                          scope.row.cdVoInfo['20HQ']['11']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['11']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['11'] &&
                          scope.row.cdVoInfo['40GP']['11']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['11']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['11'] &&
                          scope.row.cdVoInfo['40GP']['11']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['11']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['11'] &&
                          scope.row.cdVoInfo['40HQ']['11']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['11']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['11'] &&
                          scope.row.cdVoInfo['40HQ']['11']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['11']['1']['pay']"  ></el-input>
                          </div>
                     </div>
                 </template>

             </el-table-column>
         </el-table-column>

         <el-table-column label="THC/THD费(元)">
             <el-table-column
             class-name="cell-group-9"
                     prop="province"
                     label="应收">
                 <template scope="scope">
                   <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                          <div >
                          	<el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['12']['receiveType']" placeholder="请选择" >
								<el-option
								v-for="item in payTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['12'] &&
                          scope.row.cdVoInfo['20GP']['12']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['12']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['12'] &&
                          scope.row.cdVoInfo['20GP']['12']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['12']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['12'] &&
                          scope.row.cdVoInfo['20HQ']['12']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['12']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['12'] &&
                          scope.row.cdVoInfo['20HQ']['12']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['12']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['12'] &&
                          scope.row.cdVoInfo['40GP']['12']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['12']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['12'] &&
                          scope.row.cdVoInfo['40GP']['12']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['12']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['12'] &&
                          scope.row.cdVoInfo['40HQ']['12']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['12']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['12'] &&
                          scope.row.cdVoInfo['40HQ']['12']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['12']['1']['receive']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
             <el-table-column
                     class-name="cell-group-9"
                     prop="city"
                     label="应付">

             <template scope="scope" >
             <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                          <div >
                          	 <el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['12']['payType']" placeholder="请选择" >
								<el-option
								v-for="item in receiveTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['12'] &&
                          scope.row.cdVoInfo['20GP']['12']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['12']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['12'] &&
                          scope.row.cdVoInfo['20GP']['12']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['12']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['12'] &&
                          scope.row.cdVoInfo['20HQ']['12']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['12']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['12'] &&
                          scope.row.cdVoInfo['20HQ']['12']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['12']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['12'] &&
                          scope.row.cdVoInfo['40GP']['12']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['12']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['12'] &&
                          scope.row.cdVoInfo['40GP']['12']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['12']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['12'] &&
                          scope.row.cdVoInfo['40HQ']['12']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['12']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['12'] &&
                          scope.row.cdVoInfo['40HQ']['12']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['12']['1']['pay']"  ></el-input>
                          </div>
                     </div>
             </template>
         </el-table-column>
        </el-table-column>
         <el-table-column label="港建费(元)">
             <el-table-column class-name="cell-group-9"
                     prop="province"
                     label="应收">
                 <template scope="scope">
                 <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           	<el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['13']['receiveType']" placeholder="请选择" >
								<el-option
								v-for="item in payTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['13'] &&
                          scope.row.cdVoInfo['20GP']['13']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['13']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['13'] &&
                          scope.row.cdVoInfo['20GP']['13']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['13']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['13'] &&
                          scope.row.cdVoInfo['20HQ']['13']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['13']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['13'] &&
                          scope.row.cdVoInfo['20HQ']['13']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['13']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['13'] &&
                          scope.row.cdVoInfo['40GP']['13']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['13']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['13'] &&
                          scope.row.cdVoInfo['40GP']['13']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['13']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['13'] &&
                          scope.row.cdVoInfo['40HQ']['13']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['13']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['13'] &&
                          scope.row.cdVoInfo['40HQ']['13']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['13']['1']['receive']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
             <el-table-column
             class-name="cell-group-9"
                     prop="city"
                     label="应付">
                 <template scope="scope">
                <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           	 <el-select   clearable filterable default-first-option size="small" v-model="scope.row.cdVoInfo['20GP']['13']['payType']" placeholder="请选择" >
								<el-option
								v-for="item in receiveTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['13'] &&
                          scope.row.cdVoInfo['20GP']['13']['0']">
                            <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['13']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['13'] &&
                          scope.row.cdVoInfo['20GP']['13']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['13']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['13'] &&
                          scope.row.cdVoInfo['20HQ']['13']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['13']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['13'] &&
                          scope.row.cdVoInfo['20HQ']['13']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['13']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['13'] &&
                          scope.row.cdVoInfo['40GP']['13']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['13']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['13'] &&
                          scope.row.cdVoInfo['40GP']['13']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['13']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['13'] &&
                          scope.row.cdVoInfo['40HQ']['13']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['13']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['13'] &&
                          scope.row.cdVoInfo['40HQ']['13']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['13']['1']['pay']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
         </el-table-column>

         <el-table-column label="进出闸口费(元)">
             <el-table-column
             class-name="cell-group-9"
                     label="应收">
                 <template scope="scope">
                 <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           	<el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['14']['receiveType']" placeholder="请选择" >
								<el-option
								v-for="item in payTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['14'] &&
                          scope.row.cdVoInfo['20GP']['14']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['14']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['14'] &&
                          scope.row.cdVoInfo['20GP']['14']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['14']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['14'] &&
                          scope.row.cdVoInfo['20HQ']['14']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['14']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['14'] &&
                          scope.row.cdVoInfo['20HQ']['14']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['14']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['14'] &&
                          scope.row.cdVoInfo['40GP']['14']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['14']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['14'] &&
                          scope.row.cdVoInfo['40GP']['14']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['14']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['14'] &&
                          scope.row.cdVoInfo['40HQ']['14']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['14']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['14'] &&
                          scope.row.cdVoInfo['40HQ']['14']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['14']['1']['receive']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
             <el-table-column
             class-name="cell-group-9"
                     prop="city"
                     label="应付">
                 <template scope="scope">
                  <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           	 <el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['14']['payType']" placeholder="请选择" >
								<el-option
								v-for="item in receiveTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['14'] &&
                          scope.row.cdVoInfo['20GP']['14']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['14']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['14'] &&
                          scope.row.cdVoInfo['20GP']['14']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['14']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['14'] &&
                          scope.row.cdVoInfo['20HQ']['14']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['14']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['14'] &&
                          scope.row.cdVoInfo['20HQ']['14']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['14']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['14'] &&
                          scope.row.cdVoInfo['40GP']['14']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['14']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['14'] &&
                          scope.row.cdVoInfo['40GP']['14']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['14']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['14'] &&
                          scope.row.cdVoInfo['40HQ']['14']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['14']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['14'] &&
                          scope.row.cdVoInfo['40HQ']['14']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['14']['1']['pay']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
         </el-table-column>

         <el-table-column label="打单费(元)">
             <el-table-column
             class-name="cell-group-9"
                     prop="province"
                     label="应收">
                 <template scope="scope">
                  <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           	<el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['15']['receiveType']" placeholder="请选择" >
								<el-option
								v-for="item in payTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['15'] &&
                          scope.row.cdVoInfo['20GP']['15']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['15']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['15'] &&
                          scope.row.cdVoInfo['20GP']['15']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['15']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['15'] &&
                          scope.row.cdVoInfo['20HQ']['15']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['15']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['15'] &&
                          scope.row.cdVoInfo['20HQ']['15']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['15']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['15'] &&
                          scope.row.cdVoInfo['40GP']['15']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['15']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['15'] &&
                          scope.row.cdVoInfo['40GP']['15']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['15']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['15'] &&
                          scope.row.cdVoInfo['40HQ']['15']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['15']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['15'] &&
                          scope.row.cdVoInfo['40HQ']['15']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['15']['1']['receive']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
             <el-table-column
             class-name="cell-group-9"
                     prop="city"
                     label="应付">
                 <template scope="scope">
                 <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           	 <el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['15']['payType']" placeholder="请选择" >
								<el-option
								v-for="item in receiveTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['15'] &&
                          scope.row.cdVoInfo['20GP']['15']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['15']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['15'] &&
                          scope.row.cdVoInfo['20GP']['15']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['15']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['15'] &&
                          scope.row.cdVoInfo['20HQ']['15']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['15']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['15'] &&
                          scope.row.cdVoInfo['20HQ']['15']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['15']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['15'] &&
                          scope.row.cdVoInfo['40GP']['15']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['15']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['15'] &&
                          scope.row.cdVoInfo['40GP']['15']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['15']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['15'] &&
                          scope.row.cdVoInfo['40HQ']['15']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['15']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['15'] &&
                          scope.row.cdVoInfo['40HQ']['15']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['15']['1']['pay']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
         </el-table-column>

         <el-table-column label="港杂费(元)">
             <el-table-column
             class-name="cell-group-9"
                     prop="province"
                     label="应收">
                 <template scope="scope">
                 <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           	<el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['16']['receiveType']" placeholder="请选择" >
								<el-option
								v-for="item in payTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['16'] &&
                          scope.row.cdVoInfo['20GP']['16']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['16']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['16'] &&
                          scope.row.cdVoInfo['20GP']['16']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['16']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['16'] &&
                          scope.row.cdVoInfo['20HQ']['16']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['16']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['16'] &&
                          scope.row.cdVoInfo['20HQ']['16']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['16']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['16'] &&
                          scope.row.cdVoInfo['40GP']['16']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['16']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['16'] &&
                          scope.row.cdVoInfo['40GP']['16']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['16']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['16'] &&
                          scope.row.cdVoInfo['40HQ']['16']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['16']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['16'] &&
                          scope.row.cdVoInfo['40HQ']['16']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['16']['1']['receive']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
             <el-table-column
             class-name="cell-group-9"

                     label="应付">
                 <template scope="scope">
                 <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           	 <el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['16']['payType']" placeholder="请选择" >
								<el-option
								v-for="item in receiveTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['16'] &&
                          scope.row.cdVoInfo['20GP']['16']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['16']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['16'] &&
                          scope.row.cdVoInfo['20GP']['16']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['16']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['16'] &&
                          scope.row.cdVoInfo['20HQ']['16']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['16']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['16'] &&
                          scope.row.cdVoInfo['20HQ']['16']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['16']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['16'] &&
                          scope.row.cdVoInfo['40GP']['16']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['16']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['16'] &&
                          scope.row.cdVoInfo['40GP']['16']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['16']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['16'] &&
                          scope.row.cdVoInfo['40HQ']['16']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['16']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['16'] &&
                          scope.row.cdVoInfo['40HQ']['16']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['16']['1']['pay']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
         </el-table-column>

         <el-table-column label="码头作业费(元)">
             <el-table-column
             class-name="cell-group-9"
                     label="应收">
                 <template scope="scope">
                  <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           <el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['18']['receiveType']" placeholder="请选择" >
								<el-option
								v-for="item in payTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
							</div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['18'] &&
                          scope.row.cdVoInfo['20GP']['18']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['18']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['18'] &&
                          scope.row.cdVoInfo['20GP']['18']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['18']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['18'] &&
                          scope.row.cdVoInfo['20HQ']['18']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['18']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['18'] &&
                          scope.row.cdVoInfo['20HQ']['18']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['18']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['18'] &&
                          scope.row.cdVoInfo['40GP']['18']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['18']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['18'] &&
                          scope.row.cdVoInfo['40GP']['18']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['18']['1']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['18'] &&
                          scope.row.cdVoInfo['40HQ']['18']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['18']['0']['receive']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['18'] &&
                          scope.row.cdVoInfo['40HQ']['18']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['18']['1']['receive']"  ></el-input>
                          </div>
                     </div>
                 </template>
             </el-table-column>
             <el-table-column
                     class-name="cell-group-9"
                     label="应付">
                 <template scope="scope">
                 <div class="content-rowspan" v-if="scope.row.cdVoInfo">
                           <div >
                           	 <el-select   clearable filterable default-first-option  size="small" v-model="scope.row.cdVoInfo['20GP']['18']['payType']" placeholder="请选择" >
								<el-option
								v-for="item in receiveTypeData"
								:key="item.value"
								:label="item.text"
								:value="item.value"
								></el-option>
							</el-select>
                           </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['18'] &&
                          scope.row.cdVoInfo['20GP']['18']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['18']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20GP'] &&
                          scope.row.cdVoInfo['20GP']['18'] &&
                          scope.row.cdVoInfo['20GP']['18']['1']
                          ">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20GP']['18']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['18'] &&
                          scope.row.cdVoInfo['20HQ']['18']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['18']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['20HQ'] &&
                          scope.row.cdVoInfo['20HQ']['18'] &&
                          scope.row.cdVoInfo['20HQ']['18']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['20HQ']['18']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['18'] &&
                          scope.row.cdVoInfo['40GP']['18']['0']">
                           <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['18']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40GP'] &&
                          scope.row.cdVoInfo['40GP']['18'] &&
                          scope.row.cdVoInfo['40GP']['18']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40GP']['18']['1']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['18'] &&
                          scope.row.cdVoInfo['40HQ']['18']['0']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['18']['0']['pay']"  ></el-input>
                          </div>
                          <div v-if="scope.row.cdVoInfo['40HQ'] &&
                          scope.row.cdVoInfo['40HQ']['18'] &&
                          scope.row.cdVoInfo['40HQ']['18']['1']">
                          <el-input class="validate-num" size="small" v-model="scope.row.cdVoInfo['40HQ']['18']['1']['pay']"  ></el-input>
                          </div>

                     </div>
                 </template>
             </el-table-column>
         </el-table-column>


       <!-- <el-table-column
            prop="updateDate"
            label="最后更新时间"
            width="180">
        </el-table-column>

        <el-table-column
                prop="operatorName"
                label="操作人">
        </el-table-column> -->
           <el-table-column label="备注">
             <template scope="scope">
               <el-input type="textarea" v-model="scope.row.remark"/>
             </template>
           </el-table-column>

       </el-table>
       <el-col class="textAlign" style="padding:10px;">
       		<el-button type="primary" @click="submit()">确定</el-button>
       </el-col>
       </el-form>

    </el-dialog>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import pagination  from '../../../common/mixins/pagination'

    export default {
        mixins:[pagination],
        components:{},
        data() {
            return {
            	mode:'add',
            	detail:{},
                newDialogVisible:false
            }
        },
        computed:{
            ...mapGetters(['addOrderAllList']),
            title(){
            	if(this.mode == "add"){
            		return "新增固定报价"
            	}else if(this.mode == "edit"){
            		return "编辑固定报价"
            	}
            },
            newFixedpriceList(){
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
                                },


                            },
                            "20HQ": {
                                "1":{
                                    "1":{
                                        "receive":"",
                                        "pay":""
                                    },
                                    "0":{
                                        "receive":"",
                                        "pay":""

                                    },
                                    "payType":"",
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
                                },

                            },
                            "40GP": {
                                "1":{
                                    "1":{
                                        "receive":"",
                                        "pay":""
                                    },
                                    "0":{
                                        "receive":"",
                                        "pay":""

                                    },
                                    "payType":"",
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
                                },


                            },
                            "40HQ": {
                                "1":{
                                    "1":{
                                        "receive":"",
                                        "pay":""
                                    },
                                    "0":{
                                        "receive":"",
                                        "pay":""

                                    },
                                    "payType":"",
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
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
                                    "receiveType":""
                                },


                            }
                        }

            	let data = [{
            		cdVoInfo:cdVoInfo,
                customerId:"",
                dockId:"",
                harborId:"",
                shipCompanyId:"",
                remark:"",
                isEnable:""
            	}]
            	return data
            },
            payTypeData(){
            	let data = [
            	{value:0,text:"无"},
            	{value:1,text:"客户"},
            	{value:2,text:"收发货人"}]
            	return data;
            },
            receiveTypeData(){
            	let data = [
            	{value:0,text:"无"},
            	{ value:1,text:"司机"},
            	{ value:2,text:"办单员",},
            	{ value:3,text:"码头(提)"},
            	{ value:4,text:"船公司"}
            	]
            	return data;
            }
        },

        methods: {
            ...mapActions(['getFixedpriceList','getAddOrderAllList','saveFixedprice','updateFixedprice']),
            init(){
            	this.getAddOrderAllList()
            },
            submit(){
                /*console.log('submit');*/
                //前端验证表单输入只能为数字，且不带空格
//                let $inputArr = $(".validate-num> input");
                /*let $inputArr = document.querySelectorAll(".validate-num> input");
                let inputArr = [];
                // let validateResult = false;
                let validateNum = 0;
                let validateTrue = 0;
                $inputArr.forEach(function(item) {
                    if(item.value != '') {
                        validateNum++;
                        if(!isNaN(item.value) && item.value.indexOf(" ") == -1) {
                            console.log('submit t');
                            item.classList.remove("redBorderState");
//                            $(this).val($.trim(item.value));
                            inputArr.push(item.value);
                            validateTrue++;
                        } else {
                            console.log('submit f');
                            item.classList.add("redBorderState");
                        }
                    }
                })
                if(validateNum != validateTrue) {
                    this.$message({
                        message: '请输入数字，且不带空格',
                        type:'error'
                    })
                    return;
                }
                console.log(inputArr)*/

              let cabinetTypeArr  =	Object.keys(this.newFixedpriceList[0].cdVoInfo)
              let cabinetTypeValueArr = Object.values(this.newFixedpriceList[0].cdVoInfo)
              let costTypeCodeArr = Object.keys(cabinetTypeValueArr[0])
              let costTypeCodeValueArr = Object.values(cabinetTypeValueArr[0])
              let list = [];
               costTypeCodeArr.forEach((val,key)=>{
              		[0,1].forEach((v,k)=>{
              			cabinetTypeArr.forEach((item,index)=>{
              				let dataItem = {
	              					"id": this.newFixedpriceList[0].cdVoInfo[item][val][v].id,
	            					"cabinetType": item,
	            					"costTypeCode": val,
	            					"costId": this.newFixedpriceList[0].id,
							        "orderType": v,
							        "pay": this.newFixedpriceList[0].cdVoInfo[item][val][v].pay,
							        "payType": this.newFixedpriceList[0].cdVoInfo['20GP'][val].payType,
							        "receive": this.newFixedpriceList[0].cdVoInfo[item][val][v].receive,
							        "receiveType": this.newFixedpriceList[0].cdVoInfo['20GP'][val].receiveType
	              			}
	              			list.push(dataItem)
              			})


              		})
              })
               let params =  {
                	 "customerId": this.newFixedpriceList[0].customerId,
                 	 "shipCompanyId":this.newFixedpriceList[0].shipCompanyId,
                 	 "harborId": this.newFixedpriceList[0].harborId,
                 	 "dockId": this.newFixedpriceList[0].dockId,
                 	 "id":this.newFixedpriceList[0].id,
                     "remark":this.newFixedpriceList[0].remark,
				 	 "cdVoList": list
				 	}
            	console.log(this.newFixedpriceList,params)
            	if(this.mode =="add"){
            		this.saveFixedprice({data:JSON.stringify(params)}).then((res)=>{
            			if(res.success){
            				this.$message({
            					message:res.message,
            					type:'success'
            				})
            				this.getFixedpriceList()
            				this. newDialogVisible = false
            			}else{
            				this.$message({
            					message:res.message,
            					type:'warning'
            				})
            			}

            		})
            	}else{
            	    params.isEnable = this.newFixedpriceList[0].enable;
            	    console.log(params,"11111")
            		this.updateFixedprice({data:JSON.stringify(params)}).then((res)=>{
            			if(res.success){
            				this.$message({
            					message:res.message,
            					type:'success'
            				})
            				this.getFixedpriceList()
            				this. newDialogVisible = false
            			}else{
            				this.$message({
            					message:res.message,
            					type:'warning'
            				})
            			}
            		})
            	}

            }
        },
        watch:{
        	detail(val){
        		Object.assign(this.newFixedpriceList[0],val)
        		console.log(val)
        	}
        },
        created(){

        },
        mounted(){
        	this.init()
        }
    }
</script>

<style>
    .fixedPriceTable .el-table__row td:last-child .cell{
        height: 100%;
        width: 99px;
    }
    .fixedPriceTable .el-table__row td:last-child .cell .el-textarea {
        height: 100%;
    }
    .fixedPriceTable .el-table__row td:last-child .cell .el-textarea textarea {
        height: 100%;
    }

    .redBorderState {
        border: 1px solid red;
    }

</style>
