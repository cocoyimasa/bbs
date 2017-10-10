<template>
    <div class="discussion">
        <div class="dis-title">
            <select name="select-input" id="select-input">
                <option v-for="sel in selects" value="sel">{{sel}}</option>
            </select>
            <button type="button" class="btn-refresh"><i class="fa fa-refresh" aria-hidden="true"></i></button>
        </div>
        <router-view></router-view>
        <canvas style="display:none"></canvas>
        <div class="discussion-list">
            <ul>
                <li>
                    <div class="author-avatar">
                        <img src="../assets/firefox.jpg" alt="">
                    </div>
                    <router-link to="/article/0">
                        <div class="article-title">
                        <div class="a-container">
                            <div class="article-name">【人工置顶】新人必看，注意事项以及 FAQ</div>
                            <div class="article-time">replied 4 hours ago</div>
                        </div>
                        <div class="r-container">
                            <span class="article-tags">
                                <span class="article-tag tag-help">求助</span><span
                                class="article-tag tag-about">开发</span>
                            </span>
                            <span>
                            <i class="fa fa-comment-o" aria-hidden="true"></i>&nbsp;&nbsp;45
                            </span>
                        </div>
                        </div>
                        <div class="article-content">
                            新人必看，注意事项以及 FAQ 此帖不定期更新 本社区不是Demo 演示，
                            所以不要发布无意义的内容，在你提问前，请务必要阅读《提问的智慧》。不仅仅是在
                            社区，以后在任何社区提问，都要安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件遵守提问的智慧。 FAQ 怎么实现的中文搜索？ 如何发图片
                            安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件安装完成，无法发送邮件 帖子如何排版？如何发布图片？—— markdown 语法 能不能帮我开发
                            一个xxx插件

                        </div>
                    </router-link>
                </li>
                <li v-for="(disc,idx) in dList">
                    <div class="author-avatar">
                        <img :src="disc.author_name | sysImg" alt="">
                    </div>
                    <router-link :to="'/article/'+idx">
                        <div class="article-title">
                            <div class="a-container">
                                <div class="article-name">{{disc.article_name}}</div>
                                <div class="article-time">replied {{disc.article_time}} hours ago</div>
                            </div>
                            <div class="r-container">
                            <span class="article-tags">
                                <span class="article-tag tag-help">{{disc.tag1}}</span><span
                                class="article-tag tag-about">{{disc.tag2}}</span>
                            </span>
                                <span data-v="comment">
                                <i class="fa fa-comment-o" aria-hidden="true"></i>&nbsp;&nbsp;{{disc.comment_num}}
                            </span>
                            </div>
                        </div>
                        <div class="article-content">
                            {{disc.article_content}}
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="pages">
                <ul>
                    <li @click="firstPage()"><a href="javascript:void 0;"><i class="fa fa-backward"></i></a></li>
                    <li @click="previousPage()"><a href="javascript:void 0;"><i class="fa fa-arrow-left"></i></a></li>
                    <li v-for="(val,key) in pageRange" @click="getPageData(val)"><a href="javascript:void 0;">{{val}}</a></li>
                    <li @click="morePages()"><a href="javascript:void 0;">...</a></li>
                    <li @click="nextPage()"><a href="javascript:void 0;"><i class="fa fa-arrow-right"></i></a></li>
                    <li @click="lastPage()"><a href="javascript:void 0;"><i class="fa fa-forward"></i></a></li>
                </ul>
            </div>
        </div>
        <div class="article-editor" v-show="editorShow" :class="{ 'mini-article-editor' : miniEditorShow }">
            <div class="e-avatar">
                <img v-bind:src="username | sysImg" alt="">
                <div class="e-username">{{username}}</div>
            </div>
            <div class="e-editor">
                <div>
                    <button type="button" class="btn-tag-selector">选择标签</button>
                    <input type="text" name="" id="e-input-title" placeholder="标题..." v-model="articleTitle">
                    <span class="editor-tool icon-minus" @click="miniEditor()"><i class="fa fa-minus"></i></span>
                    <span class="editor-tool" @click="expandEditor()"><i class="fa fa-expand"></i></span>
                    <span class="editor-tool" @click="closeEditor()"><i class="fa fa-close"></i></span>
                </div>
                <div>
                    <textarea name="" id="e-txt-content" placeholder="内容..." v-model="articleContent"></textarea>
                </div>
            </div>
            <div class="clear-fix"></div>
            <hr>
            <button type="button" class="post-discussion" @click="postDiscussion($event)">发&nbsp;&nbsp;帖</button>
        </div>
    </div>
</template>

<script type="text/javascript">
    import EventBus from '../bus/event_bus.js'
    import {textToImg} from '../utils/utils.js'
    export default{
        name: 'discussion',
        created(){
            this.$http.get('/api/discussion').then(function (resp) {
                var res = resp.body
                var STATUS_OK = 0
                if(res.errno == STATUS_OK){
                    this.discussionData = res.data
                    this.discussionList = res.data.slice()
                    this.handleStartDiscussion()
                    this.handleTagClick()
                }
            }.bind(this))
        },
        filters: {
            sysImg: function (v) {
                if(!v) return ''
                var img = textToImg(v)
                return img
            }
        },
        data(){
            return {
                selects: ["最近", "最热门", "最新", "最早"],
                discussionList: [],
                discussionData: [],
                editorShow:false,
                miniEditorShow:false,
                articleTitle:'',
                articleContent:'',
                pageStart:1,
                pageEnd:5,
                avatarPath:'../assets/logo.png',
            }
        },
        computed:{
            username:function () {
                return localStorage.getItem('username') || ''
            },
            dList:function () {
                if(this.discussionList.length > 10){
                    return this.discussionList.slice(0,10)
                }
                return this.discussionList
            },
            pageRange:function () {
                var arr = []
                for(var i=this.pageStart;i<=this.pageEnd;i++){
                    arr.push(i)
                }
                return arr
            }
        },
        watch:{
            discussionList:{
                handler(newVal,oldVal){

                },
                deep:true
            },
            miniEditorShow:function(newVal,oldVal){

            },
        },
        methods:{
            handleStartDiscussion(){
                EventBus.$on('start_discussion',function (target) {
                    this.editorShow = !this.editorShow
                }.bind(this))
            },
            handleTagClick(){
                EventBus.$on('option_click',function (target,sel) {
//                    console.log(this.discussionData)
//                    console.log(sel)
                    if(sel == 'all'){
                        this.discussionList = this.discussionData.slice()
                        return
                    }
                    var list = this.discussionData.slice()
                    var res = []
                    for(var i=0;i<list.length;i++){
                        if(list[i].tag1 == sel || list[i].tag2 == sel){
                            res.push(list[i])
                        }
                    }
                    this.discussionList = res
                }.bind(this))
            },
            miniEditor(){
                this.miniEditorShow = true
            },
            expandEditor(){
                if(this.miniEditorShow){
                    this.miniEditorShow = !this.miniEditorShow
                }
            },
            closeEditor(){
                this.editorShow = false
            },
            postDiscussion(event){
                var article = {
                    author_name: this.username,
                    author_avatar : avatarPath,
                    article_name : this.articleTitle,
                    article_time : Date.now(),
                    tag1 : '其他',
                    tag2 : '其他',
                    comment_num : 0,
                    article_content : this.articleContent,
                }
                this.$http.post('/api/new_discussion',article).then(function (resp) {
                    var res = resp.body
                    var STATUS_OK = 0
                    if(res.errno == STATUS_OK){
                        console.log('posting a discuss successful!')
                        this.closeEditor()
                        this.discussionList=res.data
                        alert('发帖成功')
                    }
                }.bind(this))
            },
            getPageData(pageNum){
                console.log(pageNum)
                this.$http.get('/api/discussion/'+pageNum).then(function (resp) {
                    var res = resp.body
                    var STATUS_OK = 0
                    if(res.errno == STATUS_OK){
                        this.discussionData = res.data
                        this.discussionList = this.discussionData.slice(0,10)
//                        console.log(this.discussionData)
                    }
                }.bind(this))
            },
            morePages(){
                this.pageStart += 5
                this.pageEnd += 5
            },
            firstPage(){
                this.pageStart = 1
                this.pageEnd = this.pageStart+4
            },
            previousPage(){
                var oldStart = this.pageStart
                this.pageStart = oldStart == 1 ? oldStart : oldStart-5
                this.pageEnd = this.pageStart+4
            },
            nextPage(){
                this.pageStart += 5
                this.pageEnd += 5
            },
            lastPage(){
                var last = 5
                this.$http.get('/api/discussion_length/').then(function (resp) {
                    var res = resp.body
                    var STATUS_OK = 0
                    if(res.errno == STATUS_OK){
                        last = parseInt(res.data)
                    }
                }.bind(this))
                this.pageEnd = last>=5 ? last : 5
                this.pageStart = this.pageEnd - 4
            },
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #4d698e;
    }

    .discussion {
        margin-top: 30px;
        float: left;
        width: 62%;
        font-size: 12px;
    }

    .dis-title {
        margin-bottom: 20px;
    }

    .btn-refresh {
        float: right;
        border: 0;
        outline: 0;
        background-color: #e8ecf3;
        width: 30px;
        height: 30px;
        color: #667c99;
        font-size: 14px;
        border-radius: 3px;
    }

    .btn-refresh:hover {
        cursor: pointer;
    }

    #select-input {
        border: 0;
        appearance: none;
        width: 100px;
        height: 30px;
        text-align: center;
        padding: 0 2%;
        margin: 0;
        background-color: #e8ecf3;
        outline: 0;
    }

    #select-input option {
        text-align: center;
    }

    .article-content {
        color: #c4c4c4;
        line-height: 18px;
        max-height: 54px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }

    .discussion-list li {
        list-style: none;
        height: 125px;
    }
    .discussion-list li::after{
        content: ' ';
        height:0;
        display: inline-block;
        clear: both;
    }
    .author-avatar{
        float:left;
        margin-right:10px;
    }

    .author-avatar img{
        width:50px;
        height:50px;
        border-radius:25px;
    }

    .article-name {
        font-size: 14px;
        font-weight: bold;
    }

    .a-container {
        display: inline-block;
    }

    .r-container {
        float: right;
    }

    .article-tags {
        margin-right: 20px;
        display: inline-block;
    }

    .article-tag {
        background-color: #feb54d;
        display: inline-block;
        height: 20px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .tag-help {
        border-radius: 4px 0 0 4px;
        width: 35px;
    }

    .tag-about {
        padding-top: 1px;
        border-radius: 0 4px 4px 0;
        background-color: #e8ecf3;
    }
    /* body height=1200px*/
    .article-editor{
        position:fixed;
        bottom:0;
        right:10.83%;/*130px*/
        width: 830px; /*830px*/
        height:300px; /*300px*/
        background-color: #fff;
        border:2px solid #4d698e;
        border-radius: 5px;
    }
    .mini-article-editor{
        box-sizing: border-box;
        position:fixed;
        bottom:0;
        right:10.83%;
        width: 69.1%;
        height:8.2%;
        background-color: #fff;
        border:2px solid #4d698e;
        border-radius: 5px;
    }
    .e-avatar{
        float:left;
        width:100px;
        height:240px;
    }
    .e-avatar img{
        margin-top: 20px;
        margin-left: 20px;
        height:50px;
        width:50px;
    }
    .e-username{
        margin-top: 5px;
        margin-left: 20px;
        color:#4d698e;
    }
    .e-editor{

    }

    #e-input-title{
        outline: none;
        height:40px;
        width:420px;
        border:0;
        font-size: 14px;
        /*border:1px solid black;*/
        margin-left: 10px;
    }
    #e-txt-content{
        outline: none;
        width:714px;
        height:180px;
        border:0;
        font-size: 14px;
        overflow: hidden;
    }
    .btn-tag-selector{
        margin-top: 20px;
        background-color: #fff;
        outline:0;
        border:1px dashed #ccc;
        width:110px;
        height:30px;
        font-size: 14px;
        border-radius:3px;
        color:#4d698e;
    }
    .clear-fix{
        clear: both;
    }
    hr{
        background-color: #aaa;
        border:0;
        height:1px;
    }
    .post-discussion{
        margin-top: 10px;
        margin-left:20px;
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
    .editor-tool{
        font-weight: bold;
        font-size: 16px;
        color:#4d698e;
        margin-right:18px;
    }
    .icon-minus{
        margin-left:70px;
    }
    .pages li{
        float:left;
        width:35px;
        height:25px;
        font-size: 13px;
        line-height: 25px;
        margin-right:2px;
        border:1px solid #ccc;
        border-collapse: collapse;
        text-align: center;
    }
</style>
