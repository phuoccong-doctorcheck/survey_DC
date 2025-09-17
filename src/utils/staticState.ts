import { BarChartOutlined, UserOutlined,SnippetsOutlined,FileAddOutlined } from '@ant-design/icons';
import { DropdownData } from "components/atoms/Dropdown";

export const MenuCRM = [
  {
    groupId: "1",
    groupName: "Quy trình",
    items: [
      {
        id: 1,
        name: "Danh sách bệnh nhân",
        icon:  UserOutlined,
        slug: "/afpatients",
        role: ["afpatients"],
        child: [],
        isHaveChild: false,
        des: "Xem danh sách bệnh nhân, thông tin bệnh nhân, tìm kiếm, thêm bệnh nhân mới...",
        cl:"#17a2b8"
      },
      {
        id: 2,
        name: "Tạo chỉ định mới",
        icon:  FileAddOutlined ,
        slug: "/afservicepoints",
        role: ["afservicepoints"],
        child: [],
        isHaveChild: false,
        des: "Chỉ định cận lâm sàng cho bệnh nhân đến Doctor Check thực hiện...",
        cl:"#28a745"
      },
        {
        id: 3,
        name: "Xem hồ sơ bệnh án",
        icon:  SnippetsOutlined,
        slug: "/afpatientinfo",
        role: ["afpatientinfo"],
        child: [],
        isHaveChild: false,
        des: "Xem Hồ sơ bệnh án, kết quả cận lâm sàng mới nhất của bệnh nhân...",
        cl:"#e83e8c"
      },
           {
        id: 4,
        name: "Xem báo cáo",
        icon:  BarChartOutlined,
        slug: "/afcomissiondrout",
        role: ["afcomissiondrout"],
        child: [],
        isHaveChild: false,
        des: "Báo cáo chi tiết về các lượt chỉ định của Bác sĩ...",
        cl:"#dc3545"
      },
    ],
  },
 
];
export const MenuCRMMobile = [
  {
    id: 79,
    name: "Báo cáo",
    icon: "report_crm2",
    slug: "/growth",
    role: ["adAnalytics"],
    child: [],
    isHaveChild: false,
  },
  {
    id: 78,
    name: "So sánh tăng trưởng",
    icon: "balancer",
    slug: "/growth-compare",
    role: ["adAnalytics"],
    child: [],
    isHaveChild: false,
  },
  // {
  //   id: 1,
  //   name: "Tư vấn",
  //   icon: "chat_crm",
  //   slug: "/channel",
  //   role: ["beforeExams", "normal"],
  //   child: [],
  //   isHaveChild: false,
  // },
  {
    id: 77,
    name: "Chiến dịch & QL Điểm",
    icon: "marketing_crm",
    slug: "/campaign",
    role: ["campaign"],
    child: [
      {
        idChild: 1,
        title: "Quản lí điểm",
        slug: "/point-management",
        role: ["campaign"],
      },
      {
        idChild: 2,
        title: "Chiến dịch",
        slug: "/campaign",
        role: ["campaign"],
      },
    ],
    isHaveChild: true,
  },
  {
    id: 2,
    name: "Chuyển đổi",
    icon: "conversion",
    slug: "/conversion",
    role: ["beforeExams", "adDashBoard", "normal"],
    child: [],
    isHaveChild: false,
  },
  {
    id: 3,
    name: "Đặt lịch",
    icon: "list_appointment",
    slug: "/grid-booking",
    role: ["calendars", "adDashBoard", "normal"],
    child: [],
    isHaveChild: false,
  },
  {
    id: 4,
    name: "Theo dõi lịch hẹn",
    icon: "calendar_crm",
    slug: "/track-booking",
    role: ["appointmentView", "adDashBoard", "normal"],
    child: [],
    isHaveChild: false,
  },
  {
    id: 6,
    name: "Chăm sóc sau khám",
    icon: "before_exams",
    slug: "/after-exams",
    role: ["afterExams", "adDashBoard", "normal"],
    child: [],
    isHaveChild: false,
  },
  {
    id: 7,
    name: "Cuộc gọi nhỡ",
    icon: "misscall_crm",
    slug: "/miss-call",
    role: ["missCall", "adDashBoard", "normal"],
    child: [],
    isHaveChild: false,
  },
  {
    id: 11,
    name: "Thống kê",
    icon: "report_crm",
    slug: "/reports?type=grid",
    role: ["adDashBoard", "normal"],
    child: [
      {
        idChild: 1,
        type: "customer",
        title: "Thống kê khách hàng",
        slug: "/reports?type=grid",
        role: ["adDashBoard"],
      },
      {
        idChild: 2,
        type: "customer",
        title: "Khách hàng tiềm năng",
        slug: "/customer-leads",
        role: ["campaign"],
      },
      {
        idChild: 3,
        type: "cskh",
        title: "Thống kê tiền thưởng",
        slug: "/affiliate",
        role: ["normal"],
      },
      {
        idChild: 4,
        type: "customer",
        title: "Khách hàng cũ giới thiệu",
        slug: "/wom",
        role: ["adDashBoard"],
      },
      //   {
      //   idChild: 5,
      //   type: "customer",
      //   title: "Kế hoạch kinh doanh",
      //   slug: "/bussiness-plan",
      //   role: ["adDashBoard"],
      // },
    ],
    isHaveChild: true,
  },  
  {
    id: 18,
    name: "Lịch sử cuộc gọi",
    icon: "histories_call",
    slug: "/histories-call",
    role: ["BOD"],
    child: [],
    isHaveChild: false,
  },
  {
    id: 99,
    name: "cài đặt",
    icon: "setting_crm",
    slug: "/setting",
    role: ["adDashBoard", "normal"],
    child: [],
    isHaveChild: false,
  },
];
export const optionStateExchangeGift: DropdownData[] = [
  { id: 6, label: "Tất cả", value: "all" },
  { id: 8, label: "Đã đổi quà", value: "exchange" },
  { id: 8, label: "Chưa đổi quà", value: "unExchange" },
];

export const historiesCallStatus: DropdownData[] = [
  { id: 6, label: "Không bắt máy", value: "NO ANSWER" },
  { id: 6, label: "Trả lời", value: "ANSWERED" },
  { id: 6, label: "Bận", value: "BUSY" },
];

// export const stateAppointView = [
//   { id: 6, label: "Dịch vụ mới", value: "new_service" },
//   { id: 6, label: "Khách hàng mới", value: "new" },
//   { id: 6, label: "Khách hàng cũ", value: "old" },
// ];
export const stateAppointView = [
  { id: 6, label: "F1", value: "F1" },
  { id: 6, label: "F2", value: "F2" },
  { id: 6, label: "F3", value: "F3" },
];

export const localeVN = {
  lang: {
    locale: "vi_VN",
    yearPlaceholder: "Chọn năm",
    quarterPlaceholder: "Chọn quý",
    monthPlaceholder: "Chọn tháng",
    weekPlaceholder: "Chọn tuần",
    rangePlaceholder: ["Ngày bắt đầu", "Ngày kết thúc"],
    rangeYearPlaceholder: ["Năm bắt đầu", "Năm kết thúc"],
    rangeQuarterPlaceholder: ["Quý bắt đầu", "Quý kết thúc"],
    rangeMonthPlaceholder: ["Tháng bắt đầu", "Tháng kết thúc"],
    rangeWeekPlaceholder: ["Tuần bắt đầu", "Tuần kết thúc"],
    today: "Hôm nay",
    now: "Bây giờ",
    backToToday: "Back to today",
    ok: "Lưu",
    clear: "Xóa",
    month: "Tháng",
    year: "Năm",
    timeSelect: "Chọn thời gian",
    dateSelect: "Chọn ngày",
    weekSelect: "Chọn tuần",
    monthSelect: "Chọn tháng",
    yearSelect: "Chọn năm",
    decadeSelect: "Chọn thập kỷ",
    yearFormat: "YYYY",
    dateFormat: "DD-MM-YYYY",
    dayFormat: "DD",
    dateTimeFormat: "DD-MM-YYYY HH:mm:ss",
    monthBeforeYear: true,
    previousMonth: "Tháng trước (PageUp)",
    nextMonth: "Tháng sau (PageDown)",
    previousYear: "Năm trước (Control + left)",
    nextYear: "Năm sau (Control + right)",
    previousDecade: "Thập kỷ trước",
    nextDecade: "Thập kỷ sau",
    previousCentury: "Thế kỷ trước",
    nextCentury: "Thế kỷ sau",
    shortWeekDays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    shortMonths: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
  },
  timePickerLocale: {
    placeholder: "Chọn thời gian",
    rangePlaceholder: ["Bắt đầu", "Kết thúc"],
  },
  dateFormat: "DD-MM-YYYY",
  dateTimeFormat: "DD-MM-YYYY HH:mm:ss",
  weekFormat: "wo-YYYY",
  monthFormat: "MM-YYYY",
};

export const dataExampleSMS = {
  data: [
    {
      campaign_id: 1,
      campaign_name: "Thử nghiệm 1",
      is_active: false,
    },
    {
      campaign_id: 2,
      campaign_name: "Chiến dịch gửi tin nhắn thông báo điểm",
      is_active: false,
    },
    {
      campaign_id: 3,
      campaign_name: "Chiến dịch 30/4 - 01/05",
      is_active: false,
    },
    {
      campaign_id: 4,
      campaign_name:
        "Chiến dịch chăm sóc cho khách hàng thường xuyên thăm khám",
      is_active: false,
    },
    {
      campaign_id: 5,
      campaign_name: "100KH F2",
      is_active: true,
    },
    {
      campaign_id: 6,
      campaign_name: "F2 - 296 KH năm 2023 - 15/05/2024",
      is_active: true,
    },
    {
      campaign_id: 7,
      campaign_name: "F2 - 1437 KH - 1/1/2024 --> 15/5/2024 - 15/05/2024",
      is_active: true,
    },
  ],
  message: "Danh sách chiến dịch hiện có",
  status: true,
  client_ip: "192.168.15.103",
};

export const relationshipAvatar = [
  {
    relation_type_id: 2,
    relationship_type_name: "Vợ Chồng",
    iconName: "",
  },
  {
    relation_type_id: 3,
    relationship_type_name: "Cha Mẹ",
    iconName: "",
  },
  {
    relation_type_id: 4,
    relationship_type_name: "Ông Bà",
    iconName: "",
  },
  {
    relation_type_id: 5,
    relationship_type_name: "Con",
    iconName: "",
  },
  {
    relation_type_id: 6,
    relationship_type_name: "Cháu",
    iconName: "",
  },
  {
    relation_type_id: 7,
    relationship_type_name: "Anh Chị Em",
    iconName: "",
  },
  {
    relation_type_id: 8,
    relationship_type_name: "Cô Chú Bác",
    iconName: "",
  },
  {
    relation_type_id: 9,
    relationship_type_name: "Bạn bè",
    iconName: "",
  },
];
