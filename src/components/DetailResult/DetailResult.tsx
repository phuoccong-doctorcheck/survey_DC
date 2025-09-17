import CCollapseXN, { IconCollapseType } from "components/atoms/CollapseXN";
import RichTextEditor2 from "components/molecules/RichTextEditor2";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { formatDate, formatNumber } from "utils/functions";

import RangeResult from "./ResultInRange";

interface RenderExaminationResultProps {
  data: any;
  type: string;
}

const DetailResult: React.FC<RenderExaminationResultProps> = ({
  type,
  data,
}) => {
  console.log("🚀 ~ data:", data, type);
  const handleCheckTypeXN = (): IconCollapseType => {
    return "higher";
  };

  const handleRender = () => {
    switch (type) {
      case "SA":
        return (
          <div className="t-result_item_pcd">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data?.imaging?.checkin_time)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Trả kết quả:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data?.imaging?.checkout_time)}{" "}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.imaging?.approved_employee?.name}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nơi thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.imaging?.execution_department?.name} DOCTOR CHECK
              </span>
            </div>

            <div style={{ marginLeft: "8px" }}>
              <p
                className="min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nội dung đánh giá:
              </p>

              <RichTextEditor2
                value={data?.imaging?.inferable_content}
                header="hide"
                readOnly
                handleChange={(value: string) => {}}
              />
              <div>
                <p
                  className="min-w-[100px] font-[600] color_main"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#04566e",
                  }}
                >
                  Kết luận:
                </p>
                <span className=" font-[400] text-[13px]">
                  {data?.imaging?.inferable_conclude}
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: "8px",
                borderTop: "1px solid #ccc",
                paddingTop: "8px",
                overflow: "hidden",
                marginLeft: "8px",
              }}
            >
              <div
                className="wrapper-box-images gap-x-2 gap-y-6 pr-4"
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "left",
                  paddingRight: "16px",
                  width: "90vw",
                  overflowX: "scroll",
                }}
              >
                <div>
                  {data?.imaging?.items?.length
                    ? data?.imaging?.items.map((image: any, index: any) => {
                        if (index % 2 === 0)
                          return (
                            <div key={image?.imaging_detail_id}>
                              <img
                                src={image?.image_base_data}
                                loading="lazy"
                                className="rounded-md"
                                style={{
                                  width: "150px",
                                  maxWidth: "unset",
                                  objectFit: "contain",
                                  borderRadius: 10,
                                }}
                                // onClick={() => {
                                //   dispatch(
                                //     setImagePreview({
                                //       ...dataImagePreview,
                                //       visible: true,
                                //       activeIndex: index + 1,
                                //       images: data?.imaging?.items.map((i) => ({
                                //         src: i.image_base_data,
                                //         thumbnail: i.image_base_data,
                                //       })),
                                //     })
                                //   );
                                // }}
                              />
                            </div>
                          );
                      })
                    : null}
                </div>
                <div>
                  {data?.imaging?.items?.length
                    ? data?.imaging?.items.map((image: any, index: any) => {
                        if (index % 2 !== 0)
                          return (
                            <div key={image?.imaging_detail_id}>
                              <img
                                src={image?.image_base_data}
                                loading="lazy"
                                className="rounded-md"
                                style={{
                                  width: "150px",
                                  maxWidth: "unset",
                                  objectFit: "contain",
                                  borderRadius: 10,
                                }}
                                // onClick={() => {
                                //   dispatch(
                                //     setImagePreview({
                                //       ...dataImagePreview,
                                //       visible: true,
                                //       activeIndex: index + 1,
                                //       images: data?.imaging?.items.map((i) => ({
                                //         src: i.image_base_data,
                                //         thumbnail: i.image_base_data,
                                //       })),
                                //     })
                                //   );
                                // }}
                              />
                            </div>
                          );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        );
      case "NS":
        return (
          <div className="t-result_item_xq">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data?.imaging?.checkin_time)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Trả kết quả:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data?.imaging?.approved_date)}{" "}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.imaging?.signature_print_name}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nơi thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.imaging?.execution_department?.name} DOCTOR CHECK
              </span>
            </div>

            <div className="m-h-[200px] pb-4" style={{ marginLeft: "8px" }}>
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nội dung đánh giá:
              </p>
              <RichTextEditor2
                value={data?.imaging?.inferable_content}
                header="hide"
                readOnly
                handleChange={(value: string) => {}}
              />
              <div>
                <p
                  className="min-w-[100px] font-[600] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#04566e",
                  }}
                >
                  Kết luận:
                </p>
                <span
                  className="font-[400] text-[13px]"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {data?.imaging?.inferable_conclude}
                </span>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: "8px",
                marginLeft: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "5px",
                }}
              >
                <p className="font-[600] color_main">Số lượng:</p>
                <span className="font-[400] text-[13px]">
                  {data?.imaging?.items?.length} ảnh
                </span>
              </div>

              <div
                className="wrapper-box-images gap-x-2 gap-y-6 pr-4"
                style={{
                  display: "block",
                  gap: "16px",
                  justifyContent: "center",
                  paddingRight: "16px",
                  width: "90vw",
                  overflowX: "scroll",
                }}
              >
                <div style={{ display: "flex", gap: 5 }}>
                  {data?.imaging?.items?.length
                    ? data?.imaging?.items.map((image: any, index: any) => {
                        if (index % 2 === 0)
                          return (
                            <div key={image?.imaging_detail_id}>
                              <img
                                src={image?.image_base_data}
                                loading="lazy"
                                className="rounded-md"
                                style={{
                                  width: "150px",
                                  maxWidth: "unset",
                                  objectFit: "contain",
                                  borderRadius: 10,
                                }}
                                // onClick={() => {
                                //   dispatch(
                                //     setImagePreview({
                                //       ...dataImagePreview,
                                //       visible: true,
                                //       activeIndex: index + 1,
                                //       images: data?.imaging?.items.map((i) => ({
                                //         src: i.image_base_data,
                                //         thumbnail: i.image_base_data,
                                //       })),
                                //     })
                                //   );
                                // }}
                              />
                            </div>
                          );
                      })
                    : null}
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {data?.imaging?.items?.length
                    ? data?.imaging?.items.map((image: any, index: any) => {
                        if (index % 2 !== 0)
                          return (
                            <div key={image?.imaging_detail_id}>
                              <img
                                src={image?.image_base_data}
                                loading="lazy"
                                className="rounded-md"
                                style={{
                                  width: "150px",
                                  maxWidth: "unset",
                                  objectFit: "contain",
                                  borderRadius: 10,
                                }}
                                // onClick={() => {
                                //   dispatch(
                                //     setImagePreview({
                                //       ...dataImagePreview,
                                //       visible: true,
                                //       activeIndex: index + 1,
                                //       images: data?.imaging?.items.map((i) => ({
                                //         src: i.image_base_data,
                                //         thumbnail: i.image_base_data,
                                //       })),
                                //     })
                                //   );
                                // }}
                              />
                            </div>
                          );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        );
      case "DT":
        return (
          <div className="t-result_item_xq">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data?.imaging?.checkin_time)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Trả kết quả:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data?.imaging?.approved_date)}{" "}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.imaging?.signature_print_name}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nơi thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.imaging?.execution_department?.name} DOCTOR CHECK
              </span>
            </div>
            <div style={{ maxHeight: "200px", paddingBottom: "16px" }}>
              <div style={{ marginLeft: "8px" }}>
                <p className="min-w-[100px] font-[600] color_main">Kết luận:</p>
                <span className="font-[400] text-[13px]">
                  <RichTextEditor2
                    header="hide"
                    handleChange={(value: string) => {}}
                    value={data?.imaging?.inferable_conclude}
                  />
                </span>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: "8px",
                marginLeft: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <p className="font-[600] color_main">Số lượng:</p>
                <span className="font-[400] text-[13px]">
                  {data?.imaging?.items?.length} ảnh
                </span>
              </div>

              <div>
                {data?.imaging?.items?.length
                  ? data?.imaging?.items.map((image: any, index: any) => (
                      <div key={image?.imaging_detail_id}>
                        <img
                          src={image?.image_base_data}
                          loading="lazy"
                          className="rounded-md"
                          style={{
                            borderRadius: "0.375rem",
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        );
      case "XQ":
        return (
          <div className="t-result_item_xq">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data?.imaging?.checkin_time)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Trả kết quả:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data?.imaging?.checkout_time)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.imaging?.approved_employee?.name}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nơi thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.imaging?.execution_department?.name} DOCTOR CHECK
              </span>
            </div>

            <div className="m-h-[200px] pb-4" style={{ marginLeft: "8px" }}>
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nội dung đánh giá:
              </p>
              <RichTextEditor2
                value={data?.imaging?.inferable_content}
                header="hide"
                readOnly
                handleChange={(value: string) => {}}
              />
              <div>
                <p
                  className="min-w-[100px] font-[600] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#04566e",
                  }}
                >
                  Kết luận:
                </p>
                <span
                  className="font-[400] text-[13px]"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {data?.imaging?.inferable_conclude}
                </span>
              </div>
            </div>

            <div className="border-t pt-2" style={{ marginLeft: "8px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <p className="font-[600] color_main">Số lượng:</p>
                <span className="font-[400] text-[13px]">
                  {data?.imaging?.items?.length} ảnh
                </span>
              </div>

              <div>
                {data?.imaging?.items?.length
                  ? data?.imaging?.items?.map((image: any, index: any) => (
                      <div key={image?.imaging_detail_id}>
                        <img
                          src={image?.image_base_data}
                          loading="lazy"
                          className="rounded-md"
                          style={{
                            borderRadius: "0.375rem",
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        );
      case "PCD":
        return (
          <div className="t-result_item_pcd">
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Thời gian đăng kí:
              </p>
              <span style={{ fontSize: "14px", fontWeight: "400" }}>
                {moment(data?.data?.servicepoint_datetime).format(
                  "HH:mm DD/MM/YYYY"
                )}
              </span>
            </div>
            <div className="">
              <p
                className="min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Bác sĩ chỉ định:
              </p>
              <span style={{ fontSize: "14px", fontWeight: "400" }}></span>
            </div>
            <div className="">
              <p
                className="min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Chẩn đoán:
              </p>
              <span style={{ fontSize: "14px", fontWeight: "400" }}>
                {data?.data?.diagnose_note}
              </span>
            </div>
            <div
              className="mt-4 w-full"
              style={{ marginTop: 10, width: "100%" }}
            >
              <table className="w-full" style={{ width: "100%" }}>
                <thead
                  className="w-full border-b mb-2"
                  style={{
                    width: "100%",
                    borderBottom: "1px solid #dbdbdb",
                    marginBottom: 4,
                  }}
                >
                  <tr
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 30px 80px",
                      width: "100%",
                    }}
                  >
                    <th
                      style={{
                        textAlign: "start",
                        width: "100%",
                        fontWeight: 400,
                        color: "green",
                      }}
                    >
                      Tên dịch vụ
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        width: "100%",
                        fontWeight: 400,
                        color: "green",
                      }}
                    >
                      SL
                    </th>
                    <th
                      style={{
                        textAlign: "end",
                        width: "100%",
                        fontWeight: 400,
                        color: "green",
                      }}
                    >
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.items?.map((record: any) => (
                    <>
                      <tr
                        style={{
                          borderBottom: "1px solid #dbdbdb",
                          paddingBottom: 10,
                        }}
                      >
                        <td colSpan={3}>
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 700,
                              color: "#04566e",
                            }}
                          >
                            {record.group_name}
                          </span>
                        </td>
                      </tr>

                      {record?.child?.length &&
                        record?.child?.map((item: any) => (
                          <tr
                            key={item?.servicespoint_detail_id}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 30px 80px",
                              width: "100%",
                              marginBottom: 10,
                              color: "#04566e",
                              fontSize: 14,
                              fontWeight: 400,
                              alignItems: "center",
                            }}
                          >
                            <td style={{ fontSize: 14 }}>
                              {item?.service_name}
                            </td>
                            <td style={{ fontSize: 14 }}>{item?.quantity}</td>
                            <td style={{ fontSize: 14, textAlign: "center" }}>
                              {item?.service_prices
                                ? `${formatNumber(item?.service_prices)} đ`
                                : ""}
                            </td>
                          </tr>
                        ))}
                    </>
                  ))}
                </tbody>
              </table>
              <div className="pt-1 border-t mt-2 flex justify-between pf-1 pr-2">
                <span className="font-bold color_main">Tổng tiền:</span>
                <span className="font-bold text-[red]">
                  {data?.total_services
                    ? `${formatNumber(data?.total_services)} đ`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        );
      case "TDV":
        return (
          <div className="t-result_item_tdv" style={{ padding: 10 }}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[600] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#04566e",
                }}
              >
                Người cấp thuốc:
              </p>
              <span className="text-[14px]" style={{ fontSize: "14px" }}>
                {data?.prescription?.prescriber_employee?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[600] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#04566e",
                }}
              >
                Ngày cấp thuốc:
              </p>
              <span className="text-[14px]" style={{ fontSize: "14px" }}>
                {}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[600] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#04566e",
                }}
              >
                Nơi cấp:
              </p>
              <span className="text-[14px]" style={{ fontSize: "14px" }}>
                {data?.prescription?.prescriber_department?.name}
              </span>
            </div>
            <div className="">
              <p
                className="text-[14px] min-w-[100px] font-[600] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#04566e",
                }}
              >
                Chuẩn đoán:
              </p>
              <span className="text-[14px]" style={{ fontSize: "14px" }}>
                {data?.prescription?.diagnoses_text}
              </span>
            </div>
            <div className="">
              <p
                className="min-w-[100px] font-[600] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#04566e",
                }}
              >
                Lời dặn:
              </p>
              <span style={{ fontSize: "14px" }}>
                {data?.prescription?.doctor_note}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[600] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#04566e",
                }}
              >
                Ngày tái khám:
              </p>
              <span className="text-[14px]" style={{ fontSize: "14px" }}>
                {}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[600] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#04566e",
                }}
              >
                Tổng tiền thuốc:
              </p>
              <span
                className="text-[14px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                {data?.prescription?.items.length &&
                  formatNumber(
                    Number(
                      data?.prescription?.items.reduce(
                        (accumulator: any, currentValue: any) => {
                          return (
                            accumulator +
                            currentValue?.drug_prices *
                              currentValue?.quantity_total
                          );
                        },
                        0
                      )
                    )
                  )}
                {data?.prescription?.items.length && "đ"}
              </span>
            </div>
            <div
              className="border-t py-2 mt-2"
              style={{
                marginTop: 10,
                borderTop: "1px solid #dbdbdb",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {data?.prescription?.items?.length
                ? data?.prescription?.items?.map((drug: any) => (
                    <div
                      key={drug?.drug_id}
                      style={{
                        marginBottom: 16,
                        backgroundColor: "#e7fbff",
                        borderRadius: 8,
                        padding: 8,
                      }}
                    >
                      <div
                        style={{
                          borderBottom: "1px solid #ccc",
                          paddingBottom: 8,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 14,
                            minWidth: 100,
                            fontWeight: 700,
                            color: "#0f172a", // color_main giả định
                          }}
                        >
                          {drug?.drug_name}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 400,
                            color: "black",
                          }}
                        >
                          {`${drug.unit_id} - ${drug?.drug_prices} đ`}
                        </p>
                      </div>

                      <div style={{ paddingTop: 8 }}>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: "green",
                          }}
                        >
                          {drug?.how_to_use}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            fontWeight: 400,
                            color: "black",
                          }}
                        >
                          {`Số lượng: ${drug?.quantity_total}`}
                        </p>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        );
      case "XN":
        return (
          <div className="t-result_item_xn" style={{ padding: 10 }}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="w-[90vw]"
            >
              <p
                className="text-[14px] min-w-[110px] font-[400] color_main "
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Ngày lấy mẫu:
              </p>
              <span
                className="text-[14px] w-[200px] text-end"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data.get_samples_time)}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="w-[90vw]"
            >
              <p
                className="text-[14px] min-w-[110px] font-[400] color_main "
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Ngày thực hiện:
              </p>
              <span
                className="text-[14px] w-[200px] text-end"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data.approved_time)}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="w-[90vw]"
            >
              <p
                className="text-[14px] min-w-[110px] font-[400] color_main "
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Trả kết quả:
              </p>
              <span
                className="text-[14px] w-[200px] text-end"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {formatDate(data.expected_results_time)}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="w-[90vw]"
            >
              <p
                className="text-[14px] min-w-[110px] font-[400] color_main "
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người thực hiện:
              </p>
              <span
                className="text-[14px] w-[200px] text-end"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.approved_employee?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="w-[90vw]"
            >
              <p
                className="text-[14px] min-w-[110px] font-[400] color_main "
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nơi thực hiện:
              </p>
              <span
                className="text-[14px] w-[220px] text-end"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.execution_department?.name} Doctor Check
              </span>
            </div>
            {data?.diagnose_note && (
              <div className="w-[90vw] mt-2 mx-2 shadow-sm border p-2 rounded-md translate-x-[-5px]">
                <p
                  className="min-w-[70px] font-[600] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  Kết luận:
                </p>
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  {data?.diagnose_note}
                </span>
              </div>
            )}
            <div className="mt-2 w-full">
              {data?.items?.map((record: any, index: any) => (
                <>
                  <tr className="">
                    <span className="font-[700] color_main my-2">
                      {record.group_name}
                    </span>
                  </tr>
                  {record.child?.length &&
                    record.child.map((child: any, childex: any) => (
                      <div key={child.id} className="mb-3">
                        <CCollapseXN
                          unit={child.unit_id}
                          title={child.labtests_name}
                          type={handleCheckTypeXN()}
                          index={child.labtests_result}
                          isNormal={child.is_normal}
                          isHigher={child.is_higher}
                          isLower={child.is_lower}
                        >
                          <p className="text-[14px]">{child.description}</p>
                          <RangeResult
                            min={child.lower_index}
                            max={child.higher_index}
                            index={child.labtests_result}
                            isNormal={child.is_normal}
                            isHigher={child.is_higher}
                            isLower={child.is_lower}
                          />
                        </CCollapseXN>
                      </div>
                    ))}
                </>
              ))}
            </div>
          </div>
        );
      case "GPB":
        return (
          <div className="t-result_item_pcd" style={{ padding: 10 }}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nơi nhận mẫu:
              </p>
              <span
                className="text-[14px]"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {data.histopathology?.servicepoint_department?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người nhận:
              </p>
              <span
                className="text-[14px]"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {data.histopathology?.receive_employee?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Thời gian nhận:
              </p>
              <span
                className="text-[14px]"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {data.histopathology?.receive_time &&
                  moment(data.histopathology?.receive_time).format(
                    "HH:mm - DD/MM/YYYY"
                  )}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người bàn giao:
              </p>
              <span
                className="text-[14px]"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {data.histopathology?.receive_employee?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Ngày trả kết quả:
              </p>
              <span
                className="text-[14px]"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                07:29 - 11/12/2023
              </span>
            </div>
            <div className="">
              <p
                className="min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Chẩn đoán:
              </p>
              <span
                className="text-[14px]"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {data?.histopathology?.diagnose_note}
              </span>
            </div>
            <div className="border-t mt-2 pt-2">
              <p
                className="min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Yêu cầu xét nghiệm:
              </p>
              <span
                className="text-[14px]"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {data?.histopathology?.diagnose_note}
              </span>
              <div className="mt-2">
                <p
                  className="min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  Sinh thiết được lấy từ:
                </p>
                <span
                  className="text-[14px]"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  {data?.histopathology?.endoscopy_biopsy_node}
                </span>
              </div>
            </div>
            <div className="border-t mt-2 pt-2">
              <p
                className="min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Kết luận:
              </p>
              <span
                className="text-[14px]"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {data?.histopathology?.diagnose_note}
              </span>
              <div className="mt-2">
                <p
                  className="min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  Đề nghị (nếu có):
                </p>
                <span className="text-[14px]"></span>
              </div>
              <div className="mt-2">
                <p
                  className="min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  Kết quả:
                </p>
                {data?.histopathology?.result_file?.name && (
                  <div style={{ marginTop: "12px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                      File kết quả:
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "6px",
                      }}
                    >
                      <p
                        style={{
                          marginRight: "5px",
                          fontSize: "14px",
                          color: "#d32f2f",
                        }}
                      >
                        📄
                      </p>
                      <a
                        href={data?.histopathology?.result_file?.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#007bff",
                          textDecoration: "none",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        File kết quả (gốc)
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "XNSHPT":
        return (
          <div className="t-result_item_pcd">
            <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="text-[14px] min-w-[100px] font-[400] color_main" style={{ fontSize: "14px", fontWeight: "400" }}>
                Ngày nhận chỉ định:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
               {data?.molecule?.handing_datetime ? moment(data?.molecule?.handing_datetime).format("HH:mm - DD/MM/YYYY") : 'N/A'}
              </span>
            </div>
            <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="text-[14px] min-w-[100px] font-[400] color_main" style={{ fontSize: "14px", fontWeight: "400" }}>
                Người nhận:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
               {data?.molecule?.handing_employee ?data?.molecule?.handing_employee?.name : 'N/A'}
              </span>
            </div>
           <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="text-[14px] min-w-[100px] font-[400] color_main" style={{ fontSize: "14px", fontWeight: "400" }}>
                Ngày duyệt kết quả:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                   {data?.molecule?.approved_datetime ? moment(data?.molecule?.approved_datetime).format("HH:mm - DD/MM/YYYY") : 'N/A'}
              </span>
            </div>
             <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="text-[14px] min-w-[100px] font-[400] color_main" style={{ fontSize: "14px", fontWeight: "400" }}>
                Người duyệt:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                 {data?.molecule?.approved_employee ?data?.molecule?.approved_employee?.name : 'N/A'}
              </span>
            </div>
            <div className="" style={{marginBottom:10}}>
              <p className="min-w-[100px] font-[400] color_main" style={{ fontSize: "14px", fontWeight: "400" }}>Xét nghiệm:</p>
              <p className="text-[14px]" style={{ fontSize: "14px", fontWeight: "400" }}>- {data?.service?.service_name}.</p>
              <p className="text-[14px]" style={{ fontSize: "14px", fontWeight: "400" }}>
                - {data?.molecule?.molecule_method}.
              </p>
            </div>
            <div className="mt-2" style={{marginTop:10}}>
              <p className="min-w-[100px] font-[400] color_main mb-2" style={{ fontSize: "14px", fontWeight: "400" }}>
                Kết quả:
              </p>
              <img src={data?.molecule?.result_image} style={{height:"100%",maxWidth:"100%"}}/>
            </div>
            <div className="mt-2" style={{display:"flex",alignItems:"center",gap:10}}>
              <p className="min-w-[70px] font-[600] color_main mb-2" style={{ fontSize: "14px", fontWeight: "400" }}>
                Kết luận:
              </p>
              <p style={{ fontSize: "14px", fontWeight: "400",color: data?.molecule?.result_is_positive ? "#ff0000" : "âm tính" }} className="text-[14px]">
                {data?.molecule?.result_is_positive ? "Dương tính" : "âm tính"}
              </p>
            </div>
             <div className="mt-2" >
             
              <p style={{ fontSize: "14px", fontWeight: "400", }} className="text-[14px]">
              <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "6px",
                    }}
                  >
                    <p
                      style={{
                        marginRight: "5px",
                        fontSize: "14px",
                        color: "#d32f2f",
                      }}
                    >
                      📄
                    </p>
                    <a
                      href={data?.molecule?.result_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      File kết quả (gốc)
                    </a>
                  </div>
              </p>
            </div>
            {/* <div className="mt-2">
              <table className="w-full">
                <thead className="w-full border-b">
                  <tr className="grid grid-cols-[1fr_1fr] w-full">
                    <th className="text-start w-full font-[400] color_main">
                      KẾT QUẢ ()
                    </th>
                    <th className="text-start w-full font-[400] color_main">
                      NGƯỠNG PHÁT HIỆN
                    </th>
                  </tr>
                </thead>
              </table>
            </div> */}
          </div>
        );
      case "XNHT":
        return <div></div>;
      case "XNPAP":
        return (
          <div style={{ padding: 10 }}>
            <div className="t-result_item_xq">
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className=""
                >
                  <p
                    className="text-[14px] min-w-[100px] font-[400] color_main"
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#04566e",
                    }}
                  >
                    BS Phụ khoa:
                  </p>
                  <span
                    className="text-[14px]"
                    style={{ fontSize: "14px", fontWeight: "400" }}
                  >
                    {data?.doctor_signature_name}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className=""
                >
                  <p
                    className="text-[14px] min-w-[100px] font-[400] color_main "
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#04566e",
                    }}
                  >
                    Thời gian nhận chỉ định:
                  </p>
                  <span
                    className="text-[14px]"
                    style={{ fontSize: "14px", fontWeight: "400" }}
                  >
                    {data?.servicepoint_create_date &&
                      moment(data?.servicepoint_create_date).format(
                        "YYYY/MM/DD HH:mm"
                      )}{" "}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className=""
                >
                  <p
                    className="text-[14px] min-w-[100px] font-[400] color_main"
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#04566e",
                    }}
                  >
                    Thời gian duyệt kết quả:
                  </p>
                  <span
                    className="text-[14px]"
                    style={{ fontSize: "14px", fontWeight: "400" }}
                  >
                    {data?.approved_datetime &&
                      moment(data?.approved_datetime).format(
                        "YYYY/MM/DD HH:mm"
                      )}{" "}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className=""
                >
                  <p
                    className="text-[14px] min-w-[100px] font-[400] color_main"
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#04566e",
                    }}
                  >
                    Người duyệt kết quả:
                  </p>
                  <span
                    className="text-[14px]"
                    style={{ fontSize: "14px", fontWeight: "400" }}
                  >
                    {data?.signature_print_name}
                  </span>
                </div>
              </>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                Đánh giá lam:
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="checkbox"
                  checked={data?.specimen_satisfactory}
                  readOnly
                />
                <span style={{ marginLeft: "6px", fontSize: "14px" }}>Đạt</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="checkbox"
                  checked={data?.specimen_unsatisfactory}
                  readOnly
                />
                <span style={{ marginLeft: "6px", fontSize: "14px" }}>
                  Không đạt
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                  gap: 5,
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Bình thường:
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "3px",
                  }}
                >
                  <input type="checkbox" checked={data?.normal_cell} readOnly />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                  gap: 5,
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Biến đổi lành tính:
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={data?.benign_changes_detected}
                    readOnly
                  />
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "14px",
                      marginBottom: "2px",
                    }}
                  >
                    Có
                  </span>
                </div>
              </div>
              {[
                {
                  checked: data?.benign_changes_trichomonas_vaginalis,
                  label: "Trichomonas vaginalis",
                },
                {
                  checked: data?.benign_changes_candida_spp,
                  label: "Candida spp",
                },
                {
                  checked: data?.benign_changes_actinomyces_spp,
                  label: "Actinomyces spp",
                },
                {
                  checked: data?.benign_changes_herpes_simplex_virus,
                  label: "Herpes simplex virus",
                },
                { checked: data?.benign_changes_others, label: "Khác" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <input type="checkbox" checked={item.checked} readOnly />
                  <span style={{ marginLeft: "6px", fontSize: "14px" }}>
                    {item.label}
                  </span>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                  gap: 5,
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                  Bất thường tế bào biểu mô:{" "}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "3px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={data?.epithelial_cell_abnormality}
                    readOnly
                  />
                </div>
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                Tế bào gai:
              </div>
              {[
                { checked: data?.squamous_cell_ascus, label: "ASC-US" },
                { checked: data?.squamous_cell_asc_h, label: "ASC-H" },
                { checked: data?.squamous_cell_lsil, label: "LSIL" },
                { checked: data?.squamous_cell_hpv, label: "HPV" },
                { checked: data?.squamous_cell_hsil, label: "HSIL" },
                {
                  checked: data?.squamous_cell_carcinoma,
                  label: "Carcinoma tế bào gai",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <input type="checkbox" checked={item.checked} readOnly />
                  <span style={{ marginLeft: "6px", fontSize: "14px" }}>
                    {item.label}
                  </span>
                </div>
              ))}

              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginBottom: "4px",
                }}
              >
                Tế bào tuyến:
              </div>
              {[
                {
                  checked: data?.suggestions_repeat_pap_test,
                  label: "Phết lại",
                },
                {
                  checked: data?.suggestions_endocervical_curettage,
                  label: "Nạo kênh",
                },
                { checked: data?.suggestions_colposcopy, label: "Soi CTC" },
                {
                  checked: data?.suggestions_endometrial_curettage,
                  label: "Nạo lòng",
                },
                { checked: data?.suggestions_biopsy, label: "Bấm sinh thiết" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <input type="checkbox" checked={item.checked} readOnly />
                  <span style={{ marginLeft: "6px", fontSize: "14px" }}>
                    {item.label}
                  </span>
                </div>
              ))}

              <div style={{ fontSize: "14px", marginTop: "12px" }}>
                Kết luận: <strong>{data?.thinprep_conclude}</strong>
              </div>

              {data?.thinprep_file && (
                <div style={{ marginTop: "12px" }}>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                    File kết quả:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "6px",
                    }}
                  >
                    <p
                      style={{
                        marginRight: "5px",
                        fontSize: "14px",
                        color: "#d32f2f",
                      }}
                    >
                      📄
                    </p>
                    <a
                      href={data?.thinprep_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#007bff",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      File kết quả (gốc)
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "XNHPV":
        return (
          <div className="t-result_item_xq" style={{ padding: 10 }}>
            <>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className=""
              >
                <p
                  className="text-[14px] min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  BS Phụ khoa:
                </p>
                <span
                  className="text-[14px]"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {data?.doctor_signature_name}
                </span>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className=""
              >
                <p
                  className="text-[14px] min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  Thời gian nhận chỉ định:
                </p>
                <span
                  className="text-[14px]"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {data?.servicepoint_create_date &&
                    moment(data?.servicepoint_create_date).format(
                      "YYYY/MM/DD HH:mm"
                    )}{" "}
                </span>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className=""
              >
                <p
                  className="text-[14px] min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  Thời gian duyệt kết quả:
                </p>
                <span
                  className="text-[14px]"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {data?.approved_datetime &&
                    moment(data?.approved_datetime).format(
                      "YYYY/MM/DD HH:mm"
                    )}{" "}
                </span>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className=""
              >
                <p
                  className="text-[14px] min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  Người duyệt kết quả:
                </p>
                <span
                  className="text-[14px]"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  {data?.signature_print_name}
                </span>
              </div>
            </>
            <div className="m-h-[200px] pb-1">
              <div className="">
                <p
                  className="text-[14px] min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  Dịch vụ:
                </p>
                <span className=" font-[400] text-[13px]">
                  <RichTextEditor2
                    header="hide"
                    handleChange={(value: string) => {}}
                    value={data?.service_name}
                  />
                </span>
              </div>
            </div>
            <div className="m-h-[200px] pb-1">
              <div className="">
                <p
                  className="text-[14px] min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  Phương pháp:
                </p>
                <span className=" font-[400] text-[13px]">
                  <RichTextEditor2
                    header="hide"
                    handleChange={(value: string) => {}}
                    value={data?.analytical_method}
                  />
                </span>
              </div>
            </div>
            <div
              className="t-examination_result_header_diagnose_note"
              style={{ marginTop: "8px" }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                <p
                  className="text-[14px] min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  KẾT QUẢ HPV:
                </p>
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    checked={data?.hpv_result === "POSITIVE"}
                    readOnly
                    id="readonlyCheckbox"
                  />
                  <span
                    style={{
                      fontWeight: 400,
                      color: "#dc3545",
                      marginLeft: 4,
                      fontSize: "14px",
                    }}
                  >
                    DƯƠNG TÍNH
                  </span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={data?.hpv_result !== "POSITIVE"}
                    readOnly
                    id="readonlyCheckbox"
                  />
                  <span
                    style={{
                      fontWeight: 400,
                      color: "#28a745",
                      marginLeft: 4,
                      fontSize: "14px",
                    }}
                  >
                    ÂM TÍNH
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  flexDirection: "column",
                  marginTop: "8px",
                }}
              >
                <p
                  className="text-[14px] min-w-[100px] font-[400] color_main"
                  style={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#04566e",
                  }}
                >
                  KẾT LUẬN:
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexDirection: "column",
                      fontSize: "14px",
                    }}
                  >
                    <span>11 Other HPV High-Rick</span>
                    <div
                      style={{ display: "flex", gap: 8, flexDirection: "row" }}
                    >
                      <div>
                        {" "}
                        <input
                          type="checkbox"
                          checked={
                            data?.hpv_11_otherhpv_highrick === "POSITIVE"
                          }
                          readOnly
                          id="readonlyCheckbox"
                        />
                        <span
                          style={{
                            fontWeight: 400,
                            color: "#dc3545",
                            marginLeft: 4,
                            fontSize: "14px",
                          }}
                        >
                          DƯƠNG TÍNH
                        </span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={
                            data?.hpv_11_otherhpv_highrick !== "POSITIVE"
                          }
                          readOnly
                          id="readonlyCheckbox"
                        />
                        <span
                          style={{
                            fontWeight: 400,
                            color: "#28a745",
                            marginLeft: 4,
                            fontSize: "14px",
                          }}
                        >
                          ÂM TÍNH
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexDirection: "column",
                      fontSize: "14px",
                    }}
                  >
                    <span>Genotype HPV 16</span>
                    <div
                      style={{ display: "flex", gap: 8, flexDirection: "row" }}
                    >
                      <div>
                        {" "}
                        <input
                          type="checkbox"
                          checked={data?.hpv_genotype_hpv16 === "POSITIVE"}
                          readOnly
                          id="readonlyCheckbox"
                        />
                        <span
                          style={{
                            fontWeight: 400,
                            color: "#dc3545",
                            marginLeft: 4,
                            fontSize: "14px",
                          }}
                        >
                          DƯƠNG TÍNH
                        </span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={data?.hpv_genotype_hpv16 !== "POSITIVE"}
                          readOnly
                          id="readonlyCheckbox"
                        />
                        <span
                          style={{
                            fontWeight: 400,
                            color: "#28a745",
                            marginLeft: 4,
                          }}
                        >
                          ÂM TÍNH
                        </span>
                      </div>{" "}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexDirection: "column",
                      fontSize: "14px",
                    }}
                  >
                    <span>Genotype HPV 18/45</span>
                    <div
                      style={{ display: "flex", gap: 8, flexDirection: "row" }}
                    >
                      <div>
                        {" "}
                        <input
                          type="checkbox"
                          checked={data?.hpv_genotype_hpv1845 === "POSITIVE"}
                          readOnly
                          id="readonlyCheckbox"
                        />
                        <span
                          style={{
                            fontWeight: 400,
                            color: "#dc3545",
                            marginLeft: 4,
                          }}
                        >
                          DƯƠNG TÍNH
                        </span>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={data?.hpv_genotype_hpv1845 !== "POSITIVE"}
                          readOnly
                          id="readonlyCheckbox"
                        />
                        <span
                          style={{
                            fontWeight: 400,
                            color: "#28a745",
                            marginLeft: 4,
                          }}
                        >
                          ÂM TÍNH
                        </span>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <>
                {data?.hpv_file && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "end",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      File kết quả:
                    </div>
                    <div
                      style={{
                        listStyleType: "none",
                        padding: 0,
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "50px",
                        marginTop: "8px",
                      }}
                    >
                      <div
                        style={{
                          listStyleType: "none",
                          padding: 0,
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "end",
                        }}
                      >
                        <p
                          style={{
                            marginRight: "5px",
                            fontSize: "14px",
                            color: "#d32f2f",
                          }}
                        >
                          📄
                        </p>
                        <a
                          href={data?.hpv_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#007bff",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          File kết quả (gốc)
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </>
            </div>
          </div>
        );
      case "SLLX":
        return (
          <div className="t-result_item_pcd" style={{ padding: 10 }}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Thời gian nhận chỉ định
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.servicepoint_create_date &&
                  moment(data?.servicepoint_create_date).format(
                    "YYYY/MM/DD HH:mm"
                  )}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Thời gian thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.servicepoint_create_date &&
                  moment(data?.approved_datetime).format("YYYY/MM/DD HH:mm")}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người thực hiện:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.signature_print_name}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
              className=""
            >
              <span
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Dịch vụ:{" "}
                <span style={{ color: "#141415" }}>{data?.service_name}</span>
              </span>
            </div>
            <div
              className="t-examination_result_header_diagnose_note"
              style={{ marginTop: "4px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "end",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ marginRight: 4, fontSize: 14 }}>
                      Vị trí:{" "}
                      <strong>
                        {data?.osteoporosis_site === "LeftFoot"
                          ? "Chân trái"
                          : "Chân phải"}
                      </strong>
                    </span>
                  </div>
                  {/* Cột 1 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{ marginLeft: 4, marginRight: 4, fontSize: 14 }}
                    >
                      T-Score: <strong>{data?.osteoporosis_tscore}</strong>
                    </span>
                  </div>

                  {/* Cột 2 */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{ marginLeft: 4, marginRight: 4, fontSize: 14 }}
                    >
                      Z-Score: <strong>{data?.osteoporosis_zscore}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 4 }}>
                <span className="text-[14px] min-w-[100px] font-[400] color_main">
                  Ghi chú nội bộ:{" "}
                  <span style={{ color: "#141415" }}>
                    {data?.osteoporosis_note}
                  </span>
                </span>
              </div>
              <div style={{ fontSize: "14px" }}>
                <span className="text-[14px] min-w-[100px] font-[400] color_main">
                  {" "}
                  Kết luận:{" "}
                  <span style={{ color: "#141415" }}>
                    {" "}
                    {data?.osteoporosis_conclude}
                  </span>{" "}
                </span>
              </div>
            </div>
            <div className="mt-2 mb-2">
              {data?.osteoporosis_image ? (
                <div>
                  <img
                    src={data?.osteoporosis_image}
                    loading="lazy"
                    className="rounded-md"
                    style={{
                      borderRadius: "0.375rem",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      case "KHAMPK":
        return (
          <div className="t-result_item_pcd">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{ fontSize: 14, fontWeight: 400, color: "#04566e" }}
              >
                Ngày khám:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: 14, fontWeight: 400 }}
              >
                {data?.in_datetime &&
                  moment(data?.in_datetime).format("YYYY/MM/DD HH:mm")}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{ fontSize: 14, fontWeight: 400, color: "#04566e" }}
              >
                Nơi khám:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: 14, fontWeight: 400 }}
              >
                {data?.doctor_department?.name}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "8px",
              }}
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{ fontSize: 14, fontWeight: 400, color: "#04566e" }}
              >
                Bác sĩ khám:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: 14, fontWeight: 400 }}
              >
                {data?.doctor_employee?.name}
              </span>
            </div>

            <div
              className="bg-white rounded-md"
              style={{ padding: "8px", fontSize: 14, fontWeight: 400 }}
            >
              <div className="flex flex-col mb-4 mt-2">
                <p
                  className="text-[16px] font-bold uppercase"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Mô tả
                </p>
                <p
                  className="text-[16px] font-semibold mt-1"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginTop: "5px",
                  }}
                >
                  I. Tiền sử phụ khoa
                </p>

                <div
                  className="flex flex-col text-[14px] mt-2"
                  style={{ marginTop: "5px" }}
                >
                  <span className="mb-1">
                    Tiền sử bệnh lý phụ khoa: {data?.gynecological_history}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-1 text-[14px]">
                  <div className="flex gap-1">
                    <span className="block font-medium">
                      Tuổi bắt đầu kinh nguyệt:
                    </span>
                    <span className="text-[#000]">
                      {data?.period_inyear || "--"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="block font-medium">
                      Tính chất kinh nguyệt:
                    </span>
                    <span className="text-[#000]">
                      {data?.period_regularity_yes ? "Đều" : "Không đều"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="block font-medium">Chu kỳ kinh:</span>
                    <span className="text-[#000]">
                      {data?.period_cycledays
                        ? `${data?.period_cycledays} ngày`
                        : "--"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="block font-medium">Lượng kinh:</span>
                    <span className="text-[#000]">
                      {data?.period_amountdays
                        ? `${data?.period_amountdays} ngày`
                        : "--"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="block font-medium">Kinh chót:</span>
                    <span className="text-[#000]">
                      {data?.period_lastdate
                        ? moment(data?.period_lastdate).format(
                            "DD/MM/YYYY HH:mm"
                          )
                        : "--"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="block font-medium">Đau bụng kinh:</span>
                    <span className="text-[#000]">
                      {data?.period_stomachache_yes ? "Có" : "Không"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="block font-medium">Đã lập gia đình:</span>
                    <span className="text-[#000]">
                      {data?.married_yes ? "Có" : "Chưa"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="block font-medium">PARA:</span>
                    <span className="text-[#000]">{data?.para || "--"}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="block font-medium">
                      Đã từng mổ sản, phụ khoa:
                    </span>
                    <span className="text-[#000]">
                      {data?.surgeries_yes ? "Có -" : "Chưa"}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="block font-medium">
                      Có đang áp dụng BPTT:
                    </span>
                    <span className="text-[#000]">
                      {data?.contraception_yes ? "Có -" : "Không"}
                    </span>
                  </div>
                </div>

                <p
                  className="text-[16px] font-semibold uppercase mt-5"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginTop: "5px",
                  }}
                >
                  II. Nội dung khám - Kết luận & Đề nghị:
                </p>

                {data?.examming_content && (
                  <div
                    className="text-[14px] mt-2"
                    dangerouslySetInnerHTML={{ __html: data.examming_content }}
                  />
                )}

                <p
                  className="text-[16px] font-bold uppercase mt-2"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginTop: "5px",
                  }}
                >
                  Kết luận:
                </p>
                <div className="border rounded-md p-2 bg-gray-50 mt-1 text-[14px]">
                  {data?.conclude}
                </div>
              </div>

              <div className="mt-3 text-[14px] mb-2">
                <span
                  className="font-medium mr-1"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginTop: "5px",
                  }}
                >
                  Đề nghị:
                </span>
                <span className="text-black">{data?.recommend}</span>
              </div>
            </div>
          </div>
        );
      case "VACCINE":
        return (
          <div className="t-result_item_pcd" style={{ padding: "8px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Ngày giờ sàng lọc:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.survey_datetime &&
                  moment(data?.survey_datetime).format("YYYY/MM/DD HH:mm")}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nơi sàng lọc:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.servicepoint_department?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                BS sàng lọc:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.survey_empoyee?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Ngày giờ tiêm:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.vaccine_datetime &&
                  moment(data?.vaccine_datetime).format("YYYY/MM/DD HH:mm")}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nơi tiêm:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.vaccine_department?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người tiêm:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.vaccine_empoyee?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Ngày giờ kiểm tra:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.check_expected_datetime &&
                  moment(data?.check_expected_datetime).format(
                    "YYYY/MM/DD HH:mm"
                  )}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Nơi kiểm tra:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.check_department?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Người kiểm tra:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.check_empoyee?.name}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Số lô:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.lot_serial}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Hạn sử dụng:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.expiry}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <p
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Đường tiêm:
              </p>
              <span
                className="text-[14px]"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                {data?.route}
              </span>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className=""
            >
              <span
                className="text-[14px] min-w-[100px] font-[400] color_main"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#04566e",
                }}
              >
                Tình trạng sau tiêm:{" "}
                <span className="text-[14px] text-black font-medium">
                  {data?.check_conclude}
                </span>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ marginRight: 4, fontWeight: 600, fontSize: 14 }}
                  >
                    Mạch:{" "}
                    <span style={{ fontWeight: 500 }}>
                      {data?.heart_rate} (lần/phút)
                    </span>
                  </span>
                </div>
                {/* Cột 1 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ marginRight: 4, fontWeight: 600, fontSize: 14 }}
                  >
                    Huyết áp:{" "}
                    <span style={{ fontWeight: 500 }}>
                      {data?.blood_pressure_min}/{data?.blood_pressure_max}{" "}
                      (mmHg)
                    </span>
                  </span>
                </div>

                {/* Cột 2 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ marginRight: 4, fontWeight: 600, fontSize: 14 }}
                  >
                    Nhiệt độ:{" "}
                    <span style={{ fontWeight: 500 }}>
                      {data?.temperature} (°C)
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ marginRight: 4, fontWeight: 600, fontSize: 14 }}
                  >
                    SpO2:{" "}
                    <span style={{ fontWeight: 500 }}>{data?.spo2} (%)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="t-examination_result_content"
      style={{
        padding: "10px",
        paddingRight: "10px",
        paddingBottom: "10px",
        overflowX: "hidden",
      }}
    >
      {_.isEmpty(data) ? (
        <div
          style={{
            color: "#f00",
            padding: "10px",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          Chưa có kết quả!
        </div>
      ) : (
        (handleRender() as any)
      )}
    </div>
  );
};

export default DetailResult;
