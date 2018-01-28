<template>
    <section class="page-container">
        <p >出错啦! 404</p>
        <el-button type="primary" @click="onClickBackToMainPage">回主页</el-button>
    </section>
</template>

<script>
export default {
  methods: {
    onClickBackToMainPage() {
      this.$router.push('/');
    },
  },
};
</script>


<style lang="scss" scoped>
    .page-container {
        font-size: 40px;
        text-align: center;
        vertical-align: middle;
        color: rgb(192, 204, 218);
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
