import { Models } from "appwrite";

export type UserData = Models.Preferences | null;

export type AuthState = {
  status: boolean;
  userData: UserData;
  isStatusLoadedOnce: boolean;
};
