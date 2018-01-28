<template>
    <el-dialog
            title="新增角色"
            :visible.sync="showModel">
        <el-form ref="form" :rules="formRules" :model="role" label-width="80px">
            <el-form-item label="角色编码" prop="code">
                <el-input v-model="role.code"></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="role.name"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
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
                role: {
                    code: '',
                    name: '',
                    id: '',
                    description: '',
                },
                formRules: {
                    date: [
                        { required: true, message: '请输入日期' },
                    ],
                },
            };
        },
        computed: {
            ...mapGetters('role', [
                'getSearchOptions',
            ]),
        },
        methods: {
            ...mapActions('role', [
                'addRole',
            ]),
            onSubmit() {
                this.addRole(this.role)
                    .then(() => {
                        this.showModel = false;
                        this.$message.success('角色添加成功');
                        this.$parent.getList();
                    })
                    .catch((error) => {
                        this.$message.error(`角色添加失败${error}`);
                    });
            },
            closeDialog() {
                this.showModel = false;
            },
        },
    };
</script>
