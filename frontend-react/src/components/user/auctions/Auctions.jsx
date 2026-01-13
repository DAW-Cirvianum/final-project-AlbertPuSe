import AuctionCard from "./AuctionCard"

export default function Auctions({data}){

    function showAuctions(){
        return data.map(a=><AuctionCard key={a.id} auction={a}/>)
    }

    return(
        <>
            {showAuctions()}
        </>
    )
}