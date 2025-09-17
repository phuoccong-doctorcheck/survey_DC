/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
import { LoadingOutlined } from '@ant-design/icons';
import { BarChartOutlined, DollarOutlined, StarTwoTone } from '@ant-design/icons';
import { message, DatePicker } from "antd";
import { Flex, Spin } from 'antd';
import Button from 'components/atoms/Button';
import CDatePickers from "components/atoms/CDatePickers";
import CPopupConfirm from 'components/atoms/CPopupConfirm';
import Dropdown, { DropdownData } from "components/atoms/Dropdown";
import Icon, { IconName } from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import InputDateOfBirth from 'components/atoms/InputDateOfBirth';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import FormAddCustomer from "components/molecules/FormAddCustomer";
import PublicTable from 'components/molecules/PublicTable';
import UserDropdown from 'components/molecules/UserDropdown';
import CModal from 'components/organisms/CModal';
import { Dayjs } from "dayjs";
import Cookies from 'js-cookie';
import moment from "moment";
import React, { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate,useLocation  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postPrintAppointmentServicepoint } from "services/api/appointmentView";
import { getCustomerById, postSaveCustomerBeforeExams } from "services/api/beforeExams";
import { PayloadGetBeforeExams } from "services/api/beforeExams/types";
import { postCheckInsurance } from 'services/api/customerInfo';
import { InsuranceResp } from 'services/api/customerInfo/types';
import { getCustomerByKey, postMergeustomer } from 'services/api/dashboard';
import { getReportFacebookByDate, updateReport } from "services/api/statistics";
import { getListToStoreBeforeExams } from "store/beforeExams";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import mapModifiers, { copyClipboard, previewBlobPDFOpenLink } from 'utils/functions';
import { MenuCRM } from 'utils/staticState';

import logoActive from 'assets/images/Logo-white.png';

interface HeaderNavProps {
  handleClickMenuItem: () => void;
  handleLogin?: () => void;
  handleClickLogo?: () => void;
  isSortHeader?: boolean;
  currentWidth?: number;
}

const HeaderNav: React.FC<HeaderNavProps> = ({
  handleClickMenuItem, handleLogin, handleClickLogo, isSortHeader, currentWidth
}) => {

  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const username = useAppSelector((state) => state.home.shortName);
  const myTask = useAppSelector((state) => state.infosCustomer.respMyTask);
  const [name, setName] = useState(username);
  const [shortname, setshortname] = useState('');
const roles = Cookies.get('roles');

// Kiểm tra nếu chuỗi không phải là `undefined` hoặc `null`, thì parse nó thành mảng
const rolesArray = roles ? JSON.parse(roles) : [];
// In ra mảng để kiểm tra
  const getName = Cookies.get('fullname');
  const getUsername = Cookies.get('username');
  const getshortname = Cookies.get('shortname');
  const getRoles = localStorage.getItem('roles');
  const myTaskStorage = localStorage.getItem('myTask');
  const [stateMyTask, setStateMyTask] = useState(myTaskStorage ? JSON.parse(myTaskStorage || '') : []);
  const [listRoles, setListRoles] = useState(getRoles ? JSON.parse(getRoles) : '');
  const storageLaunchSources = localStorage.getItem("launchSources");
  const storageLaunchSourcesGroup = localStorage.getItem("launchSourcesGroups");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isLoadingDL, setIsLoadingDL] = useState(false);
  const [isUpdateCustomer, setIsUpdateCustomer] = useState(false);
  const [isClosePopup, setIsClosePopup] = useState(false);
    const [customerUpdate, setCustomerUpdate] = useState<any>();
  const [stateLaunchSourceGroups, setstateLaunchSourceGroups] = useState<DropdownData[]>(storageLaunchSourcesGroup ? JSON.parse(storageLaunchSourcesGroup) : []);
  const [stateLaunchSource, setstateLaunchSource] = useState<DropdownData[]>(storageLaunchSources ? JSON.parse(storageLaunchSources) : []);

  const [isOpenInsurance, setIsOpenInsurance] = useState(false);
  const [isOpenReportFacebook, setIsOpenReportFacebook] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  /* Search */
  const [keySearch, setKeySearch] = useState('');
  const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [insuranceResponse, setInsuranceResponse] = useState<InsuranceResp>()
 
  const [isMerge, setIsMerge] = useState(false);
  const [isMergeSuccess, setIsMergeSuccess] = useState(false);
  const [dataMerge, setDataMerge] = useState({
    from: '',
    to: '',
    note: 'Trùng thông tin',
    fromErr: '',
    toErr: '',
    noteErr: '',
    search: '',
    resultSearch: [],
    isSearch: false,
    loading: false,
  })
  const [filterData, setFilterData] = useState({
    fromDay: moment(new Date()).format('YYYY-MM-DDT00:00:00'),
    toDay: moment(new Date()).format('YYYY-MM-DDT23:59:59'),
    origin: undefined as unknown as DropdownData[],
    originGroup: undefined as unknown as DropdownData,
    originType: undefined as unknown as DropdownData,
    state: undefined as unknown as DropdownData,
    tag: undefined as unknown as DropdownData,
    key: "",
    yourCustomer: false,
  });

  const [insurance, setInsurance] = useState({
    fullName: '',
    dayOfBirth: '',
    idCard: '',
    result: ''
  })
  const [insuranceErrr, setInsuranceErr] = useState({
    fullName: '',
    dayOfBirth: '',
    idCard: '',
  })

  const [formReport, setFormReport] = useState({
    date: undefined as unknown as any,
    group: undefined as unknown as DropdownData,
    launchSource: undefined as unknown as DropdownData,
    appointment: '0',
    new_customer: '0',
    hasPhone: '0',
    total: '0',
    hot: '0',
    warm: '0',
    cool: '0',
  })

  const [formReportErr, setFormReportErr] = useState({
    date: '',
    group: '',
    launchSource: '',
  })


  const OptionUser = [
    { id: 1, label: 'Đổi mật khẩu', value: '/profile', handleClick: () => { } },
    { id: 2, label: 'đăng xuât', value: '/logout', handleClick: () => { } },
  ];

  const messageNoti = (mess: string) => {

    return messageApi.open({
      type: 'success',
      content: mess,
    });
  };

  const navigators = useNavigate();

  
  const [indexActive, setIndexActive] = useState(0);
  const storageIndexMenu = sessionStorage.getItem('indexMenu');

  const [isHover, setIsHover] = useState<Number>(0);
  const [idHover, setIdHover] = useState<Number>(0);

  const checkRoles = (roleNames: string[]) => {
    return listRoles && listRoles?.some((role: any) => roleNames?.some((i => i === role?.role_name || i === 'normal')));
  };
   const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePage(true)
    }
  }, [location]);
  useEffect(() => {
    if (storageIndexMenu) {
      setIndexActive(Number(storageIndexMenu));
    } else {
      setIndexActive(Number(sessionStorage.getItem('indexMenu')));
    }
  }, [])
  useEffect(() => {
    
    if (getName) {
      setName(getName);
    } else {
      setName(username);
    }
    if (getshortname) {
      setshortname(getshortname);
    } else {
      setName(Cookies.get('shortname') || '');
    }
  }, [username, getshortname]);
  // Đây là hàm call API search khách hàng
  const { mutate: getSearchByKey } = useMutation(
    'post-footer-form',
    (id: string) => getCustomerByKey(id),
    {
      onSuccess: async (data) => {
        if (!data.length) {
          setIsLoading(false);
          setKeySearch('')
          toast.error('Không tìm thấy thông tin khách hàng');
        } else {
          if (dataMerge.isSearch) {
          
            await setDataMerge({
              ...dataMerge,
              resultSearch: data,
              loading: false,
            });
          } else {
         
          
            setKeySearch('')
            setIsOpenModalSearch(true);
            setDataSearch(data);
            setIsLoading(false);
          }
        }
      },
      onError: (error) => {
        console.error('🚀 ~ file: index.tsx:159 ~ error:', error);
      },
    },
  );

  const { mutate: checkInsurance } = useMutation(
    'post-footer-form',
    (body: any) => postCheckInsurance(body),
    {
      onSuccess: (data) => {
        setInsuranceResponse(data)
        setInsurance({
          ...insurance,
          result: data?.message,
        })
      },
      onError: (error) => {
        console.error('🚀 ~ file: index.tsx:159 ~ error:', error);
      },
    },
  );

  const { mutate: mergeCustomerById } = useMutation(
    'post-footer-form',
    (body: any) => postMergeustomer(body),
    {
      onSuccess: async (data) => {
        if (data?.status) {
          // setIsMerge(false);
          setIsMergeSuccess(false);
          toast.success('Gộp khách hàng thành công')
          setDataMerge((prev) => ({
            ...dataMerge,
            from: '',
            note: 'Trùng thông tin',
            fromErr: '',
            toErr: '',
            noteErr: '',
            loading: false,
            resultSearch: prev?.resultSearch?.filter((i: any) => i?.customer_id !== prev.from)
          }));
        } else {
          toast.error(data.message);
        }
      },
      onError: (error) => {
        console.error('🚀 ~ file: index.tsx:159 ~ error:', error);
      },
    },
  );

  const { mutate: getDataFacebook } = useMutation(
    'post-footer-form',
    (body: any) => getReportFacebookByDate(body),
    {
      onSuccess: async (data) => {
        if (data?.status) {
          const getDataAllowBrand = data?.data?.find((i: any) => i.launch_source_group_id === formReport.group.id)
          if (getDataAllowBrand) {
            const getDataAllowLaunchSource = getDataAllowBrand?.items?.find((i: any) => i.launch_source_id === formReport.launchSource.id)
            setFormReport({
              ...formReport,
              appointment: `${getDataAllowLaunchSource.appointment_number}`,
              new_customer: `${getDataAllowLaunchSource.new_customer_number}`,
              hasPhone: `${getDataAllowLaunchSource.has_phone_number}`,
              total: `${getDataAllowLaunchSource.inbox_total}`,
              hot: `${getDataAllowLaunchSource.inbox_hot}`,
              warm: `${getDataAllowLaunchSource.inbox_warm}`,
              cool: `${getDataAllowLaunchSource.inbox_cool}`,
            })
          }
        }
      },
      onError: (error) => {
        console.error('🚀 ~ file: index.tsx:159 ~ error:', error);
      },
    },
  );
  const { mutate: updateGrowthReport } = useMutation(
    'post-footer-form',
    (body: any) => updateReport(body),
    {
      onSuccess: async (data) => {
        if (data?.status) {
          setIsOpenReportFacebook(false);
          toast.success('Lưu báo cáo thành công!')
        }
      },
      onError: (error) => {
        console.error('🚀 ~ file: index.tsx:159 ~ error:', error);
      },
    },
  );

  const handleValidategetDataFacebook = () => {
    if (!formReport.date || !formReport.launchSource || !formReport.group) {
      setFormReportErr({
        date: !formReport.date ? 'Vui lòng chọn ngày cần báo cáo' : '',
        group: !formReport.group ? 'Vui lòng chọn công ty cần báo cáo' : '',
        launchSource: !formReport.launchSource ? 'Vui lòng chọn nguồn cần báo cáo' : '',
      })
      return false;
    }
    return true;
  }

  const handleGetDataFacebook = () => {
    if (!handleValidategetDataFacebook()) return;
    const param = {
      date: moment(formReport.date?.$d).format('YYYY-MM-DD'),
      launch_source_group_id: formReport.group?.id,
      launch_source_id: formReport.launchSource?.id,
    }
    getDataFacebook(param);
  }

  const handleUpdateGrowthReport = () => {
    const body = {
      launch_source_group_id: formReport.group.id,
      launch_source_group_name: formReport.group.label,
      date: moment(formReport.date?.$d).format('YYYY-MM-DD'),
      launch_source_id: formReport.launchSource.id,
      launch_source_name: formReport.launchSource.label,
      appointment_number: Number(formReport.appointment),
      new_customer_number: Number(formReport.new_customer),
      has_phone_number: Number(formReport.hasPhone),
      inbox_total: Number(formReport.total),
      inbox_hot: Number(formReport.hot),
      inbox_warm: Number(formReport.warm),
      inbox_cool: Number(formReport.cool),
    }
    updateGrowthReport(body)
  }

  const handleValidateInsurance = () => {
    if (!insurance.idCard.trim()
      || !insurance.fullName.trim()
      || !insurance.dayOfBirth) {
      setInsuranceErr({
        ...insuranceErrr,
        fullName: !insurance.fullName.trim() ? 'Tên khách hàng là bắt buộc' : '',
        dayOfBirth: !insurance.dayOfBirth ? 'Ngày sinh là bắt buộc' : '',
        idCard: !insurance.idCard.trim() ? 'CCCD/ Mã BHYT là bắt buộc' : '',
      })

      return true;
    }
    return false
  }

  const handleCheckInsurance = async () => {
    if (handleValidateInsurance()) return;
    const body = {
      idCard: insurance.idCard, // Mã thẻ BHYT hoặc CCCD
      fullname: insurance.fullName, // Họ Tên đầy đủ
      birthday: insurance.dayOfBirth.replaceAll('-', '/')
    }
    await checkInsurance(body)
  }

  const handleValidateMergeCustomer = () => {
    if (!dataMerge.from.trim() || !dataMerge.to.trim() || !dataMerge.note.trim() || dataMerge.from === dataMerge.to) {
      setDataMerge({
        ...dataMerge,
        fromErr: !dataMerge.from.trim() ? 'Mã khách hàng là trường bắt buộc' : (dataMerge.from === dataMerge.to ? 'Trùng mã khách hàng' : ''),
        toErr: !dataMerge.to.trim() ? 'Mã khách hàng là trường bắt buộc' : '',
        noteErr: !dataMerge.note.trim() ? 'Vui lòng nhập lí do' : '',
      })
      return false
    }
    return true
  }
    const employeeId = localStorage.getItem("employee_id");
  const [isOpenFormContact, setIsOpenFormContact] = useState(false);
    const payloadBeforeExam: PayloadGetBeforeExams = {
    processKeyId: "all",
    launchSourceID: "all",
    launchSourceType: null,
    launchSourceGroup: null,
    followStaffId: filterData.yourCustomer ? employeeId as any : "all",
    fromDay: moment(new Date()).format("YYYY-MM-DDT00:00:00") as any,
    toDay: moment(new Date()).format("YYYY-MM-DDT23:59:59") as any,
    keyWord: "",
    pages: 1,
    limits: 500,
  };
    const [pagination, setPagination] = useState({ page: 0, pageSize: 0 });
   const { mutate: printAppointmentServicepoint } = useMutation(
    "post-footer-form",
    (data: string) => postPrintAppointmentServicepoint(data),
    {
      onSuccess: (data) => {
        if (data.status) {
          previewBlobPDFOpenLink(data?.data, data?.message);
        } else {
          toast.info(data?.message);
        }
      },
      onError: (error) => {
        console.log("🚀 ~ file: index.tsx:159 ~ error:", error);
      },
    }
  );
  const { mutate: getCustomerIdToGetCurrentAppointment } = useMutation(
    "post-footer-form",
    (data: any) => getCustomerById(data),
    {
      onSuccess: (data) => {
        if (data?.data?.appointment?.master_id) {
          printAppointmentServicepoint(data?.data?.appointment?.master_id);
        }
      },
      onError: (error) => {
        console.log("🚀: error --> getCustomerByCustomerId:", error);
      },
    }
  );
   const { mutate: postSaveCustomer } = useMutation(
    "post-footer-form",
    (data: any) => postSaveCustomerBeforeExams(data),
    {
      onSuccess: (data) => {
        if (data.status) {
          setIsOpenFormContact(false);
          // setTableLoading(false);
          getCustomerIdToGetCurrentAppointment({
            customer_id: data?.data,
            type: 'id',
          })
          dispatch(
            getListToStoreBeforeExams({
              ...payloadBeforeExam,
              processKeyId: "all",
              launchSourceID: "all",
              launchSourceType: null,
              launchSourceGroup: null,
              followStaffId: "all",
              fromDay: filterData?.fromDay
                ? moment(filterData.fromDay).format("YYYY-MM-DD 00:00:00")
                : (moment(new Date()).format("YYYY-MM-DDT00:00:00") as any),
              toDay: filterData?.toDay
                ? moment(filterData.toDay).format("YYYY-MM-DD 23:59:59")
                : (moment(new Date()).format("YYYY-MM-DDT23:59:59") as any),
              keyWord: filterData?.key || "",
              pages: pagination?.page || 1,
              limits: pagination?.pageSize | 30,
            } as unknown as PayloadGetBeforeExams)
          );
          toast.success(
            isUpdateCustomer
              ? "Cập nhật thông tin khách hàng thành công"
              : "Thêm khách hàng thành công"
          );
          setIsClosePopup(true);
          setIsOpenPopup(false);
        } else {
          toast.error(data.message);
          setIsClosePopup(true);
          setIsOpenPopup(false);
        }
      },
      onError: (e) => {
        toast.error("Đã có lỗi xảy ra ...!");
      },
    }
  );
    const handleAddCustomer = async (data: any) => {
    return new Promise((resolve, reject) => {
      try {
        // setDataBeforeExam(undefined as any);
        // setTableLoading(true);
        setIsClosePopup(true);
        postSaveCustomer(data);
        setIsOpenPopup(false);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };
  const handleMergeCustomer = async () => {
    if (!handleValidateMergeCustomer()) return;
    setIsMergeSuccess(true)
    const body = {
      from_customer_id: dataMerge.from,
      to_customer_id: dataMerge.to,
      employee_username: getUsername,
      employee_note: dataMerge.note,
    }
    await mergeCustomerById(body);
  }

  const tableColumnForSearch = [
    {
      title: <Typography content="STT" modifiers={['12x18', '500', 'center', 'uppercase']} />,
      dataIndex: 'RowNumber',
      align: 'center',
      width: 50,
      className: "ant-table-column_wrap",
      render: (record: any, data: any, index: any) => (
        <div className="ant-table-column_item" onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            const newTab = window.open(`/customer-info/id/${customer_id}/history-interaction`, '_blank');
            if (newTab) {
              newTab.focus();
            }
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={index + 1} modifiers={['13x18', '400', 'justify']} />
        </div>
      ),
    },
    {
      title: <Typography content="Họ tên" modifiers={['12x18', '500', 'center']} />,
      dataIndex: 'customer_fullname',
      align: 'center',
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            const newTab = window.open(`/customer-info/id/${customer_id}/history-interaction`, '_blank');
            if (newTab) {
              newTab.focus();
            }
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={record} modifiers={['12x18', '400', 'center']} />
        </div>
      ),
    },
    {
      title: <Typography content="Năm sinh" modifiers={['12x18', '500', 'center']} />,
      dataIndex: 'year_of_birth',
      width: 90,
      align: 'center',
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            const newTab = window.open(`/customer-info/id/${customer_id}/history-interaction`, '_blank');
            if (newTab) {
              newTab.focus();
            }
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={record || '---'} modifiers={['12x18', '400', 'center']} />
        </div>
      ),
    },
    {
      title: <Typography content="Giới tính" modifiers={['12x18', '500', 'center']} />,
      dataIndex: 'gender_id',
      width: 80,
      align: 'center',
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            const newTab = window.open(`/customer-info/id/${customer_id}/history-interaction`, '_blank');
            if (newTab) {
              newTab.focus();
            }
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={record === 'M' ? 'Nam' : 'Nữ'} modifiers={['12x18', '400', 'center']} />
        </div>
      ),
    },
    {
      title: <Typography content="Số điện thoại" modifiers={['12x18', '500', 'center']} />,
      dataIndex: 'customer_phone',
      align: 'center',
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            const newTab = window.open(`/customer-info/id/${customer_id}/history-interaction`, '_blank');
            if (newTab) {
              newTab.focus();
            }
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={record ? record.replace(/^.{4}/, '0') : '---'} modifiers={['12x18', '400', 'center']} />
        </div>
      ),
    },
    {
      title: <Typography content="Địa chỉ" modifiers={['12x18', '500', 'center']} />,
      dataIndex: 'customer_full_address',
      align: 'center',
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          const { customer_id, customer_fullname, ...prevData } = data;
          if (customer_id) {
            const newTab = window.open(`/customer-info/id/${customer_id}/history-interaction`, '_blank');
            if (newTab) {
              newTab.focus();
            }
          } else {
            toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
          }
        }}>
          <Typography content={record} modifiers={['12x18', '400', 'center']} />
        </div>
      ),
    },
    // {
    //   title: <Typography content="Ngày đặt lịch" modifiers={['12x18', '500', 'center']} />,
    //   dataIndex: '',
    //   align: 'center',
    //   className: "ant-table-column_wrap",
    //   render: (record: any, data: any) => (
    //     <div className="ant-table-column_item" onClick={() => {
    //       const { customer_id, customer_fullname, ...prevData } = data;
    //       if (customer_id) {
    //         const newTab = window.open(`/customer-info/id/${customer_id}/history-interaction`, '_blank');
    //         if (newTab) {
    //           newTab.focus();
    //         }
    //       } else {
    //         toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
    //       }
    //     }}>
    //       <Typography content={record} modifiers={['12x18', '400', 'center']} />
    //     </div>
    //   ),
    // },
    // {
    //   title: <Typography content="Nguồn" modifiers={['12x18', '500', 'center']} />,
    //   dataIndex: '',
    //   align: 'center',
    //   className: "ant-table-column_wrap",
    //   render: (record: any, data: any) => (
    //     <div className="ant-table-column_item" onClick={() => {
    //       const { customer_id, customer_fullname, ...prevData } = data;
    //       if (customer_id) {
    //         const newTab = window.open(`/customer-info/id/${customer_id}/history-interaction`, '_blank');
    //         if (newTab) {
    //           newTab.focus();
    //         }
    //       } else {
    //         toast.error(`Không tìm thấy khách hàng: ${customer_fullname}`);
    //       }
    //     }}>
    //       <Typography content={record} modifiers={['12x18', '400', 'center']} />
    //     </div>
    //   ),
    // },
  ];

  const columnMergeCustomer = [
    {
      title: <Typography content="Mã KH" modifiers={['12x18', '500', 'center']} />,
      dataIndex: 'customer_id',
      align: 'center',
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          copyClipboard(data?.customer_id); messageNoti('Đã copy mã Khách hàng');
        }}>
          <Typography content={record} modifiers={['12x18', '400', 'center']} />
        </div>
      ),
    },
    {
      title: <Typography content="Họ tên" modifiers={['12x18', '500', 'center']} />,
      dataIndex: 'customer_fullname',
      align: 'center',
      width: 240,
      showSorterTooltip: false,
      sortOrder: "ascend",
      sorter: (a: any, b: any) => (a?.customer_fullname || "").localeCompare(b?.customer_fullname || ""),
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" onClick={() => {
          copyClipboard(data?.customer_id); messageNoti('Đã copy mã Khách hàng');
        }} style={{
          flexDirection: 'column'
        }}>
          <Typography content={record} modifiers={['13x18', '400', 'center']} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
            <Typography content={data?.year_of_birth} modifiers={['12x18', '400', 'center', 'green']} />
            <span>-</span>
            <Typography content={data?.gender_id === 'M' ? 'Nam' : 'Nữ'} modifiers={['12x18', '400', 'center', 'cg-red']} />
            <span>-</span>
            <Typography content={data?.customer_phone ? data?.customer_phone.replace(/^.{4}/, '0') : '---'} modifiers={['12x18', '400', 'center', 'green']} />
          </div>
        </div>
      ),
    },
    {
      title: <Typography content="Địa chỉ" modifiers={['12x18', '500', 'center']} />,
      dataIndex: 'customer_full_address',
      align: 'center',
      className: "ant-table-column_wrap",
      render: (record: any, data: any) => (
        <div className="ant-table-column_item" style={{
          display: 'flex',
          justifyContent: 'flex-start',
        }} onClick={() => {
          copyClipboard(data?.customer_id); messageNoti('Đã copy mã Khách hàng');
        }}>
          <Typography content={record} modifiers={['12x18', '400', 'justify']} />
        </div>
      ),
    },
  ];

  const formMergeCustomer = useMemo(() => (
    <div className="t-header_wrapper-merge_customer">
      <div className="t-header_wrapper-merge_customer_flex">
        <Input
          autoFocus
          variant='border8'
          isRequired
          label='Từ khách hàng'
          placeholder='Nhập Mã khách hàng'
          value={dataMerge.from}
          error={dataMerge.fromErr}
          onChange={(event) => {
            console.log("🚀 ~ file: index.tsx:714 ~ event.target.value:", event.target.value)
            setDataMerge({
              ...dataMerge,
              from: event.target.value,
              fromErr: ''
            })
          }}
        />
        <Icon iconName={'to'} />
        <Input
          variant='border8'
          isRequired
          label='Vào khách hàng'
          placeholder='Nhập Mã khách hàng'
          value={dataMerge.to}
          error={dataMerge.toErr}
          onChange={(event) => {
            setDataMerge({
              ...dataMerge,
              to: event.target.value,
              toErr: ''
            })
          }}
        />
      </div>
      <Input variant='border8' value={getName} label='Người thực hiện' />
      <TextArea id={''}
        readOnly={false}
        required
        variant='contact'
        label='Lí do'
        value={dataMerge.note}
        error={dataMerge.noteErr}
        handleOnchange={(event) => {
          setDataMerge({
            ...dataMerge,
            note: event.target.value,
            noteErr: ''
          })
        }} />
    </div>
  ), [dataMerge, getName])

  const tableMergeCustomer = useMemo(() => (
    <div className="t-header_wrapper_table">
      <PublicTable
        column={columnMergeCustomer}
        listData={dataMerge.resultSearch}
        loading={dataMerge.loading}
        size="small"
        rowkey="customer_id"
        isbordered
        isPagination
        scroll={{ x: 'max-conent', y: '100%' }}
        isHideRowSelect
        pageSizes={15}
        handleChangePagination={(page: any, pageSize: any) => {
        }}
      />
    </div>
  ), [dataMerge, columnMergeCustomer])

  return (
    <div className={mapModifiers('t-header')} style={{background:"#03566e"}}>
      <div className={mapModifiers('t-header_wrapper')}>
        <div
          className={mapModifiers('t-header_wrapper_logo', 'active')}
          onClick={handleClickLogo}
        
        >
          <img src={logoActive} alt="logo" />
        </div>
     
      </div>
   
   
     
           
    </div>
  );
};
HeaderNav.defaultProps = {
};

export default HeaderNav;
