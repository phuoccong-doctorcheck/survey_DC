/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from 'components/atoms/Image';
import Container from 'components/organisms/Container';
import LoginAccount from 'components/templates/LoginAccount';
import LoginOTP from 'components/templates/LoginOTP';
import LoginOTPCus from 'components/templates/LoginOTPCus';
import React, { useEffect, useState } from 'react';

import logo from 'assets/images/dtc_shot_logo.png';


const AuthenticationChooseCus: React.FC = () => (
  <div className="p-anthentication">
    
      <div style={{ minHeight: "25rem", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px 3px rgba(0, 0, 0, 0.1)", flexDirection:"column",padding:"16px",position:"relative",border:"1px solid #dbdbdb"}}>
         <LoginOTPCus />
      </div>
     
   
  </div>
);

export default AuthenticationChooseCus;
