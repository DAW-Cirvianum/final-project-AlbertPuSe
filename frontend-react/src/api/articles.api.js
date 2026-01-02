import { api } from "./api";

export async function articleList(page){
    return api.get(`articles?page=${page}`);
}