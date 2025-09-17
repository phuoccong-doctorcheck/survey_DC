/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Typography from 'components/atoms/Typography';
import PublicLayout from 'components/templates/PublicLayout';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuCRM } from 'utils/staticState';

import introDc from 'assets/images/intro_dc.jpg';

export interface FormAddTodoStep {
  id: number;
  name: string;
  isDone: boolean;
}

const ThankYou: React.FC = () => {
    const navigators = useNavigate();
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
        
        
        <div style={{ height: "80%", display: "flex", justifyContent: "center",alignItems:"center"}}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
            
 
    <div
      style={{
        maxWidth: "80%",
        textAlign: "left",
        fontSize: "16px",
        fontWeight: "600",
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
        display: "flex",
        alignItems: "flex-start",
        gap: "15px",
      }}
    >
      {/* Icon hoặc ảnh */}
     

      {/* Nội dung thông báo */}
      <div>
        <p style={{ margin: 0, marginBottom: "10px", color: "#333" }}>
         
          Bạn đã hoàn thành trả lời bộ câu hỏi!
        </p>
        <p style={{ margin: "10px 0", lineHeight: "1.6", color: "#333" }}>
          Cảm ơn bạn đã cung cấp đầy đủ thông tin để các Bác sĩ nắm rõ tiền sử bệnh lý của bạn, qua đó có những phương án phù hợp để thăm khám và tầm soát bệnh cho bạn được chính xác và chu đáo nhất.
        </p>
        <p style={{ margin: "10px 0", lineHeight: "1.6", color: "#333" }}>
          <strong>Thông tin này hoàn toàn được bảo mật.</strong>
        </p>
        <p style={{ marginTop: "10px", color: "#333" }}>
          Cảm ơn bạn đã hợp tác & Trân trọng cảm ơn bạn rất nhiều!
        </p>
      </div>
            </div>
            <div style={{background:"#00556e", padding:"8px",borderRadius:"4px", width:"fit-content" ,color:"white", cursor:"pointer", marginBottom:"10px"}} className='buttonD' onClick ={() => navigators("/")}>
                     Kết thúc
            </div> 
          </div>
            </div>
      </div>
    </PublicLayout>
  );
};
export default ThankYou;
