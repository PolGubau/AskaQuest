import { useSession } from "next-auth/react";

export default function useUserSession() {
    
    const { data, status } = useSession();
    
  const user = data?.user 
    ? data.user 
    : {name:'Not signed in',email:'',image:''};
  
  return { user, status };
}
