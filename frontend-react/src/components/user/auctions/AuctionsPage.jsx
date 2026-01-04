import { useTranslation } from "react-i18next"

export default function AuctionsPage(){
    const {t}=useTranslation();
    return(
        <>
            <h1>{t('Auctions')}</h1>
        </>
    )
}