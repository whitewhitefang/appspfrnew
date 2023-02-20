import { truncate } from "../helpers";

const Review = props => {
  return (
    <div className="review text-start">
      <q className="review-text me-2">{props.review.content && truncate(props.review.content, 6)}</q>
      <cite className="review-author">{props.review.author}</cite>
    </div>
  );
}

export default Review;