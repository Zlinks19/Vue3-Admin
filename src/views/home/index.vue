<template>
  <div class="home">
      <h3>{{userInfo.name}} 欢迎您使用Kino Admin 管理系统</h3>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { ref, reactive} from 'vue'
export default {
  setup(props,context) {
    const store = useStore();
    const count = ref(0)
    const userInfo = reactive(JSON.parse(sessionStorage.getItem('user')))
    onMounted(()=>{
    })
    const addClck = () => {
      console.log(count.value++);
    };

    return {
      addClck,
      count,
      userInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 30px;
}
</style>