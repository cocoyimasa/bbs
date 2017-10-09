<template>
    <div class="sidebar">
        <ul class="all-discussions">
            <li>
                <button type="button" @click="startDiscussion($event)">开始讨论</button>
            </li>
            <li @click="allDiscussion($event)">
                <i class="fa fa-comments-o" aria-hidden="true"></i>&nbsp;&nbsp;所有讨论
            </li>
            <li>
                <i class="fa fa-th-large" aria-hidden="true"></i>&nbsp;&nbsp;标签
            </li>
        </ul>
        <ul class="discuss-tags">
            <li v-for="(obj,index) in tags"  @click="optionClick($event,index)">
                <i class="color-block" aria-hidden="true" :style="obj.color"></i>
                <span>&nbsp;&nbsp;{{ obj.tag }}</span>
            </li>
        </ul>
    </div>
</template>

<script type="text/javascript">
    import EventBus from '../bus/event_bus.js'

    function randomBetween(a,b) {
        return Math.floor(Math.random()*b+a)
    }
    function generateColor(len){
        var data  = [
            [254,181,77],
            [103,204,234],
        ]
        if(len > 2){
            for(let i=0;i<len-2;i++){
                let r=randomBetween(50,230)
                let g=randomBetween(50,240)
                let b=randomBetween(50,240)
                data.push([r,g,b])
            }
        }
        var colors = []
        for(let i=0;i<data.length;i++){
            let r=data[i][0]
            let g=data[i][1]
            let b=data[i][2]
            var templ = `background-color: rgb(${r}, ${g}, ${b})`;
            colors.push(templ)
        }
        return colors
    }
    export default{
        name:'sidebar',
        created(){

            this.tags = []
            this.$http.get('/api/tags').then(function(resp){
                resp = resp.body;
                var STATUS_OK = 0
                if(resp.errno == STATUS_OK){
                    this.data = resp.data
                    var colors = generateColor(this.data.length)
                    for(let i=0;i<this.data.length;i++){
                        this.tags.push({
                                tag:this.data[i],
                                color:colors[i],
                            })
                    }
                }
            })

        },
        data(){
            return{
                tags:{},
            }
        },
        methods:{
            startDiscussion(event){
                EventBus.$emit('start_discussion',event.target)
            },
            allDiscussion(event){
                var sel = "all"
                EventBus.$emit('option_click',event.target,sel)
            },
            optionClick(event, index){
                var sel = this.tags[index].tag
                EventBus.$emit('option_click',event.target,sel)
            }
        }
    }
</script>

<style>
    /* body height=1200px*/
    .sidebar{
        float: left;
        width:19%;
        margin-left: 8%;
        font-size:13px;
    }
    .sidebar li{
        list-style:none;
    }
    .sidebar button{
        outline:0;
        border:0;
        background-color:#4d698e;
        width:80.5%;
        height:35px;
        color:white;
        font-size: 14px;
        border-radius:3px;
        font-weight: bold;
    }
    .sidebar button:hover{
        cursor:pointer;
    }
    .all-discussions{
        margin-top:30px;
        color:#4d698e;
        font-weight: bold;
    }
    .all-discussions li{
        margin-top:20px;
    }
    .discuss-tags{
        margin-top: 36px;
    }
    .discuss-tags li{
        height:21px;
        margin-bottom:14px;
        color: #667c99;
    }
    .color-block{
        vertical-align: bottom;
        display: inline-block;
        border-radius: 4px;
        width:16px;
        height:16px;
        background-color: black;
    }
</style>
