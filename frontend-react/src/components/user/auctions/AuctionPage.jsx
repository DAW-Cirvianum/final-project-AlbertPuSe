import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { auctionsById } from "../../../api/auctions.api";
import { useTranslation } from "react-i18next";

export default function AuctionPage(){
    const [auction,setAuction]=useState(null);
    const params= useParams();
    const {t}=useTranslation();

    useEffect(()=>{
        async function fetchAuction(){
            const res= await auctionsById(params.auctionId);
            setAuction(res.data.auction);
        }

        fetchAuction()
    },[])
    if(!auction){
        return <span>{t('Loading')}</span>
    }
    return(
        <>
            <h1>{auction.artwork}</h1>
        </>
    )
}