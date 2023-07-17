/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import Input from "./Input";
import WhiteBox from "./Box";
import StarsRating from "./StarsRating";
import Textarea from "./Textarea";
import PrimaryButton from "./PrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;
const Subtitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;
const ReviewsWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #cce;
  padding-top: 10px;
  h3 {
    margin: 3px 0;
    padding: 0;
    font-size: 1rem;
  }
  p {
    margin: 0;
    margin-bottom: 30px;
    font-size:0.9rem;
    line-height:1rem;
  }
`;
const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  time{
    font-size: 14px;
    font-weight: bold;
    color: gray;
  }
  
`


export default function ProductReviews({product}) {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [stars,setStars] = useState(0);
  const [reviews,setReviews] = useState([])
  const  [reviewsLoading,setReviewsLoading] = useState(false);


  function submitReview() {
    const data = {title,description,stars,product:product._id};
    axios.post('/api/reviews', data).then(res => {
      setTitle('');
      setDescription('');
      setStars(0);
      loadReviews()
    });
  }
  useEffect(() =>{
    loadReviews()
    
  },[])

  function loadReviews(){
    setReviewsLoading(true)
    axios.get("/api/reviews?product="+product._id).then(res => {
        setReviews(res.data)
            setReviewsLoading(false)

  })
}

  return (
    <div>
      <Title>Reviews</Title>
      <ColsWrapper>
        <div>
          <WhiteBox>
            <Subtitle> Add review</Subtitle>
            <div>
              <StarsRating onChange={(n) => setStars(n)}></StarsRating>
            </div>

            <Input
              onChange={(ev) => setTitle(ev.target.value)}
              value={title}
              placeholder="Title"
            ></Input>
            <Textarea
              onChange={(ev) => setDescription(ev.target.value)}
              value={description}
              placeholder="Was is good? Pros? Cons?"
            ></Textarea>
            <div>
              <PrimaryButton onClick={submitReview} className="primary">
                Submit your review
              </PrimaryButton>
            </div>
          </WhiteBox>
        </div>
        <div>
          <WhiteBox>
            <Subtitle> All reviews</Subtitle>
            {reviewsLoading && <Spinner fullWidth={true}></Spinner>}
            {reviews.length === 0 && <p>No reviews :(</p>}
            {reviews.length > 0 &&
              reviews.map((review) => (
                <ReviewsWrapper key={reviews.productId}>
                  <ReviewHeader>
                    <StarsRating
                      size={"sm"}
                      disabled={true}
                      defaultHowMany={review.stars}
                    ></StarsRating>
                    <time>
                      {new Date(review.createdAt).toLocaleString("sv-SE")}
                    </time>
                  </ReviewHeader>
                  <h3>{review.title}</h3>
                  <p> {review.description}</p>
                </ReviewsWrapper>
              ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
};
