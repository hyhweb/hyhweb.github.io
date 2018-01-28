<template>
  <section>
    <ToolBarBox>
    <el-col class="tool-bar">
      <form-box title="查询">
        <el-form inline ref="form" :model="form" label-width="100px">
          <el-form-item label="开始日期">
            <el-date-picker type="date" v-model="form.startDate" @change="dateStartChange" class='control-width'></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker type="date" v-model="form.endDate" @change="dateEndChange" class='control-width'></el-date-picker>
          </el-form-item>
          <el-form-item label="子公司" :label-width="labelWidth" prop="orgCode">
            <el-select ref="org"  clearable filterable default-first-option  v-model="form.orgCode"  class='control-width'>
              <el-option v-for="item in deptList.deptmentList"
              :key="item.value"
              :label="item.text"
              :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getList">搜索</el-button>
            <el-button type="primary" @click="expExcel('tableId')">导出Excel</el-button>
          </el-form-item>
        </el-form>
      </form-box>
    </el-col>
    </ToolBarBox>
    <TableBox>
    <!--列表-->
    <el-col>
      <el-table id="tableId" ref="table" :max-height="tableMaxHeight+100" border highlight-current-row :data="orderStatisticsList" stripe style="width: 100%">
        <el-table-column prop="HARBOR_NAME" label="港口"  class-name="cell-group-9" min-width="30" fixed></el-table-column>

        <el-table-column
          class-name="cell-group-9"
          label="泛亚电商(柜)"
          width="80">
          <el-table-column
            class-name="cell-group-9"
            label="进口"
            width="40">
          <el-table-column prop="FJ20GP" label="20GP"    min-width="25"></el-table-column>
          <el-table-column prop="FJ40HQ" label="40HQ"   min-width="25"></el-table-column>
          </el-table-column>

          <el-table-column
            class-name="cell-group-9"
            label="出口"
            width="40">
          <el-table-column prop="FC20GP" label="20GP" class-name="cell-group-9" min-width="25"></el-table-column>
          <el-table-column prop="FC40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>
        </el-table-column>


        <el-table-column
          class-name="cell-group-9"
          label="中远海线下(柜)"
          width="80">
          <el-table-column
            class-name="cell-group-9"
            label="进口"
            width="40">
            <el-table-column prop="ZYHJ20GP" label="20GP"  class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="ZYHJ40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>

          <el-table-column
            class-name="cell-group-9"
            label="出口"
            width="40">
            <el-table-column prop="ZYHC20GP" label="20GP" class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="ZYHC40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>
        </el-table-column>



        <el-table-column
          class-name="cell-group-9"
          label="安通(柜)"
          width="80">
          <el-table-column
            class-name="cell-group-9"
            label="进口"
            width="40">
          <el-table-column prop="AJ20GP" label="20GP" class-name="cell-group-9" min-width="25"></el-table-column>
          <el-table-column prop="AJ40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>

          <el-table-column
            class-name="cell-group-9"
            label="出口"
            width="40">
          <el-table-column prop="AC20GP" label="20GP" class-name="cell-group-9" min-width="25"></el-table-column>
          <el-table-column prop="AC40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>
        </el-table-column>


        <el-table-column
          class-name="cell-group-9"
          label="中良(柜)"
          width="80">
          <el-table-column
            class-name="cell-group-9"
            label="进口"
            width="40">
            <el-table-column prop="ZLJ20GP" label="20GP"  class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="ZLJ40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>

          <el-table-column
            class-name="cell-group-9"
            label="出口"
            width="40">
            <el-table-column prop="ZLC20GP" label="20GP" class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="ZLC40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>
        </el-table-column>


        <el-table-column
          class-name="cell-group-9"
          label="外运(柜)"
          width="80">
          <el-table-column
            class-name="cell-group-9"
            label="进口"
            width="40">
            <el-table-column prop="WYJ20GP" label="20GP"  class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="WYJ40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>

          <el-table-column
            class-name="cell-group-9"
            label="出口"
            width="40">
            <el-table-column prop="WYC20GP" label="20GP" class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="WYC40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>
        </el-table-column>


        <el-table-column
          class-name="cell-group-9"
          label="货代(柜)"
          width="80">
          <el-table-column
            class-name="cell-group-9"
            label="进口"
            width="40">
            <el-table-column prop="HDJ20GP" label="20GP"  class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="HDJ40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>

          <el-table-column
            class-name="cell-group-9"
            label="出口"
            width="40">
            <el-table-column prop="HDC20GP" label="20GP" class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="HDC40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>
        </el-table-column>


        <el-table-column
          class-name="cell-group-9"
          label="其他(柜)"
          width="80">
          <el-table-column
            class-name="cell-group-9"
            label="进口"
            width="40">
            <el-table-column prop="OTHERJ20GP" label="20GP"  class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="OTHERJ40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>

          <el-table-column
            class-name="cell-group-9"
            label="出口"
            width="40">
            <el-table-column prop="OTHERC20GP" label="20GP" class-name="cell-group-9" min-width="25"></el-table-column>
            <el-table-column prop="OTHERC40HQ" label="40HQ" class-name="cell-group-9" min-width="25"></el-table-column>
          </el-table-column>
        </el-table-column>

         <el-table-column prop="SUM" label="总计"  class-name="cell-group-9" min-width="30"></el-table-column>

      </el-table>
    </el-col>
    </TableBox>
  </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import pagination from '../../../common/mixins/pagination';
  import util from '../../../common/js/util';

  export default {
    mixins: [pagination],
    components: {
    },
    data() {
      return {
        //form
        idTmr:null,
        labelWidth: '80px',
        form: {
          startDate: '' , // 开始日期
          endDate: '' , // 结束日期
          orgCode:''
        },
      };
    },
    computed: {
      ...mapGetters([
        'orderStatisticsList','deptList'
      ]),
    },
    methods: {
      ...mapActions([
        'getOrderStatisticsList','getDeptList'
      ]),

      getList() {
        if(this.form.startDate==null || this.form.startDate=='')
        {
          var dataTime="";
          var data = new Date();

          var year=data.getFullYear();
          var month=data.getMonth() + 1;
          var day=data.getDate();
          dataTime =year + "-"+ month + "-" + day;
          this.form.startDate=dataTime;
        }
         if(this.form.endDate==null || this.form.endDate=='')
        {
          this.form.endDate=this.form.startDate;
        }
        this.pageHandler(this.form, this.getOrderStatisticsList);
      },

      // 获取日期
      dateStartChange(val) {
        this.form.startDate = val;
      },
    // 获取日期
      dateEndChange(val) {
        this.form.endDate = val;
      },


      getExplorer() {

        var explorer = window.navigator.userAgent ;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
          return 'ie';
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
          return 'Firefox';
        }
        //Chrome
        else if(explorer.indexOf("Chrome") >= 0){
          return 'Chrome';
        }
        //Opera
        else if(explorer.indexOf("Opera") >= 0){
          return 'Opera';
        }
        //Safari
        else if(explorer.indexOf("Safari") >= 0){
          return 'Safari';
        }

      },

      expExcel(tableid) {

        if(this.getExplorer()=='ie')
        {
          var curTbl = document.getElementById(tableid);
          var oXL = new ActiveXObject("Excel.Application");
          var oWB = oXL.Workbooks.Add();
          var xlsheet = oWB.Worksheets(1);
          var sel = document.body.createTextRange();
          sel.moveToElementText(curTbl);
          sel.select();
          sel.execCommand("Copy");
          xlsheet.Paste();
          oXL.Visible = true;

          try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
          } catch (e) {
            console.log("Nested catch caught " + e);
          } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            this.idTmr = window.setInterval("this.Cleanup();", 1);
          }

        }
        else
        {
          this.tableToExcel(tableid);
        }
      },
      Cleanup() {
        window.clearInterval();
        CollectGarbage();
      },
      base64(s) { return window.btoa(unescape(encodeURIComponent(s))) },
      format(s, c){
        return s.replace(/{(\w+)}/g,
          function(m, p) { return c[p]; })
      },

       tableToExcel (table) {
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html><head><meta charset="UTF-8"></head><body><table border="1"><thead><tr><th colspan="1" rowspan="3" class="el-table_1_column_256 cell-group-9 is-leaf">{table}</table></body></html>';
          if (!table.nodeType) table = document.getElementById(table);

         var str1 = "<table";
         var str2 = "border=\"0\"";
         var reg1=eval("/"+str1+"/gi");
         var reg2=eval("/"+str2+"/gi");
         var splitStr = '<div class="cell">港口';
         var tableHtml = table.innerHTML.replace(reg1,'<table border="1"').replace(reg2,'border="1"');
         console.log(tableHtml.indexOf(splitStr));
         if(tableHtml.indexOf(splitStr)>-1) {

           tableHtml = tableHtml.substring(tableHtml.lastIndexOf(splitStr));
         }

         var ctx = {worksheet: name || 'Worksheet', table: tableHtml};
        // window.location.href = uri + this.base64(this.format(template, ctx))
         var link = document.createElement("a");
         link.href = uri + this.base64(this.format(template, ctx));
         link.style = "visibility:hidden";
         link.download =  "订单统计_"+this.form.startDate+".xls";
         document.body.appendChild(link); link.click();
         document.body.removeChild(link);

      }
  },

    mounted() {
      //this.reset();
      this.getList();
      this.getDeptList();
    },
  };

</script>
