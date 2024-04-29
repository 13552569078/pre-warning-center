import { Directive } from 'vue';
import type { DirectiveBinding } from 'vue';

/**
 * 城市生命线入口需要隐藏
 */
export const cityLifeLine: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    if (localStorage.getItem('sceneCode') && localStorage.getItem('sceneCode') !== 'ALL') {
      el.style.display = 'none';
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
};
