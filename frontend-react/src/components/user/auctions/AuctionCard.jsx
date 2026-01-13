import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function AuctionCard({auction}){

    const {t}=useTranslation();
    return(
        <Card>
            <Card.Header>
                <div className="position-relative">
                    <Card.Img src={auction.artwork.image} alt={auction.artwork.title} />

                    {/* <div className="position-absolute top-0 start-0 w-100 h-100 
                                    bg-dark bg-opacity-50"></div> */}

                    <div className="position-absolute top-25 start-25 translate-middle text-white text-center">
                    <p>{auction.status}</p>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text>{auction.artwork.title}</Card.Text>
                <Card.Text>Auction starts at {auction.starts_at}</Card.Text>
                <Card.Text>Auction finish at {auction.ends_at}</Card.Text>
                <Card.Text>Initial ofert {auction.start_price}</Card.Text>
                <Card.Text>Actual ofert {auction.highest_bid.amount}</Card.Text>
                <Button as={Link} to={`/auctions/${auction.id}`}>{t('Make an offer')}</Button>
            </Card.Body>
        </Card>
    )
}