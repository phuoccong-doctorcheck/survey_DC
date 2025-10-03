import { Button, Spin } from "antd";
import DetailResult from "components/DetailResult/DetailResult";
import Loading from "components/atoms/Loading";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getDetailResult, getMasterResult } from "services/api/apiGetC";
import {
  postPrintAllreport,
  postPrintAnesthesia,
  postPrintBreathtest,
  postPrintEcgs,
  postPrintEndoscopics,
  postPrintErms,
  postPrintGynecologies,
  postPrintLabtest,
  postPrintMolecule,
  postPrintOsteoporosis,
  postPrintPrescriptions,
  postPrintServicepoint,
  postPrintSupersonics,
  postPrintVaccine,
  postPrintXrays,
} from "services/api/customerInfo";
import mapModifiers, { downloadBlobPDF, forceDownloadPDF } from "utils/functions";

import imgDT from "./icons/ic_DT.svg";
import imgGPB from "./icons/ic_GPB.svg";
import imgKSL from "./icons/ic_KLS.svg";
import imgNS from "./icons/ic_NS.svg";
import imgPCD from "./icons/ic_PCD.svg";
import imgSA from "./icons/ic_SA.svg";
import imgTDV from "./icons/ic_TDV.svg";
import imgVC from "./icons/ic_VC.svg";
import imgXN from "./icons/ic_XN.svg";
import imgXQ from "./icons/ic_XQ.svg";

import iconAD from "assets/icons/ic_ad.svg";
import iconAU from "assets/icons/ic_au.svg";
import logoH from "assets/images/LogoH.svg";
import logo from "assets/images/short_logo.svg";

export const previewBlobPDFOpenLink = (
  base64Data: string,
  fileName: string
) => {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  // ✅ Tạo URL có đuôi gợi ý tên file
  const url = URL.createObjectURL(blob);

  // ✅ Tạo thẻ a để mở với tên file – fallback nếu window.open bị block
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.download = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;

  // 👉 Append & click để mở trong Zalo và có thể Save As với đúng tên
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Định nghĩa kiểu dữ liệu rõ ràng
type ResultItem = {
  id: string;
  name: string;
  title?: string;
  status: {
    color: string;
    displayname: string;
  };
};

type ResultGroup = {
  group_result_id: string;
  group_result_name: string;
  items: ResultItem[];
};
type ResultG = {
  group_result_id: string;
  group_result_name: string;
  items: any;
  service_group_type: any;
};
type CustomerInfo = {
  customer_id: string;
  customer_type: string;
  owner_type: string | null;
  owner_id: string | null;
  customer_fullname: string;
  customer_lastname: string;
  customer_prefix_gender: string;
  customer_phone: string;
  customer_identity_card: string;
  customer_email: string;
  birthday: string;
  day_of_birth: number;
  month_of_birth: number;
  year_of_birth: number;
  customer_full_address: string;
  customer_address: string;
  gender: {
    id: string;
    name: string;
  };
  country: {
    id: string;
    name: string;
  };
  province: {
    id: string;
    name: string;
  };
  district: {
    id: string;
    name: string;
  };
  ward: {
    id: string;
    name: string;
  };
  nation: {
    id: string;
    name: string;
  };
  career: string | null;
  launch_source_group_id: number;
  launch_source_group: {
    id: number;
    name: string;
  };
  launch_source: {
    id: number;
    name: string;
  };
  launch_source_type: {
    id: number;
    name: string;
  };
  portrait_survey_type: string | null;
  sales_employee_id: string;
  cs_employee_id: string;
  gclid: string;
  zalo_id: string | null;
  create_date: string;
  update_date: string;
  is_actived: boolean;
  is_affiliate_doctor: boolean;
  member: string | null;
};

type SessionResult = {
  session_count: number;
  master_id: string;
  customer_id: string;
  datetime: string;
  title: string;
  time_ago_text: string;
  is_re_exams: boolean;
  status: string;
  items: ResultGroup[];
};

export function handleConvertPCD(data: any) {
  const newData: any = [];

  data?.forEach((item: any, index: any) => {
    const { service_group_id, service_group_name } = item;
    const existingGroup = newData.find(
      (group: any) => group?.group_id === service_group_id
    );

    if (existingGroup) {
      existingGroup.child.push(item);
    } else {
      const newGroup = {
        group_id: service_group_id,
        group_name: service_group_name,
        child: [item],
      };

      newData.push(newGroup);
    }
  });
  return newData;
}

export function handleConvertXN(data: any) {
  const newData: any = [];

  data?.forEach((item: any, index: any) => {
    const { labtests_group_id, labtests_group_name } = item;
    const existingGroup = newData.find(
      (group: any) => group?.group_id === labtests_group_id
    );

    if (existingGroup) {
      existingGroup.child.push(item);
    } else {
      const newGroup = {
        group_id: labtests_group_id,
        group_name: labtests_group_name,
        child: [item],
      };

      newData.push(newGroup);
    }
  });
  return newData;
}

export type ResultType =
  | "PCD"
  | "XN"
  | "XQ"
  | "DT"
  | "NS"
  | "TDV"
  | "EMR"
  | "SA"
  | "GPB"
  | "XNHT"
  | "XNSHPT"
  | "KHAMPK"
  | "VACCINE"
  | "XNHPV"
  | "XNPAP"
  | "SLLX";
const dataEX1: any[] = [];
let dataE = "";
let dataM = "";
let dataST = "";
const ResultPage: React.FC = () => {
  const listIcon = [
    { id: 1, type: "PCD", icon: imgPCD }, //
    { id: 2, type: "XN", icon: imgXN }, //
    { id: 3, type: "CDHA", icon: imgXQ },
    { id: 4, type: "TDCN", icon: imgDT },
    { id: 5, type: "NS", icon: imgNS },
    { id: 6, type: "TDV", icon: imgTDV },
    { id: 7, type: "EMR", icon: "" },
    { id: 8, type: "SA", icon: imgSA },
    { id: 9, type: "GPB", icon: imgGPB },
    { id: 10, type: "TC", icon: imgVC },
    { id: 11, type: "KLS", icon: imgKSL },
  ];
  const { id } = useParams(); // id = "23456"
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [type, setType] = useState("");
  const [loadingAPI, setLoadingAPID] = useState<boolean>(false);
  const [stateResult, setStateResult] = useState<ResultG | null>(null);
  const [stateCustomer, setStateCustomer] = useState<CustomerInfo | null>(null);
  const [, setLoading] = useState<boolean>(true);
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [stateSessions, setStateSessions] = useState<any[]>([]);
  const [loadingItem, setLoadingItem] = useState(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const { mutate: getMR } = useMutation(
    "post-footer-form",
    (data: any) => getMasterResult(data),
    {
      onSuccess: async (data) => {
        if (data?.status) {
          setStateCustomer(data?.data?.customer);
          setLoadingPage(false);
          setStateSessions(data?.data?.items ?? []);
          setOpenSessionId(data?.data?.items[0]?.master_id);
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      onError: (error) => {
        console.error("🚀 ~ error:", error);
        setLoading(false);
      },
    }
  );
  const { mutate: getDRS } = useMutation(
    "post-footer-form",
    (data: any) => getDetailResult(data),
    {
      onSuccess: async (data) => {
        if (data?.status) {
          //  setStateItemCates(data?.data?.items ?? []);
          dataEX1.push({
            service_group_type: dataST,
            id: dataE,
            master_id: dataM,
            data: data.data,
          });
          setStateResult(data?.data);
          setLoadingItem(false);
        } else {
          setStateResult(null);
          setLoadingItem(false);
        }
      },
      onError: (error) => {
        console.error("🚀 ~ error:", error);
        setLoadingItem(false);
      },
    }
  );
  const [isPrintOption, setIsPrintOption] = useState(false);
  const { mutate: postPrintResult } = useMutation(
    "post-footer-form",
    (data: any) => {
      const { type, ...prevData } = data;
      switch (type) {
        case "PCD":
          return postPrintServicepoint({ master_id: prevData?.master_id });
        case "DT":
          return postPrintEcgs(prevData);
        case "XQ":
          return postPrintXrays(prevData);
        case "SA":
          return postPrintSupersonics(prevData);
        case "NS":
          return postPrintEndoscopics(prevData);
        case "XNHT":
          return postPrintBreathtest(prevData);
        case "XN":
          return postPrintLabtest(prevData);
        case "TDV":
          return postPrintPrescriptions(prevData);
        case "EMR":
          return postPrintErms(prevData);
        case "KHAMPK":
          return postPrintGynecologies(prevData);
        case "VACCINE":
          return postPrintVaccine(prevData);
        case "XNSHPT":
          return postPrintMolecule(prevData);
        case "SLLX":
          return postPrintOsteoporosis(prevData);
        case "SH":
          return postPrintOsteoporosis(prevData);
        // case 'GPB': return;
        // case 'XNSHPT': return;
        default:
          return postPrintAnesthesia(prevData);
      }
    },
    {
      onSuccess: (data) => {
        if (data?.status) {
          setIsPrintOption(false);
          downloadBlobPDF(data?.data, `${stateCustomer?.customer_fullname}`);
        } else {
          setIsPrintOption(false);
        }
      },
      onError: (error) => {
        setIsPrintOption(false);
        console.error("🚀 ~ file: index.tsx:159 ~ error:", error);
      },
    }
  );
  const [stateId, setStateId] = useState<string | null>(null);
  const handlePrintCategory = async (data: any, master: any) => {
    const bodyPublic = {
      type: data.service_group_type,
      master_id: master,
      service_group_type: data.service_group_type,
      id: data.id,
    };
    setStateId(data.id);
    setIsPrintOption(true);
    postPrintResult(bodyPublic);
  };
  // Download Result
  const { mutate: postPrintAll } = useMutation(
    "post-footer-form",
    (data: any) => postPrintAllreport(data),
    {
      onSuccess: (data) => {
        if (data?.status) {
          setLoadingAPID(false);

          forceDownloadPDF(data?.data, `${stateCustomer?.customer_fullname}.pdf`);
          let base64String = data?.data?.base64 || data?.data;
          const cleanBase64 = base64String.replace(
            /^data:application\/pdf;base64,/,
            ""
          );
          const blob = base64ToBlob(cleanBase64);
          const file = new File(
            [blob],
            `Kết quả của ${stateCustomer?.customer_fullname}.pdf`,
            { type: "application/pdf" }
          );

          // ✅ Tránh gọi share ở đây

          // 👉 Thay vào đó, lưu lại `file` trong state để dùng sau
          setSharedFile(file);
          setShowPopup(true);
        } else {
          toast.error(data?.message);
        }
      },
      onError: (error) => {
        console.error("🚀 ~ file: index.tsx:159 ~ error:", error);
      },
    }
  );

  const [, setStateMasterID] = useState<string | null>(null);
  const handlePrintAllResult = async (data: any) => {
    setLoadingAPID(true);
    const body = {
      customer: stateCustomer,
      master_id: data,
    };
    setStateMasterID(data);
    postPrintAll(body);
  };
  useLayoutEffect(() => {
    const request = {
      customer_id: id || null,
    };
    getMR(request);
    document.title = "Xem kết quả";
  }, [id, getMR]);
  const [openSessionId, setOpenSessionId] = useState<string | null>(null);
  function base64ToBlob(base64: any, contentType = "application/pdf") {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  const [sharedFile, setSharedFile] = useState<File | null>(null);

  const triggerShare = () => {
    if (!sharedFile) {
      alert("Không có file để chia sẻ.");
      return;
    }

    const shareData = {
      title: "Chia sẻ kết quả",
      text: "Kết quả tầm soát",
      files: [sharedFile], // ✅ Dùng files chứ không phải url
    };

    if (navigator.canShare && navigator.canShare({ files: [sharedFile] })) {
      navigator
        .share(shareData)
        .then(() => setShowPopup(false))
        .catch((error) => console.log("Lỗi khi chia sẻ:", error));
    } else {
      alert("Thiết bị không hỗ trợ chia sẻ file.");
    }
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroupId((prev) => (prev === groupId ? null : groupId));
    setSelectedItemId(null); // Reset nếu đổi nhóm
  };
  const toggleSession = (sessionId: string) => {
    setOpenSessionId((prev) => (prev === sessionId ? null : sessionId));
    setOpenGroupId(null); // đóng hết nhóm nếu đóng phiên
    setSelectedItemId(null); // reset item khi đổi phiên
  };
  const handleItemClick = async (item: any, session: SessionResult) => {
    if (selectedItemId !== null) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(item.id);
      setType(item.service_group_type);

      const body = {
        customer: stateCustomer,
        service_group_type: item.service_group_type,
        master_id: session.master_id,
        id: item.id,
      };
      const existingData1 = dataEX1.find(
        (item: any) =>
          item.service_group_type === body.service_group_type &&
          item.master_id === body.master_id &&
          item.id === body.id
      );
      dataST = body.service_group_type;
      dataM = body.master_id;
      dataE = body.id;
      if (existingData1) {
        setStateResult(existingData1.data); // Gán dữ liệu nếu đã tồn tại
      } else {
        setLoadingItem(true);
        await getDRS(body);
      }
    }
  };
  const handleGetDetailResult = (
    group: ResultGroup,
    session: SessionResult
  ) => {
    const groupKey = `${session.master_id}_${group.group_result_id}`;
    toggleGroup(groupKey);
    if (!group.items) {
      setType(group.group_result_id);
      setLoadingItem(true);
      const body = {
        customer: stateCustomer,
        service_group_type: group.group_result_id,
        master_id: session.master_id,
      };
      getDRS(body);
    }
  };
  const handleReturnData = (type: any, isChild: boolean) => {
    switch (type) {
      case "PCD":
        return {
          ...(isChild ? stateResult : stateResult),
          items: handleConvertPCD(
            isChild ? stateResult?.items : stateResult?.items
          ),
        };
      case "XN":
        return {
          ...(isChild ? stateResult : stateResult),
          items: handleConvertXN(
            isChild ? stateResult?.items : stateResult?.items
          ),
        };
      case "SA":
      case "XQ":
      case "NS":
      case "DT":
      case "TDV":
      case "GPB":
      case "XNHT":
      case "XNPAP":
      case "XNHPV":
      case "SLLX":
      case "KHAMPK":
      case "VACCINE":
      case "XNSHPT":
        return isChild ? stateResult : stateResult;
    }
  };
  return (
    <Spin
      style={{
        maxHeight: "600px",
        left: "-20px",
        height: "100vh",
        overflowY: "auto",
      }}
      spinning={loadingPage}
      size="large"
      indicator={
        <img
          className="loader"
          style={{
            width: 70,
            height: 70,
            objectFit: "cover",
            backgroundColor: "transparent",
          }}
          src={logo}
        />
      }
    >
      <div
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          right: "0px",

          height: "fit-content",
          zIndex: "999",
          background: "white",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "#f4f3f2",
            paddingLeft: "20px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          <img src={logoH} alt="" width={200} />
        </div>
      </div>

      <div
        style={{
          padding: 10,
          overflowY: "auto",
          height: "100vh",
          marginTop: 50,
          paddingBottom: 120,
        }}
      >
        {" "}
        <p
          style={{
            fontSize: 18,
            color: "black",
            textAlign: "left",
            display: "flex",
            gap: 3,
          }}
        >
          Họ tên:{" "}
          <p style={{ fontWeight: 600 }}>{stateCustomer?.customer_fullname}</p>
        </p>
        <div
          style={{ display: "flex", gap: 80, marginBottom: 10, marginTop: 5 }}
        >
          <p>Giới tính: {stateCustomer?.gender?.name}</p>{" "}
          <p>Năm sinh: {stateCustomer?.year_of_birth}</p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 80,
            marginBottom: 15,
            justifyContent: "center",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              textAlign: "center",
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            Danh sách kết quả
          </p>
        </div>
        {stateSessions.map((session) => {
          const isSessionOpen = openSessionId === session.master_id;

          return (
            <div
              key={session.master_id}
              style={{
                marginBottom: 18,
                border: "1px solid #dbdbdb",
                borderRadius: 10,
              }}
            >
              <div
                onClick={() => toggleSession(session.master_id)}
                style={{
                  fontWeight: "bold",

                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#beedffd9",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    color: "#0035bb",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12.5pt",
                  }}
                >
                  <div style={{ marginTop: 5, marginRight: 5 }}>
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                          stroke="#0035bb"
                          stroke-width="2"
                          stroke-linecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>{" "}
                  {"Ngày " +
                    moment(session.datetime).format("DD/MM/YYYY HH:mm")}{" "}
                  <span
                    style={{
                      fontSize: "14px",
                      fontStyle: "italic",
                      fontWeight: 400,
                      marginLeft: 5,
                    }}
                  >
                    ({session.time_ago_text})
                  </span>
                </span>
                <img
                  src={isSessionOpen ? iconAU : iconAD}
                  width={20}
                  height={18}
                  alt=""
                />
              </div>

              {/* CHỈ render các nhóm nếu session đang mở */}
              <div style={{ paddingLeft: 15, paddingRight: 15 }}>
                {isSessionOpen &&
                  session.items.map((group: any) => {
                    const isOpen =
                      openGroupId ===
                      `${session.master_id}_${group.group_result_id}`;

                    return (
                      group.group_result_id !== "EMR" && (
                        <div
                          key={`${session.master_id}_${group.group_result_id}`}
                          style={{
                            border: "1px solid #dbdbdb",
                            borderRadius: 10,
                            marginTop: 10,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            onClick={() =>
                              handleGetDetailResult(group, session)
                            }
                            style={{
                              padding: 10,
                              fontWeight: "bold",
                              color: isOpen ? "#FFA500" : "#04566e",

                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                              }}
                            >
                              <img
                                src={
                                  listIcon.find(
                                    (i) => i.type === group.group_result_id
                                  )?.icon
                                }
                                alt=""
                                width={20}
                                height={18}
                              />
                              <span>{group.group_result_name}</span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <p
                                style={{
                                  color: "#1a73e8",
                                  fontSize: 12,
                                  fontStyle: "italic",
                                  fontWeight: 400,
                                }}
                              >
                                {group.group_result_id === "TDV" ||
                                group.group_result_id === "PCD"
                                  ? "Xem chi tiết"
                                  : "Xem kết quả"}
                              </p>
                              <img
                                src={isOpen ? iconAU : iconAD}
                                alt=""
                                width={20}
                                height={18}
                              />
                            </div>
                          </div>

                          {isOpen && (
                            <div style={{ padding: 10, background: "#fff" }}>
                              {group.items?.length > 0 ? (
                                group.items.map((item: any) => (
                                  <div
                                    key={item.id}
                                    style={{
                                      marginBottom: 10,
                                      borderRadius: 10,
                                      border: "1px solid #dbdbdb",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        paddingRight: 7,
                                      }}
                                      onClick={() =>
                                        handleItemClick(item, session)
                                      }
                                    >
                                      <span
                                        style={{
                                          display: "inline-block",
                                          padding: "8px 12px",
                                          paddingRight: "8px",
                                          borderRadius: "8px",
                                          color: "#333",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          cursor: "pointer",
                                          transition: "background-color 0.3s",
                                        }}
                                      >
                                        {item.title}{" "}
                                        <span
                                          style={{
                                            color: `${item.status.color}`,
                                          }}
                                        >
                                          {item.status.displayname}
                                        </span>
                                      </span>

                                      {!["GPB", "XNHPV", "XNPAP"].includes(
                                        item.service_group_type
                                      ) && (
                                        <div
                                          onClick={() =>
                                            handlePrintCategory(
                                              item,
                                              session.master_id
                                            )
                                          }
                                        >
                                          {isPrintOption === true &&
                                          stateId === item.id ? (
                                            <span className="loaderI"></span>
                                          ) : (
                                            <svg
                                              width="26px"
                                              height="26px"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0"
                                              ></g>
                                              <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              ></g>
                                              <g id="SVGRepo_iconCarrier">
                                                <path
                                                  d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                                                  stroke="#000000"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                ></path>
                                                <path
                                                  d="M17.5 15V21M17.5 21L15 18.5M17.5 21L20 18.5"
                                                  stroke="#000000"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                ></path>
                                              </g>
                                            </svg>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    {selectedItemId === item.id &&
                                      (loadingItem ? (
                                        <div
                                          style={{
                                            height: 200,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "start",
                                            paddingTop: 50,
                                            paddingRight: 20,
                                          }}
                                        >
                                          <Loading
                                            variant="default"
                                            isShow
                                            size="medium"
                                          />
                                        </div>
                                      ) : (
                                        <DetailResult
                                          data={handleReturnData(
                                            item.service_group_type,
                                            true
                                          )}
                                          type={type}
                                        />
                                      ))}
                                  </div>
                                ))
                              ) : (
                                <DetailResult
                                  data={handleReturnData(
                                    group.group_result_id,
                                    false
                                  )}
                                  type={type}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      )
                    );
                  })}
                {isSessionOpen && (
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginTop: 20,
                      marginBottom: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      onClick={() => {
                        handlePrintAllResult(session.master_id);
                      }}
                      className={mapModifiers("", loadingAPI && "pendding")}
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
                        fontSize: "0.7rem",
                      }}
                    >
                      {loadingAPI ? (
                        <span className="loaderR"></span>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          {" "}
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#000000"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
                                stroke="#ffffff"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>{" "}
                          Tải toàn bộ kết quả
                        </div>
                      )}
                    </Button>
                    {/* <Button
              onClick={triggerShare}
              disabled={(sharedFile === null || stateMasterID !== session.master_id)}
               className={mapModifiers(
                           "",
                            loadingAPI && "pendding"
                        )}
            style={{
              height: "fit-content",
             width: "48%",
                color:
      sharedFile === null || stateMasterID !== session.master_id
        ? "rgba(255, 255, 255, 0.6)"
        : "white",
    fontWeight: "600",
    background:
      sharedFile === null || stateMasterID !== session.master_id
        ? "linear-gradient(to bottom, rgba(240, 186, 115, 0.5), rgba(216, 108, 6, 0.5))"
        : "linear-gradient(to bottom, rgb(240, 186, 115) 0%, rgb(216, 108, 6) 100%)",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              borderRadius: "200px",
              textTransform: "uppercase",
                fontSize: "0.7rem",
            }}
          >
              {
                loadingAPI1 ? <span className="loaderR"></span> : <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <svg width="20" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 3C15 2.44772 15.4477 2 16 2C19.3137 2 22 4.68629 22 8V16C22 19.3137 19.3137 22 16 22H8C4.68629 22 2 19.3137 2 16C2 15.4477 2.44772 15 3 15C3.55228 15 4 15.4477 4 16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4C15.4477 4 15 3.55228 15 3Z" fill="#ffffff"></path> <path d="M3.70663 12.7845L3.16104 12.2746L3.70664 12.7845C4.09784 12.3659 4.62287 11.8265 5.17057 11.3274C5.72852 10.8191 6.26942 10.3905 6.69641 10.1599C7.06268 9.96208 7.75042 9.84035 8.40045 9.84848C8.62464 9.85128 8.81365 9.86944 8.9559 9.89472C8.96038 10.5499 8.95447 11.7469 8.95145 12.2627C8.94709 13.0099 9.83876 13.398 10.3829 12.8878L14.9391 8.61636C15.2845 8.2926 15.2988 7.74908 14.971 7.4076L10.4132 2.65991C9.88293 2.10757 8.95 2.48291 8.95 3.24856V5.16793C8.5431 5.13738 8.0261 5.11437 7.47937 5.13009C6.5313 5.15734 5.30943 5.30257 4.4722 5.88397C4.36796 5.95636 4.26827 6.03539 4.17359 6.11781C2.49277 7.58092 2.11567 9.90795 1.8924 11.7685L1.87242 11.935C1.74795 12.9722 3.02541 13.5134 3.70663 12.7845ZM9.35701 11.7935L9.70204 12.1615L9.35701 11.7935C9.35715 11.7934 9.35729 11.7932 9.35744 11.7931L9.35701 11.7935Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>   Chia sẻ kết quả
</div>
              }
            </Button> */}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              paddingLeft: "15px",
              paddingRight: "15px",
              minWidth: "300px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <h3 style={{ textTransform: "uppercase", fontSize: 16 }}>
              Kết quả của bạn đã được tải về thành công!
            </h3>
            <h4
              style={{
                marginBottom: "20px",
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              Bạn có muốn chia sẻ kết quả này đến ứng dụng khác không?
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Button
                onClick={triggerShare}
                className={mapModifiers("", loadingAPI && "pendding")}
                style={{
                  height: "fit-content",
                  width: "48%",
                  color: "white",
                  fontWeight: "600",
                  background:
                    "linear-gradient(to bottom, rgb(240, 186, 115) 0%, rgb(216, 108, 6) 100%)",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  borderRadius: "200px",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                }}
              >
                <svg
                  width="20"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M15 3C15 2.44772 15.4477 2 16 2C19.3137 2 22 4.68629 22 8V16C22 19.3137 19.3137 22 16 22H8C4.68629 22 2 19.3137 2 16C2 15.4477 2.44772 15 3 15C3.55228 15 4 15.4477 4 16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4C15.4477 4 15 3.55228 15 3Z"
                      fill="#ffffff"
                    ></path>{" "}
                    <path
                      d="M3.70663 12.7845L3.16104 12.2746L3.70664 12.7845C4.09784 12.3659 4.62287 11.8265 5.17057 11.3274C5.72852 10.8191 6.26942 10.3905 6.69641 10.1599C7.06268 9.96208 7.75042 9.84035 8.40045 9.84848C8.62464 9.85128 8.81365 9.86944 8.9559 9.89472C8.96038 10.5499 8.95447 11.7469 8.95145 12.2627C8.94709 13.0099 9.83876 13.398 10.3829 12.8878L14.9391 8.61636C15.2845 8.2926 15.2988 7.74908 14.971 7.4076L10.4132 2.65991C9.88293 2.10757 8.95 2.48291 8.95 3.24856V5.16793C8.5431 5.13738 8.0261 5.11437 7.47937 5.13009C6.5313 5.15734 5.30943 5.30257 4.4722 5.88397C4.36796 5.95636 4.26827 6.03539 4.17359 6.11781C2.49277 7.58092 2.11567 9.90795 1.8924 11.7685L1.87242 11.935C1.74795 12.9722 3.02541 13.5134 3.70663 12.7845ZM9.35701 11.7935L9.70204 12.1615L9.35701 11.7935C9.35715 11.7934 9.35729 11.7932 9.35744 11.7931L9.35701 11.7935Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>{" "}
                  </g>
                </svg>{" "}
                Có, tôi muốn chia sẻ
              </Button>
              <Button
                className={mapModifiers("", loadingAPI && "pendding")}
                style={{
                  height: "fit-content",
                  width: "38%",
                  color: "white",
                  fontWeight: "600",
                  background:
                    "linear-gradient(to bottom, rgb(240, 115, 115) 0%, rgb(216, 6, 6) 100%)",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  borderRadius: "200px",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                }}
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                <svg
                  width="20"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      opacity="0.5"
                      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                      stroke="#fff"
                      stroke-width="1.5"
                    ></path>{" "}
                    <path
                      d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>{" "}
                  </g>
                </svg>{" "}
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </Spin>
  );
};

export default ResultPage;
