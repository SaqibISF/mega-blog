import { EnvType } from "@/types";

class Config {
  public env: EnvType;

  constructor() {
    this.env = {
      NEXT_PUBLIC_APPWRITE_URL: process.env.NEXT_PUBLIC_APPWRITE_URL!,

      NEXT_PUBLIC_APPWRITE_PROJECT_ID:
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,

      NEXT_PUBLIC_APPWRITE_DATABASE_ID:
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,

      NEXT_PUBLIC_APPWRITE_COLLECTION_ID:
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,

      NEXT_PUBLIC_APPWRITE_BUCKET_ID:
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,

      NEXT_PUBLIC_TINY_MCE_API_KEY: process.env.NEXT_PUBLIC_TINY_MCE_API_KEY!,

      NEXT_PUBLIC_APPWRITE_API_KEY: process.env.NEXT_PUBLIC_APPWRITE_API_KEY!,
    };
    this.validateEnvs();
  }

  private validateEnvs() {
    for (const key in this.env) {
      if (!this.env[key as keyof EnvType]) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    }
  }
}

const config = new Config();

export default config;
