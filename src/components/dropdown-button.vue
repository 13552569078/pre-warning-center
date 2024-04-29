<template>
  <hl-dropdown @visible-change="data.isShowdropdown = !data.isShowdropdown">
    <hl-button :type="undefined" :disabled="disabled" class="btn-more-action" icon-position="left" effect="light"
      style="--button-height: calc(var(--xs) * 4); --button-padding-x: calc(var(--sm) * 1); --form-icon-size: var(--xxl);">
      <!-- <template #icon>
        <hl-icon> -->
          <!-- <img :src="tableMoreIcon" style="width: 16px; height: 16px; margin-right: 8px;"/> -->
          <span class="more-icon"></span>
        <!-- </hl-icon>
      </template> -->
      {{ text }}
    </hl-button>
    <template #dropdown>
      <hl-dropdown-menu class="more-action-dropdown-menu">
        <hl-dropdown-item v-for="(item, idx) in options" :key="idx" v-bind="item" :disabled="item.disabled">
          {{ item.label }}
        </hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, watch } from 'vue';
import { HlDropdown, HlDropdownItem, HlDropdownMenu, HlButton, HlIcon, SystemArrowDown } from 'hongluan-ui';
import tableMoreIcon from '@/assets/images/common/table-more-icon.svg';

const props = defineProps({
  options: {
    type: Array,
    defualt: () => [],
  },
  disabled: Boolean,
  text: {
    type: String,
    default: '更多操作',
  },
});

const data = reactive({
  isShowdropdown: false,
});
watch(() => props.options, val => {
  console.log(val);
});
</script>
<style scoped lang="scss">
.dropdown-icon {
  font-size: var(--font-lg);
  width: var(--font-lg);
  height: var(--font-lg);
}

:deep(.hl-icon.dropdown-arrow) {
  font-size: var(--font-lg);
  width: var(--font-lg);
  height: var(--font-lg);
}
.more-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  background: url('@/assets/images/common/table-more-icon.svg') no-repeat;
  background-size: contain;
}

:deep(.hl-button span) {
  display: flex;
  flex-direction: row-reverse;
}
:deep(.hl-button) {
  &:hover, &:focus {
    .more-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      background: url('@/assets/images/common/table-more-icon-hover.png') no-repeat;
      background-size: contain;
    }
  }
}
</style>
