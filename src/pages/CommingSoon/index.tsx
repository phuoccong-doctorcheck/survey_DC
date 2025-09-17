/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from 'components/atoms/Button';
import Typography from 'components/atoms/Typography';
import PublicLayout from 'components/templates/PublicLayout';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import imgErr from 'assets/images/error.png';

const CommingSoon: React.FC = () => {
  const navigator = useNavigate();

  return (
      <div className="p-comming_soon">
        <div className="p-comming_soon_wrap">
          <div className="p-comming_soon_wrap_title">
           
            <Button onClick={() =>  window.location.href = 'https://www.doctorcheck.vn/'}>
              <Typography type="p" content="Quay lại trang chủ" />
            </Button>
          </div>
          <div className="p-comming_soon_wrap_img">
            <img src={imgErr} alt="error" />
          </div>
        </div>
      </div>
  );
};

export default CommingSoon;
