import React from 'react'

const RatingAndReview = () => {
    const reviewAndRating=[
        {
            imageUrl:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        },
        {},
        {},
        {}
    ]
  return (
    <div>
      <div data-forhalf="*">
      ★
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default RatingAndReview
