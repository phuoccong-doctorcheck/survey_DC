/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/order */
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Notifications } from "react-push-notification";
import "./App.scss";
import "./i18n";
import Loading from "components/atoms/Loading";
import { QueryClient, QueryClientProvider } from "react-query";
import { DEFAULT_QUERY_OPTION } from "utils/constants";
import { Provider } from "react-redux";
import { persistor, store } from "store";
import Authentication from "pages/Authentication";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "pages/Profile";
import MultiChannel from "pages/MultiChannel";
import DetailCustomer from "pages/DetailCustomer";
import CommingSoon from "pages/CommingSoon";
import MedicalApointmentList from "pages/BeforeMedicalExamination";
import AfterMedicalExamination from "pages/AfterMedicalExamination";
import BookingSchedule from "pages/BookingSchedule";
import MissCall from "pages/MissCall";
import Setting from "pages/Setting";
import CReport from "pages/Report";
import AppointmentView from "pages/AppointmentView";
import LoginWithLink from "pages/LoginWithLink";
import NoPermission from "components/templates/NoPermission";
import PagePending from "pages/PagePending";
import NotFoundCustomer from "pages/NotFoundCustomer";
import ErrorPage from "pages/ErrorPage";
import ManagerTask from "components/templates/ManagerTask";
import MonitoringMissedCall from "pages/MonitoringMissedCall";
import Affiliate from "pages/Affiliate";
import ApproveCommissions from "pages/ApproveCommissions";
import ReportGrowthClinic from "pages/ReportGrowthClinic";
import CompareGrowth from "pages/CompareGrowth";
import ReportChannel from "pages/ReportChannel";
import HistoriesCall from "pages/HistoriesCall";
import PointManagement from "pages/PointManagement";
import Campaigns from "pages/Campaigns";
import CustomerLeads from "pages/CustomerLeads";
import PreviewNewFeature from "pages/PreviewNewFeature";
import FormerCustomerReferrals from "pages/FormerCustomerReferrals";
import CustomerAllowFType from "pages/CustomerAllowFType";
import BusinessPlan from "pages/BusinessPlan";
import Manage_Task from "pages/Manage_Task";
import ChartSalers from "pages/ChartSalers";
import ManageKPIs from "pages/Manage_KPIs";
import CashFlow from "pages/CashFlow";
import SeenReport from "pages/SeenReport/SeenReport";
import SeenMedicalRecord from "pages/SeenMedicalRecord/SeenMedicalRecord";
import ThankYou from "pages/ThankYou";
import LoginOTP from "components/templates/LoginOTP";
import AuthenticationOTP from "pages/AuthenticationOTP";
import Survey from "pages/Survey";
import AuthenticationChooseCus from "pages/AuthenticationChooseCus";
import RegisterAppointment from "pages/RegisterAppointment";
import VerifyProfileCustomer from "pages/VerifyProfileCustomer";
import SurveyForm from "pages/SurveyForm";
import CheckInPage from "pages/CheckInPage";
import ResultPage from "pages/ResultPage";

const routes = [
  {
    path: "/pending",
    element: <PagePending />, // pending
  },


  // {
  //   path: '/reports',
  //   element: <CReport />, // thống kê
  // },
  {
    path: "/not-have-permission",
    element: <NoPermission />, // Không có quyền truy cập
  },
  // {
  //   path: '/customer-not-found/:phone',
  //   element: <NotFoundCustomer />, // Không tìm thấy khách hàng có sdt gọi đến
  // },
  {
    path: "/error",
    element: <ErrorPage />, // trang lỗi
  },

  // {
  //   path: '/monitor',
  //   element: <MonitoringMissedCall />, // trang lỗi
  // },
  // {
  //   path: '/affiliate',
  //   element: <Affiliate />, // trang lỗi
  // },
  // {
  //   path: '/approve-commissions',
  //   element: <ApproveCommissions />, // trang lỗi
  // },
  // {
  //   path: '/point-management',
  //   element: <PointManagement />, // trang lỗi
  // },
  // {
  //   path: '/campaign',
  //   element: <Campaigns />, // trang lỗi
  // },
  // {
  //   path: '/customer-leads',
  //   element: <CustomerLeads />, // trang lỗi
  // },
  // {
  //   path: '/wom',
  //   element: <FormerCustomerReferrals />, // trang lỗi
  // },
  //   {
  //   path: '/manage-task',
  //   element: <Manage_Task />, // trang lỗi
  // },
  // {
  //   path: '/preview-new-feature',
  //   element: <PreviewNewFeature />, // trang lỗi
  // },
  // {
  //   path: '/customer-f-type',
  //   element: <CustomerAllowFType />, // trang lỗi
  // },

  {
    path: "/survey",
    element: <Survey />, // trang lỗi
  },
   {
    path: "/formsurvey",
    element: <SurveyForm />, // trang lỗi
  },
  //  {
  //   path: '/chart',
  //   element: <ChartSalers />, // trang xem biểu đồ của các CSKH
  // },
  // {
  //   path: '/mangage-kpi',
  //   element: <ManageKPIs />, // trang xem KPI tháng
  // },
  {
    path: "*",
    element: <CommingSoon />, // đang phát triển
  },
   {
    path: "/",
    element: <CommingSoon />, // đang phát triển
  },
  {
    path: "/profile-addition",
    element: <Authentication />, // trang lỗi
  },
   {
    path: "/checkin",
    element: <CheckInPage />, // trang lỗi
  },
  {
    path: "/verify-profile",
    element: <VerifyProfileCustomer />, // trang lỗi
  },
   {
    path: "/:id",
    element: <ResultPage />, // trang lỗi
  },
];
const queryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_OPTION,
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename="/">
            <Suspense fallback={<Loading variant="fullScreen" />}>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={`route-${index.toString()}`}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="colored"
              />
            </Suspense>
          </BrowserRouter>
          <Notifications />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
