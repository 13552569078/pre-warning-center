import { Indexable } from 'fx-front-utils';

interface IPageDetaiCol {
    label?: string
    key?: string
    slot?: string
}
interface IPageimageOpt {
    show?: boolean
    title?: string
    list?: string[]
}

interface PageDetailOption {
    title?: string
    cols: IPageDetaiCol[]
    imageOpt?: IPageimageOpt
    data: Indexable<any>
}

interface menuListPros {
    path: string;
    fullPath?: string;
    name: string;
    meta: {
      title: string;
      sort?: number;
      icon?: string;
      menu?: boolean;
      outLink?: boolean;
      gloableKey?: string;
      keepAlive?: string;
      hasParent?: boolean;
      hiddenMenu?: boolean;
    },
    children?: menuListPros[];
  }

export { IPageDetaiCol, IPageimageOpt, PageDetailOption, menuListPros };
