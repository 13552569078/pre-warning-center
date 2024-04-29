<template>
  <div
    class="collapse-section m-b-md"
    :class="{'is-closed': !isOpen}"
  >
      <hl-group class="collapse-section-title" align="items-middle" :class="{'border': borderTitle}">
        <span class="cursor-pointer"  @click="isOpen = !isOpen">
        <hl-icon :class="{'is-icon-open': isOpen, 'm-r-xxs': true}">
          <TwoChevronRight />
        </hl-icon>
        <span class="m-l-sm font-bold">
          <slot name="title">{{ title }}</slot>
        </span>
      </span>
      <hl-icon v-if="showDelete" @click="confirmDel" class="cursor-pointer" type="danger">
        <fill-delete />
      </hl-icon>
      </hl-group>
    <hl-collapse-transition>
      <slot :is-open="isOpen"></slot>
    </hl-collapse-transition>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { HlMessageBox } from 'hongluan-ui';

const props = defineProps({
  defaultOpen: {
    type: Boolean,
    default: true
  },
  title: String,
  showDelete: {
    type: Boolean,
    default: true,
  },
  borderTitle: {
    type: Boolean,
    default: false,
  }
});
const emit = defineEmits(['del']);

const confirmDel = async() => {
  await HlMessageBox.confirm(`您确认删除[${props.title}]吗?`, '删除提示', {
    confirmButtonText: '确定',
    confirmButtonType: 'danger',
    cancelButtonText: '取消',
    type: 'success',
  });
  emit('del');
};

const isOpen = ref(!!props.defaultOpen);

</script>
<style lang="scss" scoped>
.collapse-section {
  border-radius: var(--radius-md);
  &.is-closed {
    padding-bottom: 0;
  }
  .collapse-section-title {
    padding: var(--xs) var(--lg);
    padding-left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      vertical-align: sub;
      &.is-icon-open {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
