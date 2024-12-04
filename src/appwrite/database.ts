import config from "@/config";
import { Post } from "@/types";
import { Client, Databases, Query } from "appwrite";

class DatabaseService {
  private client: Client = new Client();
  private databases: Databases;

  private DATABASE_ID = config.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  private COLLECTION_ID = config.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

  constructor() {
    this.client
      .setEndpoint(config.env.NEXT_PUBLIC_APPWRITE_URL)
      .setProject(config.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: Post) {
    return this.databases.createDocument(
      this.DATABASE_ID,
      this.COLLECTION_ID,
      slug,
      { title, content, featuredImage, status, userId }
    );
  }

  async updatePost(
    slug: string,
    post: {
      title: string;
      content: string;
      featuredImage: string;
      status: "active" | "inactive";
    }
  ) {
    return this.databases.updateDocument(
      this.DATABASE_ID,
      this.COLLECTION_ID,
      slug,
      post
    );
  }

  async deletePost(slug: string) {
    return this.databases.deleteDocument(
      this.DATABASE_ID,
      this.COLLECTION_ID,
      slug
    );
  }

  async getPost(slug: string): Promise<Post | undefined> {
    const document = await this.databases.getDocument(
      this.DATABASE_ID,
      this.COLLECTION_ID,
      slug
    );

    return {
      title: document.title,
      slug: document.$id,
      content: document.content,
      featuredImage: document.featuredImage,
      status: document.status,
      userId: document.userId,
    };
  }

  async getPosts(
    queries: string[] = [Query.equal("status", "active")]
  ): Promise<Post[] | undefined> {
    const data = await this.databases.listDocuments(
      this.DATABASE_ID,
      this.COLLECTION_ID,
      queries
    );

    return data.documents.map((document) => ({
      title: document.title,
      slug: document.$id,
      content: document.content,
      featuredImage: document.featuredImage,
      status: document.status,
      userId: document.userId,
    }));
  }
}

export default DatabaseService;
