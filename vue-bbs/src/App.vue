<template>
    <div id="app">
        <!--<img src="./assets/logo.png">-->
        <v-header></v-header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Main from './components/Main.vue'
    import Footer from './components/Footer.vue'
    export default {
        name: 'app',
        components:{
            'v-header':Header,
            'v-main':Main,
            'v-footer':Footer,
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width:100%;
        font-size: 12px;
    }
</style>
