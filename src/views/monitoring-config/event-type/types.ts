import { AnyFunction } from 'fx-front-utils';
import type { IgetListEventTreeVOsEventTypeSpace } from '@/apis/modules/event-type/model';

export type EventTypeNode = {
  id: number
  level: number;
}

export type EventTypeItem = EventTypeNode & {
  data: IgetListEventTreeVOsEventTypeSpace.Data;
  node: EventTypeNode
  parent: EventTypeNode & { data: IgetListEventTreeVOsEventTypeSpace.Data };
  treeOperCallback: AnyFunction<void>
}
