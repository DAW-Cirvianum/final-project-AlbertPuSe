import { api } from "./api";

export async function myArticles() {
    return api.get('artist/my-articles');
}

export async function articleList(page){
    return api.get(`articles?page=${page}`);
}

