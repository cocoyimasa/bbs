<template>
    <div class="main">
        <v-welcome></v-welcome>
        <div class="container">
            <v-sidebar></v-sidebar>
            <v-discussion></v-discussion>
        </div>
    </div>
</template>

<script>
    import Welcome from '@/components/Welcome.vue'
    import Sidebar from '@/components/Sidebar.vue'
    import Discussion from '@/components/Discussion.vue'
    export default {
        name: 'main',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        components: {
            'v-welcome': Welcome,
            'v-sidebar':Sidebar,
            'v-discussion':Discussion,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
    }

    a {
        color: #42b983;
    }
    .container::after{
        display: inline-block;
        height:0;
        content: " ";
        clear: both;
    }
</style>
