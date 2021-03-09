<template>
    <div>
        <el-header>
            <div style="text-align:right;">
                <span class="user">
                    <i class="iconfont iconguanli"></i>
                    {{name}}
                </span>
                <el-button class="link" type="text" @click="logout">
                    <i class="iconfont iconexct"></i>
                    退出
                </el-button>
            </div>
        </el-header>

    </div>
</template>
<script>
export default {
    data(){
        return{
            name:'hhh'

        }
    },
    created(){},
    mounted(){},
    methods:{

    }
}
</script>
<style>
</style>