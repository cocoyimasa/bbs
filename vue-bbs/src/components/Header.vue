<template>
    <header class="head" :class="{ 'scroll-head': isScroll }">
        <div class="wrapper">
            <ul class="left-ul">
                <li id="title"><router-link to="/">QBBS-轻论坛</router-link></li>
                <li><router-link to="/">首页</router-link></li>
                <li><router-link to="/doc">文档</router-link></li>
                <li><router-link to="/download">下载</router-link></li>
            </ul>
            <ul class="right-ul">
                <li>
                    <div class="searchbar">
                        <span><i class="fa fa-search" aria-hidden="true"></i></span>
                        <input type="text" name="search-box" id="search-box" placeholder="Search Forum">
                    </div>
                </li>
                <li @click="changeLanguage"><a href="javascript:void 0;">英语</a></li>
                <li @click="signupAction" :class="{ 's-username-avatar' : avatarShow }">
                    <a href="javascript:void 0;"><img class="user-avatar" src="../assets/logo.png" v-show="avatarShow">
                        {{signupOrUsername}}
                    </a>
                </li>
                <li @click="loginAction"><a href="javascript:void 0;">{{loginout}}</a></li>
            </ul>
        </div>
        <div class="signup" v-show="signupShow">
            <div class="shadow" @click="hideDialog()"></div>
            <div class="dialog">
                <div class="container">
                    <div class="d-title">{{signupOrUsername}}</div>
                    <div class="d-content">
                        <div class="d-text">
                            <button type="button" name="3-party" id="three-party"><i class="fa fa-github" aria-hidden="true"></i>
                                &nbsp;&nbsp;用Github账号登录</button>
                            <input v-model="username" type="text" name="username" id="username" class="m-style" placeholder="用户名">
                            <input v-model="email"    type="text" name="email" id="email" class="m-style" placeholder="邮箱">
                            <input v-model="password" type="text" name="password" id="password" class="m-style" placeholder="密码">
                            <input type="submit" @click="submitSignupData" name="signup" id="sign-up" class="m-style" value="注册">
                        </div>
                        <div class="btn-group">
                            <!--<button type="button" class="btn-cancel">取消</button>-->
                            <!--<button type="button" class="btn-ok">确定</button>-->
                            已经有账号？ <a href="javascript:void 0;" class="a-login" @click="loginAction">登录</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="login" v-show="loginShow">
            <div class="shadow" @click="hideDialog()"></div>
            <div class="dialog">
                <div class="container">
                    <div class="d-title">{{loginout}}</div>
                    <div class="d-content">
                        <div class="d-text">
                            <button type="button" name="3-party" id="login-three-party"><i class="fa fa-github" aria-hidden="true"></i>
                                &nbsp;&nbsp;用Github账号登录</button>
                            <input v-model="loginUsername" type="text" name="username" id="login-username" class="m-style" placeholder="用户名">
                            <input v-model="loginEmail"    type="text" name="email" id="login-email" class="m-style" placeholder="邮箱">
                            <input v-model="loginPassword" type="text" name="password" id="login-password" class="m-style" placeholder="密码">
                            <input type="submit" @click="submitLoginData" name="login" id="login-sign-up" class="m-style" value="登录">
                        </div>
                        <div class="btn-group">
                            还没有有账号？ <a href="javascript:void 0;" class="a-login" @click="signupAction">注册</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script type="text/javascript">
    import Signup from '@/components/Signup.vue'
    import {hex_md5} from '../utils/md5.js'
    export default {
        name: 'head',
        mounted(){
            var _this = this
            window.addEventListener('scroll',function () {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop > 55) {
                    _this.isScroll = true
                }
                else{
                    _this.isScroll = false
                }
            },false)
        },
        data () {
            return {
                isScroll:false,
                avatarShow:false,
                signupOrUsername:'注册',
                loginout:'登录',
                signupShow:false,
                loginShow:false,
                username:'',
                email:'',
                password:'',
                loginUsername:'',
                loginEmail:'',
                loginPassword:'',
            }
        },
        computed:{

        },
        methods:{
            resetLoginAndSignup(){
                this.signupOrUsername = '注册'
                this.loginout = '登录'
                this.avatarShow = false
                localStorage.removeItem('username')
            },
            changeLanguage(){
                alert('暂不支持切换语言')
            },
            signupAction(){
                this.signupShow = !this.signupShow
                this.loginShow = false
            },
            loginAction(){
                if(this.loginout == '登录'){
                    this.loginShow = !this.loginShow
                    this.signupShow = false
                }
                else if(this.loginout == '退出'){
                    var res = confirm('是否退出？')
                    if(res){
                        this.resetLoginAndSignup()
                    }
                }
            },
            hideDialog(){
                this.signupShow = false
                this.loginShow = false
            },
            submitLoginData(){
                var _this = this
                //--todo 数据校验和过滤
                var pwd = hex_md5(this.loginPassword)
                var userInfo = {
                    username:_this.loginUsername,
                    email:_this.loginEmail,
                    password:pwd,
                }
                this.$http.post('/api/login',userInfo).then(function (resp) {
                    var res = resp.body
                    var STATUS_OK = 0
                    if(res.errno == STATUS_OK){
                        var data = res.data
                        this.signupOrUsername = userInfo.username
                        this.loginout = '退出'
                        this.loginShow = !this.loginShow
                        this.avatarShow = true
                        localStorage.setItem('username',userInfo.username)
                        alert(data)
                    }
                }.bind(this))
            },
            submitSignupData(){
                var _this = this
                //--todo 数据校验和过滤
                var pwd = hex_md5(this.password)
                var userInfo = {
                    username:_this.username,
                    email:_this.email,
                    password:pwd,
                }
                this.$http.post('/api/signup',userInfo).then(function (resp) {
                    var res = resp.body
                    var STATUS_OK = 0
                    if(res.errno == STATUS_OK){
                        var data = res.data
                        this.signupOrUsername = userInfo.username
                        this.loginout = '退出'
                        this.signupShow = !this.signupShow
                        this.avatarShow = true
                        localStorage.setItem('username',userInfo.username)
                        alert(data)
                    }
                }.bind(this))
            },
        },
        components:{
            'v-signup' :Signup
        }

    }
</script>

<style>
    .head{
        width:100%;
        margin:0 auto;
        height:55px;
        color: #667c99;
        font-weight: bold;
        font-size: 12px;
        position: fixed;
        top:0;
        left:0;
        background-color: #fff;
    }
    .scroll-head{
        box-shadow: 0px 1px 6px 3px #999;
    }
    .head ul{
        margin-top: 17px;
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
    }
    .wrapper{
        margin-left: 8.5%;
        margin-right: 8.5%;
    }
    #title{
        font-size: 20px;
        text-decoration: none;
        font-weight: bold;
        margin-top: -4px;
        color:#426799;
    }
    .left-ul{
        float:left;
    }
    .head li{
        float:left;
        list-style: none;
    }
    .head li a{
        text-decoration: none;
        color: #667c99;
    }
    .left-ul li{
        margin-right:27px;
    }
    .right-ul{
        float:right;
    }
    .right-ul li{
        margin-left:27px;
    }
    .head::after{
        content: ' ';
        height:0;
        display: block;/*3 key points -- content height display block*/
        clear: both;
    }
    .searchbar{
        width:225px;
        height:35px;
        background-color: #e8ecf3;
        margin-top:-7px;
    }

    .searchbar span{
        margin-left:10px;
        margin-top: 8px;
    }

    #search-box{
        display: inline-block;
        border:0;
        background-color: #e8ecf3;
        height:35px;
        width:193px;
        outline:0;
        font-size: 14px;
        color: #667c99;
    }

    input::-webkit-input-placeholder {
        color: #667c99;
    }
    .s-username-avatar:hover{
        background-color: #ccc;
    }
    .user-avatar{
        width:14px;
        height:14px;
    }
    .hide{
        display:none;
    }
    .shadow {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #5c7598;
        opacity: 0.2;
        filter: alpha(opacity=20);
        width: 100%;
        height: 1500px;
    }

    .dialog {
        width: 375px;
        height: 488px;
        font-size: 12px;
        box-sizing: border-box;
        z-index: 10;
        position: fixed;
        top: 40%;
        left: 50%;
        margin-top: -125px;
        margin-left: -188px;
    }
    .container{
        width: 100%;
        height: 100%;
        border-radius:5px;
        overflow: hidden;
    }
    .d-title {
        box-sizing: border-box;
        height: 16%;
        width: 100%;
        background-color: #fff;
        text-align: center;
        font-size: 24px;
        /*color: #cccccc;*/
        padding-top: 20px;
    }

    .d-title:hover {
        cursor: move;
    }

    .d-content {
        width: 100%;
        height: 84%;
        background-color: #ffffff;
        text-align: center;
    }

    .d-text {
        height: 84%;
        padding: 22px 9px 9px 9px;
        box-sizing: border-box;
        background-color: #e8ecf3;
    }

    .btn-group {
        width: 100%;
        height: 16%;
        overflow: hidden;
        box-sizing: border-box;
        padding: 20px 9px 9px 9px;
        text-align: center;
        font-family: "黑体";
        font-size: 12px;
        font-weight: bold;
        color:#667c99;
    }

    .btn-group>button {
        float: right;
        background-color: #666;
        color: white;
        border: 1px solid #3b3b3b;
        width: 24%;
        height: 20px;
        font-family: "黑体";
        font-size: 12px;
    }

    .btn-cancel {}

    .btn-ok {
        margin-right: 9px;
    }

    .toggle-dialog {
        margin-left: 40px;
        background-color: #eee;
        width: 150px;
        height: 40px;
        border: 1px solid #aaa;
    }

    /*form*/
    .m-style{
        display: inline-block;
        border:0;
        background-color: white;
        border-radius: 5px;
        height:45px;
        width:319px;
        outline:0;
        font-size: 14px;
        color: #667c99;
        text-align: center;
    }
    .d-content input{
        margin-bottom: 14px;
    }
    #three-party{
        margin-top: 10px;
        background-color: #cccccc;
        width:220px;
        height:35px;
        margin-bottom: 32px;
        color:black;
        outline:0;
        border:0;
        font-size: 14px;
        border-radius:3px;
    }
    #login-three-party{
        margin-top: 10px;
        background-color: #cccccc;
        width:220px;
        height:35px;
        margin-bottom: 32px;
        color:black;
        outline:0;
        border:0;
        font-size: 14px;
        border-radius:3px;
    }
    .a-login{
        color:#426799;
        text-decoration: none;
    }
</style>
