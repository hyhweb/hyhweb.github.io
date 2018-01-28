<template>
  <el-dialog title="角色授权" :visible.sync="showModel">
    <el-tree ref="tree" :data="getMenus" :props="props" :default-checked-keys="currentNodes" show-checkbox node-key="id" v-loading="IS_LOADING">
    </el-tree>
    <el-row style="padding-top: 10px">
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        model: [],
        showModel: false,
        props: {
          label: 'name',
          children: 'data',
        },
        role: null,
        count: 1,
      };
    },
    watch: {
      role() {
        if (this.role) {
          this.$nextTick(function () {
            this.getMenusByRole(this.role).then(()=>this.refreshMenus());
          });

        }
      },
    },
    computed: {
      ...mapGetters('role/authorize', [
        'getMenus',
        'currentNodes',
        'IS_LOADING',
      ])
    },
    methods: {
      ...mapActions('role/authorize', [
        'refreshMenus',
        'getMenusByRole',
        'modifyAuthorizedMenu',
      ]),
      onSubmit() {
        this.modifyAuthorizedMenu({
          role: this.role,
          permissions: this.$refs.tree.getCheckedNodes()
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
    mounted() {
      this.$nextTick(function () {
        this.refreshMenus();
      });
    }
  };
</script>
