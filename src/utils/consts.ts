const DOMINIO= 'http://localhost:3000';
// 

export const PATH = {
  HOME: `${DOMINIO}`,
  SIGN_IN: `${DOMINIO}/login`,
  CREATE_ACCOUNT: `${DOMINIO}/signup`,
  USER: `${DOMINIO}/profile`,
  PROFILE: `${DOMINIO}/profile/`,
  ALL_QUESTS: `${DOMINIO}/quests`,
  CREATE_QUEST:`${DOMINIO}`,
  RANDOM_QUEST:`${DOMINIO}`,
  // 
  API: `${DOMINIO}/api`,
  GITHUB_LOGIN: `${DOMINIO}/api/auth/signin/github`,
  SIGN_OUT: `${DOMINIO}/api/auth/signout`,
};

export const MAX_CHARACTERS = 100;

export const LOADING_STATE = {
  NOT_GOT_IT: 0,
  LOADING: 1,
  GOT_IT: 2,
};
