import React from "react";
import Map from "./components/Map";
import Search from "./components/Search";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Map />
      <Search />
    </div>
  );
}
