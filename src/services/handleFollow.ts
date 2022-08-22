import { User } from "src/interfaces/User";
import { PATH } from "src/utils/consts";

export const handleFollow = async (Pol:User,Maria:User) => {
    
    //EJ: Pol quiere seguir a María, le da a seguir
    let isNowFollowing = false;

    let {userName, email, password,followers,following,collections_done,role,image,ID } = Pol
    let {userName:userName2, email:email2, password:password2,followers:followers2,following:following2,collections_done:collections_done2,role:role2,image:image2,ID:ID2 } = Maria
    following= following || []
    followers2= followers2 || []
    //1. Primero se comprueba si Pol ya sigue a María, si es así, se elimina el ID de María de su array de following y se elimina el ID de Pol de su array de followers.
    
    if(following?.includes(ID2)){
        following.splice(following.indexOf(ID2),1)
        followers2?.splice(followers2.indexOf(ID),1)
        
        
        
    }
    //2. Si Pol no sigue a María, se añade el ID de María a su array de following y se añade el ID de Pol a su array de followers.
    else{
        following?.push(ID2)
        followers2?.push(ID)
        isNowFollowing = true;
    }
    
    //enviamos los datos a la base de datos
    
    const response = await fetch(`${PATH}/users/${ID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName, email, password,followers,following,collections_done,role,image,ID }),
    })
    const data = await response.json()
    console.log('DATA 1: ',data)
    
    const response2 = await fetch(`${PATH}/users/${ID2}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName:userName2, email:email2, password:password2,followers:followers2,following:following2,collections_done:collections_done2,role:role2,image:image2,ID:ID2 }),
        
    })
    const data2 = await response2.json()
    console.log('DATA 2: ',data2)
    
    
    return isNowFollowing
    
    
    
    
        
    
   
}