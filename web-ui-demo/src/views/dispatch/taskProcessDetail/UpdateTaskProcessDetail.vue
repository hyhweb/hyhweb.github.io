<template>
  <el-dialog title="修改任务流程详情" :visible.sync="taskModel">
    <el-form ref="form" inline :rules="formRules" :model="form" label-width="80px">

      <el-form-item label="任务流程名称" prop="taskProcessId">
        <el-select
          clearable
          filterable
          @input="selectTaskProcess"
          v-model="form.taskProcessId" placeholder="请选择" class='control-width'>
          <el-option
            v-for="item in initTaskProcess"
            :key="item.value"
            :label="item.text"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="任务节点名称" prop="taskNodeId">
        <el-select
          clearable
          filterable
          @input="selecttaskNode"
          v-model="form.taskNodeId" placeholder="请选择" class='control-width'>
          <el-option
            v-for="item in initTaskNode"
            :key="item.value"
            :label="item.text"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="节点类型" prop="taskNodeType">
        <el-select v-model="form.taskNodeType" placeholder="请选择" class="control-width">
          <el-option
            v-for="item in taskNodeTypes"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="序号" prop="seq">
        <el-input v-model="form.seq" class="control-width"></el-input>
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
  import{updateTaskProcessDetail,getTaskProcessNameList,getTaskNodeNameList} from '../../../api/modules/dispatch'
  export default {
    data() {
      return {
        update:{},
        taskModel: false,
        initTaskProcess:{},
        initTaskNode:{},
        form: {
          taskProcessId: '',
          taskNodeId:'',
          seq:'',
          taskNodeType: 0
        },
        //新增下拉框状态
        selectStauts: [
          {text: '是', value: true},
          {text: '否', value: false}
        ],
        taskNodeTypes: [
          {text: '同步节点', value: 0},
          {text: '单步节点', value: 1},
          {text: '单步节点开始', value: 2},
          {text: '单步节点结束', value: 3}
        ],
        formRules: {
          processName: [
            {required: true, message: '请输入流程名称'},
          ],
          seq: [
            {required: true, message: '请输入序号'},
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
      init(){
        this.selectTaskProcess();
        this.selecttaskNode();
      },
      //获取所有的流程名称
      selectTaskProcess(){
        getTaskProcessNameList().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initTaskProcess = data.data;
          }
        });
      },
      //获取任务节点数据
      selecttaskNode(){
        getTaskNodeNameList().then((res) => {
          let data = res.data;
          if (data.code == 1) {
            this.initTaskNode = data.data;
          }
        });
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
            if(valid){
              updateTaskProcessDetail(this.form)
                .then((res) => {
                  this.taskModel = false;
                  this.$parent.getList();
                  if(res.data.success){
                    this.$message.success('任务流程修改成功');
                  } else {
                    this.$message.error('任务流程修改失败');
                  }
                })
            }
        });
      },
      closeDialog() {
        this.taskModel = false;
      },
    },
    mounted(){
      this.init()
    },
    watch: {
      update(val){
        Object.assign(this.form, val)
      }
    },
  };
</script>
