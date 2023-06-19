import React, { FC } from "react";
import Logo from "../components/Logo/Logo";
import Footer from "../components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import ListOfAuthors from "./ListOfAuthors/ListOfAuthors";
import NotFound from "./NotFound/NotFound";
import ViewRoutes from "../routes/routes";

const Root: FC = () => {
  return (
    <BrowserRouter>
      <div className="main-wrapper" data-testid="root">
        <Logo />
        <Routes>
          <Route path={ViewRoutes.Home} element={<Home />} />
          <Route
            path={`${ViewRoutes.ListOfAuthors}/*`}
            element={<ListOfAuthors />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Root;
