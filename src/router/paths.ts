/* eslint-disable prettier/prettier */
export const paths = {
  HOME: (): string => "/home",
  START: (): string => "/",
  MEETING: (): string => "/meeting",
  MEETING_CREATE: (): string => "/meeting/create",
  MEETING_IN: (id: string): string => "/meeting/" + id,
  STORAGE: (): string => "/storage",
  STORAGE_DETAIL: (id: string): string => "/storage/" + id,
  TEAM: (): string => "/teams",
  UNAUTHORIZED: (): string => "/unauthorized",
  RIGHTFAILURE: (): string => "/error",
  LOGIN: (): string => "/login",
};
