import config from "@/config";
import { LoginData, SignupData } from "@/types";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  private client: Client = new Client();
  private account: Account;

  constructor() {
    this.client
      .setEndpoint(config.env.NEXT_PUBLIC_APPWRITE_URL)
      .setProject(config.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount(data: SignupData) {
    const userAccount = await this.account.create(
      ID.unique(),
      data.email,
      data.password,
      data.name
    );
    if (userAccount) {
      return this.login({ ...data });
    } else {
      return userAccount;
    }
  }

  async login({ email, password }: LoginData) {
    return await this.account.createEmailPasswordSession(email, password);
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("auth: getCurrentUser Error: ", error);
    }
    return null;
  }

  async logout() {
    try {
      return this.account.deleteSession("current");
    } catch (error) {
      console.log("auth: logout Error: ", error);
    }
  }
}

export default AuthService;
