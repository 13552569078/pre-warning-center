<template>
  <hl-panel
    class="content m-b-md"
    style="--panel-header-height: 64px;"
    borderless padding="var(--lg)"
    header-class="bg-content"
    body-class="content"
    body-style="padding-top: 0px;">
    <template #header>
      <div class="panel-header-left">
        <!-- <hl-icon class="static" type="primary" size="md">
          <FillOrnamentTitle4 />
        </hl-icon> -->
      </div>
      <!-- <div class="panel-title">
        <h4 class="text-title w-full">{{ props.title }}</h4>
      </div> -->
      <panel-header :title="props.title"/>
      <div v-if="showEdit" class="panel-header-right">
        <hl-button icon-position="left" no-fill type="primary" @click="handleClick">
          <template #icon>
            <hl-icon class="static" type="primary" size="xs">
              <TwoPlus></TwoPlus>
            </hl-icon>
          </template>{{ props.buttonText }}
        </hl-button>
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </hl-panel>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    defualt: ''
  },
  buttonText: {
    type: String,
    defualt: ''
  },
  showEdit: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>
