export const ActivityDetails = (activityId, type: ''): string => `/activity-details/${activityId}/type/${type}`;
// DashList
export const DashList = ():string => '/dash-list';
// DashDetails
export const DashDetails = ():string => '/dash-details';
// payPage
export const PayPage = ():string => '/pay-page'
// mine
export const Mine = (): string => '/mine';
// 个人资料
// export const BLPrefix = (prefixs: string): string =>`/blood-lipids-management/${prefixs}`;
export const UserInfo = (tab, id): string => `/user-info/${tab}/id/${id}`
