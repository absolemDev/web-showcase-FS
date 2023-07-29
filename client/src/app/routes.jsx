import { Navigate } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import MainPage from "./components/page/mainPage";
import MyShowcasesPage from "./components/page/myShowcasesPage";
import ShowcaseSettingsPage from "./components/page/showcaseSettingsPage";
import ProtectPage from "./components/page/protectPage";
import ShowcasePage from "./components/page/showcasePage";
import ProductPage from "./components/page/productPage";
import LoginPage from "./components/page/logInPage";
import ProfilePage from "./components/page/profilePage";
import ServicesLayout from "./layouts/servicesLayout";
import UserShowcasesLayout from "./layouts/userShowcasesLayout";

const routes = (isLoggedIn) => [
  {
    path: "",
    element: <Navigate to="/showcases" />
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "showcases",
        children: [
          { path: "", element: <MainPage /> },
          {
            path: ":id",
            element: <ProtectPage component={ShowcasePage} path="/showcases" />
          }
        ]
      },
      {
        path: "products",
        children: [
          { path: "", element: <MainPage /> },
          {
            path: ":id",
            element: <ProtectPage component={ProductPage} path="/products" />
          }
        ]
      }
    ]
  },
  {
    path: "my-showcases",
    element: isLoggedIn ? (
      <UserShowcasesLayout />
    ) : (
      <Navigate to="/showcases" />
    ),
    children: [
      {
        path: "",
        element: <MyShowcasesPage />
      },
      {
        path: "create",
        element: <ShowcaseSettingsPage />
      },
      {
        path: ":id",
        element: (
          <ProtectPage component={ShowcaseSettingsPage} path="/my-showcases" />
        )
      }
    ]
  },
  {
    element: <ServicesLayout />,
    children: [
      {
        path: "authorization/:type?",
        element: isLoggedIn ? <Navigate to="/showcases" /> : <LoginPage />
      },
      {
        path: "profile",
        element: !isLoggedIn ? <Navigate to="/showcases" /> : <ProfilePage />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/showcases" />
  }
];

export default routes;
