/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-const-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { AnyAction } from "@reduxjs/toolkit";
import { Layout, Spin } from "antd";
import Footer from "components/Footer";
import SubNav from "components/SubNav";
import Typography from "components/atoms/Typography";
import MenuItem, { ItemMenu } from "components/molecules/MenuItem";
import UserDropdown from "components/molecules/UserDropdown";
import CDrawer from "components/organisms/CDrawer";
import Cookies from "js-cookie";
import _ from "lodash";
import React, { createContext, useEffect, useLayoutEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCustomerWhenCallIn,
  getPackagesDetail,
} from "services/api/dashboard";
import { UserCallAgent } from "services/types";
import { getInitAfterExams } from "store/afterexams";
import { getListResourceCRM } from "store/home";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getListPageWithPancake } from "store/pancake";
import mapModifiers from "utils/functions";
import { MenuCRMMobile } from "utils/staticState";

import HeaderNav from "../HeaderNav";
import SideNav from "../SideNav";
import { CallConnect, useSip } from "../SipProvider";
import Telephone from "../Telephone";

import { getUserMedia, handleLogin } from "./index.controller";

//import imgUser from 'assets/images/icon_profile.svg'
import imgUser1 from "assets/images/profile.png"
import logo from 'assets/images/short_logo.svg';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

interface SoftPhoneProvider {
  handleOpenDial?: (any: CallConnect) => void;
}

interface PublicLayoutProps {
  children?: React.ReactNode;
  isLoadings?: boolean;
  isShowPopupChat?: boolean;
  isShowPopupTelephone?: boolean;
  widthScreen?: number;
}

export const SoftPhoneContext = createContext<SoftPhoneProvider>({} as SoftPhoneProvider);

const PublicLayout: React.FC<PublicLayoutProps> = ({
  children = undefined,
  widthScreen,
  isLoadings,
  isShowPopupChat = false,
  isShowPopupTelephone = false,
}) => {
  const dispatch = useAppDispatch();
  const navigators = useNavigate();

  const { connect, register, makeCall, transfer, hangupCall, AcceptCall, setExternalNumber, stateCall, externalNumber, stateConnect, handleSetStateConnect, handleSetStateCall, handleSetCustomerName } = useSip();
  const configAgent = localStorage.getItem('user_call_agent');
  const storeListPage = useAppSelector((state) => state.pancake.respListPage);

  const [configTele, setcConfigTele] = useState<UserCallAgent>(configAgent ? JSON.parse(configAgent) as unknown as UserCallAgent : undefined as any);
  const [loadingPage, setLoading] = useState<boolean>(true);
  const checkToken = Cookies.get("customer_id");
  const getFullName = Cookies.get("fullname");
  const storageDms = localStorage.getItem('dms');
  const getRoles = localStorage.getItem('roles');
  const [listRoles, setListRoles] = useState(getRoles ? JSON.parse(getRoles) : '');

  const [collapsedSider, setCollapsedSider] = useState<boolean>(true);
  const [stateDms, setstateDms] = useState<string>(storageDms ? JSON.parse(storageDms) : null);
  const [stateBreakPoint, setstateBreakPoint] = useState(window.innerWidth);


  // Lắng nghe sự kiện lấy kích cỡ màn hình màn hình
  useEffect(() => {
    window.addEventListener("resize", () => {
      setstateBreakPoint(window.innerWidth);
    });
  }, []);

  const [infoCommingPhone, setInfoCommingPhone] = useState({
    nameCustomer: "",
    type: "",
    launch_source: "",
  });






 



  useEffect(() => {
    if (loadingPage) {
      const timeOut = setTimeout(() => {
        setLoading(false);
      }, 1500);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [loadingPage]);

 
  // kiếm tra có token hay không, không có token thì chuyển hướng đến pending và sau đó có sự kiện F5 để load lại trang => chuyển về trang login
 

    const OptionUser = [
    { id: 1, label: 'Đổi mật khẩu', value: '/profile', handleClick: () => { } },
    { id: 2, label: 'đăng xuât', value: '/logout', handleClick: () => { } },
  ];
    const username = useAppSelector((state) => state.home.shortName);
    const [name, setName] = useState(username);
     const [shortname, setshortname] = useState('');

  const getName = Cookies.get('fullname');

  const getshortname = Cookies.get('lastname');
   useEffect(() => {
    
    if (getName) {
      setName(getName);
    } else {
      setName(username);
    }
    if (getshortname) {
      setshortname(getshortname);
    } else {
      setName(Cookies.get('shortname') || '');
    }
  }, [username, getshortname]);
  //  useEffect(() => {
   
  //   if (!checkToken) {
  //     window.history.pushState(null, "", "/pending");
  //     window.location.reload();
  //   }
  // }, []);
  return (
    <div>
     <div style={{position:"absolute", top:"6px",right:"6px", zIndex:1000, fontSize:"14px"}}></div> 
      <Layout>
        <div className="t-layouts">
          {checkToken && (
            <Spin
              spinning={loadingPage}
              size="large"
              indicator={
                <img
                  className="loader"
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: 'cover',
                    backgroundColor: 'transparent',
                  }}
                  src={logo}
                />
              } >
              {/* Thanh header */}
              <HeaderNav
                handleClickMenuItem={() => {
                  setLoading(true);
                }}
                // có nghĩa là khi mà truyền 1 số nhỏ hơn 1280 thì nó sẽ là true thì thực hiện 1 số tác vụ
                isSortHeader={Number(stateBreakPoint) <= 1280}
                 // có nghĩa là khi mà truyền 1 số để thực hiện login code bên thanh header
                currentWidth={Number(stateBreakPoint)}
                handleLogin={handleLogin}
                handleClickLogo={() => {
                  if (stateBreakPoint > 1280) {
                     const roles1 = Cookies.get('roles');

          // Kiểm tra nếu chuỗi không phải là `undefined` hoặc `null`, thì parse nó thành mảng
          const rolesArray = roles1 ? JSON.parse(roles1) : [];
          console.log(rolesArray[0]?.role_name)
          if (rolesArray[0]?.role_name === "businessplan")
          {
               navigators('/bussiness-plan');
          }
          else if (rolesArray[0]?.role_name === "cashflow")
          {
            navigators('/cash-flow');
          }
          else {
           navigators('/not');
          }
                    sessionStorage.setItem('indexMenu', `2`)
                  } else {
                    setCollapsedSider(!collapsedSider)
                  }
                }}
              />
              {/* <SubNav/> */}
              {/* Đây là thanh SideNav kế bên   */}
              <div className="t-layouts_wrapper">
                {/* {
                  stateBreakPoint > 1280 &&
                  <SideNav widthNav={220} navCollapsed={collapsedSider} handleClickTelephone={() => {
                    handleSetStateConnect('dial');
                  }}
                    handleHoverSideNav={(value: boolean) => setCollapsedSider(value)}
                  />
                } */}
                <main className="t-layouts_main">
                  <SoftPhoneContext.Provider value={{
                    handleOpenDial: (value) => {
                      handleSetStateConnect(value)
                    },
                  }}>
                    {children}
                  </SoftPhoneContext.Provider>
                </main>
              </div>
              <Footer/>
            </Spin>
          )}
        </div>
      </Layout >
      {
        // Khi mà chiều dài màn hình nhỏ hơn 1280 thì CDrawer sẽ hiện ra ( nó là cái thanh SideNav), nó được mở khi bấm vào biểu logo Công ty
        stateBreakPoint <= 1280 &&
        <CDrawer
          isOpen={!collapsedSider}
          className="customize-menu-mobile"
          widths={260}
          positon="left"
          handleOnClose={() => {
            setCollapsedSider(!collapsedSider);
            }}

          >
            {/* MenuItem là menu phụ kia mà responsive */}
          <div className="t-layouts_menu_mobile">
            <MenuItem optionMenu={MenuCRMMobile as ItemMenu[]} handleClickItem={() => {
            }} />
          </div>
        </CDrawer>
      }

      {/* Đoạn code này là thư viện hiển thị cái điện thoại */}
      <div
        className={mapModifiers("t-layouts_wrapper_telephone-show",)}
      >
        <Telephone
          handleAccept={() => { AcceptCall(); }}
          handleHangUp={() => { hangupCall(); setExternalNumber(undefined as any); handleSetStateCall('none') }}
          customerNameRinging={infoCommingPhone.nameCustomer}
          customerInfo={`${infoCommingPhone.type === "customer" ? "Đã đặt lịch" : "Chưa đặt lịch"}`}
          phone={externalNumber}
          isOpen={!_.isUndefined('')}
          handleClosePhone={() => { handleSetStateConnect('connecting'); }}
          handleClickToCall={(val: string) => { makeCall(val); }}
          handleTranferToCall={(val: string) => { transfer(val, 'BLIND'); }}
          handleCallOutGoing={(phone: string) => {
            handleSetStateConnect('connected');
            handleSetStateCall('callout');
            makeCall(phone);
          }}
          stateCall={stateCall}
          stateConnect={stateConnect}
        />
      </div>
    </div >
  );
};

// PublicLayout.defaultProps = {
//   children: undefined,
//   isShowPopupChat: false,
//   isShowPopupTelephone: false,
// };

export default PublicLayout;