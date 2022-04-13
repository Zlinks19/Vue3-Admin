<template>
  <div class="loginBox flex flex_just_c flex_items_c h100vh">
    <el-card class="w25x mar_auto">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <div class="txt_c fs16">Management System Login</div>
        <el-form-item prop="userName">
          <el-input class="mt50" v-model="ruleForm.userName" placeholder="Please input user" clearable />
        </el-form-item>
        <el-form-item prop="userPass">
          <el-input class="" v-model="ruleForm.userPass" type="password" placeholder="Please input password" show-password />
        </el-form-item>

        <el-checkbox class="" v-model="ruleForm.checked">Remember</el-checkbox>
        <div>
          <el-button type="primary" class="mt20 w100x" @click="submitForm(ruleFormRef)">sign</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  setup() {
    
    const router = useRouter()
    const ruleFormRef = ref()
    const ruleForm = reactive({
      checked: "",
      userName: "admin",
      userPass: "123456",
    })
    const rules = reactive({
      userName: [
        { required: true, message: 'default name Any', trigger: 'blur' },
      ],
      userPass: [
        { required: true, message: 'default password Any', trigger: 'blur' },
      ],

    })
    const submitForm = async (formEl) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          axios.get("/mock/login/sign.json").then((res) => {
            if (res.status == 200) {
              ElMessage({
                message: res.data.message,
                type: 'success',
              })
              sessionStorage.setItem('user', JSON.stringify(res.data) )
              router.push('/home')
            }
          });
        }
      })
    }

    return {
      ruleForm,
      rules,
      ruleFormRef,
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
// .loginBox {
//   background: url("../../assets/image/bg.png") no-repeat;
// }
.h100vh {
  height: 100vh;
}
</style>