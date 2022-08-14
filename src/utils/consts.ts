const DOMINIO= 'http://localhost:3000';

const DEV_URL= process.env.DEV_URL;

export const PATH = {
  HOME: `${DOMINIO}`,
  SIGN_IN: `${DOMINIO}/login`,
  CREATE_ACCOUNT: `${DOMINIO}/signup`,
  USER: `${DOMINIO}/profile`,
  PROFILE: `${DOMINIO}/profile/`,
  ALL_QUESTS: `${DOMINIO}/allQuests`,
  CREATE_QUEST:`${DOMINIO}`,
  RANDOM_QUEST:`${DOMINIO}/Quest`,
  
  // API ENDPOINTS
  API: `${DOMINIO}/api`,
  API_QUESTS: `${DOMINIO}/api/quests`,
  API_USERS: `${DOMINIO}/api/users`,
  API_USER_BY_ID: `${DOMINIO}/api/users/id`,
  API_USER_BY_USERNAME: `${DOMINIO}/api/users/userName`,
  
  
  
  // 
  GITHUB_LOGIN: `${DOMINIO}/api/auth/signin/github`,
  SIGN_OUT: `${DOMINIO}/api/auth/signout`,
};

export const MAX_CHARACTERS = 100;

export const LOADING_STATE = {
  NOT_GOT_IT: 0,
  LOADING: 1,
  GOT_IT: 2,
};
