import { projectItem, productItem } from './project-item';
import { cityLifeLine } from './city-lifeline';
import type { App } from 'vue';

function registerDirective(app: App) {
  app.directive('project-item', projectItem);
  app.directive('product-item', productItem);
  app.directive('city-life-line', cityLifeLine);
}

export {
  registerDirective
};
