<template>
  <div>
    <!-- 登录页 -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserInfo } from '@/hooks';
import userAuth from '@/common/user-auth';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { setUserInfo, userLogin } = useUserInfo();

    // 总集跳转携带token
    const searchParams = new URLSearchParams(window.location.search); // H5模式
    const token = searchParams.get('token') || route.query.token; // Hash模式

    if (token) {
      userAuth.saveToken(token as string);
      userAuth.getToken() &&
        setUserInfo().then(() => {
          router.push({ name: 'homepageIndex' });
        }).catch(err => {
          throw new Error(err.message);
        });
    } else {
      console.log('no token');
      // 本地联调时打开以下代码
      if (process.env.NODE_ENV !== 'production') {
        userLogin({
          // 'account': 'jczh.zfuser', // dev
          'account': 'lizhiwei', // dev
          // 'account': 'yunying', // test
          'password': 'Aa_123456',
          'clientType': 'renhTest',
          'tenantId': '1509798314971426818',
          'passwordEncryptType': 0
        }as any).then(t => {
          window.location.href = `${window.location.href}?token=${t}`;
        });
      }
    }

    return {};
  },
});
</script>
