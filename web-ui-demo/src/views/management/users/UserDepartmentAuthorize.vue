<template>
  <el-dialog title="部门授权" :visible.sync="showModel">
   <!-- :default-checked-keys="currentNodes"-->
    <el-tree ref="tree" :data="departmentTree" :props="props" :default-checked-keys="departmentByUserId" show-checkbox node-key="id" :class="departTree">
    </el-tree>

    <el-row style="padding-top: 10px">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </el-row>
  </el-dialog>
</template>
<style scoped>
  .departTree{
    max-height: 400px;
    height: 400px;
    overflow-y: scroll;
  }
</style>
<script>
 import { mapGetters, mapActions } from 'vuex';
 //import getDepartmentTree from  '../../../api/modules/sys/department';
  export default {
    data() {
      return {
        model: [],
        showModel: false,
        props: {
          label: 'name',
          children: 'data',
        },
        departTree: 'departTree',
        userId:'',
        role: null,
        count: 1


      };
    },
    watch: {
      showModel(show) {
        this.$nextTick(function () {
          if(show){
            this.getDepartmentByUserId(this.user.userId);
            this.getDepartmentTree();
          }
        });
      },
    },
    computed: {
      ...mapGetters([
        'departmentTree','departmentByUserId'
      ]),
    },
    methods: {
      ...mapActions([
       'getDepartmentTree','getDepartmentByUserId','saveDeparByUserIds'
      ]),
      onSubmit() {
        this.saveDeparByUserIds({
          user: this.user,
          permissions: this.$refs.tree.getCheckedNodes(),
        })
        .then(() => {
          // this.$store.dispatch('user/setPermissions', {
          //     menus: this.getMenus,
          //     permissions: this.currentNodes,
          // });
          this.showModel = false;
          this.$message.success('角色菜单修改成功');
        })
        .catch((error) => {
          this.$message.error(`角色菜单修改失败${error}`);
        });
      },
      closeDialog() {
        this.showModel = false;
      },
    },
    created(){


    }


  };
</script>
