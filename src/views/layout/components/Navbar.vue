<template >
  <el-menu class="navbar" mode="horizontal">
    

   <div class="logo-title"><img :src="Logo" class="logo">凌宝智能后台管理系统</div>

    <div class="right-menu">

      <el-badge  class="item" :value="list" :max="99" >
        <router-link :to="{ path: '/alarmrecord/' }" >
          <svg-icon class-name='msg-icon' icon-class="message" />
        </router-link>
      </el-badge>


      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon class-name='msg-icon' icon-class="user" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import Logo from '@/assets/logo.png'

import { fetchChecked, updateChecked} from '@/api/article'




export default {
  data() {
    return {
      Logo,
      listQuery: {
        key:'test'
      },
      checked:{
        key:1
      },
      list: 0,
      websock: null,
    }
  },
  watch:{
    $route(to,form) {
        if (to.name =="alarmrecord") {
          this.list=0
        }
        if(form.name =="alarmrecord"){
          console.log('更新开始')
          this.upChecked()
        }
    }
    
  },
  created() {
    this.getList()
    this.initWebSocket()
  },
  methods: {
    threadPoxi(){  
        //参数
        const agentData = {
              "type": "reg",
              "value": "test"
        }
        //若是ws开启状态
        if (this.websock.readyState === this.websock.OPEN) {
            this.websocketsend(agentData)
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.websock.readyState === this.websock.CONNECTING) {
            let that = this;//保存当前对象this
            setTimeout(function () {
                that.websocketsend(agentData)
            }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
            this.initWebSocket();
            let that = this;//保存当前对象this
            setTimeout(function () {
                that.websocketsend(agentData)
            }, 500);
        }
    },
    initWebSocket(){ //初始化weosocket
        //ws地址
        const wsuri = 'ws://192.168.0.114:8080/lingbao/alarm';
        console.log(wsuri);
        this.websock = new WebSocket(wsuri);
        this.websock.onopen = this.websocketonopen;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
    },
    load(){
      this.$store.dispatch('Add')
    },
    websocketonopen(e){
      this.threadPoxi()
    },
    websocketonmessage(e){ //数据接收
        if(e.data=='1'){
          this.list++
          this.load()
        }
    },
    websocketsend(agentData){//数据发送
        this.websock.send(JSON.stringify(agentData));
    },
    websocketclose(e){  //关闭
       this.$notify({
          title: '提示',
          message: 'webSocket与服务器断开'
        });
    },
    getList() {
      fetchChecked(JSON.stringify(this.listQuery)).then(response => {
        console.log(response.data)
        this.list = response.data.data
      })
    },
    upChecked() {
      updateChecked(JSON.stringify(this.checked)).then(response => {
        console.log('更新成功');
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
    // generateTitle
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 86px;
  border-radius: 0px !important;
  background-color: #445576;
  position:fixed;
  left: 0;
  right: 0;
  z-index: 2;
  .hamburger-container {
    line-height: 86px;
    height: 86px;
    float: left;
    padding: 0 10px;
  }
  .logo-title{
    float: left;
    margin:0;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 86px;
  }
  .msg-icon{
    color: #ffffff;
    width: 2em;
    height: 2em;
  }
  .logo{
    padding-left: 30px;
    padding-right: 20px;
    vertical-align: middle;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      // margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .el-badge{
      vertical-align: top;
      margin-top:25px;
    }
    .avatar-container {
      padding: 0px 20px;
      padding-top: 26px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
