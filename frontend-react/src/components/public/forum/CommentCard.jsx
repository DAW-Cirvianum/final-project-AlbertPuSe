import { Card } from "react-bootstrap";

export default function CommentCard({comment}){
    return(
        <Card className="w-50" bg={'secondary'}>
            <Card.Header>
                <Card.Img src={comment.user.avatar} alt={`Avatar of ${comment.user.name}`}/>
                <Card.Text>{comment.user.created_at}</Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Text className='overflow-hidden'>
                    {comment.content}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}