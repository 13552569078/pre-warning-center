// index.ts
import { createI18n } from 'vue-i18n';
import zh from './lang/zh';

const messages = {
  zh,
};
const language = navigator.language.toLocaleLowerCase(); // 这是获取浏览器的语言
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || language.split('-')[0] || 'zh', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh', // 设置备用语言
  messages,
});

export default i18n;
