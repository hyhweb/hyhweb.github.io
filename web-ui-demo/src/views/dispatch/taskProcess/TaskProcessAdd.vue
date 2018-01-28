<template>
  <el-dialog title="新增任务流程" :visible.sync="taskModel">
    <el-form ref="form" inline :rules="formRules" :model="form" label-width="80px">
      <el-form-item label="流程名称" prop="processName">
        <el-input v-model="form.processName" class="control-width"></el-input>
      </el-form-item>
      <el-form-item label="调度类型" prop="dispatchType">
        <el-select v-model="form.dispatchType" placeholder="请选择">
          <el-option
            v-for="item in selectDispatchType"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="订单类型" prop="orderType">
        <el-select v-model="form.orderType" placeholder="请选择">
          <el-option label="装货" value="0"></el-option>
          <el-option label="送货" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否套箱" label-width="80px" prop="Set">
        <el-select v-model="form.Set" placeholder="请选择">
          <el-option
            v-for="item in selectStauts"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="版本号" label-width="80px" prop="version">

          <el-input  v-model="form.version"></el-input>
      </el-form-item>


      <br/>
      <el-row class="textAlign">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex';
  import{saveTaskProcess} from '../../../api/modules/dispatch'
  export default {
    data() {
      return {
        taskModel: false,
        form: {
          dispatchType: '',
          processName:'',
          Set:'',
          orderType:'',
          orgCode:''
        },
        //新增下拉框状态
        selectStauts: [
          {text: '是', value: true},
          {text: '否', value: false}
        ],
        selectDispatchType: [
          {text: '吉出重回', value: 0},
          {text: '重出吉回', value: 1},
          {text: '重出重回', value: 2},
          {text: '双重出双吉回', value: 3},
          {text: '双吉出双重回', value: 4},
          {text: '一重一吉出一重一吉回', value: 5},
          {text: '一重一吉出双重回', value: 6},
          {text: '双重出一重一吉回', value: 7},
          {text: '双重出双重回', value: 8}
        ],

        formRules: {
          processName: [
            {required: true, message: '请输入流程名称'},
          ],
          code: [
            {required: true, message: '请输入节点编号'},
            {validator:this.$global.validate.number}

          ],
        },
      };
    },
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapActions([
      ]),
      onSubmit() {
        this.$refs.form.validate((valid) => {
            if(valid){
              saveTaskProcess(this.form)
                .then((res) => {
                  this.taskModel = false;
                  this.$parent.getList();
                  if(res.data.success){
                    this.$message.success('任务流程添加成功');
                  } else {
                    this.$message.error('任务流程添加失败');
                  }
                })
            }
        });
      },
      closeDialog() {
        this.taskModel = false;
      },
    },
  };
</script>
