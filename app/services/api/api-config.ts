// const API_URL = __DEV__ ? "http://192.168.1.233:3333" : "http://3.15.27.56";
const API_URL = "http://3.15.27.56";

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL || "http://localhost:3333",
  timeout: 10000,
};
