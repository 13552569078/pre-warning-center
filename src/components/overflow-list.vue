<template>
  <hb-overflow-list :show-count="3">
    <slot></slot>
    <template #more>
      <hl-icon>
        <TwoChevronBottom />
      </hl-icon>
    </template>
  </hb-overflow-list>
</template>
