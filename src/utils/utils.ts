export const countRating = (reviews: UserReview[]): number => {
  let sum = 0;
  if (reviews.length === 0) return 0;
  
  reviews.forEach((review) => {
    sum += review.rating;
  });
  return sum / reviews.length;
}