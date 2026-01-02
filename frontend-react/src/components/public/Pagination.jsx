import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"

export default function Pagination({request ,children}){
    const [data, setData]= useState(null);
    const [pagination, setPagination]=useState(null);
    const [page, setPage]= useState(1);
    const {t}=useTranslation();
    useEffect(()=>{
        async function fetchArtists(){
            const res= await request(page);
            setData(res.data.data.data);
            setPagination({
                "current": res.data.data.current_page,
                "last": res.data.data.last_page,
                "next": res.data.data.next_page_url,
                "prev": res.data.data.prev_page_url,
            })
        }
        fetchArtists()
    },[page]);

    if(!pagination) return <p>{t('Loading')}</p>
    return(
        <>
            {children(data)}
            <div className="d-flex justify-content-between mt-3">
                <Button disabled={!pagination?.prev} onClick={() => setPage((p) => p - 1)}> Anterior </Button>
                <span>Página {pagination?.current} de {pagination?.last}</span>
                <Button disabled={!pagination?.next} onClick={() => setPage((p) => p + 1)}> Siguiente </Button>
            </div>
        </>
        )
    
}