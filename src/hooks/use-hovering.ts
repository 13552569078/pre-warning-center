import { onUnmounted, ref } from 'vue';
import { apiEventTypeObj } from '@/apis/modules/event-type';

function useHovering(deplay = 100) {
  const isHoveringData = ref<Record<number, boolean>>({});
  let isHoveringHanlder: Record<number, number> = {};

  const enter = async (id: number) => {
    isHoveringHanlder[id] && window.clearTimeout(isHoveringHanlder[id]);
    isHoveringData.value[id] = true;
  };
  const leave = (id: number) => {
    isHoveringHanlder[id] = window.setTimeout(() => {
      isHoveringData.value[id] = false;
    }, deplay);
  };
  const isHovering = (id: number) => {
    return isHoveringData.value[id];
  };

  onUnmounted(() => {
    isHoveringData.value = {};
    isHoveringHanlder = {};
  });

  return {
    enter,
    leave,
    isHovering
  };
}

export { useHovering };
