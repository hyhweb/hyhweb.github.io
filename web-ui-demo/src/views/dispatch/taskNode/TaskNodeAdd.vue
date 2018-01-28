<template>
  <el-dialog title="新增任务节点" :visible.sync="taskModel">
    <el-form ref="form" inline :rules="formRules" :model="form" label-width="180px">
      <el-form-item label="节点名称" prop="nodeName">
        <el-input v-model="form.nodeName" class="control-width"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="code">
        <el-input v-model="form.code" class="control-width"></el-input>
      </el-form-item>
      <el-form-item label="要求拍照的类型" prop="photoQuantity">
        <el-select v-model="form.photoQuantity" placeholder="请选择" class="control-width">
          <el-option
            v-for="item in photoQuantityType"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="写入封号类型" prop="newFillSealNo">
        <el-select v-model="form.newFillSealNo" placeholder="请选择" class="control-width">
          <el-option
            v-for="item in fillSealNoType"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="节点数据类型" prop="nodeDataType">
        <el-select v-model="form.nodeDataType" placeholder="请选择" class="control-width">
          <el-option
            v-for="item in nodeDataTypes"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否允许单拖套箱"  prop="jacktAble">
        <el-switch style="width: 180px"
                   v-model="form.jacktAble"
                   on-text="是"
                   off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="是否允许双拖套箱"  prop="doubleJacktAble">
        <el-switch style="width: 150px"
                   v-model="form.doubleJacktAble"
                   on-text="是"
                   off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="是否允许取消单拖套箱"  prop="cancelJackAble">
        <el-switch style="width: 180px"
                   v-model="form.cancelJackAble"
                   on-text="是"
                   off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="是否取消双拖套箱" prop="cancelDoubleJackAble">
        <el-switch style="width: 150px"
          v-model="form.cancelDoubleJackAble"
          on-text="是"
          off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="是否允许双拖" prop="doubleAble">
        <el-switch style="width: 180px"
          v-model="form.doubleAble"
          on-text="是"
          off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="是否允许取消双拖" prop="cancelDoubleAble">
        <el-switch style="width: 150px"
          v-model="form.cancelDoubleAble"
          on-text="是"
          off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="是否写入箱号" prop="fillCabinetNo">
        <el-switch style="width: 180px"
          v-model="form.fillCabinetNo"
          on-text="是"
          off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="是否评价" prop="evaluate">
        <el-switch style="width: 150px"
          v-model="form.evaluate"
          on-text="是"
          off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="是否允许挂起" prop="handUpAble">
        <el-switch style="width: 180px"
          v-model="form.handUpAble"
          on-text="是"
          off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="是否写入封号" prop="fillSealNo">
        <el-switch style="width: 180px"
                   v-model="form.fillSealNo"
                   on-text="是"
                   off-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="拍照内容" prop="photoContent">
        <el-input type="textarea"  :rows="2" v-model="form.photoContent" class="control-width"></el-input>
      </el-form-item>

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
  import {saveTask} from '../../../api/modules/dispatch';
  export default {
    data() {
      return {
        taskModel: false,
        form: {
          code: '',
          orgCode:'',
          nodeName: '',
          jacktAble: true,
          doubleJacktAble: true,
          cancelJackAble: true,
          cancelDoubleJackAble: true,
          doubleAble: true,
          cancelDoubleAble: true,
          photoQuantity: 0,
          /*photoQuantityText:'0',*/
          newFillSealNo: 0,
          fillCabinetNo: false,
          evaluate: false,
          handUpAble: true,
          photoContent:'',
          fillSealNo:'',
          nodeDataType: ''
        },
        //新增下拉框状态
        selectStauts: [
          {text: '是', value: "true"},
          {text: '否', value: "false"}
        ],
        fillSealNoType:[
          {text: '不录', value: 0},
          {text: '必录', value: 1},
          {text: '选录', value: 2}
        ],
        photoQuantityType: [
          {text: '不拍', value: 0},
          {text: '必拍 1张', value: 1},
          {text: '必拍 2张', value: 2},
          {text: '选拍', value: 3}
        ],
        nodeDataTypes: [
          {text: '无', value: 0},
          {text: '装卸货单', value: 1},
          {text: '箱号封号', value: 2},
          {text: '到达时间', value: 3},
          {text: '提柜时间', value: 4},
          {text: '还柜时间', value: 5}
        ],
        formRules: {
          nodeName: [
            {required: true, message: '请输入节点名称'},
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
        'taskList'
      ])
    },
    methods: {
      ...mapActions([
        'getTaskList'
      ]),
      onSubmit() {
        this.$refs.form.validate((valid) => {
            if(valid){
              saveTask(this.form)
                .then((res) => {
                  let data = res.data;
                  if(data.success){
                    this.taskModel = false;
                    this.$parent.getList();
                    this.$message.success('任务节点添加成功')
                  }else {
                    this.$message.error(data.message)
                  };
                });
            }
        })

      },
      closeDialog() {
        this.taskModel = false;
      },
    },
  };
</script>
