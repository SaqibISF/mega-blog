import config from "@/config";
import { ID, Client, Storage } from "appwrite";

class StorageService {
  private client: Client = new Client();
  private storage: Storage;

  private BUCKET_ID = config.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

  constructor() {
    this.client
      .setEndpoint(config.env.NEXT_PUBLIC_APPWRITE_URL)
      .setProject(config.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file: File) {
    return await this.storage.createFile(this.BUCKET_ID, ID.unique(), file);
  }

  async deleteFile(fileId: string) {
    return await this.storage.deleteFile(this.BUCKET_ID, fileId);
  }

  getFilePreview(fileId: string) {
    return this.storage.getFilePreview(this.BUCKET_ID, fileId);
  }
}

export default StorageService;
