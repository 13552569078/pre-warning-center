import { GlobalAPI } from '@/common';

// 项目展示
const projectItem = {
  mounted(el: HTMLElement) {
    switch (GlobalAPI.config.DEPLOY_TYPE_CENTRE_CONFIG) {
      case 'product':
        el.style.display = 'none';
        el.parentNode && el.parentNode.removeChild(el);
        break;
      case 'ygf':
        break;
    }
  }
};

// 产品展示
const productItem = {
  mounted(el: HTMLElement) {
    console.log('deploy-type', el, GlobalAPI, 999);
    switch (GlobalAPI.config.DEPLOY_TYPE_CENTRE_CONFIG) {
      case 'product':
        break;
      case 'ygf':
        el.style.display = 'none';
        el.parentNode && el.parentNode.removeChild(el);
        break;
    }
  }
};

export { projectItem, productItem };
