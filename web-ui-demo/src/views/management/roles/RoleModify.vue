<template>
    <el-dialog
            title="修改角色"
            :visible.sync="showModel">
        <el-form ref="form" :rules="formRules" :model="role" label-width="80px">
            <el-form-item label="角色编码" prop="code">
                <el-input v-model="role.code"></el-input>
            </el-form-item>
            <el-form-item label="角色名称	" prop="name">
                <el-input v-model="role.name"></el-input>
            </el-form-item>
            <el-form-item label="角色描述	" prop="description">
                <el-input v-model="role.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        data() {
            return {
                showModel: false,
                formRules: {
                    date: [
                        { required: true, message: '请输入日期' },
                    ],
                },
                role: {},
            };
        },
        computed: {
            ...mapGetters('role', [
                'getSearchOptions',
            ]),
        },
        methods: {
            ...mapActions('role', [
                'modifyRole',
            ]),
            onSubmit() {
                this.modifyRole(this.role)
                .then(() => {
                    this.showModel = false;
                    this.$message.success('角色修改成功');
                    this.$parent.getList();
                })
                .catch((error) => {
                    this.$message.error(`角色修改失败${error}`);
                });
            },
            closeDialog() {
                this.showModel = false;
            },
        },
    };
</script>
