import { api } from "./api";

export async function forumList(page) {
    return api.get(`forum/topics?page=${page}`);
}

export async function topic_Id(id) {
    return api.get(`forum/topics/${id}`);
}