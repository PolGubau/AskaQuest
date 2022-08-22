import { User } from "src/interfaces/User";
import { PATH } from "src/utils/consts";

export const handleFollow = async (Pol:User,Maria:User) => {
    //EJ: Pol quiere seguir a María, le da a seguir
    let isNowFollowing = false;

    let {userName, email, password,followers,following,collections_done,role,image,ID } = Pol
    let {userName:userName2, email:email2, password:password2,followers:followers2,following:following2,collections_done:collections_done2,role:role2,image:image2,ID:ID2 } = Maria
    

    
    // convertimos a array los followers y following, y los usamos para saber si ya siguen o no
    following = JSON.parse(following)
    following2 = JSON.parse(followers2)
    
    // si ya siguen, dejamos de seguir
    console.log(`Array de gente que sigue el del profile ${userName}: ${following}`)
    console.log(`Id de quien quiere seguir:${ID2}(${userName2})`)
    
    if(following.includes(ID2)){        
        console.log(userName + ' ha dejado de seguir a ' + userName2)

        const index = following.indexOf(ID2)
        try{
        following.splice(index,1)
        following=JSON.stringify(following)
        following2.splice(following2.indexOf(ID),1)
        following2=JSON.stringify(following2)
        }catch{
            console.log(following)
        }
        isNowFollowing = false
    }else{
        // si no siguen, seguimos
        console.log(userName + ' ha empezado a seguir a ' + userName2)
        following=[...following,ID2]
        following=JSON.stringify(following)
        following2=[...following2,ID]
        following2=JSON.stringify(following2)
        
        
        isNowFollowing = true
    }
    
     
    //enviamos los datos a la base de datos
    
    const response = await fetch(`${PATH.API.USER_BY_ID}/${ID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName, email, password,followers,following,collections_done,role,image,ID }),
    })
    const data1 = await response.json()
    console.log('DATA 1: ',data1.rows)
    
    const response2 = await fetch(`${PATH.API.USER_BY_ID}/${ID2}`, {
        method: 'PUT',
       headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName:userName2, email:email2, password:password2,followers:followers2,following:following2,collections_done:collections_done2,role:role2,image:image2,ID:ID2 }),
        
    })
       const data2 = await response2.json()
    console.log('DATA 2: ',data2.rows)
    
    
    
    return isNowFollowing
    
    
    
    
        
    
   
}