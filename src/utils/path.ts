const DOMINIO = 'http://localhost:3000'

const PATH = {
  HOME: `${DOMINIO}`,
  SIGN_IN: `${DOMINIO}/login`,
  CREATE_ACCOUNT: `${DOMINIO}/signup`,
  USER: `${DOMINIO}/profile`,
  PROFILE: `${DOMINIO}/profile`,
  ALL_QUESTS: `${DOMINIO}/allQuests`,
  CREATE_QUEST: `${DOMINIO}/createQuest`,
  RANDOM_QUEST: `${DOMINIO}/Quest`,

  // API ENDPOINTS
  
  API:{
    USERS: `${DOMINIO}/api/users`,
    USER_BY_ID: `${DOMINIO}/api/users/id`,
    USER_BY_USERNAME: `${DOMINIO}/api/users/userName`,
    // 
    ALL_COLLECTIONS: `${DOMINIO}/api/collections`,
    COLLECTION_BY_ID: `${DOMINIO}/api/collections`,
    COLLECTION_BY_USERNAME: `${DOMINIO}/api/collections/userName`,
    // 
    QUESTIONS: `${DOMINIO}/api/questions`,
    QUESTIONS_MATCHING_COLLECTION: `${DOMINIO}/api/questions/MatchingByCollection`,
},
  //
  GITHUB_LOGIN: `${DOMINIO}/api/auth/signin/github`,
  SIGN_OUT: `${DOMINIO}/api/auth/signout`
}




export default PATH