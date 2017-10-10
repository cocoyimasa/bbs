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
        <!--<img :src=" 'headImg' | sysImg" alt="User Image" width="50" height="50">-->
        <!--<img :src=" 'headImg1' | sysImg" alt="User Image" width="50" height="50">-->
        <canvas style="display:none"></canvas>
        <div class="article-list">
            <ul>
                <li>
                    <div class="author-avatar">
                        <img :src="article.author_name | sysImg" alt="">
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
                        <div class="title-gray-line clear-fix"></div>
                        <div class="article-content">
                            {{article.article_content}}
                        </div>
                    </div>

                </li>
                <li v-for="item in comments">
                    <div class="gray-line"></div>
                    <div class="author-avatar">
                        <img :src="item.comment_author | sysImg" alt="">
                    </div>
                    <div class="article-title">
                        <div class="a-container">
                            <span class="article-name">{{item.comment_author}}</span>
                            <span class="article-time">{{item.comment_time}}</span>
                        </div>
                        <div class="article-content">
                            <div>
                                {{item.comment_content}}
                            </div>

                        </div>

                    </div>

                </li>
            </ul>
        </div>
        <div class="article-tools-panel">
            <div><button type="button" @click="replyHandler($event)" class="mg-10px">回&nbsp;&nbsp;复</button></div>
            <div><button type="button" @click="followHandler($event)" class="mg-10px">关&nbsp;&nbsp;注</button></div>
            <div class="blue-16px mg-top-30px mg-btm-10px">
                <i class="fa fa-angle-double-up" aria-hidden="true"></i> Origin Post
            </div>
            <div class="slider-wrapper">
                <div class="vertical-line"></div>
                <div class="a-slider" :style="sliderScroll"></div>
            </div>

            <div class="blue-16px"><i class="fa fa-angle-double-down" aria-hidden="true"></i> Now</div>
        </div>

    </div>
</template>

<script type="text/javascript">
    import {textToImg} from '../utils/utils.js'
    export default{
        created(){
            var aId = this.$route.params.id
            this.getArticle(aId)
            this.getComments(aId)
        },
        mounted(){
            var _this = this

            window.addEventListener('scroll',function (event) {
                //var clientHeight = document.documentElement.clientHeight
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                var scrollHeight = document.body.scrollHeight
                var top = 200 * scrollTop/scrollHeight //200为vertical-line的高度
                if(top+40<=200){
                    _this.$set(_this.sliderScroll,'top',top+'px')
                }
            })
        },

        data(){
            return{
                articles:[],
                article:{},
                sliderScroll:{
                    'left':'2px',
                    'top':'0',
                },//放在computed里不能动态改变
                comments:[],
                headImg:'',
                headImg1:'',
            }
        },
        filters: {
            sysImg: function (v) {
                if(!v) return ''
                var img = textToImg(v)
                return img
            }
        },
        computed:{

        },
        watch:{
            $route(to){
                var regex = /article\/\d+/
                if(regex.test(to.path)){ // 上次的bug：只写了to，应该是to.path
                    var aId = this.$route.params.id || 0
                    this.getArticle(aId)
                    this.getComments(aId)
                }
            },
            article:function(newVal,oldVal){

            },
        },
        methods:{
            getArticle(id){
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
            getComments(id){
                var _this = this
                this.$http.get('/api/comments/'+id).then(function (resp) {
                    var res = resp.body
                    var STATUS_OK = 0
                    if(res.errno == STATUS_OK){

                        var commentsObj = res.data
                        _this.comments = commentsObj.comments || []
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
    img{
        border-radius:25px;
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
        width: 82%;
        list-style: none;
        height:auto; /*设置高度为auto使得高度自适应*/
    }
    .article-list li::after{
        content:'\0020';
        height:0;
        display: block; /*设置成inline-block则不能清除浮动*/
        clear: both;
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
        /*text-indent: 2em;*/
        line-height: 2;
        min-height: 54px;
        padding-bottom: 30px;
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
    .article-time {
        font-weight: bold;
        color:#8596ad;
    }
    .article-title{
        float:left;
        width:75%;
    }
    .title-gray-line{
        margin-top: 20px;
        margin-bottom: 20px;
        height:1px;
        width:100%;
        background-color:#ccc;
    }
    .gray-line{
        margin-top: 20px;
        margin-bottom: 20px;
        height:1px;
        width:82%;
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
        bottom:10px;
        right:100px;
        height:422px;
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
    .slider-wrapper{
        position: relative;
        height:200px;
        width:10px;
    }
    .vertical-line{
        height:200px;
        width:1px;
        background-color: #8596ad;
        margin: 0 auto;
        box-shadow: 3px 0 3px #8596ad;
    }
    .a-slider{
        position: absolute;
        top:0;
        left:2px;
        width:6px;
        height:40px;
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
