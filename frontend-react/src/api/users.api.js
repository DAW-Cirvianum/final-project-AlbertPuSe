import { api } from "./api";

export async function loginUser(login, password){
    return  api.post('/login',{ "login":login, "password":password})
}

export async function registerUser(user){
    return  api.post('register',{ 
                "name":user.name, 
                "username":user.username, 
                "email":user.email, 
                "password":user.password, 
                "password_confirmation":user.password_confirmation
            })
}

export async function artistsList(page){
    return  api.get(`artists?page=${page}`)
}

export async function latestArtists(){
    return api.get('artists/latest')
}

export async function me(){
   return  api.get('me')
}