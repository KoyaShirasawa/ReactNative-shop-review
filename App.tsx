import React, { useState } from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { UserContext } from "./src/contexts/userContext";
import { User } from "./src/types/user";
import { ReviewsContext } from "./src/contexts/reviewsContext";
import { Review } from "./src/types/Review";

export default function App() {
  const [user, setUser] = useState<User | null>();
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ReviewsContext.Provider value={{ reviews, setReviews }}>
        <AppNavigator />
      </ReviewsContext.Provider>
    </UserContext.Provider>
  );
};
