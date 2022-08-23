import { User } from "src/interfaces/User";
import PATH from "src/utils/consts";

export const handleFollow = async (Profiled:User,Loged:User) => {
    //EJ: Loged quiere seguir a Profiled, le da a seguir
    let isNowFollowing = false;

    let {userName, email, password,followers,following,collections_done,role,image,ID } = Profiled
    let {userName:userName2, email:email2, password:password2,followers:followers2,following:following2,collections_done:collections_done2,role:role2,image:image2,ID:ID2 } = Loged
    
    following = JSON.parse(following)
    followers2 = JSON.parse(followers2)
    
    console.log(Loged)
    
    console.log(`${userName} sigue a ${following} y le siguen${followers}`);
    console.log(`${userName2} sigue a ${following2} y le siguen${followers2}`);
   
    
    if(following===null){
        following = []
    }   
    if(followers2===null){
        followers2 = []
    }   
    
   
    
    if(following && following.includes(ID2)){
        console.log(`Ya siguen, dejamos de seguir`)
      // quitamos el id de la persona que sigue al del profile
    //     following = following.filter((id:number) => id.toString() !== ID2.toString()) // devuelve los index que no sea el mismo id
    //     followers2 = followers2.filter((id:number) => id.toString() !== ID.toString()) // devuelve los index que no sea el mismo id
        isNowFollowing = false
    }else{
        // si no siguen, seguimos
        console.log(`No siguen, seguimos`)
    //     following.push(ID2)
    //     console.log(`Se ha añadido a la lista de seguidos del profile ${userName}: ${following}`)
    //     followers2.push(ID)
        

        isNowFollowing = true
    }
    // actualizamos el array de following del que sigue
    await fetch(PATH.API.USER_BY_ID+'/'+ID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName, email, password,followers,following,collections_done,role,image,ID })
    })

    // actualizamos el array de followers del que es seguido
    await fetch(PATH.API.USER_BY_ID+'/'+ID2, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName:userName2, email:email2, password:password2,followers:followers2,following:following2,collections_done:collections_done2,role:role2,image:image2,ID:ID2 })
    })
    
    
   
    
    
    
    // return isNowFollowing
    
    
    
    
        
    
   
}