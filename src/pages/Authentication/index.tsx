/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Select, Button, Spin } from "antd";
import AddressDropdown, { AddressData } from "components/atoms/AddressDropdown";
import BarcodeComponent from "components/atoms/BarCode";
import CheckboxA from "components/atoms/CheckboxA";
import moment from "moment";
import { useLayoutEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getAppointment, getDistrictsAPI, getDistrictsAPIOld, getProvincesAPI, getProvincesAPIOld, getWardsAPI, getWardsAPIOld, saveProfile } from "services/api/apiGetC";
import mapModifiers from "utils/functions";

import logoH from 'assets/images/LogoH.svg'
import logoSave from "assets/images/icon-save.png"
import logo from 'assets/images/short_logo.svg'
const { Option } = Select;

const Authentication: React.FC = () => {
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
     cityOld: undefined as unknown as AddressData,
        districtOld: undefined as unknown as AddressData,
    wardOld: undefined as unknown as AddressData,
       city1Old: "",
        district1Old: "",
    ward1Old: "",
    status: "",
    allow_survey: false,
    master_date: "",
    master_id: "",
    customer_id: "",
    allow_update_profile: false,
    invoice_information: "",
    
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isOpen,setIsOpen] = useState(false);
  const overlayStyle: React.CSSProperties = {
    display: isOpen ? "flex" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  background: "linear-gradient(to bottom, rgba(5, 111, 142, 0.5), rgba(1, 31, 40, 0.5))",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
 
  };

  const popupStyle: React.CSSProperties = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    minWidth: "300px",
    textAlign: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    gap:"10px"
  };


  const [searchParams] = useSearchParams();
  const r = searchParams.get("r");
  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = "Tên là bắt buộc";
    if (!formData.gender) newErrors.gender = "Giới tính là bắt buộc";
     if (!formData.districtOld && isAddressOld ) newErrors.districtOld = "Quận/Huyện là bắt buộc";
     if (!formData.cityOld && isAddressOld) newErrors.cityOld = "Thành phố/Tỉnh là bắt buộc";
    if (!formData.wardOld && isAddressOld) newErrors.wardOld = "Phường xã là bắt buộc";
     if (!formData.district && !isAddressOld) newErrors.district = "Phường xã là bắt buộc";
     if (!formData.city && !isAddressOld) newErrors.city = "Thành phố/Tỉnh là bắt buộc";
    // if (!formData.ward && !isAddressOld ) newErrors.ward = "Phường xã là bắt buộc";
    if (!formData.phone) {
    newErrors.phone = "SĐT là bắt buộc";
    }
    if (!/^\d{10,}$/g.test(formData.phone) && formData.phone) {
     newErrors.phone = "SĐT phải có ít nhất 10 chữ số";
  }

    if (!formData.idCard) newErrors.idCard = "CCCD/CMND là bắt buộc";
      if ((!/^\d{12,}$/g.test(formData.idCard) && formData.idCard) || (!/^\d{9,}$/g.test(formData.idCard) && formData.idCard)) {
    newErrors.idCard = "CCCD/CMND phải có 9 hoặc 12 chữ số";
  }
    if (!formData.address) newErrors.address = "Địa chỉ là bắt buộc";
    // Kiểm tra ngày sinh
    
      if (!birthDate.year?.toString() || isNaN(Number(birthDate.year)) || birthDate.year?.toString().length !== 4 || Number(birthDate.year) < 1900 || Number(birthDate.year) > new Date().getFullYear()) {
        toast.error("Vui lòng nhập năm hợp lệ (VD: 1990)");
         newErrors.year = "Vui lòng nhập năm hợp lệ (VD: 1990)";
    yearRef.current?.focus();
   
  }
       if (!birthDate.month?.toString() || isNaN(Number(birthDate.month)) || Number(birthDate.month) < 1 || Number(birthDate.month) > 12) {
         toast.error("Vui lòng nhập tháng hợp lệ (1-12)");
           newErrors.month = "Vui lòng nhập tháng hợp lệ (1-12)";
    monthRef.current?.focus();
   
  }
  if (!birthDate.day?.toString() || isNaN(Number(birthDate.day)) || Number(birthDate.day) < 1 || Number(birthDate.day) > 31) {
    toast.error("Vui lòng nhập ngày hợp lệ (1-31)");
      newErrors.day = "Vui lòng nhập ngày hợp lệ (1-31)";
    dayRef.current?.focus();
   
  }
  
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };
   const [listProvince, setListProvince] = useState<AddressData[]>();
  const [listDistrict, setListDistricts] = useState<AddressData[]>(); 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [listWard, setListWard] = useState<AddressData[]>();
    const [listProvinceOld, setListProvinceOld] = useState<AddressData[]>();
    const [listDistrictOld, setListDistrictsOld] = useState<AddressData[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [listWardOld, setListWardOld] = useState<AddressData[]>();
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
       // React Query lấy danh sách phường, xã
    const { mutate: getWards } = useMutation(
      "post-footer-form",
     (id: string) => getWardsAPI(id), {
      onSuccess: (data) => {
        const convertWard: any[] = [];
        data.data.map((i: any) => { const ward = { key: i.id, label: i.name, value: i.id }; convertWard.push(ward); });
        setListWard([...convertWard]);
      },
      onError: (err) => {
        console.error(err);
      },
    });
   const { mutate: getProvincesOld } = useMutation(
      "post-footer-form",
      (id: string) => getProvincesAPIOld(id),
      {
        onSuccess: (data) => {
          const convertProvince: any[] = [];
          data.data.map((i: any) => { const province = { key: i.id, label: i.name, value: i.id }; convertProvince.push(province); });
          setListProvinceOld([...convertProvince]);
        },
        onError: (err) => {
          console.error(err);
        },
      }
    );
     // React Query lấy danh sách quận, huyện
    const { mutate: getDistrictsOld} = useMutation(
      "post-footer-form",
      (id: string) => getDistrictsAPIOld(id),
      {
        onSuccess: (data) => {
          const convertDistricts: any[] = [];
          data.data.map((i: any) => { const districts = { key: i.id, label: i.name, value: i.id }; convertDistricts.push(districts); });
          setListDistrictsOld([...convertDistricts]);
        },
        onError: (err) => {
          console.error(err);
        },
      }
  );
       // React Query lấy danh sách phường, xã
    const { mutate: getWardsOld } = useMutation(
      "post-footer-form",
     (id: string) => getWardsAPIOld(id), {
      onSuccess: (data) => {
        const convertWard: any[] = [];
        data.data.map((i: any) => { const ward = { key: i.id, label: i.name, value: i.id }; convertWard.push(ward); });
        setListWardOld([...convertWard]);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  useLayoutEffect(() => {
    const request = {
     master_id: r
    };
    getCustomerInfo(request);
    getProvinces("VN")
      getProvincesOld("VN")
    document.title = "Bổ sung thông tin";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
   
    e.preventDefault();
    if (validate()) {
       setLoading(true)
    const data = {
       master_id: r,
      client: {
        customer_id: formData.customer_id,
        customer_fullname: formData.fullName,
        customer_identity_card: formData.idCard,
        customer_phone: formData.phone,
        customer_email: formData.email,
        customer_address: formData.address,
        day_of_birth:birthDate.day,
        month_of_birth: birthDate.month,
        year_of_birth: birthDate.year,
        gender_id: formData.gender,
        province_id: isAddressOld ?  (formData.cityOld?.value || formData.city1Old) : (formData.city?.value || formData.city),
        district_id:  isAddressOld ?  (formData.districtOld?.value || formData.districtOld) :null,
        ward_id: isAddressOld ?  (formData.wardOld?.value || formData.wardOld) : (formData.district?.value ||formData.district ),
      
      }
    }
       postSaveInfo(data)
    }
  };
  const [text,setText] = useState("")
  const { mutate: getCustomerInfo } = useMutation(
    "post-footer-form",
    (data: any) => getAppointment(data),
    {
      onSuccess: async (data) => {
      
        if (data?.status) {
        
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
              district: data.data.client.ward_id,
              ward: data.data.client.ward_id,
              city: data.data.client.province_id,
               district1: data.data.client.district_id,
              ward1: data.data.client.ward_id,
              city1: data.data.client.province_id,
               district1Old: data.data.client.district_id,
              ward1Old: data.data.client.ward_id,
              city1Old: data.data.client.province_id,
            }
          )
          setBirthDate((prev) => ({ ...prev, "day": data.data.client.day_of_birth }));
          setBirthDate((prev) => ({ ...prev, "month": data.data.client.month_of_birth }));
          setBirthDate((prev) => ({ ...prev, "year": data.data.client.year_of_birth }));
             if (data.data.client.province_id) {
        getDistricts(data.data.client.province_id);
      }
      if (data.data.client.district_id) {
        getWards(data.data.client.district_id);
          }
          if (data.data.allow_update_profile === false) {
              navigate(`/verify-profile?r=${r}`)
          }
          setLoading(false)
        }
        else {
          setText(data.message)
          setLoading(false)
          setIsOpen(true)
        }
      },
      onError: (error) => {
        console.error("🚀 ~ file: index.tsx:159 ~ error:", error);
      },
    }
  );
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const { mutate: postSaveInfo } = useMutation(
    "post-footer-form",
    (data: any) => saveProfile(data),
    {
      onSuccess: async (data) => {
        if (data?.status) {
          navigate(`/verify-profile?r=${r}`)
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

  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [isAddressOld,setIsAddressOld] = useState(false)
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleChange1 = (field: "day" | "month" | "year", value: string) => {
    // Chỉ cho phép nhập số
    if (!/^\d*$/.test(value)) return;

    // Giới hạn độ dài dữ liệu nhập vào
    if (field === "day" && value.length > 2) return;
    if (field === "month" && value.length > 2) return;
    if (field === "year" && value.length > 4) return;

    setBirthDate((prev) => ({ ...prev, [field]: value }));

    // Xử lý tự động chuyển input khi nhập dữ liệu
    if (field === "day") {
      if (value.length === 2 || value === "4") {
        
        monthRef.current?.focus();
      }
    } else if (field === "month") {
      if (value.length === 2 || value === "2") {
        yearRef.current?.focus();
      }
    }
  };
   
    const handleGetItemPaseAPI = async (
    id: string,
    option: any,
    type: string
    ) => {
    switch (type) {

      case "city":
        setListDistricts([]);
        setListWard([]);
        getDistricts(id);
        setFormData({ ...formData, city:option.value});
        break;
      case "district":
        setListWard([]);
        getWards(id);
        setFormData({ ...formData, district:option.value });
        break;
      case "ward":
        setFormData({ ...formData, ward: option.value });
        break;
    }
  };
    const handleGetItemPaseAPIOld = async (
    id: string,
    option: any,
    type: string
    ) => {
    switch (type) {

      case "city":
        setListDistrictsOld([]);
        setListWardOld([]);
        getDistrictsOld(id);
        setFormData({ ...formData, cityOld:option.value});
        break;
      case "district":
        setListWardOld([]);
        getWardsOld(id);
        setFormData({ ...formData, districtOld:option.value });
        break;
      case "ward":
        setFormData({ ...formData, wardOld: option.value });
        break;
    }
  };
  return (
   
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
                          left: "45%",
                          top:"100%"
                        }}
                        src={logo}
                      />
                    
                    } >
      <div  style={{left:"-20px", height: "100vh", overflowY: "auto" }}>
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
            <img src={logoH} alt="" width={180}/>
          </div>
          <div style={{          paddingLeft: "20px",
          paddingRight: "20px",}}>
          <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
            color: "black",
            textTransform: "uppercase",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          Cập nhật thông tin hồ sơ bệnh án
        </p></div>
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
             <div style={{         
      }}>   <p
          style={{
            textAlign: "left",
            fontSize: "14px",
            fontWeight: "500",
            color: "#ff0000",
                paddingBottom: "0.2rem",
                paddingLeft: "20px",
            paddingRight:"20px", gap:"5px"
          }}
            >
              <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="18"
                height="18"
              
>
    <polygon points="50,5 95,95 5,95" fill="#FF0000" stroke="black" stroke-width="2"/>
    
    <line x1="50" y1="30" x2="50" y2="65" stroke="white" stroke-width="6"/>
    <circle cx="50" cy="80" r="5" fill="white" />
</svg>

       {" "}    Để tiết kiệm thời gian quý giá của Bạn, xin vui lòng điền thông tin dưới đây:
        </p></div>
      </div>

   {/* <div
      
        style={{ marginTop: "230px",padding: "0px 20px" ,maxHeight:"60%",overflowY:"auto"}}
      >  */}
        <div
      
        style={{ marginTop: "210px",padding: "0px 20px" ,marginBottom:"9rem"}}
      >
            
        <div style={{ marginBottom: "8px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "start",
              gap: "5px",
              fontWeight: "500",
              color: "#262626",
              marginBottom: "5px",
              marginLeft: "10px",
            }}
          >
            Họ tên <span style={{ color: "#ff0000" }}>*</span>
            {errors.fullName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.fullName}
              </p>
            )}
          </label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Vui lòng nhập họ tên"
            style={{
              border: "1px solid #DBDBDB",
              fontSize: "14px",
              borderRadius: "5px",
              color: "#262626",
              padding: "5px 15px",
              textTransform: "uppercase",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "start", gap: "10px",justifyContent:"space-between" }}>
          <div
            style={{ marginBottom: "8px", minWidth: "25%", maxWidth: "25%" }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              Giới tính <span style={{ color: "#ff0000" }}>*</span>{" "}
             
            </label>
            <Select
              value={formData.gender}
              onChange={(value) => handleChange("gender", value)}
                style={{ width: "100%" }}
                placeholder="Chọn Giới Tính"
            >
              <Option value="M">Nam</Option>
              <Option value="F">Nữ</Option>
            </Select>
             {errors.gender && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px", }}>
                *  {errors.gender}
                </p>
              )}
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
            <span
              style={{
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              Ngày sinh <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <input
                ref={dayRef}
                type="text"
                maxLength={2}
                value={birthDate.day}
                onChange={(e) => handleChange1("day", e.target.value)}
                  onFocus={(e) => e.target.select()} 
                placeholder="DD"
                style={{
                  width: "50px",
                  textAlign: "center",
                  padding: "5px",
                  paddingBottom: "6px",
                  paddingTop:"6px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <span>/</span>
          <input
  ref={monthRef}
  type="text"
  maxLength={2}
  value={birthDate.month}
  onChange={(e) => handleChange1("month", e.target.value)}
  onFocus={(e) => e.target.select()} // Tự động bôi đen khi focus
  placeholder="MM"
  style={{
    width: "50px",
    textAlign: "center",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  }}
/>
              <span>/</span>
              <input
                ref={yearRef}
                type="text"
                maxLength={4}
                value={birthDate.year?.toString()}
                  onChange={(e) => handleChange1("year", e.target.value)}
                    onFocus={(e) => e.target.select()} 
                placeholder="YYYY"
                style={{
                  width: "70px",
                  textAlign: "center",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
             {errors.birthDate && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px", }}>
                 * {errors.birthDate}
                </p>
              )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "start", gap: "10px" }}>
          <div style={{ marginBottom: "8px",minWidth:"49%", maxWidth:"49%" }}>
            <label
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              Số điện thoại <span style={{ color: "#ff0000" }}>*</span>
            
            </label>
            <Input
              placeholder="Vui lòng nhập số điện thoại"
              name="phone"
              type="number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              style={{
                border: "1px solid #DBDBDB",
                fontSize: "14px",
                borderRadius: "5px",
                color: "#262626",
                padding: "5px 15px",
              }}
            />  {errors.phone && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px",  }}>* {errors.phone}</p>
              )}
          </div>
          <div style={{ marginBottom: "8px",minWidth:"49%", maxWidth:"49%" }}>
            <label
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              {" "}
              CCCD/CMND <span style={{ color: "#ff0000" }}>*</span>{" "}
            
            </label>
            <Input
              placeholder="Vui lòng nhập CCCD/CMND"
              name="idCard"
              type="number"
              value={formData.idCard}
              onChange={(e) => handleChange("idCard", e.target.value)}
              style={{
                border: "1px solid #DBDBDB",
                fontSize: "14px",
                borderRadius: "5px",
                color: "#262626",
                padding: "5px 15px",
              }}
            />  {errors.idCard && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px",  }}>
               *   {errors.idCard}
                </p>
              )}
          </div>
        </div>
<div style={{ display: "flex", alignItems: "start", gap: "10px" }}>
          <div style={{ marginBottom: "8px",minWidth:"49%", maxWidth:"49%" }}>
            <label
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
             Thông tin xuất hóa đơn 
            
            </label>
            <Input
              placeholder="Vui lòng thông tin xuất hóa đơn"
              name="invoice_information"
              value={formData.invoice_information}
              onChange={(e) => handleChange("invoice_information", e.target.value)}
              style={{
                border: "1px solid #DBDBDB",
                fontSize: "14px",
                borderRadius: "5px",
                color: "#262626",
                padding: "5px 15px",
              }}
            /> 
          </div>
          <div style={{ marginBottom: "8px",minWidth:"49%", maxWidth:"49%" }}>
            <label
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "5px",
                fontWeight: "500",
                color: "#262626",
                marginBottom: "5px",
                marginLeft: "10px",
              }}
            >
              {" "}
              Email 
            
            </label>
            <Input
              placeholder="Vui lòng nhập Email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={{
                border: "1px solid #DBDBDB",
                fontSize: "14px",
                borderRadius: "5px",
                color: "#262626",
                padding: "5px 15px",
              }}
            /> 
          </div>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "start",
              gap: "5px",
              fontWeight: "500",
              color: "#262626",
              marginBottom: "5px",
              marginLeft: "10px",
            }}
          >
            Địa chỉ <span style={{ color: "#ff0000" }}>*</span>
            <span style={{ fontSize: "12px" }}>
              (Phòng khám sẽ gởi kết quả có sau về địa chỉ này)
            </span>
          </label>
          <Input.TextArea
            name="address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Số nhà,tên đường, khóm,phường,..."
          />
           {errors.address && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px",  }}>
                 * {errors.address}
                </p>
              )}
        </div>
        <div style={{ marginBottom: "8px",display:"grid",gridTemplateColumns:"1fr 0.3fr" }}>
            <div>
              {
                isAddressOld ? <> <AddressDropdown
                          AddressOption={listProvinceOld || []}
            label="Thành phố/ Tỉnh"
            isR={true}
                          handleSelect={(item, option: any) => {
                            handleGetItemPaseAPIOld(item, option, "city");
                            setFormData({
                              ...formData,
                              cityOld: {
                                key: option.value,
                                label: option.children,
                                value: option.value,
                              },
                            });
            }}
              
                          placeholder="Chọn thành phố"
                          variant="simple"
                            values={
                            (formData.cityOld as any)
                            
                          }
          />
            {errors.cityOld && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px", }}>
                *  {errors.cityOld}
                </p>
              )}
                </> : <>
                 <AddressDropdown
                          AddressOption={listProvince || []}
            label="Thành phố/ Tỉnh"
            isR={true}
                          handleSelect={(item, option: any) => {
                            handleGetItemPaseAPI(item, option, "city");
                            setFormData({
                              ...formData,
                              city: {
                                key: option.value,
                                label: option.children,
                                value: option.value,
                              },
                            });
            }}
              
                          placeholder="Chọn thành phố"
                          variant="simple"
                            values={
                            (formData.city as any)
                            
                          }
          />
            {errors.city && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px", }}>
                *  {errors.city}
                </p>
              )}
                  </>
              }
              
            </div>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
              <CheckboxA
                style={{marginTop:"20px"}}
                                  label="Dạng cũ?"
                                  isChecked={isAddressOld}
                                  onChange={(check: any) => { setIsAddressOld(!isAddressOld) }}
                                />
           
          </div>
        </div>
          <div style={{ marginBottom: "8px" }}>
            {
              isAddressOld === true ? <>
              
                 <AddressDropdown
                          AddressOption={listDistrictOld || []}
            label="Quận/ huyện"
             isR={true}
                          handleSelect={(item, option: any) => {
                            handleGetItemPaseAPIOld(item, option, "district");
                            setFormData({
                              ...formData,
                              districtOld: {
                                key: option.value,
                                label: option.children,
                                value: option.value,
                              },
                            });
                          }}
                          placeholder="Chọn huyện"
                          variant="simple"
                          values={
                            (formData.districtOld as any)
                          }
          />
           {errors.districtOld && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px", }}>
                *  {errors.districtOld}
                </p>
              )}
              </> : <>
                 <AddressDropdown
                          AddressOption={listDistrict || []}
            label="Phường/ xã"
             isR={true}
                          handleSelect={(item, option: any) => {
                            handleGetItemPaseAPI(item, option, "district");
                            setFormData({
                              ...formData,
                              district: {
                                key: option.value,
                                label: option.children,
                                value: option.value,
                              },
                            });
                          }}
                          placeholder="Chọn huyện"
                          variant="simple"
                          values={
                            (formData.district as any)
                          }
          />
           {errors.district && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px", }}>
                *  {errors.district}
                </p>
              )}
                </>
            }
       
          </div>
          {
            isAddressOld === true && (
              
               <div style={{ marginBottom: "8px" }}>
           <AddressDropdown
                          AddressOption={listWardOld || []}
            label="Phường/ xã"
             isR={true}
                          handleSelect={(item, option: any) => {
                            handleGetItemPaseAPIOld(item, option, "ward");
                            setFormData({
                              ...formData,
                              wardOld: {
                                key: option.value,
                                label: option.children,
                                value: option.value,
                              },
                            });
                          }}
                          placeholder="Chọn xã"
                          variant="simple"
                          values={
                            (formData.wardOld as any )
                            
            }
            
          />
           {errors.wardOld && (
                <p style={{ color: "red", fontSize: "12px", marginLeft: "10px", }}>
                *  {errors.wardOld}
                </p>
              )}
        </div>
              )
          }
       
      
      </div>  <div
          style={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            right: "0px",
            paddingLeft: "20px",
            paddingRight: "20px",
            height: "fit-content",
            // background: "white",
            maxHeight: "50px",
             minHeight:"50px"
          }}
        >
           <Button
           onClick={handleSubmit}
            type="primary"
      
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
              marginBottom:"10px"
            }}
          >
        <img src={logoSave} style={{ width: "18px" }}></img>  LƯU THÔNG TIN
          </Button> 
        
        
        </div></div>
      <div style={overlayStyle}>
        <div style={popupStyle}>
         
          <p>
          {text}
          </p>
           <a
          href="https://www.doctorcheck.vn/"
       
             
            style={{
              height: "fit-content",
              width: "fit-content",
              color: "white",
              fontWeight: "600",
              background:  "#007BFF",
              paddingTop: "0.3rem",
              paddingBottom: "0.3rem",
              borderRadius: "6px",
              paddingLeft: "20px",
              paddingRight: "20px",
              textTransform: "uppercase",
              fontSize: "14px",

              
            }}
          >
           Thoát
          </a> 
        </div>
        </div>
        </Spin>
  
  );
};

export default Authentication;
