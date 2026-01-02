import { api } from "./api";

export async function myArtworks(){
    return api.get('artist/my-artworks')
}

export async function artworksList(page){
    return api.get(`artworks?${page}`)
}

export async function latestArtworks(){
    return api.get('artworks/latest')
}

export async function artTypes(){
    return api.get('types')
}

export async function tags(){
    return api.get('tags')
}