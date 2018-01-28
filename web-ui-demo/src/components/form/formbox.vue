<template>
<el-col>

  <div class="form-box" :class="{'hidden':isActive}">
      <div class="form-header" :class="{'active':isActive}" >
     <!--  <span>{{title}}</span> -->
      <span class="form-switch">
      <el-switch :width="40"
    v-model="switchVal"
    on-text=""
    off-text=""
    on-value="1"
    off-value="0"
    off-color="#13ce66"
    @change="changeSwitch"
    >
  </el-switch>
  </span>
      </div>
      <transition name="fade">
      <div class="form-body" v-show="isActive" >
        <slot></slot>
      </div>
      </transition>
  </div>
  </el-col>
</template>
<script>


  export default {
    name: 'FormBox',
    componentName: 'FormBox',
    components: {},
    props: {
      title: String,
      name: {
        type: [String, Number],
        default:''
      },
       visible:{
        type:[Boolean],
        default:false,
      }

    },
    data(){
      return {
        switchVal:'0',
        isShow:this.visible
      }
    },
    computed: {
      isActive() {
          return this.isShow
      }
    },
    methods: {
      handleHeaderClick() {
          if(this.isActive){
            this.isShow = false
          }else{
            this.isShow = true
          }
      },
      changeSwitch(val){
        if(val =="1"){
          this.isShow = true
        }else if(val =="0"){
           this.isShow = false
        }
      }
    },
    watch:{
    	isShow(val){
    		this.switchVal = val?'1':'0';
    	}
    },
    mounted() {
    	this.switchVal = this.visible?'1':'0';
    }
  };
</script>
<style scope lang="scss">
.form-box{
        position: relative;
        margin-bottom:12px;
        border-radius:6px;
        background-color: #fff;
        &.hidden{
           border: 1px solid #dfe6ec;
        }


    .form-header{

        /* height:0;
        line-height: 36px;
        padding-left: 15px;
        color: #48576a;
        cursor: pointer;
        font-size: 13px;*/
        &.active{  }
        .form-switch{
          position:absolute;top:-12px;right:10px;
        }
    }
    .form-body{
        padding:10px;
        .el-form--inline{
			.el-form-item{
    			margin-bottom:10px;
    			.el-form-item__label{
    				padding:0 12px 0;
    			}
    		}
	    }
    }

}
</style>
