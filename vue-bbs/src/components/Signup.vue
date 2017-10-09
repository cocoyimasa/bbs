<template>
    <div class="signup" v-show="show">
        <div class="shadow" @click="hideDialog()"></div>
        <div class="dialog">
            <div class="container">
                <div class="d-title">注册</div>
                <div class="d-content">
                    <div class="d-text">
                        <button type="button" name="3-party" id="three-party"><i class="fa fa-github" aria-hidden="true"></i>
                            &nbsp;&nbsp;用Github账号登录</button>
                        <input type="text" name="username" id="username" class="m-style" placeholder="用户名">
                        <input type="text" name="email" id="email" class="m-style" placeholder="邮箱">
                        <input type="text" name="password" id="password" class="m-style" placeholder="密码">
                        <input type="text" name="sign-up" id="sign-up" class="m-style" placeholder="注册">
                    </div>
                    <div class="btn-group">
                        <!--<button type="button" class="btn-cancel">取消</button>-->
                        <!--<button type="button" class="btn-ok">确定</button>-->
                        已经有账号？ <a href="" class="a-login">登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default{
        name:'signup',
        data(){
            return {
                show:true
            }
        },
//        props:['signupShow'],
        methods:{
            hideDialog(){
                this.show = !this.show
            }
        }
    }
</script>

<style>
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
    .a-login{
        color:#426799;
        text-decoration: none;
    }
</style>
