//グローバルで使える変数 Context

import { createContext } from "react";
import { Review } from "../types/Review";

type ReviewsContextValue = {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
};

export const ReviewsContext = createContext<ReviewsContextValue>({
  reviews: [],
  setReviews: () => {},
});
