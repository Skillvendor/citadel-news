import React from "react";
import { useMoralisQuery } from "react-moralis";
import HomePage from "./homePage";
import NewsPage from "./newsPage";

export default function LandingPage() {
  const { data } = useMoralisQuery("_Role", (query) =>
    query.equalTo("name", "Citizen")
  );

  return data.length > 0 ? <NewsPage /> : <HomePage />;
}
