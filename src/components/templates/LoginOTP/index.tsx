/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginWithAccount } from 'services/api/Login';
import { InfoUserType } from 'services/types';
import { getMyTask } from 'store/customerInfo';
import { isLoading, isLogined } from 'store/example';
import {
  setInforUser,
  setInfoUserAgent,
  setRoleUser,
  setShortName,
  setTokenUser,
} from 'store/home';
import { useAppDispatch } from 'store/hooks';

interface FormLoginProps {
  children?: React.ReactNode;
}

const LoginOTP: React.FC<FormLoginProps> = () => {
  const navigator = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    username: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ username: '' });
  const otp = Cookies.get('otp');
  const customer_phone = Cookies.get('customer_phone');
  const handleValidate = () => {
    if (!dataLogin.username?.trim() ) {
      
        setError({ ...error, username: !dataLogin.username?.trim() ? 'OTP là trường bắt buộc !' : '' });
     
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!handleValidate()) return;
    setError({ username: '' });
    setLoading(true);
    if (dataLogin.username === otp) {
      navigator("/survey")
    }
    else {
      toast.error(`Mã OTP không chính xác. Vui lòng kiểm tra tin nhắn của số điện thoại ${customer_phone} để nhận mã OTP và nhập vào để xác thực!`)
      setLoading(false);
    }
  };

  return (
    <div className="t-loginaccount">
      <form>
        <Input
          id="user_name"
          type='number'
          placeholder="Nhập số OTP"
          label=""
          autoFocus
          onChange={(e) => {
            setDataLogin({ ...dataLogin, username: e.target.value });
            setError({ ...error, username: '' });
          }}
          error={error.username}
          handleEnter={onSubmit}
          variant="simple"
          value={dataLogin.username}
        />

        <div className="t-loginaccount_btn">
          <Button modifiers={['foreign']} isLoading={loading} disabled={loading} onClick={onSubmit}>
            <Typography
              content="Xác thực"
              modifiers={['500', '18x32', 'capitalize', 'white']}
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

LoginOTP.defaultProps = {
  children: undefined,
};

export default LoginOTP;
