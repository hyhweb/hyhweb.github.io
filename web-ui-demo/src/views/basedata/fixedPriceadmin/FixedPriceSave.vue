<template>
    <el-dialog
            title="新增客户报价信息"
            v-model="newCustompricedialogVisible">
        <el-form ref="form" :rules="addFormRules" :model="form" label-width="100px">

            <el-form-item label="港口" prop="harborId" >
                <el-select v-model="form.harborId" placeholder="请选择港口">
                    <el-option
                            v-for="item in addOrderAllList.harborList"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="地区"  prop="regionId">
                <el-select
                        v-model="form.regionId"
                        placeholder="请选择"
                        @change="selectRegion">
                    <el-option v-for="item in regionBelongPList.data"
                               :label="item.regionName"
                               :value="item.regionId "
                               :key="item">
                    </el-option>
                </el-select>
                <el-select v-if="second"
                           v-model="form.selectedRegionSecond"
                           placeholder="请选择"
                           @change="selectRegionsecond">
                    <el-option v-for="item in regionBelongCityData"
                               :value="item.regionId "
                               :label="item.regionName"
                               :key="item">
                    </el-option>
                </el-select>
                <el-select v-if="third"
                           v-model="form.selectedRegionThird"
                           placeholder="请选择"
                           @change="selectRegionthird" >
                    <el-option v-for="item in regionBelongDistrictData"
                               :value="item.regionId "
                               :label="item.regionName"
                               :key="item">
                    </el-option>
                </el-select>
                <el-select v-if="fourth"
                           placeholder="请选择"
                           v-model="form.selectedRegionFourth"
                           @change="selectedRegionfourth">
                    <el-option v-for="item in regionBelongStreetData"
                               :value="item.regionId "
                               :label="item.regionName"
                               :key="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用户" prop="customerId">
                <el-select v-model="form.customerId" placeholder="请选择用户">
                    <el-option v-for="item in customList.data"
                               :label="item.customerName"
                               :value="item.customerId"
                               :key="item"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="船公司" prop="shipCompanyId">
                <el-select v-model="form.shipCompanyId" placeholder="请选择船公司">
                    <el-option v-for="item in shipcompanyList.data"
                               :label="item.shipCompanyName"
                               :value="item.shipCompanyId"
                               :key="item"
                               @change="test"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="是否开票" prop="isInvoice">
                <el-select v-model="form.isInvoice" placeholder="是否开票">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="有效日期" prop="validityStartDate">
                <el-date-picker type="date" placeholder="生效日期" v-model="form.validityStartDate"
                                style="width:120px"></el-date-picker>
                -
                <el-date-picker type="date" placeholder="失效日期" v-model="form.validityEndDate"
                                style="width:120px"></el-date-picker>
            </el-form-item>


            <el-form-item label="拖车费:20GP" prop="cqdVoList">
                <el-input v-model="form.Z_20GP" placeholder="装货价格" class='control-width'></el-input>
                <el-input v-model="form.S_20GP" placeholder="送货价格" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="拖车费:2*20GP" prop="cqdVoList">
                <el-input v-model="form.Z_2x20GP" placeholder="装货价格" class='control-width'></el-input>
                <el-input v-model="form.S_2x20GP" placeholder="送货价格" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="拖车费:40GP" prop="cqdVoList">
                <el-input v-model="form.Z_40GP" placeholder="装货价格" class='control-width'></el-input>
                <el-input v-model="form.S_40GP" placeholder="送货价格" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="拖车费:40HQ" prop="cqdVoList">
                <el-input v-model="form.Z_40HQ" placeholder="装货价格" class='control-width'></el-input>
                <el-input v-model="form.S_40HQ" placeholder="送货价格" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="拖车费:20HQ" prop="cqdVoList">
                <el-input v-model="form.Z_20HQ" placeholder="装货价格" class='control-width'></el-input>
                <el-input v-model="form.S_20HQ" placeholder="送货价格" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="拖车费:2*20HQ" prop="cqdVoList">
                <el-input v-model="form.Z_2x20HQ" placeholder="装货价格" class='control-width'></el-input>
                <el-input v-model="form.S_2x20HQ" placeholder="送货价格" class='control-width'></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="remake">
                <el-input v-model="form.remake"></el-input>
            </el-form-item>
            <!-- <el-form-item label="是否禁用" prop="disabled">
             <el-radio-group v-model="form.disabled" >
               <el-radio :label="1">是</el-radio>
               <el-radio :label="0" selected>否</el-radio>
             </el-radio-group>
              </el-form-item>  -->

            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    //import {mapActions} from 'vuex'
    import pagination  from '../../../common/mixins/pagination'
    import util from '../../../common/js/util'


    export default {
        mixins: [pagination],
        props: {
            label: {},
        },
        components: {},
        data() {
            return {
                newCustompricedialogVisible: false,
                addFormRules: {
                    harborId: [
                        {required: true, message: '请选择港口', trigger: 'blur,change'}
                    ],
                    regionId: [
                        {required: true, message: '请选择地区', trigger: 'blur,change'}
                    ],
                    customerId: [
                        {required: true, message: '请选择用户', trigger: 'blur,change'}
                    ],
                    isInvoice: [
                        {required: true, message: '请选择是否开发票', trigger: 'blur,change'}
                    ],



                },
                regionBelongCityData:[],
                regionBelongDistrictData:[],
                regionBelongStreetData:[],
                second: false,
                third: false,
                fourth: false,
                form: {
                    harborId: '',
                    customerId: '',
                    regionId:'',

                    shipCompanyId:'',
                    validityStartDate: '',
                    validityEndDate: '',
                    isInvoice: '',
                    Z_20GP:'',
                    Z_2x20GP:'',
                    Z_40GP:'',
                    Z_40HQ:'',
                    Z_20HQ:'',
                    Z_2x20HQ:'',
                    S_20GP:'',
                    S_2x20GP:'',
                    S_40GP:'',
                    S_40HQ:'',
                    S_20HQ:'',
                    S_2x20HQ:'',
                    selectedRegion: '',
                    selectedRegionSecond: '',
                    selectedRegionThird: '',
                    selectedRegionFourth: '',
                    regionName1:'',
                    regionName2:'',
                    regionName3:'',
                    regionName4:'',
                    regionCode:'',
                    regionName:'',
                }

            }
        },
        computed: {
            ...mapGetters([
                'harborBelongList', 'regionBelongPList', 'regionBelongCList', 'customList', 'shipcompanyList','addOrderAllList'
            ])
        },

        methods: {
            ...mapActions([
                'getShipcompanyList', 'getCustompriceList', 'saveCustomprice', 'getCustomList', 'HarborBelongList', 'RegionBelongPList', 'RegionBelongCList','getAddOrderAllList'
            ]),
            test(){
                console.log(this.form.harborname),
                    console.log(this.form.shipCompanyName),
                    console.log(this.form.customerName)
            },
            selectRegion(){
                this.second = true;
                let param = {id:this.form.regionId}
                this.RegionBelongCList(param).then((res)=>{
                    console.log(res.data)
                this.regionBelongCityData=res.data
            })
                this.regionBelongPList.data.forEach((val,key)=>{
                    if(val.regionId   === this.form.selectedRegion){
                    this.form.regionName1 = val.regionName
                }
            })
                this.form.selectedRegionSecond =""
            },
            selectRegionsecond(){
                console.log(this.form.selectedRegionSecond)
                this.third = true;
                let param = {id:this.form.selectedRegionSecond}
                this.RegionBelongCList(param).then((res)=>{
                    console.log(res.data)
                this.regionBelongDistrictData=res.data
            })
                this.regionBelongCList.data.forEach((val,key)=>{
                    if(val.regionId   === this.form.selectedRegionSecond){
                    this.form.regionName2 = val.regionName
                }
            })
                this.form.selectedRegionThird =""
            },
            selectRegionthird(){
                console.log(this.form.selectedRegionThird)
                this.fourth = true;
                let param = {id:this.form.selectedRegionThird}
                this.RegionBelongCList(param).then((res)=>{
                    console.log(res.data)
                this.regionBelongStreetData=res.data
            })
                this.regionBelongCList.data.forEach((val,key)=>{
                    if(val.regionId   === this.form.selectedRegionThird){
                    this.form.regionName3 = val.regionName
                }
            })
                this.form.selectedRegionFourth =""
            },
            selectedRegionfourth(){
                let param = {id:this.form.selectedRegionFourth}
                this.regionBelongCList.data.forEach((val,key)=>{
                    if(val.regionId   === this.form.selectedRegionFourth){
                    this.form.regionName4 = val.regionName
                }
            })
                console.log(this.form.selectedRegionFourth)
            },




            getList(){
                let param = Object.assign(this.paginationParams(), this.form)
            },
            closeDialog(){
                this.second = false;
                this.third = false;
                this.fourth = false;
                //debugger;
                this.newCustompricedialogVisible = false;
                this.$refs['form'].resetFields()
            },
            onSubmit() {
                var temp;
                //debugger;

                if(this.form.selectedRegionSecond==""){
                    temp=this.form.regionId;
                }

                else if(this.form.selectedRegionThird==""){
                    temp=this.form.selectedRegionSecond;
                }
              else if(this.form.selectedRegionFourth==""){
                  temp=this.form.selectedRegionThird;
                }
                else {
                    temp=this.form.selectedRegionFourth;
                }

                //regionId   regionIdt   temp
                this.form.regionId=temp;
                this.form.validityStartDate =  (typeof(this.form.validityStartDate)== "string"?this.form.validityStartDate:util.formatDate.format(this.form.validityStartDate,'yyyy-MM-dd hh:mm:ss'));
                this.form.validityEndDate =  (typeof(this.form.validityEndDate)== "string"?this.form.validityEndDate:util.formatDate.format(this.form.validityEndDate,'yyyy-MM-dd hh:mm:ss'));

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        //debugger;
                        //var cqdVoList[0]=this.form._20GP;
//                        var cqdVoList=new Array()
//                        cqdVoList[0]=JSON.stringify(this.form._20GP);
                       // alert(mycars[0]);
                        //mycars[1]="Volvo"

//                        var jsonText = JSON.stringify(this.form);
//                        var orderTask=JSON.parse(jsonText);

                        let cqdVoList= [
                            {

                                "transportType": 1,
                                "_20GP": this.form.S_20GP,
                                "_20HQ": this.form.S_20HQ,
                                "_40GP": this.form.S_40GP,
                                "_40HQ": this.form.S_40HQ,
                                "_2x20GP": this.form.S_2x20GP,
                                "_2x20HQ": this.form.S_2x20HQ
                            },
                            {
                                "transportType": 0,
                                "_20GP": this.form.Z_20GP,
                                "_20HQ": this.form.Z_20HQ,
                                "_40GP": this.form.Z_40GP,
                                "_40HQ": this.form.Z_40HQ,
                                "_2x20GP": this.form.Z_2x20GP,
                                "_2x20HQ": this.form.Z_2x20HQ
                            }
                        ]
                        Object.assign(this.form,{cqdVoList:cqdVoList});


//                        val.orderInfo.requireDate =  (typeof(val.orderInfo.requireDate)== "string"?val.orderInfo.requireDate:util.formatDate.format(val.orderInfo.requireDate,'yyyy-MM-dd hh:mm:ss'));
//                        val.orderInfo.cabReqTime =  (typeof(val.orderInfo.cabReqTime)== "string"?val.orderInfo.cabReqTime:util.formatDate.format(val.orderInfo.cabReqTime,'yyyy-MM-dd hh:mm:ss'));

                        this.saveCustomprice({data:JSON.stringify(this.form)}).then(res => {
                            if (res.success) {
                                this.$refs['form'].resetFields()
                                this.newCustompricedialogVisible = false;
                                this.getCustompriceList()
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                })
                            } else {
                                this.newCustompricedialogVisible = false;
                                this.$message({
                                    message: '新增失败',
                                    type: 'error'
                                })
                            }
                        });
                        /*this.$refs.form.validate((valid) => {
                         if(valid){
                         this.$confirm('确定新增地区？').then(()=>{
                         this.saveShipcompany(this.form).then(res =>{
                         if(res.success){
                         this.$refs['form'].resetFields()
                         this.newShipcompanydialogVisible = false;
                         this.getShipcompanyList()
                         this.$message({
                         message:'新增成功',
                         type:'success'
                         })
                         }else{
                         this.newShipcompanydialogVisible = false;
                         this.$message({
                         message:'新增失败',
                         type:'error'
                         })
                         }
                         });
                         })
                         }

                         })
                         }*/
                    }
                })
            }
        },
        created(){
            this.$store.dispatch('RegionBelongPList')
            this.$store.dispatch('HarborBelongList')
            this.$store.dispatch('getCustompriceList')
            this.$store.dispatch('getShipcompanyList')
            this.$store.dispatch('getCustomList')
        this.$store.dispatch('getAddOrderAllList')


        },
        mounted(){
            console.log(this.page)
        }
    }
</script>