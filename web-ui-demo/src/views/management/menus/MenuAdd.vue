<template>
    <el-dialog
            title="新增菜单"
            :visible.sync="showModel">
        <el-form ref="form" :rules="formRules" :model="menu" label-width="80px">
            <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="menu.menuName"></el-input>
            </el-form-item>
            <el-form-item label="菜单链接" prop="menuUrl">
                <el-input v-model="menu.menuUrl"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单" prop="pid">
                <el-select   clearable filterable default-first-option  v-model="menu.parentId" placeholder="请选择" class="control-width">
                        <el-option
                                v-for="item in getSearchOptions.parents"
                                :key="item.value"
                                :label="item.text"
                                :value="item.value">
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="菜单排序" prop="sortno">
                <el-input v-model="menu.sortno"></el-input>
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
                menu: {
                    menuName: '',
                    menuUrl: '',
                    parentId: '',
                    sortno: '',
                },
                formRules: {
                    date: [
                        { required: true, message: '请输入日期' },
                    ],
                },
            };
        },
        watch: {
            showModel(newValue) {
                if (newValue) {
                    this.getParentMenus();
                }
            },
        },
        computed: {
            ...mapGetters('menuConsole', [
                'getSearchOptions',
            ]),
        },
        methods: {
            ...mapActions('menuConsole', [
                'addMenu',
                'getParentMenus',
            ]),
            onSubmit() {
                this.addMenu(this.menu)
                    .then(() => {
                        this.showModel = false;
                        this.$message.success('菜单添加成功');
                    })
                    .catch((error) => {
                        this.$message.error(`菜单添加失败${error}`);
                    });
            },
            closeDialog() {
                this.showModel = false;
            },
        },
    };
</script>