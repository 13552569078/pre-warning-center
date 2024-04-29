import { ref, onMounted } from 'vue';
import { GlobalAPI } from '@/common/global-api';
function useIframe() {

  const isInframe = ref(false);

  onMounted(() => {
    isInframe.value = window.parent !== window
    // isIframe.value = true;
  })

  return {
    isInframe
  };
}

export { useIframe };
