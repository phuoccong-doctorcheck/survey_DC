/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from 'components/atoms/Image';
import Container from 'components/organisms/Container';
import LoginAccount from 'components/templates/LoginAccount';
import LoginOTP from 'components/templates/LoginOTP';
import React, { useEffect, useState } from 'react';

import logo from 'assets/images/dtc_shot_logo.png';


const Authentication: React.FC = () => (
  <div className="p-anthentication">
    <Container modifiers={['formLogin']}>
      <Image src={logo} ratio="300x100" size="contain" />
      <LoginOTP />
    </Container>
  </div>
);

export default Authentication;
