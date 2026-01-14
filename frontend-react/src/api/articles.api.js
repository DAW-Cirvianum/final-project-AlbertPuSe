import { api } from "./api";

export async function myArticles() {
    return api.get('artist/my-articles');
}

export async function articleList(page){
    return api.get(`articles?page=${page}`);
}

export async function articleById(id) {
    return api.get(`articles/${id}`)
}

export async function createArticle(data){
    return await api.post('/artist/article/create', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export async function deleteArticle(id){
    return await api.delete(`/articles/${id}/delete`);
}

export async function modifyArticle(id,data){
    return await api.patch(`/articles/${id}/modify`,data);
}