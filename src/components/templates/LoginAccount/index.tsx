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

const LoginAccount: React.FC<FormLoginProps> = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const [dataLogin, setDataLogin] = useState({
    username: '', password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ username: '' });

  const { mutate: loginAccount } = useMutation(
    'post-footer-form',
    (data: any) => loginWithAccount(data),
    {
      onSuccess: (data: any) => new Promise((resolve, reject) => {
        try {
          setLoading(false);
      
          // const {
          //   roles, lastname, employee_signature_name, employee_id, fullname, employee_team_id, username, department_id, mainscreen, erp_code, token, employee_group, user_call_agent, user_country_id, user_country_phone_prefix, pancakeToken, ...prevData
          // } = data.data;
          // Cookies.set('token', `DC${token}`);
        
       
          if (data.data.k === "VERIFY_SUCCESS") {
              Cookies.set('repository', JSON.stringify({
            career: data.data.c.career || "",
            customer_address: data.data.c.customer_address,
            customer_email: data.data.c.customer_email,
            customer_full_address: data.data.c.customer_full_address,
            customer_fullname: data.data.c.customer_fullname,
            customer_id: data.data.c.customer_id,
            customer_identity_card: data.data.c.customer_identity_card,
            year_of_birth: data.data.c.year_of_birth,
          }),
            { expires: new Date(new Date().getTime() + (20 * 60 * 60 * 1000)) }); // thời gian hết hạn là 20 giờ
          Cookies.set('customer_id', data.data.c.customer_id);
          Cookies.set('customer_phone', data.data.c.customer_phone);
           Cookies.set('customer_fullname', data.data.c.customer_fullname);
           Cookies.set('year_of_birth', data.data.c.year_of_birth);
            Cookies.set('otp', data.data.otp);
              Cookies.set('gender', data.data.c.gender.name);
            navigator('/verify-otp');
          }
          else {
          
            localStorage.setItem("customers", JSON.stringify(data.data.c));
//            Cookies.set('customerData', JSON.stringify(data.data.c), {
//     expires: 20 / 24 // 20 giờ = 20 / 24 ngày
// });
            // Cookies.set('customer_phone', data.data.c.customer_phone);
            Cookies.set('otp', data.data.otp);
             navigator('/verify-otp-cus');
           }
           resolve(true);
        } catch (err) {
          console.log("🚀 ~ file: index.tsx:96 ~ onSuccess: ~ err:", err)
          reject(err);
        }
      }),
      onError: () => {
        setError({ username: 'SĐT không chính xác !' });
        toast.error('Vui lòng kiếm tra lại số điện thoại!');
        setLoading(false);
      },
    },
  );

  const handleValidate = () => {
    if (!dataLogin.username?.trim() ) {
      
        setError({ ...error, username: !dataLogin.username?.trim() ? 'Tài khoản là trường bắt buộc !' : '' });
     
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!handleValidate()) return;
    setError({ username: '' });
    setLoading(true);
    await loginAccount({ phone_number: dataLogin.username });
  };

  return (
    <div className="t-loginaccount">
      <form>
        <Input
          id="user_name"
          type='number'
          placeholder="Nhập số điện thoại"
          label="Đăng nhập SĐT"
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
              content="đăng nhập"
              modifiers={['500', '18x32', 'capitalize', 'white']}
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

LoginAccount.defaultProps = {
  children: undefined,
};

export default LoginAccount;
