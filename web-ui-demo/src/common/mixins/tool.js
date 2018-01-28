import util from './../js/util'
export default {
  data() {
    return {
      lazySwitch: false
    }
  },

  updated() {
    this.lazySwitchHanlde()
  },
  destroyed() {
    this.$destroy();
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    lazySwitchHanlde() {
      this.$nextTick(function() {
        //this.lazySwitch = true
        setTimeout(() => this.lazySwitch = true, 100);
      })
    },
    emptyObject(obj) {
      let val = null;
      if (typeof(obj) === "object") {
        if (Array.isArray(obj)) {
          val = [];

        } else {
          val = {};
          for (let key in obj) {
            val[key] = ""
          }
        }
      } else {
        val = "";
      }
      return val
    },
    stringToArr(val,split) {
      if (val == null) val = ''
      var arr = ['', ''];
  		if(split == undefined){
  			split = ','
  		}
      if (!val || val == "") {
        arr.push("")
      } else if (val.indexOf(split) != -1) {
        arr[0] = val.split(split)[0]
        arr[1] = val.split(split)[1]
      } else {
        arr[0] = val
      }
      return arr
    },
    strToArr(value) {
      if (value === "" || value === null) {
        return []
      }
      let arr = value.split(',');
      return arr
    },
    dateFormatHandle(value, format) {

      let result = '';
      if (format != undefined) {
        result = (typeof(value) == "string" ? value : util.formatDate.format(value, format));
      } else {
        result = (typeof(value) == "string" ? value : util.formatDate.format(value, 'yyyy-MM-dd'));
      }
      return result;

    }
  },
}
