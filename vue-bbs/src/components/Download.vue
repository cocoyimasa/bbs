<template>
    <div class="download">
        <button type="button" @click="downloadSource" class="btn-download" >
            <!--<a href="/api/source_code" download="">下载源码</a>-->
            <a href="https://github.com/cocoyimasa/js-js/archive/v1.0.0.zip" download="">下载源码</a>
        </button>

        <div class="code-version">
            {{ codeVersion }}
        </div>
        <div class="downloading" v-show="downloadingShow">
            {{ downloadingText }}
        </div>
    </div>
</template>

<script type="text/javascript">
    export default{
        name:'download',
        data(){
            return {
                downloadingShow:false,
                downloadingText:'下载即将开始...',
                codeVersion:'v1.0.0',
            }
        },
        methods:{
            downloadSource() {
                this.downloadingShow = true
            },
        },

    }
</script>

<style>
    .download{
        width:100%;
        text-align: center;
        height:548px;
        border-top:1px solid #e8ecf3;
    }
    .downloading{
        font-size: 14px;
        color:#4d698e;
    }
    .code-version{
        font-size: 18px;
        color:#4d698e;
    }
    .btn-download{
        margin: 155px auto 10px;
        outline:0;
        border:0;
        background-color:#4d698e;
        width:200px;
        height:60px;
        color:white;
        font-size: 18px;
        border-radius:3px;
        font-weight: bold;
    }
    .btn-download a{
        text-decoration: none;
        color:white;
    }
</style>
