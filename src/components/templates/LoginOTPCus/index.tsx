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
import { loginWithAccount, verifyByAuthcode } from 'services/api/Login';
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
interface Customer {
  customer_id: string;
  customer_type: string | null;
  customer_fullname: string;
  customer_phone: string;
  gender: {
    name: any;
    id:any
  };
  year_of_birth: any;
  gender_id:string
}
interface Gender {
  name: any;
  id:any
}

const LoginOTPCus: React.FC<FormLoginProps> = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const [dataLogin, setDataLogin] = useState({
    username: '', password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ username: '' });
  const otp = Cookies.get('otp');
const [data, setData] = useState<any>(null);
   const [customers, setCustomers] = useState<Customer[]>([]);

   useEffect(() => {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, []);
  console.log(customers)
  const { mutate: loginAccount } = useMutation(
    'post-footer-form',
    (data: any) => verifyByAuthcode(data),
    {
      onSuccess: (data: any) => new Promise((resolve, reject) => {
        try {
          setLoading(false);
          console.log(data)
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
             Cookies.set('gender', data.data.c.gender.name);
             navigator('/survey');
          }
          
        
          // if (data.data.k === "VERIFY_SUCCESS") {
          //  
          // }
          // else {
          //   navigator('/verify-otp-cus');
          //  }
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
      
        setError({ ...error, username: !dataLogin.username?.trim() ? 'OTP là trường bắt buộc !' : '' });
     
      return false;
    }
    return true;
  };

  const handleChoose = async (phone:any,id:any) => {
    if (!handleValidate()) return;
    setError({ username: '' });
    setLoading(true);
    const formattedString = `${id}-${phone}`;
    if (otp === dataLogin.username) {
      await loginAccount({ authcode: formattedString });
    }
    else {
      toast.error(`Mã OTP không chính xác. Vui lòng kiểm tra tin nhắn điện thoại để nhận mã OTP và nhập vào để xác thực!`)
    }
  };

  return (
    <div className="t-loginaccount" style={{border:"none"}}>
      <div>
        <Input
          id="user_name"
          type='number'
          placeholder="Nhập OTP"
          label=""
          autoFocus
          onChange={(e) => {
            setDataLogin({ ...dataLogin, username: e.target.value });
            setError({ ...error, username: '' });
          }}
          error={error.username}
          
          variant="simple"
          value={dataLogin.username}
        />
      <div>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>Tên</th>
     
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>Giới tính</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>Năm sinh</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f8f9fa' }}></th>
    </tr>
  </thead>
  <tbody>
    {customers.map((customer) => (
      <tr key={customer.customer_id}>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: '12px' }}>
          {customer.customer_fullname}
        </td>
       
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: '12px' }}>
          {customer?.gender_id === "F" ? "Nữ" : "Nam"}
        </td>
         <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontSize: '12px' }}>
          {customer.year_of_birth}
        </td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
          <button
            style={{
              padding: '4px 8px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() =>
              handleChoose(
                customer.customer_phone.replace('+84-', '0'),
                customer.customer_id
              )
            }
          >
            Chọn
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
        
      </div>
    </div>
  );
};

LoginOTPCus.defaultProps = {
  children: undefined,
};

export default LoginOTPCus;
