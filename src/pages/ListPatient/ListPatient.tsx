/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserSwitchOutlined } from '@ant-design/icons';
import { sendMessagetype } from 'assets/data';
import Button from 'components/atoms/Button';
import CTooltip from 'components/atoms/CTooltip';
import Dropdown, { DropdownData } from 'components/atoms/Dropdown';
import GroupRadio, { GroupRadioType } from 'components/atoms/GroupRadio';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import RangeDate from 'components/atoms/RangeDate';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import PublicTable from 'components/molecules/PublicTable';
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
import { getCampaigns, getCustomerLeads, getSMSTemplates, postSendCampaign } from 'services/api/point';
import { CustomerLeadItem, TemplateSMSItem } from 'services/api/point/types';
import { getInfosCustomerById } from 'store/customerInfo';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getListPatient } from 'store/list_patients';
import { getCustomerLeadsData } from 'store/point';
import { exportDatatoExcel } from 'utils/functions';

export const AMOUNT_SMS = 390;

const ListPatient: React.FC = () => {
  const dispatch = useAppDispatch();

  const storeLoadingLeads = useAppSelector((state) => state.point.loadingCustomerLeads);
  const storeResponseLeads = useAppSelector((state) => state.point.responseCustomerLeads);
  const storeResponseListPatients = useAppSelector((state) => state.ListPatients.ListPatient);
  const storeLoadingListPatients = useAppSelector((state) => state.ListPatients.isLoadingListPatient);
  console.log(storeResponseListPatients)
  const [loadingListPatients, setLoadingListPatients] = useState(storeLoadingListPatients);
  const [listPatients, setListPatients] = useState(storeResponseListPatients?.data || []);
  const [loadingLeads, setLoadingLeads] = useState(storeLoadingLeads);
  const [listCustomerLeads, setListCustomerLeads] = useState(storeResponseLeads?.data?.items || []);
  const [customerCount, setCustomerCount] = useState<any[]>([]);

  const storageLaunchSources = localStorage.getItem("launchSources");
  const storageLaunchSourcesGroup = localStorage.getItem("launchSourcesGroups");
  const [stateLaunchSourceGroups, setstateLaunchSourceGroups] = useState<DropdownData[]>(storageLaunchSourcesGroup ? JSON.parse(storageLaunchSourcesGroup) : []);
  const [stateLaunchSource, setstateLaunchSource] = useState<DropdownData[]>(storageLaunchSources ? JSON.parse(storageLaunchSources) : []);
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

  const { mutate: sendCampaign } = useMutation(
    'post-footer-form',
    (body: any) => postSendCampaign(body),
    {
      onSuccess: async (data) => {
        if (data?.status) {
          toast.success(data?.message);
          setSendSMS({
            ...sendSMS,
            openModal: false,
            template: undefined as unknown as DropdownData,
            campaign: undefined as unknown as DropdownData,
            content: '',
            subject: '',
          })
        } else {
          toast.error(data?.message);
          setSendSMS({
            ...sendSMS,
            openModal: false,
            template: undefined as unknown as DropdownData,
            campaign: undefined as unknown as DropdownData,
            content: '',
            subject: '',
          })
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
  const handleExcuteSendMessage = () => {
    if (!handleValidateSendMessage()) return;
    const body = {
      send_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      campaign_id: sendSMS.campaign?.value,
      method: sendSMS.campaignType.value,
      template_id: sendSMS.template.id || '',
      content: sendSMS.campaignType.value === "SMS" ? sendSMS.template.value?.replace('&', 'va') : sendSMS.content?.replace('&', 'va'),
      to: sendSMS.listCS,
    }
    sendCampaign(body);
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

  /* Column */
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

  /* Column */
  const memoryTableCampaign = useMemo(() => {
    return (
      <PublicTable
        listData={listPatients}
        column={columnTable}
        rowkey={'customer_id'}
        isPagination
        loading={loadingListPatients}
        pageSizes={5000}
        totalItem={storeResponseLeads?.total_items ?? 0}
        rowClassNames={(record: any, index: any) => {
          return index % 2 === 0 ? 'bg-gay-blur' : ''
        }}
        handleSelectRow={(record: any, selected: any, selectedRows: any, nativeEvent: any) => {
          setSendSMS({
            ...sendSMS,
            openModal: false,
            listCS: selectedRows.map((item: any) => ({
              customer_ref: item.customer_id,
            }))
          })
        }}
        handleSelectAllRow={(selected: any, selectedRows: any, changeRows: any) => {
          setSendSMS({
            ...sendSMS,
            openModal: false,
            listCS: selectedRows.map((item: any) => ({
              customer_ref: item.customer_id,
            }))
          })
        }}
        handleSelectMultiple={(selected: any, selectedRows: any, changeRows: any) => {
          setSendSMS({
            ...sendSMS,
            openModal: false,
            listCS: selectedRows.map((item: any) => ({
              customer_ref: item.customer_id,
            }))
          })
        }}
        handleChangePagination={(page: any, pageSize: any) => {
          handleChangePagination(page, pageSize);
        }}
        handleOnchange={(pagination: any, filters: any, sorter: any, extra: any) => {
          if (Object.values(filters).every(value => value === null)) {
            setDataFinish(storeResponseLeads?.data?.items);
            setCustomerCount([]);
          } else {
            setDataFinish(extra.currentDataSource);
            setCustomerCount(extra.currentDataSource);
          }
        }}
      />
    )
  }, [storeResponseListPatients?.data, storeResponseListPatients, storeLoadingListPatients, loadingListPatients, listPatients])

  return (
    <div className='p-customer_leads'>
      <PublicLayout>
        <PublicHeader
          titlePage={'Danh sách bệnh nhân'}
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
              <RangeDate variant='simple'
                fomat='DD-MM-YYYY'
                value={{ from: states.dateFrom, to: states.dateTo }}
                defaultValue={{ from: states.dateFrom, to: states.dateTo }}
                handleOnChange={(from: any, to: any) => {
                  setStates({
                    ...states, dateFrom: from, dateTo: to,
                  });
                
                  dispatch(getListPatient({
                   
                    from_date: "2023-03-10T00:00:00",
                    to_date: "2023-12-04T23:59:59",
                    keyword: states.keyword,
                 
                  } as any) );
                }} />
            
              < Input
                variant='simple'
                placeholder='Tìm kiếm khách hàng'
                type='text'
                iconName='search'
                value={states.keyword}
                onChange={(event) => {
                  setStates({
                    ...states, keyword: event?.target?.value
                  });
                }}
                handleClickIcon={() => {
                  dispatch(getListPatient({
                  
                    from_date: moment(states.dateFrom).format('YYYY-MM-DDT00:00:00'),
                    to_date: moment(states.dateTo).format('YYYY-MM-DDT23:59:59'),
                
                    keyword: states.keyword
                  } as any ))
                }}
                handleEnter={() => {
                  dispatch(getListPatient({
                  
                    from_date: moment(states.dateFrom).format('YYYY-MM-DD 00:00:00'),
                    to_date: moment(states.dateTo).format('YYYY-MM-DD 23:59:59'),
                
                    keyword: states.keyword
                  } as any ));
                }}
              />
           
            </>
          }>
         
        </PublicHeaderStatistic>
        <div className='p-customer_leads_table'>
          {memoryTableCampaign}
        </div>
      </PublicLayout>
      <CModal
        isOpen={sendSMS.openModal}
        title="Gửi tin nhắn"
        widths={600}
        textCancel='Thoát'
        textOK='Tiến hành gửi tin nhắn'
        onCancel={() => setSendSMS({
          ...sendSMS, openModal: false,
          listCS: [],
          campaignType: sendMessagetype[0] as unknown as GroupRadioType,
          template: undefined as unknown as DropdownData,
          campaign: undefined as unknown as DropdownData,
          content: '',
          subject: '',
        })}
        onOk={handleExcuteSendMessage}
      >
        {sendSMS.template && sendSMS.campaignType.value === "SMS" &&
          <div className='p-customer_leads_form_sms_header'>
            <div className='p-customer_leads_form_sms_header_item'>
              <span>Khách đã chọn:</span> <p>{sendSMS.listCS?.length}</p>
            </div>
            <div className='p-customer_leads_form_sms_header_item'>
              <span>Số tin nhắn (SMS) mỗi Khách:</span> <p>{sendSMS.template?.sms_count}</p>
            </div>
            <div className='p-customer_leads_form_sms_header_item'>
              <span>Tổng số tin nhắn (SMS) gởi đi:</span> <p>{sendSMS.listCS?.length * sendSMS.template?.sms_count}</p>
            </div>
            <div className='p-customer_leads_form_sms_header_item'>
              <span>Tổng tiền dự kiến:</span> <p>{Number(sendSMS.listCS?.length * sendSMS.template?.sms_count * AMOUNT_SMS)?.toLocaleString('vi-VN')} VNĐ</p>
            </div>
          </div>
        }
        <div className='p-customer_leads_form_sms'>
          <div style={{ marginBottom: 8 }}>
            <Typography content='Kiểu tin nhắn:' modifiers={['400']} />
            <GroupRadio options={sendMessagetype} value={sendSMS.campaignType} handleOnchangeRadio={(item) => {
              setSendSMS({
                ...sendSMS, campaignType: item,
                template: undefined as any,
                content: '',
              })
              setSendSMSError({
                subject: '',
                template: '',
                content: '',
                campaign: ''
              });
            }} />
          </div>
          <Dropdown label='Chiến dịch' dropdownOption={listCampaign.dropdown || []} variant='simple' isRequired error={sendSMSEror.campaign} values={sendSMS.campaign} handleSelect={(item) => {
            setSendSMS({ ...sendSMS, campaign: item });
            setSendSMSError({ ...sendSMSEror, campaign: '', });
          }} />
          <Input label='Tiêu đề' variant='simple' isRequired error={sendSMSEror.subject} onChange={(event) => {
            setSendSMS({ ...sendSMS, subject: event?.target?.value });
            setSendSMSError({ ...sendSMSEror, subject: '', });
          }} />
          {sendSMS.campaignType?.value === 'SMS' &&
            <Dropdown label='Kịch bản' dropdownOption={templateSMS || []} variant='simple' isRequired error={sendSMSEror.template} values={sendSMS.template} handleSelect={(item) => {
              setSendSMS({ ...sendSMS, template: item });
              setSendSMSError({ ...sendSMSEror, template: '', });
            }} />
          }
          <TextArea error={sendSMSEror.content} label='Nội dung' id={''} readOnly={sendSMS?.campaignType?.value === 'SMS'} isResize value={sendSMS?.campaignType?.value === 'SMS' ? sendSMS.template?.value : sendSMS?.content}
            handleOnchange={(event) => {
              setSendSMS({ ...sendSMS, content: event?.target?.value });
              setSendSMSError({ ...sendSMSEror, content: '', });
            }}
          />
        </div>
      </CModal>
    </div>
  );
}

export default ListPatient;
