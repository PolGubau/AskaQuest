export default interface UserInterface {
  ID: string;
  date_creation?: string;
  userName: string;
  password: string;
  email: string;
  role: number;
  image?: string;
  followers?: Array<number | string> | any;
  following?: Array<number | string> | any;
  // collections_done: Array of: collection ID, percent of right answers, how many times the user has done the collection
  collections_done?: Array<{ id: number; per: number; times: number }>;
  liked: Array<number | string>;
  error?: any;
}
