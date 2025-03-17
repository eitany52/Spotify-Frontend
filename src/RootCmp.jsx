import { Routes, Route } from "react-router";
import { StationDetails } from "./cmps/StationDetails.jsx";
import { UserDetails } from "./cmps/UserDetails";
import { StationIndex } from "./pages/StationIndex.jsx";
import { SearchResult } from "./cmps/SearchResult.jsx";
import { DynamicModal } from "./cmps/DynamicModal";
import { UserMsg } from "./cmps/UserMsg.jsx";
import { LoginSignup } from "./pages/LoginSignup.jsx";
// import { ArtistDetails } from "./cmps/ArtistDetails";

export function RootCmp() {
  return (
    <>
      <UserMsg />
      <Routes>
        <Route path="/" element={<StationIndex />}>
          <Route path="/search/:userInput?" element={<SearchResult />} />
          <Route path="/station/:stationId" element={<StationDetails />} />
          <Route path="/user/:userId" element={<UserDetails />} />
          {/* <Route path="/artist/:artistId" element={<ArtistDetails />} /> */}
          {/* <Route path="/genre/:genreId" element={} /> */}
          {/* <Route path="/recent-searches" element={} /> */}
        </Route>
        <Route path="/:location" element={<LoginSignup />} />
      </Routes>
      <DynamicModal />
    </>
  );
}