interface Operation {
  hasScope: number;
  operationCode: string;
  operationName: string;
  scopeBy: number;
  scopeType: number;
  sourceIds: string[];
}
interface FunctionItem {
  functionCode: string;
  functionName: string;
  hasScope: number;
  operations: Operation[];
  scopeBy: number;
}
interface OrgList {
  administrativeLevel: number;
  areaCode: string;
  areaName: string;
  areaShortName: string;
  isMain: number;
  orgId: number;
  orgName: string;
}
interface Data {
  account: string;
  functions: FunctionItem[];
  orgList: OrgList[];
  sysId: string;
  sysName: string;
  tenantId: string;
  tenantName: string;
  userId: string;
  userName: string;
}

export interface UserInfo extends Data {
  mobile?: string;
  userType?: string;
}
export interface CurrentUser {
  userInfo: UserInfo;
}
export interface RootState {
  version: string;
}
