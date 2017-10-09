<template>
    <div id="article">
        <div class="welcome">
            <div class="welcome-text">
                <h2>
                    <span class="article-tags">
                        <span class="article-tag"><i class="fa fa-thumb-tack" aria-hidden="true"></i></span>
                        <span class="article-tag tag-help">{{article.tag1}}</span>
                        <span class="article-tag tag-about">{{article.tag2}}</span>
                    </span>
                </h2>
                <div class="article-name-welcome"><h1>{{article.article_name}}</h1></div>
            </div>
        </div>
        <div class="article-list">
            <ul>
                <li>
                    <div class="author-avatar">
                        <img src="../assets/logo.png" alt="">
                    </div>
                    <div class="article-title">
                        <div class="a-container">
                            <div class="article-name"><h1>{{article.article_name}}</h1></div>
                            <div class="article-time">replied {{article.article_time}} hours ago</div>
                        </div>
                        <!--<div class="r-container">-->

                        <!--<span data-v="comment">-->
                        <!--<i class="fa fa-comment-o" aria-hidden="true"></i>&nbsp;&nbsp;{{article.comment_num}}-->
                        <!--</span>-->
                        <!--</div>-->
                        <div class="gray-line"></div>
                        <div class="article-content">
                            {{article.article_content}}
                    </div>
                    </div>
                    <div class="clear-fix"></div>
                </li>
            </ul>
        </div>
        <div class="article-tools-panel">
            <div><button type="button" @click="replyHandler($event)" class="mg-10px">回&nbsp;&nbsp;复</button></div>
            <div><button type="button" @click="followHandler($event)" class="mg-10px">关&nbsp;&nbsp;注</button></div>
            <div class="blue-16px mg-top-30px mg-btm-10px"><i class="fa fa-angle-double-up" aria-hidden="true"></i> Origin Post</div>
            <div class="vertical-line"></div>
            <div class="blue-16px mg-top-10px"><i class="fa fa-angle-double-down" aria-hidden="true"></i> Now</div>
        </div>

    </div>
</template>

<script type="text/javascript">
    export default{
        created(){

        },
        mounted(){
            var aId = this.$route.params.id
            this.getArticleAndComment(aId)
        },

        data(){
            return{
                articles:[],
                article:{},
            }
        },
        watch:{
            $route(to){
                var regex = /article\/\d+/
                if(regex.test(to.path)){ // 上次的bug：只写了to，应该是to.path
                    var aId = this.$route.params.id || 0
                    this.getArticleAndComment(aId)
                }
            },
            article:function(newVal,oldVal){

            }
        },
        methods:{
            getArticleAndComment(id){
                var _this = this
                this.$http.get('/api/articles').then(function (resp) {
                    var res = resp.body
                    var STATUS_OK = 0
                    if(res.errno == STATUS_OK){

                        _this.articles = res.data
                        var keys = Object.keys(_this.articles)
                        _this.article = _this.articles[keys[id]]
                    }
                })

            },
            replyHandler(event){

            },
            followHandler(event){

            },
        }
    }

</script>

<style scoped="">
    .clear-fix{
        clear:both;
    }

    #article{
        position: absolute;
        left:0;
        top:55px;
        width:100%;
        background-color: #fff;
        min-height: 100%;
        font-family: -apple-system, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }
    .welcome{
        background-color: rgb(254, 181, 77);
        width:100%;
        margin:0 auto;
        height:155px;
        color: #667c99;
        text-align: center;
    }

    .welcome-text{
        margin:0 auto;
        width: 50%;
        padding-top: 42px;
    }
    .article-list{
        margin-top: 30px;
        float: left;
        width: 82%;
        font-size: 16px;
        margin-left: 105px;
    }
    .article-list li{
        list-style: none;
        height:125px;
    }
    a {
        text-decoration: none;
    }

    #select-input option {
        text-align: center;
    }
    .author-avatar{
        float:left;
        width:60px;
        height:120px;
        overflow: hidden;
    }
    .author-avatar img{
        height:50px;
        width:50px;
    }
    .article-content {
        text-indent: 2em;
        line-height: 2;
        min-height: 54px;
    }

    .article-name-welcome{
        font-weight: bold;
        color:white;
        margin-top: 20px;
    }
    .article-name {
        font-weight: bold;
        color:black;
    }
    .article-title{
        float:left;
        width:75%;
    }
    .gray-line{
        margin-top: 20px;
        margin-bottom: 20px;
        height:2px;
        width:520px;
        background-color:#ccc;
    }
    .a-container {
        display: inline-block;
    }

    .r-container {
        float: right;
        padding-top: 20px;
    }

    .article-tags {
        display: inline-block;
    }

    .article-tag {
        background-color: #feb54d;
        display: inline-block;
        padding-left: 5px;
        padding-right: 5px;
        color:white;
    }

    .tag-help {
        border-radius: 4px 0 0 4px;
    }

    .tag-about {
        padding-top: 1px;
        border-radius: 0 4px 4px 0;
        background-color: white;
        color:rgb(254, 181, 77);
    }
    .article-tools-panel{
        position: fixed;
        bottom:40px;
        right:100px;
        height:472px;
    }
    #article button{
        outline:0;
        border:0;
        background-color:#4d698e;
        width:150px;
        height:35px;
        color:white;
        font-size: 14px;
        border-radius:3px;
        font-weight: bold;
    }
    .mg-10px{
        margin-top: 10px;
    }
    .vertical-line{
        height:300px;
        width:2px;
        background-color: #4d698e;
    }
    .mg-top-30px{
        margin-top:30px;
    }
    .mg-btm-10px{
        margin-bottom:10px;
    }
    .mg-top-10px{
        margin-top:10px;
    }
    .blue-16px{
        font-size:14px;
        color: #4d698e;
    }
</style>
