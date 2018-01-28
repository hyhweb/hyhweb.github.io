<template>
    <el-dialog title="修改用户" :visible.sync="showModel">
        <el-checkbox-group v-model="activeRoles">
            <el-checkbox v-for="item in GET_AVAILABLE_ROLES" :label="item.value" :value="item.value" :key="item.value">
                {{item.text}}
            </el-checkbox>
        </el-checkbox-group>
        <div style="padding-top:10px">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="closeDialog">取消</el-button>
        </div>
    </el-dialog>
</template>
<<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            showModel: false,
            user: {},
            activeRoles: [],
        };
    },
    computed: {
        ...mapGetters('userRoleStore', [
            'GET_AVAILABLE_ROLES',
        ]),
    },
    methods: {
        ...mapActions('userRoleStore', [
            'getAvailableRoles',
            'getUserRoles',
            'saveUser',
        ]),
        onSubmit() {
            this.saveUser({ user: this.user, activeRoles: this.activeRoles })
            .then(() => {
                this.showModel = false;
                this.$message.success('用户角色修改成功');
            })
            .catch(() => {
                this.$message.error('用户角色修改失败');
            });
        },
        closeDialog() {
            this.showModel = false;
        },
    },
    watch: {
        showModel(show) {
            if (show) {
                this.getAvailableRoles()
                .then((availableRoles) => {
                    this.getUserRoles({ user: this.user, availableRoles })
                    .then((roles) => {
                        this.activeRoles = roles;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                })
                .catch(err => console.log(err));
            }
        },
    },
};
</script>
