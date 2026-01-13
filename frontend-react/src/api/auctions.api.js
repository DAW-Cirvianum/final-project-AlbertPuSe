import { api } from "./api";

export async function auctionsList(){
    return api.get('auctions');
}

export async function auctionsById(id){
    return api.get(`auctions/${id}`);
}

