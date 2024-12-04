import AuthService from "./auth";
import DatabaseService from "./database";
import StorageService from "./storage";

export const authService = new AuthService();

export const databaseService = new DatabaseService();

export const storageService = new StorageService();
