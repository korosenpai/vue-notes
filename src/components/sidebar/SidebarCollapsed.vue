<template>
    <div class="collapsed-sidebar translucent-box">
        <img src="@/assets/angle-up.svg" alt="" class="collapsed-sidebar-icon" @click="store.commit('toggleSidebar')">
    </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()
        
        return {
            store
        }
    }
}
</script>

<style scoped lang="scss">

.collapsed-sidebar {
    height: 100%;
    width: 1%;
    border-radius: 0;
    // padding-top: 30px;

    margin: 0;
    padding: 0 30px;
}

.collapsed-sidebar-icon {
    margin: 15px;
    padding: 5px;

    width: 40px;
    height: 40px;

    // background-color: #414E66; // color is inverted for filter
    background-color: #beb199; // TODO find better way
    border-radius: 50%;
    border: solid black 1px;

    cursor: pointer;
    filter: invert(1);
    transform: rotate(90deg);

}

</style>