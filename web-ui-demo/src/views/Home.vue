<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <img v-if="!collapsed" src="../assets/logo.png" />
      </el-col>
      <el-col :span="1" >
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="17" class="tabs-wrapper">
          <el-tabs v-if="activeName!='/' && routerHistory.length != 0"  v-model="activeName" type="card" closable @tab-click="handleTabClick" @tab-remove="removeTab">
            <el-tab-pane
            v-for="item in routerHistory"
            :key="item.name"
            :label="item.name"
            :name="item.path"
            ></el-tab-pane>
           </el-tabs>
      </el-col>
      <el-col :span="2" class="userinfo">
        <el-dropdown trigger="hover" style="width: 100px; position: relative; right: 20px;">
          <span class="el-dropdown-link userinfo-inner">
            <!--<img :src="this.sysUserAvatar"></img>-->
            {{sysUserName}}
            <img src="../assets/defaultUserAvatar.png" alt="" style="width: 20px;height: 20px;border-radius: 20px;margin: 0px 0px -4px 0px;float: none;">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu open el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router v-show="!collapsed" ref="menu" >
          <template v-for="(item,index) in filted_menus">
            <el-submenu :index="index+''" v-if="!item.leaf" ref="submenu">
              <template slot="title" >
                <i :class="item.iconCls"></i>{{item.name}}
                </template>
              <!-- <el-menu-item
               @click="selectMenu(child.path)"
                v-for="child in item.children" :index="child.path" :key="child.path" >{{child.name}}</el-menu-item> -->
                <div v-for="child in item.children">
                <el-menu-item v-if="!child.children"
                 :index="child.path" :key="child.path" >
                <div :class="{'el-menu-item-inner':child.hasBottomLine}">
                   {{child.name}}
                </div>
                <div :class="{'bottom-line':child.hasBottomLine}"></div>

                </el-menu-item>
              <el-submenu   v-if="child.children" :index="child.path" unique-opened="true"  collapse="true" >
                <template slot="title" >
                  {{child.name}}
                </template>
                <el-menu-item
                  v-for="three_child in child.children" :index="three_child.path" :key="three_child.path" >
                    {{three_child.name}}
                </el-menu-item>
              </el-submenu>
                </div>
            </el-submenu>


            <!--<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
                              <i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>-->
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu  collapsed" v-show="collapsed" ref="menuCollapsed">
          <template v-for="(item,index) in filted_menus" class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 20px; height:42px;line-height:42px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <i :class="item.iconCls"></i>
              </div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''"  @click="selectMenuItem(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
                  <i :class="item.iconCls"></i>
                </div>
              </li>
            </template>
          </template>
        </ul>
      </aside>
      <section class="content-container" id="content-container">
        <div class="grid-content bg-purple-light">
          <!--<el-col :span="24" class="breadcrumb-container">
                              <strong class="title">{{$route.name}}</strong>
                              <el-breadcrumb separator="/" class="breadcrumb-inner">
                                  <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                      {{ item.name }}
                                  </el-breadcrumb-item>
                              </el-breadcrumb>
                          </el-col>-->
          <el-col :span="24" class="content-wrapper" ref="content-wrapper">
             <!-- <el-tabs v-if="activeName!='/' && routerHistory.length != 0"  v-model="activeName" type="card" closable @tab-click="handleTabClick" @tab-remove="removeTab">
                         <el-tab-pane
                         v-for="item in routerHistory"
                         :key="item.name"
                         :label="item.name"
                         :name="item.path"
                         ></el-tab-pane>
                        </el-tabs> -->
            <transition name="fade" mode="out-in" >
                <keep-alive>
                <router-view ></router-view>
              </keep-alive>

            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex';
  import generateColors from '../common/themes/color';
  import index from 'element-ui/lib/theme-default/index.css';
  import router from '../router'
  export default {
    data() {
      return {
        componentName:'Home',
        colors: {
          primary: '#0080c0'
        },
        activeName:"",
        originalStylesheetCount: -1,
        originalStyle: '',
        styleFiles: [],
        fontFiles: ['element-icons.eot', 'element-icons.svg', 'element-icons.ttf', 'element-icons.woff'],
        fonts: [],

        sysName: '运柜宝后台管理系统',
        collapsed: false,
        sysUserName: '',
        sysUserAvatar: '',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
        permissions: [],
        menus: [],
        routerHistory:[]
      };
    },
    computed: {
      ...mapGetters('user', [
        'GET_PERMISSIONS',
        'GET_MENUS',
      ]),
      filted_menus() {
        // 处理主菜单
        let menus = this.$router.options.routes.filter((mainMenu) => {
          if (mainMenu.hidden) {
            return false;
          }
          if (mainMenu.bypass) {
            return true;
          }
          const menuPermission = this.menus && this.menus.find(_menu => parseInt(_menu.id, 10) === mainMenu.id);
          return (menuPermission && menuPermission.data.length > 0);
        });
        // 管理员账户, 显示全部菜单
        // 处理分菜单
        menus=this.getMainMenu(menus)
        return menus;
      }
    },
    methods: {
      handleTabClick(tab){
        this.$router.push(tab.name);
      },
      getMainMenu(menus){
        let s= new Array()
        menus.forEach((mainMenu) => {
          if(mainMenu.children){
              let menuArr= new Array();
              mainMenu.children.forEach((children) => {
                    if(children.children){
                        let threeChildren =  this.getMainMenu(children.children)
                      if(threeChildren.length){
                        children.children=threeChildren
                        menuArr.push(children);
                      }
                    }else if(this.isSubMenus(children)){
                      menuArr.push(children);
                    }
              })
            mainMenu.children=menuArr
            s.push(mainMenu)
          }else{
              if(this.isSubMenus(mainMenu)){
                s.push(mainMenu)
              }
          }
        });
        return s


        },
      isSubMenus(subMenu){
        if (subMenu.hidden) {
          return false;
        }
        if ('*' in this.permissions) {
          return true;
        }
        if (subMenu.bypass) {
          return true;
        }else if(subMenu.children){
          subMenu.children.filter(this.getMenu)
          return true;
        }
        return subMenu.path in this.permissions;
      },
      removeTab(targetName) {
        let tabs = this.routerHistory;
        let activeName = this.activeName;
        if(activeName == targetName){
            tabs.forEach((tab, index) => {
              if (tab.path === targetName) {
                let nextTab = tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.path;
                }
              }
            });
        }
        this.routerHistory = tabs.filter(tab => tab.path !== targetName);
         if(this.routerHistory.length ==0){
           activeName="/"
         }
        this.activeName = activeName;

        this.$router.push(activeName);

//        this.$refs.menu.$destroy();
//        this.$refs.menuCollapsed.$destroy();
      },

      onSubmit() {

      },
      handleopen() {

      },
      handleclose() {

      },
      handleselect(a, b) {
      },
      selectMenuItem(path){
        this.$router.push(path)
      },
      // 退出登录
      logout() {
        this.$confirm('确认退出吗?', '提示', {
          // type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
        }).catch(() => {

        });
      },
      // 折叠导航栏
      collapse() {
        this.collapsed = !this.collapsed;
        document.getElementsByClassName('el-menu-vertical-demo')[0].style.width = '100%'
        document.getElementsByClassName('el-menu-vertical-demo')[0].style.overflow = 'auto'
      },
      showMenu(i, status) {
        this.$refs.menuCollapsed.getElementsByClassName(`submenu-hook-${i}`)[0].style.display = status ? 'block' : 'none';
      },





      // 切换主题 start
    changeThemes() {
          this.primaryColor = this.colors.primary;
          this.colors = Object.assign({}, this.colors, generateColors(this.colors.primary));
          this.writeNewStyle();

    },
      writeNewStyle() {
          let cssText = this.originalStyle;
          Object.keys(this.colors).forEach(key => {
            cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key]);
          });

          if (this.originalStylesheetCount === document.styleSheets.length) {
            const style = document.createElement('style');
            style.innerText = cssText;
            let styleList = document.getElementsByTagName('style');
            document.head.insertBefore(style,styleList[1]);
            document.getElementsByClassName('header')[0].style.backgroundColor=this.colors.primary
          } else {
            document.head.lastChild.innerText = cssText;
          }
        },
      getStyleTemplate(data) {
      const colorMap = {
        '#20a0ff': 'primary',
        '#0190fe': 'secondary',
        '#fbfdff': 'darkWhite',
        '#1f2d3d': 'baseBlack',
        '#324157': 'lightBlack',
        '#48576a': 'extraLightBlack',
        '#8391a5': 'baseSilver',
        '#97a8be': 'lightSilver',
        '#bfcbd9': 'extraLightSilver',
        '#d1dbe5': 'baseGray',
        '#e4e8f1': 'lightGray',
        '#eef1f6': 'extraLightGray',
        '#1d90e6': 'buttonActive',
        '#4db3ff': 'buttonHover',
        '#dfe6ec': 'tableBorder',
        '#d2ecff': 'datepickerInRange',
        '#afddff': 'datepickerInRangeHover',
        '#1c8de0': 'selectOptionSelected',
        '#edf7ff': 'lightBackground'
      };
      Object.keys(colorMap).forEach(key => {
        const value = colorMap[key];
        data = data.replace(new RegExp(key, 'ig'), value);
      });
      return data;
    },

    getFile(url, isBlob = false) {
      return new Promise((resolve, reject) => {
        const client = new XMLHttpRequest();
        client.responseType = isBlob ? 'blob' : '';
        client.onreadystatechange = () => {
          if (client.readyState !== 4) {
            return;
          }
          if (client.status === 200) {
            const urlArr = client.responseURL.split('/');
            resolve({
              data: client.response,
              url: urlArr[urlArr.length - 1]
            });
          } else {
            reject(new Error(client.statusText));
          }
        };
        client.open('GET', url);
        client.send();
      });
    },

    getIndexStyle() {
      this.getFile('//unpkg.com/element-ui/lib/theme-default/index.css')
        .then(({ data }) => {
          this.originalStyle = this.getStyleTemplate(data);
        });
    },

    getSeparatedStyles() {
      this.getFile('//unpkg.com/element-ui/lib/theme-default')
        .then(({ data }) => {
          return data.match(/href="[\w-]+\.css"/g).map(str => str.split('"')[1]);
        })
        .then(styleFiles => {
          return Promise.all(styleFiles.map(file => {
            return this.getFile(`//unpkg.com/element-ui/lib/theme-default/${ file }`);
          }));
        })
        .then(files => {
          this.styleFiles = files.map(file => {
            return {
              name: file.url,
              data: this.getStyleTemplate(file.data)
            };
          });
        });
    },

    getFontFiles() {
      Promise.all(this.fontFiles.map(font => {
        return this.getFile(`//unpkg.com/element-ui/lib/theme-default/fonts/${ font }`, true);
      }))
        .then(fonts => {
          this.fonts = fonts;
        });
    }
  },
      //切换主题 end

      watch: {
      '$route' (to, from) {
        if(to.path  !="/"){
          this.activeName = to.path;
          if(this.routerHistory.every(element => element.name != to.name)){
           this.routerHistory.push({name:to.name,path:to.path})
         }else{
         	let index = this.routerHistory.findIndex((element)=>{ return element.name == to.name})
         	this.routerHistory[index].path = to.path;
         }

      }
      }
    },
    created() {

      //this.getIndexStyle();
      //this.getSeparatedStyles();
      //this.getFontFiles();
    },
    mounted() {
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      } else {
        this.$router.push('/login');
      }
      const permissions = JSON.parse(sessionStorage.getItem('permissions'));
      const menus = JSON.parse(sessionStorage.getItem('menus'));
      this.permissions = permissions;
      this.menus = menus;

       this.$nextTick(_ => {
        this.originalStylesheetCount = document.styleSheets.length;
      });


       //tab菜单默认选中

       let currentRoute = this.$router.history.current;
        if(currentRoute.path != "/"){
          this.routerHistory.push({name:currentRoute.name,path:currentRoute.path})
          this.activeName = currentRoute.path;
        }
    },
    beforeDestroy(){

//      this.$refs.submenu && this.$refs.submenu.$destroy();
//        this.$refs.menu.$destroy();

    }
  };

</script>


