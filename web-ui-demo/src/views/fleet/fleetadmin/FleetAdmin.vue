<!-- 车队管理 列表 -->
<template>
    <section>
    <ToolBarBox>
        <el-col class="tool-bar">
            <el-button-group>
                        <el-button type="primary" icon="plus" size="small" @click="newFleet" :disabled="isDisabled(2)">新增</el-button>
                <el-button type="primary" icon="edit" size="small" @click="updateFleet" :disabled="isDisabled(7)">修改</el-button>
                <el-button type="primary" icon="delete" size="small" @click.prevent="deleteFleetHandle" :disabled="isDisabled(9)">删除</el-button>
            </el-button-group>
        </el-col>
        <form-box title="查询">
            <el-form :inline="true" ref="form" :model="form" label-width="85px">
                <el-form-item label="所属部门" prop="orgId" >
                    <el-select
                      clearable filterable default-first-option
                    v-model="form.orgId">
                        <el-option value="">请选择</el-option>
                        <el-option
                                v-for="item in allDeptList"
                                :label="item.text"
                                :value="item.value"
                                :key="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="车队类型" prop="carteamType">
                    <el-select
                      clearable filterable default-first-option
                    v-model="form.carteamType">
                        <el-option value="">请选择</el-option>
                        <el-option label="自有" :value="1"></el-option>
                        <el-option label="挂靠" :value="2"></el-option>
                        <el-option label="协议" :value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="支付方式" prop="paymentMethod">
                    <el-select
                      clearable filterable default-first-option
                    v-model="form.paymentMethod">
                        <el-option value="">请选择</el-option>
                        <el-option label="预付" :value="1"></el-option>
                        <el-option label="月结" :value="2"></el-option>
                        <el-option label="现结" :value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="子公司" prop="orgIdLevelTwo" >
                    <el-select
                      clearable filterable default-first-option
                    v-model="form.orgIdLevelTwo">
                        <el-option value="">请选择</el-option>
                        <el-option
                                v-for="item in allSubCompanyList"
                                :label="item.text"
                                :value="item.value"
                                :key="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :disabled="isDisabled(1)">查询</el-button>
                </el-form-item>
            </el-form>
        </form-box>
   </ToolBarBox>
   <TableBox>
        <el-table ref="table"
                highlight-current-row
                border
                :max-height="tableMaxHeight"
                :data="fleetadminList.data"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                 @row-click="handleRowClick">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column width="130"
                    prop="carteamName"
                    label="车队名称">
            </el-table-column>

             <el-table-column width="130"
                    prop="orgName"
                    label="所属部门">
            </el-table-column>
            <el-table-column  width="130"
                    prop="carteamType"
                    label="车队类型">
                <template scope="scope">
                    <span v-show="scope.row.carteamType==1">自有</span>
                    <span v-show="scope.row.carteamType==2">挂靠</span>
                    <span v-show="scope.row.carteamType==3">协议</span>
                </template>
            </el-table-column>


            <el-table-column
                    prop="descrip"
                    label="描述"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="carteamAddress"
                    label="地址"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="carteamPhone"
                    label="电话"
                    width="180">
            </el-table-column>


            <el-table-column
                    prop="carteamFax"
                    label="传真"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="carteamContacts"
                    label="联系人">
            </el-table-column>

            <el-table-column  width="150"
                prop="enableRepeat"
                label="检查司机日程">
                <template scope="scope">
                    <span v-show="scope.row.enableRepeat==1">允许重复</span>
                    <span v-show="scope.row.enableRepeat==2">禁止重复</span>
                </template>
        </el-table-column>


            <el-table-column
                    prop="carteamCode"
                    label="车队代码"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="paymentMethod"
                    label="支付方式"
                    width="180">
                <template scope="scope">
                    <span v-show="scope.row.paymentMethod==1">预付</span>
                    <span v-show="scope.row.paymentMethod==2">月结</span>
                    <span v-show="scope.row.paymentMethod==3">现结</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="orgNameLevelTwo"
                    label="子公司名称"
                    width="180">
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
       <FleetSave ref="fleetsave"></FleetSave>
        <FleetUpdata ref="fleetupdata"></FleetUpdata>

    </section>
</template>
<script>

    import {mapGetters, mapActions} from 'vuex'
    import pagination  from '../../../common/mixins/pagination'
    import FleetSave  from './FleetSave.vue'
    import FleetUpdata  from './FleetUpdata.vue'


    export default {
        mixins: [pagination],
       components: {FleetSave, FleetUpdata},
        data() {
            return {
                newFleetdialogVisible: false,
                selectData: [],
                form: {
                    carteamId: '',
                    carteamName:'',
                    orgId:'',
                    carteamType:'',
                    paymentMethod:'',
                    orgIdLevelTwo:"",
                    smsWechatSwitch:''
                }

            }
        },
        computed: {
            ...mapGetters([
                'fleetadminList','allSubCompanyList','allDeptList'
            ])
        },

        methods: {
            ...mapActions([
                'getFleetadminList','deleteFleet','getSubCompanyList','getDept'
            ]),
                init(){
            },
            handleSelectionChange(val){
                this.selectData = val;
            },
            getList(){
                this.$store.dispatch('getDept');
                this.$store.dispatch('getSubCompanyList');
                this.pageHandler(this.form, this.getFleetadminList);
            },
            newFleet(){
                this.$refs.fleetsave.newFleetdialogVisible = true;
                this.$refs.fleetsave.form = {
                  orgCode:'',
                  carteamName:'',
                  carteamType:'',
                  carteamAddress:'',
                  carteamPhone:'',
                  carteamFax:'',
                  carteamContacts:'',
                  paymentMethod:'',
                  enableRepeat:'',
                  descrip:'',
                  carteamCode:'',
                  smsWechatSwitch: false
                }
            },
            updateFleet(){
                //debugger;
                if (this.selectData.length == 1) {
                    this.$refs.fleetupdata.newFleetdialogVisible = true;
                    this.$refs.fleetupdata.detail = this.selectData[0]
                } else {
                    this.$confirm('请选择一条数据进行编辑')
                }
            },
            deleteFleetHandle(){
                if (this.selectData.length >= 1) {
                    //debugger;
                    this.$confirm('此操作将永久删除 ' + this.selectData.length + ' 个用户, 是否继续?', '提示', {type: 'warning'})
                        .then(() => {
                            var ids = "ids="+this.selectData.map(item => item.carteamId).join(",");
                            this.deleteFleet({id:ids}).then(res => {
                                if (res.success) {
                                    this.$refs['form'].resetFields()
                                    this.getFleetadminList()
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
            onSubmit() {
                console.log('submit!');
                this.getList();
            }
        },
        created(){
           this.getList()
        },
        mounted(){
        }
    }
</script>
