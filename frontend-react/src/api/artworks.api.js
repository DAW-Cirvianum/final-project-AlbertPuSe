import { api } from "./api";

export async function myArtworks(){
    return api.get('artist/my-artworks')
}

export async function artworksList(page){
    return api.get(`artworks?page=${page}`)
}

export async function latestArtworks(){
    return api.get('artworks/latest')
}

export async function relatedArtworks(id) {
    return api.get(`artworks/${id}/related`)
}

export async function artworkById(id){
    return api.get(`artworks/${id}`)
}

export async function artTypes(){
    return api.get('types')
}

export async function tags(){
    return api.get('tags')
}

export async function createArtwork(data){
    return await api.post('/artist/artwork/create', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export async function deleteArtwork(id){
    return await api.delete(`/artworks/${id}/delete`);
}

export async function modifyArtwork(id,data){
    return await api.patch(`/artworks/${id}/modify`,data);
}