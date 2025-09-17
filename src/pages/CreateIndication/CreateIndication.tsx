/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PlusCircleOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { sendMessagetype } from 'assets/data';
import Button from 'components/atoms/Button';
import CDatePickers from 'components/atoms/CDatePickers';
import CTooltip from 'components/atoms/CTooltip';
import Checkbox from 'components/atoms/Checkbox';
import Dropdown, { DropdownData } from 'components/atoms/Dropdown';
import GroupRadio, { GroupRadioType } from 'components/atoms/GroupRadio';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import InputDateOfBirth from 'components/atoms/InputDateOfBirth';
import RangeDate from 'components/atoms/RangeDate';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import PublicTable from 'components/molecules/PublicTable';
import CCollapse from 'components/organisms/CCollapse';
import CDrawer, { PlacementsDrawer } from 'components/organisms/CDrawer';
import CModal from 'components/organisms/CModal';
import PublicHeader from 'components/templates/PublicHeader';
import PublicHeaderStatistic from 'components/templates/PublicHeaderStatistic';
import PublicLayout from 'components/templates/PublicLayout';
import Cookies from 'js-cookie';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ServiceItem } from 'services/api/Example/types';
import { getServicesOfPackageAPI, listPatientsOld } from 'services/api/createindication';
import { ResponseData } from 'services/api/createindication/types';
import { getDistricts, getProvinces, getWards } from 'services/api/locations';
import { DistrictItem, ProvinceItem, WardItem } from 'services/api/locations/types';
import { getCampaigns, getCustomerLeads, getSMSTemplates, postSendCampaign } from 'services/api/point';
import { CustomerLeadItem, TemplateSMSItem } from 'services/api/point/types';
import { GetInfoOfPatientAPI } from 'store/CreateIndication';
import { getInfosCustomerById } from 'store/customerInfo';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getListPatient } from 'store/list_patients';
import { getCustomerLeadsData } from 'store/point';
import { exportDatatoExcel } from 'utils/functions';

export const AMOUNT_SMS = 390;
interface FormAddCustomerProps {
  handleClose?: () => void;
  handleAddCustomer?: (data: any) => void;
  valUpdate?: any;
  isUpdate?: boolean;
  csPortrait?: boolean;
  isHigh?: boolean;
  isClose?: boolean;
  dateBookingSchedule?: Date;
  customerPhoneNotFound?: string;
  dataCustomerPortrait?: any;
  isOpenPopup?: boolean;
  handleClosePopup?: () => void;
  positionDrawer?: PlacementsDrawer;
  titleCustomize?: React.ReactNode;
  noOverLay?: boolean;
  isUsedDrawer?: boolean;
}
const CreateIndication: React.FC = () => {
  const dispatch = useAppDispatch();

  const storeLoadingLeads = useAppSelector((state) => state.point.loadingCustomerLeads);
  const storeResponseLeads = useAppSelector((state) => state.point.responseCustomerLeads);
  const storeResponseListPatients = useAppSelector((state) => state.ListPatients.ListPatient);
  const storeLoadingListPatients = useAppSelector((state) => state.ListPatients.isLoadingListPatient);
  const storeResponseInfoOfPatient = useAppSelector((state) => state.CreateIndication.GetInfoOfPatient);
  const storeLoadingInfoOfPatient = useAppSelector((state) => state.CreateIndication.isLoadingGetInfoOfPatient);
  const [loadingListPatients, setLoadingListPatients] = useState(storeLoadingListPatients);
  const [listPatients, setListPatients] = useState(storeResponseListPatients?.data || []);
   const [loadingInfoOfPatient, setLoadingInfoOfPatient] = useState(storeLoadingInfoOfPatient);
  const [InfoOfPatient, setInfoOfPatient] = useState(storeResponseInfoOfPatient || []);
  const [loadingLeads, setLoadingLeads] = useState(storeLoadingLeads);
  const [listCustomerLeads, setListCustomerLeads] = useState(storeResponseLeads?.data?.items || []);
  const [customerCount, setCustomerCount] = useState<any[]>([]);
  const [isOpenListPatient,setIsOpenListPatient] = useState(false)
  const storageServices = localStorage.getItem("services");
  const storagePackages = localStorage.getItem("packages");
    const storageCareers = localStorage.getItem("careers");
  const storageCountries = localStorage.getItem("countries");
    const storageGenders = localStorage.getItem("genders");
  const storageNations = localStorage.getItem("nations");
  const storageIcd10s = localStorage.getItem("icd10s");
  console.log(InfoOfPatient)
 const [stateServices, setstateServices] = useState<DropdownData[]>(storageServices ? JSON.parse(storageServices)?.map((service:any) => ({
  ...service,
  label: service.service_name,
  value: service.service_name
 })) : []);
   const [stateServiceGroup, setstateServiceGroup] = useState<DropdownData[]>(storageServices ? JSON.parse(storageServices)?.reduce((acc:any, service:any) => {
  const updatedService = {
    ...service,
    label: service.service_name,
    value: service.service_name
  };
  const group = acc.find((item:any) => item.service_group_id === updatedService.service_group_id);
  if (group) {
    group.services.push(updatedService);
  } else {
    acc.push({
      service_group_id: updatedService.service_group_id,
      service_group_name: updatedService.service_group_name,
      services: [updatedService]
    });
  }
  return acc;
   }, []) : []);
  
  const [statePackages, setstatePackages] = useState<DropdownData[]>(storagePackages ? JSON.parse(storagePackages)?.map((service:any) => ({
  ...service,
  label: service.package_display,
  value: service.package_display
 })) : []);

  const [stateCareers, setstateCareers] = useState<DropdownData[]>(storageCareers ? JSON.parse(storageCareers)?.map((service:any) => ({
  ...service,
  label: service.career_name,
  value: service.career_id
 })) : []);
  const [stateCountries, setstateCountries] = useState<DropdownData[]>(storageCountries ? JSON.parse(storageCountries)?.map((service:any) => ({
  ...service,
  label: service.country_name,
  value: service.country_id
 })) : []);
  const [stateGenders, setstateGenders] = useState<DropdownData[]>(storageGenders ? JSON.parse(storageGenders)?.map((service:any) => ({
  ...service,
  label: service.gender_name,
  value: service.gender_id
 })) : [])
  const [stateNations, setstateNations] = useState<DropdownData[]>(storageNations ? JSON.parse(storageNations)?.map((service:any) => ({
  ...service,
  label: service.nation_name,
  value: service.nation_id
 })) : [])
  const [stateIcd10s, setstateIcd10s] = useState<DropdownData[]>(storageIcd10s ? JSON.parse(storageIcd10s)?.map((service:any) => ({
  ...service,
  label: service.disease_name_vi,
  value: service.id
 })) : []);
  const [isOpenFormAddPatient,setIsOpenFormAddPatient] = useState(false)
  const [serviceSelected, setServiceSelected] = useState<ServiceItem[]>([]);
  const [packageSelected, setPackageSelected] = useState<DropdownData>();
    const [totalService, setTotalService] = useState("Chưa chọn dịch vụ");
  const [states, setStates] = useState({
    launchSourceGroupID: undefined as unknown as DropdownData,
    launchSourceID: undefined as unknown as DropdownData,
    dateFrom: new Date(moment(new Date()).format('YYYY-MM-01')),
    dateTo: new Date(moment(new Date()).format('YYYY-MM-DD')),
    keyword: '',
    status: undefined as unknown as DropdownData,
    page: 1,
    size: 5000,
  })
  // const [servicePackageId, setServicePackageId] = useState(
  //   valUpdate?.master?.package_id
  // );
    const [openSelect, setOpenSelect] = useState(true);
  const [servicePackageId, setServicePackageId] = useState("");
  const [filterColumn, setFilterColumn] = useState({
    launch_source_group: [],
    launch_source: [],
    status: [],
  });

  const [sendSMS, setSendSMS] = useState({
    openModal: false,
    type: '',
    listCS: [],
    campaignType: sendMessagetype[0] as unknown as GroupRadioType,
    template: undefined as unknown as DropdownData,
    campaign: undefined as unknown as DropdownData,
    content: '',
    subject: '',
  })

  const [sendSMSEror, setSendSMSError] = useState({
    subject: '',
    template: '',
    content: '',
    campaign: ''
  });

  const [templateSMS, setTemplateSMS] = useState<DropdownData[]>();
  const [listCampaign, setListCampaign] = useState({
    data: undefined as unknown as DropdownData[],
    dropdown: undefined as unknown as DropdownData[],
  });

  const [dataFinish, setDataFinish] = useState<CustomerLeadItem[]>(storeResponseLeads?.data?.items || [])
    const [isListPatinent, setIsListPatinent] = useState(false);
  const [listPatinentValue, setListPatinentValue] = useState("");
  const [listPatient, setListPatinents] = useState({
    data: {} as ResponseData,
    clone: {} as ResponseData,
  });

  const [province, setProvince] = useState<DropdownData[]>([]);
  const [district, setDistrict] = useState<DropdownData[]>([]);
  const [ward, setWard] = useState<DropdownData[]>([]);
    const [dataForm, setDataForm] = useState({
    id: "",
    name: "",
    // phoneNumber: !_.isUndefined(customerPhoneNotFound)
    //   ? customerPhoneNotFound
      //   : "",
      phoneNumber:"",
    gender: undefined as unknown as DropdownData,
    dayOfBirth: "",
    dayOfBirthBHYT: "",
    email: "",
    nation: undefined as unknown as DropdownData,
    voucher: undefined as unknown as DropdownData,
    voucherName: "",
    voucherId: "",
    voucherValue: "",
    career: undefined as unknown as DropdownData,
    originGroup: undefined as unknown as DropdownData,
    originType: undefined as unknown as DropdownData,
    origin: undefined as unknown as DropdownData,
    partner: undefined as unknown as DropdownData,
    customerId: "",
    customerType: "",
    address: "",
    
    note: "",
   
    noteBooking: "",
    // typeBooking: stateAppointmentTypes[0] as GroupRadioType,
    serviceAllowTypeBooking1: undefined as unknown as DropdownData,
    serviceAllowTypeBooking2: undefined as unknown as DropdownData,
    //serviceAllowTypeBooking3: undefined as unknown as DropdownData,
    registerTypeId: "",
    portraitSurveyType: undefined as unknown as any,
    ctvBSCD: undefined as unknown as DropdownData,
    ctv: undefined as unknown as DropdownData,
    endoscopics: undefined as unknown as DropdownData,
    icd10s: "",
    gclid: "",
    numberDis: undefined,
  });

  useLayoutEffect(() => {
    dispatch(getListPatient({
      // launch_source_group_id: Number(states.launchSourceGroupID?.value ?? 0),
      // launch_source_id: Number(states.launchSourceID?.value ?? 0),
      from_date: moment(states.dateFrom).format('YYYY-MM-DDT00:00:00'),
      to_date: moment(states.dateTo).format('YYYY-MM-DDT23:59:59'),
      keyword: states.keyword,
      // page: states.page,
      // limit: states.size,
    } as any));

  }, [])
 
   const { mutate: getProvince } = useMutation(
    'post-footer-form',
    () => getProvinces(),
    {
      onSuccess: async (data) => {
 
        if (data?.status) {
          const updatedData = data.data.map((item:any) => ({
  ...item,
  value: item.province_id,
  label: item.province_name,
          }));
          
            setProvince(updatedData)
        } else {
          toast.error(data?.message);
          
        }
      },
      onError: (error) => {
        console.error('🚀 ~ file: index.tsx:159 ~ error:', error);
      },
    },
  );
    const handleGetProvince = () => {
  
    
    getProvince()
  }
     const { mutate: getDistrict } = useMutation(
    'post-footer-form',
    (data:any) => getDistricts(data),
    {
      onSuccess: async (data) => {
     
        if (data?.status) {
          const updatedData = data.data.map((item:any) => ({
  ...item,
  value: item.district_id,
  label: item.district_name,
          }));
       
            setDistrict(updatedData)
        } else {
          toast.error(data?.message);
          
        }
      },
      onError: (error) => {
        console.error('🚀 ~ file: index.tsx:159 ~ error:', error);
      },
    },
  );
    const handleGetDistrict = (id:any) => {
  
    
    getDistrict(id)
  }
   const { mutate: getWard } = useMutation(
    'post-footer-form',
    (data:any) => getWards(data),
    {
      onSuccess: async (data) => {
        console.log(data.data)
        if (data?.status) {
          const updatedData = data.data.map((item:any) => ({
  ...item,
  value: item.ward_id,
  label: item.ward_name,
          }));
       
            setWard(updatedData)
        } else {
          toast.error(data?.message);
          
        }
      },
      onError: (error) => {
        console.error('🚀 ~ file: index.tsx:159 ~ error:', error);
      },
    },
  );
    const handleGetWard = (id:any) => {
  
    
    getWard(id)
  }
 useEffect(() => {
    handleGetProvince()
  }, [])
  useEffect(() => {
    setInfoOfPatient(storeResponseInfoOfPatient)
    setLoadingInfoOfPatient(storeLoadingInfoOfPatient)
  },[storeResponseInfoOfPatient,storeLoadingInfoOfPatient])
  const handleGetOptionFilterColumn = (key: string) => {
    let uniqueValues: any = [];
    switch (key) {
      case 'launch_source_group_name':
        uniqueValues = Array.from(new Set((listCustomerLeads || [])?.map((item: any) => item?.launch_source_group_name).filter(Boolean)));
        break;
      case 'launch_source_name':
        uniqueValues = Array.from( new Set(
            (listCustomerLeads || [])
              ?.map((item) => item?.launch_source_name)
              .filter(Boolean)
          ));
        break;
      case 'master_count':
        uniqueValues = Array.from(new Set((listCustomerLeads || [])?.map((item: any) => Number(item?.master_count) === 0 ? 'Chưa đặt lịch' : 'Đã đặt lịch nhưng hủy').filter(Boolean)));
        break;
      default: break;
    }

    return uniqueValues.map((value: any) => ({ text: value, value: value }));
  }
  const [ex, setEx] = useState("")
  
  useEffect(() => {
    setFilterColumn({
      ...filterColumn,
      launch_source_group: handleGetOptionFilterColumn('launch_source_group_name') as any,
      launch_source: handleGetOptionFilterColumn('launch_source_name'),
      status: handleGetOptionFilterColumn('master_count'),
    });
   
  }, [storeResponseLeads?.data?.items]);


  useEffect(() => {
    setListPatients(storeResponseListPatients?.data);
    setLoadingListPatients(storeLoadingListPatients);
  }, [storeResponseListPatients?.data, storeLoadingListPatients])

  /* API */

  const { mutate: getServicesOfPackage } = useMutation(
    'post-footer-form',
    (body: any) => getServicesOfPackageAPI(body),
    {
      onSuccess: async (data) => {
     
        if (data?.status) {
            setServiceSelected(data.data)
        } else {
          toast.error(data?.message);
          
        }
      },
      onError: (error) => {
        console.error('🚀 ~ file: index.tsx:159 ~ error:', error);
      },
    },
  );

 

 

  /* API */

  const handleValidateSendMessage = () => {
    if (sendSMS.campaignType?.value === 'SMS') {
      if (!sendSMS.subject.trim() || !sendSMS.template || !sendSMS.campaign) {
        setSendSMSError({
          ...sendSMSEror,
          subject: !sendSMS.subject.trim() ? 'Tiêu đề là bắt buộc để gửi tin nhắn' : '',
          template: !sendSMS.template ? 'Cần chọn template để gửi tin nhắn' : '',
          campaign: !sendSMS.campaign ? 'Vui lòng chọn 1 chiến dịch' : ''
        })
        return false;
      }
      return true;
    } else {
      if (!sendSMS.subject.trim() || !sendSMS.content?.trim()) {
        setSendSMSError({
          ...sendSMSEror,
          campaign: !sendSMS.campaign ? 'Vui lòng chọn 1 chiến dịch' : '',
          subject: !sendSMS.subject.trim() ? 'Tiêu đề là bắt buộc để gửi tin nhắn' : '',
          content: !sendSMS.content?.trim() ? 'Cần nhập nội dung tin nhắn để gửi tin nhắn' : ''
        })
        return false;
      }
      return true;
    }
  }
     const navigator = useNavigate();
  const handleSendIdPackage = (id:any) => {
  
    
    getServicesOfPackage(id);
  }

  const handleChangePagination = (pages: number, size: number) => {
    setStates({
      ...states, page: pages, size: size
    });
    dispatch(getCustomerLeadsData({
      launch_source_group_id: Number(states.launchSourceGroupID?.value ?? 0),
      launch_source_id: Number(states.launchSourceID?.value ?? 0),
      from_date: moment(states.dateFrom).format('YYYY-MM-DD 00:00:00'),
      to_date: moment(states.dateTo).format('YYYY-MM-DD 23:59:59'),
      keyword: states.keyword,
      page: pages, limit: size
    }));
  };
   const { mutate: getListPatientOld } = useMutation(
    "post-footer-form",
    () => listPatientsOld(),
    {
      onSuccess: (data) => {
        if (!data.status) return;
        setListPatinents({
          ...listPatients,
          data: data,
          clone: data
        });
      },
      onError: (e) => {
        console.error(" 🚀- DaiNQ - 🚀: -> e:", e);
      },
    }
  );

  const handleGetListPatientOld = () => {
    setIsListPatinent(true);
   

    getListPatientOld();
  }
    const handleConvertServiceSelected = (
    service: ServiceItem,
    checked: boolean
  ) => {
    // khi bấm checkbox của từng dịch vụ, nếu mà dịch vụ đó chưa được chọn thì checked == true và tiến hành thêm vào mảng serviceSelected
    //  - còn nếu nó đã được chọn và khi bấm vào nó đồng nghĩa dịch vụ đó khi đó có checked == false và thực hiện câu lệnh else và tiên hành tạo 1 mảng mới lọc ra dịch vụ có id = với id truyền vào
    //      + thì lúc này mảng mới sẽ không còn dịch vụ đó và kế tiếp là thêm mảng mới được tạo vào mảng serviceSelected
 
    if (checked) {
      setServiceSelected([service, ...serviceSelected]);
    } else {
      const newList = serviceSelected.filter(
        (i) => i.service_id !== service.service_id
      );

      setServiceSelected(newList);
    }
  };
  const columnTable = [
    {
      title: <Typography content="STT" modifiers={['12x18', '500', 'center', 'uppercase']} />,
      dataIndex: 'RowNumber',
      align: 'center',
      width: 50,
      className: "ant-table-column_wrap",
    render: (record: any, data: any, index: any) => (
        <div className="ant-table-column_item" style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Typography content={`${index + 1}`}  modifiers={['13x18', '600', 'main', 'justify']} />
        </div>
      ),
    },
    // {
    //   title: <Typography content="Ngày tạo" modifiers={['12x18', '500', 'center', 'uppercase']} />,
    //   dataIndex: 'create_date',
    //   align: 'center',
    //   width: 140,
    //   className: "ant-table-column_wrap",
    //   render: (record: any, data: any) => (
    //     <div className="ant-table-column_item" style={{ display: 'flex', justifyContent: 'center' }} onClick={() => {
    //       const { customer_id, customer_fullname, ...prevData } = data;
    //       if (customer_id) {
    //         Cookies.set("id_customer", customer_id);
    //         dispatch(getInfosCustomerById({ customer_id: customer_id }));
    //         window.open(
    //           `/customer-info/id/${customer_id}/history-interaction`,
    //           "_blank"
    //         );
    //       } else {
    //         toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
    //       }
    //     }}>
    //       <Typography content={record ? moment(record).format('HH:mm DD-MM-YYYY') : ''} modifiers={['13x18', '600', 'main', 'justify']} />
    //     </div>
    //   ),
    // },
       {
      title: <Typography content="Tên Khách hàng" modifiers={['12x18', '500', 'center', 'uppercase']} styles={{textAlign:"left", marginLeft:"12px"}}/>,
      dataIndex: 'customer_fullname',
      align: 'center',
         className: "ant-table-column_wrap",
        width: 320,
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            Cookies.set("id_customer", customer_id);
            dispatch(getInfosCustomerById({ customer_id: customer_id }));
            window.open(
              `/customer-info/id/${customer_id}/history-interaction`,
              "_blank"
            );
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}
        style={{ justifyContent:"start" }} 
        >
          <Typography content={record} modifiers={['14x20', '600', 'center', 'main']} />
        </div>
      ),
    },
    {
      title: <Typography content="Năm sinh" modifiers={['12x18', '500', 'center', 'uppercase']} />,
      dataIndex: 'year_of_birth',
      align: 'center',
      width: 140,
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" style={{ display: 'flex', justifyContent: 'center' }} onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            Cookies.set("id_customer", customer_id);
            dispatch(getInfosCustomerById({ customer_id: customer_id }));
            window.open(
              `/customer-info/id/${customer_id}/history-interaction`,
              "_blank"
            );
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={record} modifiers={['13x18', '600', 'main', 'justify']} />
        </div>
      ),
    },
     {
      title: <Typography content="Giới tính" modifiers={['12x18', '500', 'center', 'uppercase']} />,
      dataIndex: 'gender_name',
      align: 'center',
      width: 140,
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" style={{ display: 'flex', justifyContent: 'center' }} onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            Cookies.set("id_customer", customer_id);
            dispatch(getInfosCustomerById({ customer_id: customer_id }));
            window.open(
              `/customer-info/id/${customer_id}/history-interaction`,
              "_blank"
            );
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={record} modifiers={['13x18', '600', 'main', 'justify']} />
        </div>
      ),
    },
    {
      title: <Typography content="Số điện thoại" modifiers={['12x18', '500', 'center', 'uppercase']} />,
      dataIndex: 'customer_phone',
      align: 'center',
      className: "ant-table-column_wrap",
        width: 200,
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            Cookies.set("id_customer", customer_id);
            dispatch(getInfosCustomerById({ customer_id: customer_id }));
            window.open(
              `/customer-info/id/${customer_id}/history-interaction`,
              "_blank"
            );
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={record ? record.replace('+84-', '0') : '---'} modifiers={['14x20', '600', 'main', 'justify']} />
        </div>
      ),
    },
    {
      title: <Typography content="Địa chỉ" modifiers={['12x18', '500', 'center', 'uppercase']} styles={{textAlign:"left", marginLeft:"12px"}} />,
      dataIndex: 'customer_full_address',
      align: 'center',
      //    filters: filterColumn.launch_source_group.map((group: any) => ({ text: group.text, value: group.value })),
      
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            Cookies.set("id_customer", customer_id);
            dispatch(getInfosCustomerById({ customer_id: customer_id }));
            window.open(
              `/customer-info/id/${customer_id}/history-interaction`,
              "_blank"
            );
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}
         style={{ justifyContent:"start" }} 
        >
          <Typography content={record} modifiers={['14x20', '600', 'main', 'justify']} />
        </div>
      ),
    },
    
      {
      title: <Typography content="Ngày cập nhật" modifiers={['12x18', '500', 'center', 'uppercase']} />,
      dataIndex: 'update_date',
      align: 'center',
      width: 200,
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" style={{ display: 'flex', justifyContent: 'center' }} onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            Cookies.set("id_customer", customer_id);
            dispatch(getInfosCustomerById({ customer_id: customer_id }));
            window.open(
              `/customer-info/id/${customer_id}/history-interaction`,
              "_blank"
            );
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={record ? moment(record).format('HH:mm DD-MM-YYYY') : ''} modifiers={['13x18', '600', 'main', 'justify']} />
        </div>
      ),
    },
    {
      title: <Typography content="" modifiers={["12x18", "500", "center"]} />,
      align: "center",
      dataIndex: "",
      className: "",
        width: 120,
      render: (record: any, data: any) => (
       
        <div className="ant-table-column_item" style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
          <div style={{ display: "flex", alignItems: "center"}}>
            <UserSwitchOutlined  style={{color:"#28a745", marginRight:"3px"}} />  <Typography content="Chỉ định" modifiers={['14x20', '600', 'green', 'justify']} /></div>
        </div>
      ),
    },
  ];
   const columnTableServicesSelect = [
    // Đây là button xóa
    {
      title: (
        <Typography
          content="Dịch vụ"
          modifiers={["14x20", "500", "center", "capitalize"]}
        />
      ),
      dataIndex: "service_name",
      align: "left",
      width: 50,
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div
          className="ant-table-column_item"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          {/* {
            record === "Khám Nội" && dataForm?.typeBooking?.value === "package" ? 
              <></>
              :  */}
              <Icon
            iconName="delete_item"
            onClick={
              () => {
              const newList = serviceSelected.filter(
                (i) => i.service_id !== data.service_id
              );
              setServiceSelected(newList);
             
              }
            }
              />
          {/* }
           */}
        </div>
      ),
    },
    // đây là tên dịch vụ đã chọn
    {
      title: (
        <Typography
          content="Dịch vụ"
          modifiers={["14x20", "500", "center", "capitalize"]}
        />
      ),
      dataIndex: "service_name",
      align: "left",
      showSorterTooltip: false,
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div
          className="ant-table-column_item"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Typography
            content={record}
            modifiers={["14x20", "400", "center", "main"]}
          />
        </div>
      ),
    },
    // đây là giá tiền tưng ứng dịch vụ đó
    {
      title: (
        <Typography
          content="Thành tiền"
          modifiers={["14x20", "500", "center", "capitalize"]}
        />
      ),
      dataIndex: "service_prices",
      align: "center",
      width: 120,
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item">
          <Typography
            content={record?.toLocaleString("vi-VN")}
            modifiers={["14x20", "400", "center"]}
          />
        </div>
      ),
    },
  ];
    const convertServiceSelected: any[] = [];
    const memoriesTableSelected = useMemo(() => {
    // giải thích logic thuật toán:
    // - VD có 3 object
    //   + Vòng lặp đẩu tiên, kiểm tra xem trong checkGroupIsExit có service_group_id này chưa, nếu chưa thì newGroup được tạo và convertServiceSelected sẽ có nhóm mới đó
    //   + Vòng lặp 2, nếu checkGroupIsExit vẫn service_group_id k có thì newGroup tiếp tục được thêm vào convertServiceSelected, lúc này convertServiceSelected có 2 object là 2 dịch vụ có service_group khác nhau
    //   + Vòng lặp 3, giả sử object thứ 3 có service_group_id đã có trong checkGroupIsExit thì item hiện tại được thêm vào mảng service_group_item của nhóm hiện có

    let total = 0;
    serviceSelected?.map((item, index) => {
      const checkGroupIsExit = convertServiceSelected.find(
        (i) => i.service_group_id === item.service_group_id
      );
      total += serviceSelected[index]?.service_prices;
      setTotalService(total.toLocaleString("vn-VN"));
      const newGroup = {
        service_group_id: item.service_group_id,
        service_group_name: item.service_group_name,
        service_group_item: [item],
      };

      if (checkGroupIsExit) {
        checkGroupIsExit.service_group_item.push(item);
      } else {
        convertServiceSelected.push(newGroup);
      }
    });
    return (
      <div className="m-form_add_customer-booking_box_table">
        <PublicTable
          className="table_parent"
          // column ở đây là name của service_group_name
          column={[
            {
              title: "",
              align: "left",
              dataIndex: "service_group_name",
              render: (record: any, data: any) => (
                <div
                  className="p-booking_schedule_heading"
                  style={{
                    padding: 0,
                  }}
                >
                  <Typography
                    content={record}
                    modifiers={["16x24", "600", "justify", "blueNavy"]}
                    styles={{
                      paddingLeft: "10px",
                    }}
                  />
                </div>
              ),
            },
          ]}
          listData={convertServiceSelected}
          isHideRowSelect
          isHideHeader
          isExpandable={true}
          defaultExpandAllRow={true}
          isPagination={false}
          rowkey="service_group_id"
          expandedRowKeys={
            convertServiceSelected?.map((i) => i?.service_group_id) ?? []
          }
          // expandedRender là các service_name của các service_group_name được phân định qua 2 dòng code trên
          expandedRender={(
            record: any,
            index: any,
            indent: any,
            expanded: any
          ) => {
            return (
              <div
                key={record?.service_group_id}
                className="m-form_add_customer-booking_box_table_children"
              >
                <PublicTable
                  isSimpleHeader
                  className="table_children"
                  column={columnTableServicesSelect}
                  listData={record?.service_group_item ?? []}
                  size="small"
                  scroll={{ x: "max-content", scrollToFirstRowOnChange: false }}
                  isPagination={false}
                  isHideRowSelect
                  isHideHeader
                />
              </div>
            );
          }}
        />
      </div>
    );
  }, [serviceSelected]);
  /* Column */
  const memoryTableCampaign = useMemo(() => {
    return (
      <div className="m-form_add_customer-booking_box">
        <div
              className="m-form_add_customer-booking_box_header"
              style={{ alignItems: "end", justifyContent: "space-between", display:"block",background:"white", padding:"10px" }}
            >
              
          <div style={{ display: "flex", alignItems:"center", justifyContent:"space-between"}}>
            <div style={{ display: "flex", alignItems: "center", gap:"5px"}}> <Typography content={"Họ tên:"} modifiers={['15x22', '500', 'center']} />    <Typography content={InfoOfPatient?.data?.customer?.customer_fullname} modifiers={['15x22', '500', 'center']} styles={{fontWeight:"600"}}/> </div> 
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}> <Typography content={"Giới tính:"} modifiers={['15x22', '500', 'center']} />    <Typography content={InfoOfPatient?.data?.customer?.gender?.name} modifiers={['15x22', '500', 'center']}  /> - 
            <Typography content={"Năm sinh:"} modifiers={['15x22', '500', 'center']} />    <Typography 
  content={InfoOfPatient?.data?.customer?.year_of_birth?.toString() ?? ''} 
  modifiers={['15x22', '500', 'center']} 
/>
            </div> 
            <div style={{ display: "flex", alignItems: "center", gap:"5px"}}> <Typography content={"Điện thoại:"} modifiers={['15x22', '500', 'center']} />   <Typography 
  content={InfoOfPatient?.data?.customer?.customer_phone?.replace('+84-', '0')} 
  modifiers={['15x22', '500', 'center']} 
/>
</div> 
              <div style={{ display: "flex", alignItems: "center", gap:"5px"}}> <Typography content={"Mã bệnh nhân:"} modifiers={['15x22', '500', 'center']} />   <Typography content={InfoOfPatient?.data?.customer?.customer_id}  modifiers={['15x22', '500', 'center']} />
</div> 
          </div>
          <div style={{ display: "flex", alignItems:"center", justifyContent:"space-between"}}>
            <div style={{ display: "flex", alignItems: "center", gap:"5px"}}> <Typography content={"Địa chỉ:"} modifiers={['15x22', '500', 'center']} />    <Typography content={InfoOfPatient?.data?.customer?.customer_full_address} modifiers={['15x22', '500', 'center']}/> </div> 
           
          </div>
            </div>
            <div
              className="m-form_add_customer-booking_box_header"
              style={{ alignItems: "end", justifyContent: "space-between", display:"block" }}
            >
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center",paddingLeft:"10px",paddingRight:"10px" }}
          >
            
            <div style={{flex:1}}>
            <CDatePickers
              
                  label="Ngày đặt hẹn:"
                  // handleOnChange={(date: any) => {
                  //   setDataForm({ ...dataForm, dateBooking: date?.$d });
                  //   setErrorForm({ ...errorForm, dateBooking: "" });
                  // }}
                  variant="simple"
                  format={"DD-MM-YYYY HH:mm"}
                  isShowTime
                  placeholder="08:00 - 12/01/2023"
                  // ValDefault={dataForm.dateBooking}
                  // value={dataForm.dateBooking as Date}
                />
              </div>
            <div style={{flex:4}}>
              <Dropdown
                  dropdownOption={stateServices?.flatMap(
                    (item) => item
                  )}
                  label="Tìm kiếm dịch vụ"
                  placeholder="Nhập tên dịch vụ cần tìm..."
                  handleSelect={(item) => {
                    handleConvertServiceSelected(item as any, true);
                  }}
                  variant="simple"
                  values={undefined}
              defaultValue={undefined}
              
                />
                </div>

            <div style={{flex:5}}>
              <Input label='Nhập ghi chú/dặn dò' placeholder='Nhập dặn dò/ghi chú cho Doctor Check nếu có...' variant='simple'  error={sendSMSEror.subject} onChange={(event) => {
            setSendSMS({ ...sendSMS, subject: event?.target?.value });
            setSendSMSError({ ...sendSMSEror, subject: '', });
            }}
            />
                 </div>

      
              </div>
            <div
                style={{ display: "flex", gap: "5px", alignItems: "center",paddingLeft:"10px",paddingRight:"10px"  }}
              >
                 <Dropdown
              dropdownOption={statePackages}
              // defaultValue={valUpdate?.origin as DropdownData}
              isOpen={true}
              openSelect={openSelect}
              setOpenSelect={setOpenSelect}
              label="Gói dịch vụ"
              placeholder="Chọn gói dịch vụ để đặt lịch khám theo gói"
              positions={120}
              handleSelect={(item) => {
                setOpenSelect(false);
               
                     
           

                  // const getPackageById = stateServices.find(
                  //   (i) => i.package_id === item.package_id
                  // );
                //  setServiceSelected(getPackageById?.items);
                handleSendIdPackage(item?.package_id)
               
                  // setPackageSelected(item);
                  // setDataForm({
                  //   ...dataForm,
                  //   noteBooking: item.label,
                 
                  // });
                     
                  // setServicePackageId(item.value);
                
                }
              }
              variant="simple"
              values={packageSelected}
                />

                <Dropdown
                  dropdownOption={stateIcd10s?.flatMap(
                    (item) => item
                  )}
                  label="Chuẩn đoán"
                  placeholder="Chọn ICD10"
              handleSelect={(item) => {
                  
                setDataForm({
                  ...dataForm,
                    icd10s : item.label
                    })
                  }}
                  variant="simple"
                  values={undefined}
                  defaultValue={undefined}
                />

                <Input label='Nhập chuẩn đoán' placeholder='Chọn ICD10 hoặc nhập chuẩn đoán' value={dataForm.icd10s} variant='simple'  error={sendSMSEror.subject} onChange={(event) => {
            setDataForm({ ...dataForm, icd10s: event?.target?.value });
            // setSendSMSError({ ...sendSMSEror, subject: '', });
          }} />
      
              </div>
            </div>
            <div
              className="m-form_add_customer-booking_box_body"
              style={{ height: "calc(85vh - 200px)" }}
            >
              <div className="m-form_add_customer-booking_box_service">
                {stateServiceGroup.length &&
                  stateServiceGroup.map((parent: any) => {
                    return (
                      <div
                        key={parent.service_group_id}
                        className="m-form_add_customer-booking_box_service_item"
                      >
                        {/* Đoạn code  CCollapse là hiện danh sách dịch vụ theo service_group_name */}
                        <CCollapse
                          key_default="1"
                             title={`${parent.service_group_name} (${parent?.services.length})`}
                         // title="s"
                        >
                          <div className="m-form_add_customer-booking_box_service_item_wrapper">
                            {parent?.services?.map((item: any) => (
                              <div
                                key={item.service_id}
                                className="m-form_add_customer-booking_box_service_item_children"
                              >
                                <Checkbox
                                  label={item.service_name}
                                  checked={serviceSelected.some(
                                    (i) => i.service_id === item.service_id
                                  )}
                                  onChange={(data: any) => {
                                    handleConvertServiceSelected(
                                      item,
                                      data?.target?.checked
                                    );
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </CCollapse>
                      </div>
                    );
                  })}
              </div>
              {memoriesTableSelected}
            </div>
           
          </div>
    )
  }, [storeResponseListPatients?.data, storeResponseListPatients, storeLoadingListPatients, loadingListPatients, listPatients,serviceSelected,dataForm.icd10s,openSelect,storeResponseInfoOfPatient.data,storeLoadingInfoOfPatient,InfoOfPatient])

  return (
    <div className='p-customer_leads'>
      <PublicLayout>
        <PublicHeader
          titlePage={'Tạo chỉ định mới'}
          handleGetTypeSearch={() => { }}
          handleFilter={() => { }}
          handleCleanFilter={() => { }}
          isHideFilter
          isHideService
          className='p-customer_leads_header'
          isDial={false}
          isHideEmergency
          isHideCleanFilter
        />
        <PublicHeaderStatistic isStatistic={false}
          leftNode={
            <>
            <Typography content="Chọn bệnh nhân cũ để chỉ định:" modifiers={['12x18', '500', 'center', 'uppercase']} />
            
              < Input
                variant='simple'
                placeholder='Tìm kiếm khách hàng'
                type='text'
                iconName='search'
                value={states.keyword}
               
                handleClickIcon={() => {
                  handleGetListPatientOld()
                setIsOpenListPatient(true)
                }}
               
              />
           
            </>
          }
          
        >
           <Button modifiers={['primary']} style={{display:"flex", alignItems:"center"}} onClick={() => setIsOpenFormAddPatient(true)}>
           <PlusCircleOutlined style={{marginRight:"5px", width:"14px", height:"14px", marginTop:"1px"}}/>   <Typography content='Thêm mới bệnh nhân' modifiers={['400']} />
              </Button>
        </PublicHeaderStatistic>
        {
          InfoOfPatient?.status === true ? 
          <div className='p-customer_leads_table'>
          {memoryTableCampaign}
            </div>
            :
             <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '16px',
        borderLeft: '4px solid #f9c74f',
        backgroundColor: '#fffbea',
        borderRadius: '4px',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      
        margin: '20px auto',
      }}
    >
      <div
        style={{
          fontSize: '24px',
          marginRight: '12px',
          color: '#f9c74f',
        }}
      >
        ⚠️
      </div>
      <div style={{ flex: 1 }}>
        <h3
          style={{
            margin: 0,
            fontSize: '18px',
            color: '#d97706',
            fontWeight: 'bold',
          }}
        >
          Chọn bệnh nhân để chỉ định!
        </h3>
        <p
          style={{
            margin: '8px 0 0',
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#333',
          }}
        >
          Vui lòng tìm & chọn một bệnh nhân để chỉ định cận lâm sàng. Nếu bệnh
          nhân chưa được tạo, Bác sĩ vui lòng nhấn vào{' '}
          <strong style={{ fontWeight: 'bold', color: '#d97706' }}>
            Thêm mới bệnh nhân
          </strong>{' '}
          để tạo mới, sau đó tiến hành chỉ định cận lâm sàng cho bệnh nhân.
        </p>
      </div>
    </div>
        }
        
      </PublicLayout>
      <CDrawer
        isOpen={isOpenListPatient}
        titleHeader="Chọn bệnh nhân cũ để chỉ định"
        handleOnClose={() => setIsOpenListPatient(false)}
        positon='left'
        widths={650}
        isHaveHeader
        isHaveHeader_custom
      >
          <div className="t-public_header_hospital">
            <div className="t-public_header_hospital_search" style={{marginTop:'10px'}}>
              <Input iconName="search"
                // handleClickIcon={handleSearchListInsuranceHospital}
                // handleEnter={handleSearchListInsuranceHospital}
                // value={listPatient}
                // onChange={(event) => {
                //   const newList = listPatient?.clone.data.filter((item) => item.customer_fullname.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
                //   setListPatinents({
                //     ...listPatient,
                //     data: {
                //       data: newList,
                //       paging: listPatient.clone
                //     },
                //   });
                //   setListPatinentValue(event.target.value)
                // }}
                placeholder="Vui lòng nhập tên bệnh nhận cũ để chỉ định"
              />
            </div>
            <ul className="t-public_header_hospital_content">
              {listPatient.data?.data?.length ? listPatient.data?.data.map((item) => (
              <li 
  key={item.customer_id} 
  onClick={() => {
    dispatch(
      GetInfoOfPatientAPI({
        customer_id: item.customer_id,
      }as any) 
      
    );
    setIsOpenListPatient(false)
  }}
>
                  <Typography content={item.customer_fullname + " " + "-" +" " + "Giới tính: " + item.gender_name + " " + "-" +" " + "Năm sinh: " + item.year_of_birth} />
                  <span>Điện thoại: <strong> {item.customer_phone} </strong>- Địa chỉ: <strong>{item.customer_full_address}</strong></span>
                </li>
              )) : null}
            </ul>
          </div>
      </CDrawer>
       <CModal
        isOpen={isOpenFormAddPatient}
        title="Tạo mới bệnh nhân"
        widths={600}
        textCancel='Đóng'
        textOK='Thêm mới'
        onCancel={() =>
          setIsOpenFormAddPatient(false)
          // setSendSMS({
          // ...sendSMS, openModal: false,
          
          // campaignType: sendMessagetype[0] as unknown as GroupRadioType,
          // template: undefined as unknown as DropdownData,
          // campaign: undefined as unknown as DropdownData,
          // content: '',
          // subject: '',
          // })
        }
        // onOk={handleExcuteSendMessage}
      >
       
        <div className='p-point_manager_form_sms'>
          <Input label='Họ và tên' variant='simple' isRequired error={sendSMSEror.subject} onChange={(event) => {
            setSendSMS({ ...sendSMS, subject: event?.target?.value });
            setSendSMSError({ ...sendSMSEror, subject: '', });
          }} />
          <div style={{ display: "flex", gap: "16px" }}>
  <div style={{ flex: "6" }}>
    <Dropdown
      dropdownOption={stateGenders}
      placeholder="Nam"
      label="giới tính:"
      handleSelect={(item) => {
        setDataForm({ ...dataForm, gender: item });
      }}
      variant="simple"
      values={(dataForm.gender as any) || undefined}
    />
  </div>
  <div style={{ flex: "4", marginTop:"2px" }}>
    <InputDateOfBirth
      // isRequired={isBooking}
      label="Ngày sinh:"
      handleOnChange={(date: string) => {
        setDataForm({ ...dataForm, dayOfBirth: date });
        // clearStateErrorForm("dayOfBirth");
      }}
      // error={errorForm.dayOfBirth}
      valueDefault={dataForm.dayOfBirth}
      // onChangInput={() => clearStateErrorForm("dayOfBirth")}
    />
  </div>
          </div>
             <div style={{ display: "flex", gap: "16px" }}>
  <div style={{ flex: "5" }}>
    <Input label='Điện thoại' variant='simple' isRequired error={sendSMSEror.subject} onChange={(event) => {
            setSendSMS({ ...sendSMS, subject: event?.target?.value });
            setSendSMSError({ ...sendSMSEror, subject: '', });
          }} />
  </div>
  <div style={{ flex: "5", }}>
    <Input label='CMND/CCCD' variant='simple' isRequired error={sendSMSEror.subject} onChange={(event) => {
            setSendSMS({ ...sendSMS, subject: event?.target?.value });
            setSendSMSError({ ...sendSMSEror, subject: '', });
          }} />
  </div>
</div>
           <Input label='Địa chỉ' variant='simple' isRequired error={sendSMSEror.subject} onChange={(event) => {
            setSendSMS({ ...sendSMS, subject: event?.target?.value });
            setSendSMSError({ ...sendSMSEror, subject: '', });
          }} />
           <div style={{ display: "flex", gap: "16px" }}>
  <div style={{ flex: "3" }}>
    <Dropdown
      dropdownOption={province}
      placeholder="TP. Hồ Chí Minh"
      label="Tỉnh thành"
      handleSelect={(item) => {
        handleGetDistrict(item.value)
      }}
      variant="simple"
      values={(dataForm.gender as any) || undefined}
    />
  </div>
  <div style={{ flex: "3", marginTop:"2px" }}>
    <Dropdown
      dropdownOption={district}
      placeholder=""
      label="Quận huyện"
      handleSelect={(item) => {
        console.log()
        handleGetWard(item.value)
      }}
      variant="simple"
      values={(dataForm.gender as any) || undefined}
    />
            </div>
            
          </div>
           <div style={{ display: "flex", gap: "16px" }}>
  <div style={{ flex: "3" }}>
    <Dropdown
      dropdownOption={ward}
      placeholder=""
      label="Phường xã"
      handleSelect={(item) => {
        setDataForm({ ...dataForm, gender: item });
      }}
      variant="simple"
      values={(dataForm.gender as any) || undefined}
    />
  </div>
  <div style={{ flex: "3", marginTop:"2px" }}>
    <Dropdown
      dropdownOption={stateCountries}
      placeholder=""
      label="Quốc tịch"
      handleSelect={(item) => {
        setDataForm({ ...dataForm, gender: item });
      }}
      variant="simple"
      values={(dataForm.gender as any) || undefined}
    />
            </div>
            
          </div>
          <Input label='Email' variant='simple' isRequired error={sendSMSEror.subject} onChange={(event) => {
            setSendSMS({ ...sendSMS, subject: event?.target?.value });
            setSendSMSError({ ...sendSMSEror, subject: '', });
          }} />
            <div style={{ display: "flex", gap: "16px" }}>
  <div style={{ flex: "3" }}>
    <Dropdown
      dropdownOption={stateNations}
      placeholder=""
      label="Dân tộc"
      handleSelect={(item) => {
        setDataForm({ ...dataForm, gender: item });
      }}
      variant="simple"
      values={(dataForm.gender as any) || undefined}
    />
  </div>
  <div style={{ flex: "3", marginTop:"2px" }}>
    <Dropdown
      dropdownOption={stateCareers}
      placeholder=""
      label="Nghề nghiệp"
      handleSelect={(item) => {
        setDataForm({ ...dataForm, gender: item });
      }}
      variant="simple"
      values={(dataForm.gender as any) || undefined}
    />
            </div>
            
          </div>
        </div>
      </CModal>
    </div>
  );
}

export default CreateIndication;
