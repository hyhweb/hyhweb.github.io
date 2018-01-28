<template>
    <div class="xcDetails clear">

        <div id="allmap" :style="mapStyle"></div>
        <div class="left">
            <div class="title" @click="showAllTask">
                <span>箱子列表</span><i class="fa" :class="actionIcon">  </i>
            </div>
            <div class="ul" style="margin-top: 10px;" v-show="taskListVisiable">
                <ul id="taskList"  style="max-height: 458px; " >
                    <li v-for="(item,index) in taskDetail.taskDtos" @click="showTaskLog(item)">
                        <span>{{index+1}}</span>
                        <span class="c" >箱号：{{item.cabinetNo}}</span></li>
                </ul>
            </div>
            <div v-model="taskDto" class="taskBox" style="margin-top: 10px;" v-show="taskLogVisiable">
                <i class="fa fa-reply" @click="showTaskList"></i>
                <div class="task" id="taskNumber">任务号：{{taskDto.taskNo}}</div>
                <div class="ul2">
                    <div class="line"></div>
                    <ul id="taskStatus" style="max-height: 485px;">
                        <li v-for="item in taskProcessLogs" >
                            <i></i>
                            <span>{{item.createTime}}</span>
                            <template v-if="hasPic(item.taskProcessDetailId)">
                              <label @click="showPic(item.taskProcessDetailId)" class="link">
                                <span class="last" >{{item.taskNodeName}}</span>
                                <b>图</b>
                              </label>

                            </template>
                            <template v-else>
                              <span class="last" >{{item.taskNodeName}}</span>
                            </template>
                        </li>
                        <li v-for="item in UptaskDtos" >
                            <i></i>
                            <span v-if="item.signedBillUrl" style="color:#876fd4;">签收单照片</span>
                            <template v-if="item.signedBillUrl">
                              <label @click="showsignPic(item.signedBillUrl)" class="link">
                                <b>图</b>
                              </label>
                            </template>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="driver" @click="showSchedule"></div>
            <div class="content" v-show="scheduleVisiable">
                <div class="tit clear">
                    <table class="L">
                        <tbody>
                        <tr id="upList">
                            <td class="td1 c01">装</td>
                            <td class="c03" v-for="item in shipList">{{item.cabinetType}}</td>
                        </tr>
                        <tr id="downList">
                            <td class="td1 c02">送</td>
                          <td class="c03" v-for="item in deliveryList">{{item.cabinetType}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="R">
                      <div class="trip">行程 <span  id="scheduleNo" >{{taskDetail.scheduleDto.scheduleNo}}</span></div>
                        <div class="trip">{{taskDetail.scheduleDto.executeDate}}</div>
                    </div>
                </div>
                <div class="date" style="max-height: 395px;">
                    <table>
                        <tbody>
                        <tr>
                            <td class="td1">车队：</td>
                            <td >{{taskDetail.scheduleDto.carteamName}}</td>
                            <td class="td1">车牌：</td>
                            <td >{{taskDetail.scheduleDto.plateNumber}}</td>
                        </tr>
                        <tr>
                            <td class="td1">提单号：</td>
                            <td id="waybillNo"><div v-for="item in taskDetail.taskDtos">{{item.bookSpaceNo}}</div></td>
                            <td class="td1">司机：</td>
                            <td id="driver">{{taskDetail.scheduleDto.driverName}}</td>
                        </tr>
                        <tr>
                            <td class="td1">身份号：</td>
                            <td >{{taskDetail.taskDtos[0].identificationCard}}</td>
                            <td class="td1">电话：</td>
                            <td>{{taskDetail.scheduleDto.driverPhone}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      <div class="slider" id="images" v-show="showPics">
        <ul  >
          <li v-for="item in picList"><img class="imgDemo"  :src='item' alt='' /></li>
        </ul>
      </div>
        <div class="slider" id="signimages" v-show="signshowPics">
            <ul  >
              <li v-for="item in signpicList"><img class="imgDemo"  :src='item' alt='' /></li>
            </ul>
        </div>
    </div>

</template>
<style scoped>
  #scheduleNo{
    font-size: 14px;
  }
  .xcDetails .slider {
    position: absolute;
    top: 50%;
    right: 50%;
  }
    .xcDetails .left .taskBox {
        position: relative;
        margin-top: -30px;
        overflow-y: auto;
        font-size: 12px;
        background: white;
        box-shadow: 1px 2px 1px rgba(0,0,0,.15);
    }
    .xcDetails .left .taskBox i {
        position: absolute;
        top: 9px;
        right: 10px;
        color: #666;
        cursor: pointer;
        font-size: 16px;
    }
    .xcDetails .left .taskBox .task {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #666;
        padding: 8px 0;
        border-bottom: 1px solid #E1E1E1;
    }
    .xcDetails .left .ul2 {
        position: relative;
        overflow-y: hidden;
        box-shadow: 1px 2px 1px rgba(0,0,0,.15);
    }
    .xcDetails .left .ul2 .line {
        position: absolute;
        top: 0;
        left: 15px;
        height: 100%;
        border-left: 1px solid #d9d9d9;
    }
    .xcDetails .left .ul2 ul {
        padding: 12px 16px;
        overflow-y: auto;
        font-size: 14px;
        background: white;
        box-shadow: 1px 2px 1px rgba(0,0,0,.15);
    }
    .xcDetails .left .ul2 li {
        position: relative;
        padding: 6px 0 6px 16px;
    }
    .xcDetails .left .ul2 li span {
        display: block;
        color: #999;
    }
    .xcDetails .left .ul2 li span.last {
        display: inline-block;
        color: #876fd4;
    }
  .xcDetails .left .ul2 li label.link {
    cursor: pointer;
  }

    .xcDetails .left .ul2 li b {
        position: absolute;
        top: 4px;
        left: 170px;
        font-size: 12px;
        font-weight: normal;
        padding: 1px 4px;
        background: #6eb6f6;
        color: white;
        border-radius: 2px;
    }
    .clear:after {
        content: 'ly';
        display: block;
        clear: both;
        visibility: hidden;
        height: 0px;
        overflow: hidden;
    }
    .xcDetails .left {
        float: left;
        position: relative;
        width: 280px;
        margin: 16px 20px;
        top: -780px;
    }
    .xcDetails .left .title {
        position: relative;
        cursor: pointer;
        background: white;
        color: #3385ff;
        line-height: 32px;
        text-align: center;
        font-size: 16px;
        box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
    }
    .xcDetails .left .title i {
         margin-left: 16px;
     }

    .xcDetails .left .ul li {
        padding: 6px 16px;
        border-bottom: 1px solid #E1E1E1;
    }
    .xcDetails .left .ul ul {
        overflow-y: auto;
        font-size: 14px;
        background: white;
        box-shadow: 1px 2px 1px rgba(0,0,0,.15);
    }
    .xcDetails .left .ul li span {
        margin-left: 10px;
        color: #666;
    }
    .xcDetails .left .ul li span.c {
        color: #3385ff;
        cursor: pointer;
    }
    .xcDetails .left .ul li span {
        margin-left: 10px;
        color: #666;
    }
    li {
        list-style-type: none;
    }

     .fa {
         display: inline-block;
         font: normal normal normal 14px/1 FontAwesome;
         font-size: inherit;
         text-rendering: auto;
         -webkit-font-smoothing: antialiased;
         -moz-osx-font-smoothing: grayscale;
         transform: translate(0, 0);
         cursor: pointer;
     }

    .xcDetails .right {
        float: right;
        position: relative;
        width: 420px;
        margin: 20px;
        top: -780px;
    }

    .xcDetails .right .content {
        background: white;
        box-shadow: 1px 2px 1px rgba(0,0,0,.15);
    }
    .xcDetails .right .tit {
        margin-top: 10px;
        padding: 6px 10px 0 10px;
    }
    .xcDetails .right .date {
        overflow-y: auto;
        padding: 6px 10px;
        max-height: 395px;
    }
    .xcDetails .right .L {
        float: left;
        margin: 0;
        font-size: 12px;
        border-collapse: collapse;
    }
    .xcDetails .right .R {
        float: right;
        width: 66%;
    }
    .xcDetails .right .R .trip {
        line-height: 28px;
        font-size: 20px;
        font-weight: bold;
        color: #666;
        text-align: center;
    }
    .xcDetails .right .R .time {
        font-size: 14px;
        font-weight: normal;
        line-height: 28px;
        color: #525252;
        text-align: center;
    }
    .xcDetails .right .date td.td1 {
        width: 70px;
        text-align: right;
    }
    .xcDetails .right .date td {
        padding: 6px;
        border-right: 1px solid #E1E1E1;
        border-bottom: 1px solid #E1E1E1;
    }
    .xcDetails .right .date table {
        border-collapse: collapse;
        table-layout: fixed;
        font-size: 14px;
        color: #525252;
        border: 1px solid #E1E1E1;
        border-right: none;
    }
    .driver{
        margin-left: 40%;
        background-image: url("driver.jpg");
        display: block;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        cursor: pointer;
    }

    .xcDetails .right .L .c01 {
        background: #2f87ca;
    }
    .xcDetails .right .L .c02 {
        background: #496A84;
    }
    .xcDetails .right .L .c03 {
        background: #3bb3ed;
    }
    .xcDetails .right .L .td1 {
        text-align: center;
    }
    .xcDetails .right .L td {
        color: white;
        border-right: 1px solid #E1E1E1;
        border-bottom: 1px solid #E1E1E1;
        padding: 6px;
    }
  .xcDetails .createDate {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    color: white;
    font-size: 14px;
    width: 100%;
    line-height: 26px;
    padding: 0 6px;
    background: rgba(43, 24, 8, 0.13);
    filter: alpha(opacity=60)progid:DXImageTransform.Microsoft.gradient(startcolorstr=#2b1808,endcolorstr=#585656);
  }
  .xcDetails .imgDemo{
    width: 300px;
    height: 300px;
  }
</style>
<script>
    import viewer from '../../../components/viewerjs/viewer.css';
    import Viewer from '../../../components/viewerjs/viewer.js';
    import {MP} from '../../../common/js/map';
    import util from '../../../common/js/util';
    import instance from '../../../api/config';

    export default {
        props:["taskDetail","currentTaskId"],
        data () {
            return{
                taskDto:{},
                actionIcon: "fa fa-caret-down",
                taskLogVisiable: false,
                scheduleVisiable: true,
                taskListVisiable: true,
                showPics: false,
                signshowPics:false,
              picList:["","","","","","","",""],
              signpicList:["","","","","","","",""],
              viewer:null,
                mapStyle:{
                    width: '500px',
                    height: '800px'
                }
        }
        },

        mounted() {

            this.$nextTick(function () {


                this.mapStyle.width = document.body.clientWidth * 0.96 + "px";
                MP().then( BMap => {
                  let map = new BMap.Map("allmap");
                    let point = new BMap.Point(116.404, 39.915); // 创建点坐标
                  map.centerAndZoom(point,12);
                  map.enableScrollWheelZoom();
                  // 创建地址解析器实例
                  let myGeo = new BMap.Geocoder();
                  // 将地址解析结果显示在地图上,并调整地图视野

                  this.taskDetail.taskDtos.forEach((res)=>{

                    myGeo.getPoint(res.address, function(point){
                      if (point) {
                        map.centerAndZoom(point, 12);
                        var marker =  new BMap.Marker(point);
                        map.addOverlay(marker);
                        var opts = {
                          width : 200,     // 信息窗口宽度
                          height: 100,     // 信息窗口高度
                          title : "类型: "+ (res.orderType==0 ? '装货' : '送货')+" "+res.cabinetType

                        }
                        let content = "联系人: "+ res.contactName + " <br/>电话: "+ res.contactPhone  + "<br/>地址："+res.address ;
                        let infoWindow = new BMap.InfoWindow(content, opts);
                        // 创建信息窗口对象
                        marker.addEventListener("click", function(){
                          map.openInfoWindow(infoWindow,point); //开启信息窗口
                        });
                        map.openInfoWindow(infoWindow,point);
                      }else{
                        alert("您选择地址没有解析到结果!");
                      }
                    }, "北京市");
                  });


                });

//              this.showAllTask();
//              this.showTaskLog(this.taskDto);
            });

        },
      watch:{
      taskDetail: function(){
        this.taskLogVisiable = false;
        this.scheduleVisiable = true;
        this.taskListVisiable =true;
        this.showPics=false;
      },
        currentTaskId:function () {
          this.$nextTick(function () {
            if(this.taskDetail.taskDtos){
              if(this.taskDetail.taskDtos.length==1){
                this.showTaskLog(this.taskDetail.taskDtos[0]);
              }else if(this.currentTaskId) {
                this.taskDetail.taskDtos.forEach((res)=>{
                  if(res.id===this.currentTaskId){
                    this.showTaskLog(res);
                  }
                })
              }
            }
          });

        }
    },
      computed:{

        taskProcessLogs: function () {
          return this.taskDetail.taskProcessLogs.filter((res)=> res.taskId==this.taskDto.id);
        },
        UptaskDtos:function(){
            return this.taskDetail.taskDtos.filter((res)=> res.signedBillUrl==this.taskDto.signedBillUrl)
        },
        shipList: function () {
          return this.taskDetail.taskDtos.filter((res)=> res.orderType==0);
        },
        deliveryList: function () {
          return this.taskDetail.taskDtos.filter((res)=> res.orderType==1);
        }
      },
        methods: {

          showPic(detailId){
            this.picList = this.taskDetail.taskPics.map((res)=>  {
              if(res.taskProcessDetailId==detailId){
               return this.taskDetail.basePath+res.picUrl;
              }
            });
            if(!this.picList || this.picList.length==0){
              this.$message('没有图片');
            }else {
                if(this.viewer){
                  this.viewer.destroy();
                  this.viewer=null;
                }
              this.viewer = new Viewer(document.getElementById("images"),{
                hide:function () {
                  this.viewer.destroy();
                  this.viewer=null;
                }
              });
              this.viewer.show();
            }
          },
          showsignPic(item){
            var items = item.split(",");
            this.signpicList=items.map((res)=>{
                return this.taskDetail.basePath+res;
            });
            if(!this.signpicList || this.signpicList.length==0){
                this.$message('没有图片');
            }else {
                if(this.viewer){
                  this.viewer.destroy();
                  this.viewer=null;
                }
              this.viewer = new Viewer(document.getElementById("signimages"),{
                hide:function () {
                  this.viewer.destroy();
                  this.viewer=null;
                }
              });
              this.viewer.show();
            }
          },
            showAllTask(){
                this.taskListVisiable=!this.taskListVisiable;
                this.taskLogVisiable=false;
                this.actionIcon = this.taskListVisiable ? 'fa-caret-up' : 'fa-caret-down';
            },
            showTaskList(){
                this.taskListVisiable=!this.taskListVisiable;
                this.taskLogVisiable=!this.taskLogVisiable;
            },
            showTaskLog(taskDto){
                console.log("showTaskLog");
                this.taskListVisiable=!this.taskListVisiable;
                this.taskLogVisiable=!this.taskLogVisiable;
                this.taskDto = taskDto;
                MP().then(BMap =>{
                  let ps = new Array();
                  this.taskDetail.taskOrbits.forEach((res) => {
                    if(res.taskId==this.taskDto.id){
                        if(res.longititude&&res.latitude)
                          ps.push(new BMap.Point(res.longititude, res.latitude));
                    }
                  });
                  this.taskProcessLogs.forEach((res) =>{
                    if(res.taskId==this.taskDto.id){

                      if(res.longititude&&res.latitude)
                        ps.push(new BMap.Point(res.longitude, res.latitude));
                    }
                  });
                  if(ps.length > 0){
                    var map = new BMap.Map("allmap");
                    map.enableScrollWheelZoom();
                    map.centerAndZoom(ps[0],10);
                    var polyline = new BMap.Polyline(ps, {strokeColor: '#1CD8DE'})
                    map.addOverlay(polyline);
                  }
                  ps=null;
                });
            },
            showSchedule(){
                this.scheduleVisiable=!this.scheduleVisiable;
            },
            hasPic(taskProcessDetailId){
              let  picList = this.taskDetail.taskPics.filter((res)=> res.taskProcessDetailId==taskProcessDetailId);
              return picList!=null && picList.length > 0
            }

        },
      created(){

      }
    }
</script>

