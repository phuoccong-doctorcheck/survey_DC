import {   Button, Spin } from "antd";
import  { AddressData } from "components/atoms/AddressDropdown";
import BarcodeComponent from "components/atoms/BarCode";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import { useMutation } from "react-query";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { getAppointment, getDistrictsAPI, getProvincesAPI, getWardsAPI, } from "services/api/apiGetC";
import mapModifiers from "utils/functions";

import iconM from "assets/icons/icons-modify.png"
import iconQ from "assets/icons/icons-question.png"
import logoH from 'assets/images/LogoH.svg'
import logo from 'assets/images/short_logo.svg'
const VerifyProfileCustomer: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    phone: "",
    idCard: "",
    birthDate: undefined,
    birthMonth: undefined,
    birthYear: undefined,
    email: "",
    occupation: "",
    address: "",
    nation: "",
        city: undefined as unknown as AddressData,
        district: undefined as unknown as AddressData,
    ward: undefined as unknown as AddressData,
        city1: "",
        district1: "",
    ward1: "",
    status: "",
    allow_survey: false,
    master_date: "",
    master_id: "",
    customer_id: "",
    allow_update_profile: false,
    invoice_information:""
  });

 


console.log(formData.email === "")

  const [searchParams] = useSearchParams();
  const r = searchParams.get("r");


   const [listProvice, setListProvince] = useState<AddressData[]>();
    const [listDistrict, setListDistricts] = useState<AddressData[]>();
  const [listWard, setListWard] = useState<AddressData[]>();
    const [loadingPage, setLoading] = useState<boolean>(true);
     const [loadingAPI,] = useState<boolean>(false);
  // React Query lấy danh sách tỉnh, thành phố
    const { mutate: getProvinces } = useMutation(
      "post-footer-form",
      (id: string) => getProvincesAPI(id),
      {
        onSuccess: (data) => {
          const convertProvince: any[] = [];
          
          data.data.map((i: any) => { const province = { key: i.id, label: i.name, value: i.id }; convertProvince.push(province); });
          console.log(convertProvince)
          setListProvince([...convertProvince]);
           

        },
        onError: (err) => {
          console.error(err);
        },
      }
    );
     // React Query lấy danh sách quận, huyện
    const { mutate: getDistricts } = useMutation(
      "post-footer-form",
      (id: string) => getDistrictsAPI(id),
      {
        onSuccess: (data) => {
          const convertDistricts: any[] = [];
          data.data.map((i: any) => { const districts = { key: i.id, label: i.name, value: i.id }; convertDistricts.push(districts); });
          setListDistricts([...convertDistricts]);
        },
        onError: (err) => {
          console.error(err);
        },
      }
  );
  console.log(formData)
       // React Query lấy danh sách phường, xã
    const { mutate: getWards } = useMutation(
      "post-footer-form",
     (id: string) => getWardsAPI(id), {
      onSuccess: (data) => {
        const convertWard: any[] = [];
         data.data.map((i: any) => { const ward = { key: i.id, label: i.name, value: i.id }; convertWard.push(ward); });
         console.log(data,convertWard)
        setListWard([...convertWard]);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  useLayoutEffect(() => {

    // localStorage.setItem("coderef", JSON.stringify(coderef));
    // localStorage.setItem("codeauth", JSON.stringify(codeauth));
    getProvinces("VN")
  
    
    document.title = "Thông tin hồ sơ";
  }, []);

 

  const { mutate: getCustomerInfo } = useMutation(
    "post-footer-form",
    (data: any) => getAppointment(data),
    {
      onSuccess: async (data) => {
        console.log(data)
        if (data?.status) {
          
         
             if (data.data.client.province_id) {
        getDistricts(data.data.client.province_id);
      }
      if (data.data.client.province_id) {
        getWards(data.data.client.province_id);
      }
        
        }
       
      },
      onError: (error) => {
      
        console.error("🚀 ~ file: index.tsx:159 ~ error:", error);
      },
    }
  );

    const { mutate: getCustomerInfo2 } = useMutation(
    "post-footer-form",
    (data: any) => getAppointment(data),
    {
      onSuccess: async (data) => {
        console.log(data)
        if (data?.status) {
          const selectedProvince = listProvice?.find((province:any) => province.value === data.data.client.province_id);
          const selectedDistrict = listDistrict?.find((district: any) => district.value === data.data.client.district_id);
          const selectedWard = listWard?.find((ward: any) => ward.value === data.data.client.ward_id);
          console.log(listProvice)
          setFormData(
            {
              ...formData,
              status: data.data.status,
              master_id: data.data.master_id,
              master_date: data.data.master_date,
              allow_survey: data.data.allow_survey,
              allow_update_profile: data.data.allow_update_profile,
              fullName: data.data.client.customer_fullname,
              gender: data.data.client.gender_id,
              phone: data.data.client.customer_phone,
              idCard: data.data.client.customer_identity_card,
              birthDate: data.data.client.day_of_birth,
              birthMonth: data.data.client.month_of_birth,
              birthYear: data.data.client.year_of_birth,
              customer_id: data.data.client.customer_id,
              address: data.data.client.customer_address,
              district: data.data.client.district_id,
              ward: data.data.client.ward_id,
              city1:typeof selectedProvince?.label === "string" ? selectedProvince.label  : "",
                  district1: typeof selectedDistrict?.label === "string" ? selectedDistrict.label : "",
                    ward1:typeof selectedWard?.label === "string" ? selectedWard.label  : ""
            }
          )
           
          setLoading(false)
        }
        else {
          setLoading(false)
          // setIsOpen(true)
        }
      },
      onError: (error) => {
        console.error("🚀 ~ file: index.tsx:159 ~ error:", error);
      },
    }
  );

  console.log(listWard,listDistrict)
  useEffect(() => {
  console.log(listWard)
  if ((listWard && listWard.length > 0)) {
    console.log(1234)
    const request = {
     master_id: r
    };
    getCustomerInfo2(request);
  }
}, [listDistrict,listWard]); // Chạy lại khi listProvice thay đổi

 useEffect(() => {
  if (listProvice && listProvice.length > 0) {
    const request = {
     master_id: r
    };
    getCustomerInfo(request);
  }
}, [listProvice]); // Chạy lại khi listProvice thay đổi
   
   
  return (
   
    <Spin
        style={{maxHeight:"600px",left:"-20px", height: "100vh", overflowY: "auto" }}
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
      <div
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          right: "0px",

          height: "fit-content",
            zIndex: "999",
            background:"white"
        }}
        >
          <div style={{ width: "100%", background: "#f4f3f2", paddingLeft: "20px", paddingTop:"5px",paddingBottom:"5px"}}>
            <img src={logoH} alt="" width={200}/>
          </div>
          <div style={{          paddingLeft: "20px",
          paddingRight: "20px",}}>
          <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "black",
            textTransform: "uppercase",
            paddingTop: "1rem",
            paddingBottom: "0.5rem",
          }}
        >
          Thông tin hồ sơ bệnh án
        </p></div>
      
      </div>

      <div
       
        style={{ marginTop: "100px",padding: "0px 20px" ,paddingBottom: "60px" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div style={{}}>
            <BarcodeComponent value={formData.master_id} />
          </div>

          <div style={{ paddingTop: "4px", paddingLeft: "10px" }}>
            <span
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
                marginLeft: "10px",
                fontSize: "14px",
              }}
            >
              Ngày giờ hẹn đến:
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "600",
                color: "#262626",
                marginBottom: "5px",
                marginLeft: "10px",
                fontSize: "14px",
              }}
            >
              {moment(formData.master_date).format('HH:mm DD-MM-YYYY')}
            </span>
          </div>
        </div>
          <div style={{ marginBottom: "8px", marginTop:"10px" }}>
          <p
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "start",
              gap: "5px",
              fontWeight: "500",
              color: "#262626",
             
              marginLeft: "10px",  fontSize:"15px"
            }}
          >
            Họ tên:{" "}
            <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
             {formData.fullName}
            </span>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              marginBottom: "8px",
              minWidth: "fit-content",
              maxWidth: "45%",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
               
                marginLeft: "10px",
                fontSize:"15px"
              }}
            >
              Giới tính: {formData.gender === "F" ? "Nữ" : "Nam"}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              marginBottom: "8px",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
              
                marginLeft: "10px",  fontSize:"15px"
              }}
            >
              Ngày sinh: {formData.birthDate}/{formData.birthMonth}/{formData.birthYear}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              marginBottom: "8px",
              minWidth: "fit-content",
              maxWidth: "45%",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
             
                marginLeft: "10px",  fontSize:"15px"
              }}
            >
              SĐT: {formData.phone}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              marginBottom: "8px",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
              
                marginLeft: "10px",  fontSize:"15px"
              }}
            >
              CCCD/CMND: {formData.idCard}
            </p>
          </div>
        </div>
        {
          formData.invoice_information !== "" && (
                           <div style={{ marginBottom: "8px" }}>
          <p
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "start",
              gap: "5px",
              fontWeight: "500",
              color: "#262626",
             
              marginLeft: "10px",  fontSize:"15px"
            }}
          >
          Email:{" "}{formData.email}
           
          </p>
        </div>
           )
        }

        {
          formData.invoice_information !== "" && (  <div style={{ marginBottom: "8px" }}>
          <p
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "start",
              gap: "5px",
              fontWeight: "500",
              color: "#262626",
             
              marginLeft: "10px",  fontSize:"15px"
            }}
          >
           Thông tin xuất hóa đơn:{" "}{formData.invoice_information}
           
          </p>
        </div>)
        }
       

        <div style={{ marginBottom: "8px" }}>
          <p
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "start",
              gap: "5px",
              fontWeight: "500",
              color: "#262626",
             
              marginLeft: "10px",  fontSize:"15px"
            }}
          >
            Địa chỉ:{" "}{formData.address},{formData.ward1},{formData.district1 ? formData.district1 + "," : " "}{formData.city1}
           
          </p>
        </div>
       
        <div
          style={{
            width: "100%",
            position: "fixed",
            bottom: 20,
            right: "0px",
            paddingLeft: "20px",
            paddingRight: "20px",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            gap:"10px"
          }}
        >
           {
             formData.allow_survey === false ? <></> :   <Button
            onClick={() => navigate(`/survey?r=${r}`)}
               className={mapModifiers(
                           "",
                            loadingAPI && "pendding"
                        )}
            style={{
              height: "fit-content",
              width: "100%",
              color: "white",
              fontWeight: "600",
              background:
                "linear-gradient(to bottom, #06A0CD 0%, #03566E 100%)",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              borderRadius: "200px",
              textTransform: "uppercase",
            }}
          >
        <img src={iconQ} style={{ width: "16px" }}></img>   Trả lời câu hỏi sàng lọc trước khám
          </Button>
          }
          { 
            formData.allow_update_profile === false ? <></> :  <Button
            onClick={() => navigate(`/profile-addition?r=${r}`)}
       
             
            style={{
              height: "fit-content",
              width: "100%",
              color: "white",
              fontWeight: "600",
              background:
                "linear-gradient(to bottom,rgb(240, 186, 115) 0%,rgb(216, 108, 6) 100%)",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              borderRadius: "200px",
              textTransform: "uppercase",
            }}
          >
          <img src={iconM} style={{ width: "16px" }}></img>  Điều chỉnh thông tin
          </Button>
          }
         
        
        </div>
         
      </div>
            
        </Spin>
  );
};

export default VerifyProfileCustomer;
