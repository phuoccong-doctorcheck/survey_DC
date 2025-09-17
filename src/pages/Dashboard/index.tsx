/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Typography from 'components/atoms/Typography';
import PublicLayout from 'components/templates/PublicLayout';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuCRM } from 'utils/staticState';

import introDc from 'assets/images/intro_dc.jpg';

export interface FormAddTodoStep {
  id: number;
  name: string;
  isDone: boolean;
}

const Dashboard: React.FC = () => {
  const navigators = useNavigate();
  const year_of_birth = Cookies.get('year_of_birth');
  const customer_id = Cookies.get('customer_id');
  const customer_fullname = Cookies.get('customer_fullname');
  const gender = Cookies.get('gender');
  // const location = useLocation();
  //  const getAuthKey = (): string | null => {
  //   // Sử dụng URLSearchParams để lấy giá trị authkey
  //   const params = new URLSearchParams(location.search);
  //   return params.get("authkey");
  // };

  // const authKey = getAuthKey();
  // console.log(authKey)
  // useEffect(() => {
  //   if (authKey === null) {
  //     navigators("/sss")
  //   }
  //   else {
  //     console.log(123)
  //   }
  // },[authKey])
  return (
    <PublicLayout>
    <div className="p-dashboard">
        
          <div style={{width:"100vw",height:"auto",background:"#fff",borderRadius:"6px",padding:"10px",marginBottom:"10px"}}>
            <Typography content="Trang chủ" modifiers={['16x28', 'jet', '600',"uppercase"]} styles={{color:"#27acfd"}}/>

     
         
        </div>
         <div
              className="m-form_add_customer-booking_box_header"
              style={{ alignItems: "end", justifyContent: "space-between", display:"block",background:"white", padding:"10px" ,borderRadius:"6px"}}
            >
              
          <div style={{  alignItems:"center", justifyContent:"space-between"}}>
            <div style={{ display: "flex", alignItems: "center", gap:"5px"}}> <Typography content={"Họ tên:"} modifiers={['15x22', '500', 'center']} />    <Typography content={customer_fullname} modifiers={['15x22', '500', 'center']} styles={{fontWeight:"600"}}/> </div> 
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}> <Typography content={"Giới tính:"} modifiers={['15x22', '500', 'center']} />    <Typography content={gender} modifiers={['15x22', '500', 'center']}  /> - 
            <Typography content={"Năm sinh:"} modifiers={['15x22', '500', 'center']} />    <Typography 
  content={year_of_birth}
  modifiers={['15x22', '500', 'center']} 
/>
            </div> 
            {/* <div style={{ display: "flex", alignItems: "center", gap:"5px"}}> <Typography content={"Điện thoại:"} modifiers={['15x22', '500', 'center']} />   <Typography 
  content="0869154692"
  modifiers={['15x22', '500', 'center']} 
/>
</div>  */}
              <div style={{ display: "flex", alignItems: "center", gap:"5px"}}> <Typography content={"Mã bệnh nhân:"} modifiers={['15x22', '500', 'center']} />   <Typography content={customer_id}  modifiers={['15x22', '500', 'center']} />
</div> 
          </div>
          {/* <div style={{ display: "flex", alignItems:"center", justifyContent:"space-between"}}>
            <div style={{ display: "flex", alignItems: "center", gap:"5px"}}> <Typography content={"Địa chỉ:"} modifiers={['15x22', '500', 'center']} />    <Typography content="429 Tô Hiến Thành Quận 10" modifiers={['15x22', '500', 'center']}/> </div> 
           
          </div> */}
        </div>
        <div style={{ height: "70%", display: "flex", justifyContent: "center",alignItems:"center"}}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
            <div style={{background:"#0489dc", padding:"8px",borderRadius:"8px", width:"fit-content" ,color:"white", cursor:"pointer", marginBottom:"10px"}} className='buttonD' onClick={() => {navigators("/survey")}}>
                      TRẢ LỜI 18 CÂU HỎI SÀNG LỌC VỀ TIỀN SỬ BỆNH LÝ
            </div> 
            <p>Bạn vui lòng nhấn vào nút trên để bắt đầu trả lời 18 câu hỏi sàng lọc về tiền sử bệnh lý trước khám!</p>
          </div>
            </div>
      </div>
    </PublicLayout>
  );
};
export default Dashboard;
