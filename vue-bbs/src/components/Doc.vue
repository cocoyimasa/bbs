<template>
    <div class="doc">
        <ul class="d-sidebar">
            <li v-for="item in menus"><a href="javascript:void 0;">{{item}}</a></li>
        </ul>
        <div class="d-main">
            <h1>Document</h1>
            <div class="splitter"></div>
            <div class="code">
                <h2>前言</h2>
                <div class="splitter"></div>
                <p>
                    {{preface}}
                </p>
                <h2 id="install">安装指南</h2>
                <div class="splitter"></div>
                <p v-for="item in installInstruction">
                    {{item}}
                </p>

                    <h2 id="settings">如何配置</h2>
                <div class="splitter"></div>
                <p v-for="item in settings">
                    {{item}}
                </p>
                <h2>核心开发者</h2>
                <div class="splitter"></div>
                <p v-html="developer">
                </p>
                <h2>Github</h2>
                <div class="splitter"></div>
                <p>
                    <a :href="githubAddr">{{githubAddr}}</a>
                </p>
                    <h2 id="faq">FAQ</h2>
                <div class="splitter"></div>
                <p v-for="item in faq">
                    {{item}}
                </p>

                    <h2 id="others">其他</h2>
                <div class="splitter"></div>
                <p v-for="item in others">
                    {{item}}
                </p>

            </div>
        </div>

    </div>
</template>

<script type="text/javascript">
    import {markdown} from 'markdown';

    markdown.toHTML( "``` console.log(222222) ```" )
    export default{
        data(){
            return{
                menus:[
                    '前言',
                    '安装指南',
                    '如何配置',
                    'Github',
                    '核心开发者',
                    'FAQ',
                    '其他',
                ],
                preface:'此网站是一款自由、开源的论坛软件，它专注于简单。通过它您可以轻松地为您的网站搭建一个论坛。'+
                '开发版托管在 GitHub。界面部门模仿Flarum。',
                installInstruction:[
                    '系统需求:',
                    'Node.js@^v6.0,',
                    'Webpack@^2.0,',
                    'Vue@^2.0',
                    '1.下载源码',
                    '2.进入下载目录',
                    '3.npm intall',
                    '4.配置数据',
                    '5.npm start',
                ],
                settings:[
                    '1.设置标题：__bbs_title__',
                    '2.设置logo：__bbs_logo__',
                    '3.设置菜单栏：__bbs_menu__',
                    '4.设置侧边栏数据：__bbs_sidebar__',
                    '5.设置文章列表：__bbs_articles__',
                    '6.更换主题：__bbs_theme__',
                    '7.设置欢迎文字：__bbs_welcome_text__',
                ],
                faq:[
                    '1.什么时候发布正式版?',
                    '2.为什么我不能排版我的帖子?',
                    '3.会有其他语言的本地化么？',
                    '4.我有一个想法或者希望论坛实现一些功能。我该怎么做？',
                    '5.如何。。。',
                    '6.如何。。。',
                    '7.如何。。。',

                ],
                developer:'Hesai Wang(<a href="https://github.com/cocoyimasa">Github</a>)',
                others:[
                    'to be continue...',
                ],
                githubAddr:'https://github.com/cocoyimasa',
                computedAttr:
                    '计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果实例范畴之外的依赖 (比如非响应式的 not reactive) 是不会触发计算属性更新的。',
                watchDoc:'一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。',
            }
        },
        methods:{

        }
    }
</script>

<style scoped="">
    .doc{
        margin-left:108px;
        color:#426799;
        font-family: "微软雅黑";

    }
    .splitter{
        margin: 10px 0;
        width:800px;
        background-color:#426799;
        height:1px;
    }
    .d-sidebar{
        float: left;
        overflow: hidden;
        font-size: 16px;
    }
    .d-main{
        margin-left: 100px;
    }
    .d-main p{
        margin-bottom:20px;
    }
    .doc li{
        list-style: none;
        width:100px;
        height:50px;
        line-height: 50px;
    }
    .doc a{
        text-decoration: none;
        color:#426799;
    }
    .code{
        width:800px;
    }
</style>
