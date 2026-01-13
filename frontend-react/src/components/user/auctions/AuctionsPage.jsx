import { useTranslation } from "react-i18next"
import { auctionsList } from "../../../api/auctions.api";
import Pagination from "../../Pagination";
import Auctions from "./Auctions";

export default function AuctionsPage(){
    const {t}=useTranslation();
    return(
        <>
            <h1>{t('Auctions')}</h1>
            <Pagination request={auctionsList}> 
            {(data)=><Auctions data={data}/>}
            </Pagination>
        </>
    )
}