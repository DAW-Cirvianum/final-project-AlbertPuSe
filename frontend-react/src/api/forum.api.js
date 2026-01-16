import { api } from "./api";

export async function myTopics(page) {
    return api.get(`artist/my-topics?page=${page}`);
}

export async function forumList(page) {
    return api.get(`forum/topics?page=${page}`);
}

export async function topic_Id(id) {
    return api.get(`forum/topics/${id}`);
}

export async function createTopic(data){
    return api.post('artist/forum/topic/create', data)
}

export async function createComment(id,data){
    return api.post(`forum/topics/${id}/comment/create`, data)
}

export async function deleteTopic(id){
    return api.delete(`topics/${id}/delete`)
}

