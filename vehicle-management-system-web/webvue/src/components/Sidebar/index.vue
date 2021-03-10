<template>
    <article>
        <el-menu
        :default-active="defaultActive"

       
        class="el-menu-vertical-demo"
        text-color="rgba(255,255,255,.65)"
        active-text-color="#fff"
        >

            <template v-for="item in menus" :ref="`menu-${item.name}`">
                <el-submenu  v-if="item.children.length != 0" :index="item.name" :key="item.name">
                    <tempalte>
                        <span>{{item.name}}</span>
                    </tempalte>
                    <template v-for="(child,ind) in item.children" :index="ind" >
                        <RouterLink :to="{path:child.path}" @click.native = "jump" :key="child.name">
                            <el-menu-item :index="child.name"> 
                                {{child.name}}
                            </el-menu-item>

                        </RouterLink>

                    </template>

                </el-submenu>
                <RouterLink v-else :to="{path:item.path}" :key="item.name"> 
                    <el-menu-item :index="item.name"> 
                               <span>{{item.name}}</span>
                            </el-menu-item>
                </RouterLink>

                
            </template>

        </el-menu>

        
        
    </article>
</template>