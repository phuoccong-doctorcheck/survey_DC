/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ExampleXNData, dataExamDiseaseReportTag } from 'assets/data';
import CTooltip from 'components/atoms/CTooltip';
import Checkbox from 'components/atoms/Checkbox';
import Icon from 'components/atoms/Icon';
import ImagePreview from 'components/atoms/ImagePreview';
import Loading from 'components/atoms/Loading';
import Typography from 'components/atoms/Typography';
import ImagePreviewFullScreen from 'components/molecules/ImagePreviewFullScreen';
import PublicTable from 'components/molecules/PublicTable';
import RenderMedicalRecord from 'components/molecules/RenderMedicalRecord';
import RichTextEditor from 'components/molecules/RichTextEditor';
import { format } from 'date-fns';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import mapModifiers from 'utils/functions';

export type ResultType = 'PCD' | 'XN' | 'XQ' | 'DT' | 'NS' | 'TDV' | 'EMR' | 'SA' | 'GPB' | 'XNHT' | 'XNSHPT' | 'overview';

interface RenderExaminationResultProps {
  type?: ResultType,
  data?: any,
  title?: string,
  registerDate?: Date,
  masterId?: string,
  error?: string,
  isPrintOption?: boolean,
  isRenderDone?: boolean,
  handlePrint?: () => void;
}

const RenderExaminationResult: React.FC<RenderExaminationResultProps> = ({
  type, data, title, registerDate, masterId, error, handlePrint, isPrintOption, isRenderDone
}) => {
  const columnsPCD = [
    {
      title: <Typography content="Tên dịch vụ" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'service_name',
      align: 'center',
      render: (record: any, data: any) => (
        <Typography content={record} modifiers={['14x20', '400', 'justify']} />
      ),
    },
    {
      title: <Typography content="Nhóm dịch vụ" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'service_group_name',
      align: 'center',
      width: 160,
      render: (record: any) => (
        <Typography content={record || '---'} modifiers={['14x20', '400', 'center']} />
      ),
    },
    {
      title: <Typography content="Giá" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'service_prices',
      align: 'center',
      width: 110,
      render: (record: any) => (
        <Typography
          content={record?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || '0.00'}
          modifiers={['14x20', '400', 'center']}
        />
      ),
    },
    {
      title: <Typography content="SL" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'quantity',
      width: 50,
      align: 'center',
      render: (record: any) => (
        <Typography content={record} modifiers={['14x20', '400', 'center']} />
      ),
    },
    {
      title: <Typography content="Thành tiền" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'service_prices',
      align: 'center',
      width: 110,
      render: (record: any) => (
        <Typography
          content={record?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || '0.00'}
          modifiers={['14x20', '400', 'center']}
        />
      ),
    },
    {
      title: <Typography content="Tình trạng" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'status',
      align: 'center',
      width: 110,
      render: (record: any) => (
        <Typography content={record === 'done' ? 'Đã xong' : (record === 'inprogress') ? 'Đang thực hiện' : 'chưa thực hiện'} modifiers={['14x20', '400', 'center', record === 'done' ? 'green' : (record === 'inprogress') ? 'blueNavy' : 'jet']} />
      ),
    },
  ];
  const columnsXN = [
    {
      title: <Typography content="Xét nghiệm" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'labtests_name',
      align: 'center',
      width: 160,
      render: (record: any, data: any) => (
        <Typography content={record} modifiers={['14x20', '400', 'left']} />
      ),
    },
    {
      title: <Typography content="Kết quả" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'labtests_result',
      align: 'center',
      width: 140,
      render: (record: any, data: any) => (
        <Typography content={record} modifiers={['14x20', '400', 'center']} />
      ),
    },
    {
      title: <Typography content="CSBT" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'normal_index',
      align: 'center',
      width: 160,
      render: (record: any) => (
        <Typography
          content={record?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || '0.00'}
          modifiers={['14x20', '400', 'center']}
        />
      ),
    },
    {
      title: <Typography content="Đơn vị" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'unit_id',
      align: 'center',
      width: 120,
      render: (record: any) => (
        <Typography content={record} modifiers={['14x20', '400', 'center']} />
      ),
    },
    {
      title: <Typography content="Ghi chú" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'description',
      align: 'center',
      width: 200,
      render: (record: any) => (<Typography content={record} modifiers={['14x20', '400', 'center']} />),
    },

  ];
  const columnsXNHT = [
    {
      title: <Typography content="Tên xét nghiệm" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'service_name',
      align: 'center',
      render: (record: any, data: any) => (
        <Typography content={record} modifiers={['14x20', '400', 'left']} />
      ),
    },
    {
      title: <Typography content="Kết quả" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'breathtest_result',
      align: 'center',
      width: 90,
      render: (record: any) => (
        <Typography content={record || '---'} modifiers={['14x20', '400', 'center']} />
      ),
    },
    {
      title: <Typography content="Ngưỡng bình thường	" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'normal_index',
      align: 'center',
      width: 160,
      render: (record: any) => (
        <Typography
          content={record?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || '0.00'}
          modifiers={['14x20', '400', 'center']}
        />
      ),
    },
    {
      title: <Typography content="Đơn vị" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'unit_id',
      align: 'center',
      width: 90,
      render: (record: any) => (
        <Typography content={record} modifiers={['14x20', '400', 'center']} />
      ),
    },
    {
      title: <Typography content="Kết luận" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'description',
      align: 'center',
      render: (record: any) => (<Typography content={record} modifiers={['14x20', '400', 'center']} />),
    },

  ];
  const templateNXHT = [
    {
      question: 'Quý khách hàng ngưng ăn trong vòng 4-6 giờ',
      answer: data?.breathtest?.stop_eating_yes,
    },
    {
      question: 'Quý khách hàng ngưng sử dụng bia, rượu,nước ngọt, nước có ga trong vòng 4 giờ',
      answer: data?.breathtest?.stop_drink_yes,
    },
    {
      question: 'Quý khách hàng ngưng sử dụng thuốc kháng sinh trong 4 tuần trở lại đây',
      answer: data?.breathtest?.stop_antibiotics_yes,
    },
    {
      question: 'Quý khách hàng ngưng sử dụng thuốc ức chế bơm Proton dạ dày trong vòng 2 tuần trở lại đây',
      answer: data?.breathtest?.stop_slime_yes,
    },
  ]
  const columTDV = [
    {
      title: <Typography content="Tên Thuốc" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'drug_name',
      align: 'justify',
      render: (record: any, data: any) => (
        <div>
          <Typography content={`${record} - (${data?.drugs_active_ingredient})`} modifiers={['14x20', '600', 'left']} />
          <p style={{ color: '#333', fontSize: 13, fontStyle: 'italic' }}>{data.how_to_use}</p>
        </div>
      ),
    },
    {
      title: <Typography content="Số lượng" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'quantity_total',
      align: 'center',
      width: 100,
      render: (record: any) => (
        <Typography content={record || '---'} modifiers={['14x20', '400', 'center']} />
      ),
    },
    {
      title: <Typography content="Đơn vị" modifiers={['14x20', '500', 'center']} />,
      dataIndex: 'unit_id',
      align: 'center',
      width: 100,
      render: (record: any, data: any) => (
        <Typography content={record} modifiers={['14x20', '400', 'left']} />
      ),
    },
  ]

  const getNameFileFromURL = (url: string) => {
    const urlObject = new URL(url);

    const fileName = urlObject.pathname.split('/').pop();
    return fileName
  }

  const handleFormatTimeLine = (timeLine: any) => {
    const listTimeLine: any[] = [];
    timeLine?.forEach((element: any) => {
      const existingGroup = listTimeLine.find(
        (group) => group.year === element.year
      );
      const newGroup = {
        year: element.year,
        child: [element]
      }
      if (existingGroup) {
        existingGroup.child.push(element as any);
      } else {
        listTimeLine.push(newGroup as any);
      }
    });
    return listTimeLine;
  }

  const handleFormatHabit = (timeLine: any) => {
    const listHabit: any[] = [];
    timeLine?.forEach((element: any) => {
      const existingGroup = listHabit.find(
        (group) => group.groupId === element.disease_advice_group_id
      );
      const newGroup = {
        groupname: element.disease_advice_group_name,
        groupId: element?.disease_advice_group_id,
        index: element?.disease_advice_group_id,
        child: [element]
      }
      if (existingGroup) {
        existingGroup.child.push(element as any);
      } else {
        listHabit.push(newGroup as any);
      }
    });
    return listHabit.sort((a, b) => a.index - b.index).filter(Boolean);
  }

  const handleFormatDrugItem = (drugs: any) => {
    const listDrug: any[] = [];
    drugs?.forEach((element: any) => {
      const existingGroup = listDrug.find(
        (group) => group.groupname === element.drug_display_name
      );

      const newGroup = {
        groupname: element.drug_display_name,
        note: element.drug_use_note,
        child: [element]
      }
      if (existingGroup) {
        existingGroup.child.push(element as any);
      } else {
        listDrug.push(newGroup as any);
      }
    });
    return listDrug;
  }

  const handleRender = () => {
    switch (type) {
      case 'SA':
      case 'XQ':
      case 'NS':
        return (
          error?.trim() ? (
            <div className="t-examination_result_error">
              <h2>{error}</h2>
            </div>
          )
            : (
              <div className="t-examination_result_public">
                <div className={mapModifiers('t-examination_result_xq', _.isEmpty(data?.imaging?.damnifics?.image_path) && 'none_img')}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 8 }} className="t-examination_result_xq_wrap" >
                    <p style={{ width: '70%' }}>
                      <Typography content="Mô tả" modifiers={['16x28', '700', 'uppercase']} />
                      <RichTextEditor typeText='notHeadernotBordernotBG' isDisabled data={data?.imaging?.inferable_content || ''} />
                      <Typography content="Kết luận:" type='span' modifiers={['16x28', '700', 'uppercase']} />
                      <RichTextEditor typeText='notHeadernotBordernotBG' isDisabled data={data?.imaging?.inferable_conclude || ''} />
                    </p>
                    <img src={data?.imaging?.damnifics?.image_path} alt="" loading="lazy" style={{ height: 550 }} />
                  </div>
                  <div className={mapModifiers('t-examination_result_xq_images', data?.imaging?.items?.length === 1 && 'one', type.toLowerCase())} style={{
                  }}>
                    {type === 'XQ' && (
                      <div style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>HÌNH ẢNH CHỤP XQUANG NGỰC THẲNG</div>
                    )}
                    {!_.isEmpty(data?.imaging?.items) && data?.imaging?.items?.map((image: any, idx: any) => (
                      <p key={idx}>
                        <ImagePreviewFullScreen urlImage={image?.blob_url} widths={300} />
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )
        );
      case 'DT':
        return (
          error?.trim() ? (
            <div className="t-examination_result_error">
              <h2>{error}</h2>
            </div>
          )
            : (
              <div className="t-examination_result_public">
                <div className={mapModifiers('t-examination_result_xq', _.isEmpty(data?.damnifics?.image_path) && 'none_img')}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 8 }} className="t-examination_result_xq_wrap" >
                    <p style={{ width: '70%' }}>
                      <Typography content="Mô tả" modifiers={['16x28', '700', 'uppercase']} />
                      <RichTextEditor typeText={'notHeadernotBordernotBG'} isDisabled data={data?.imaging?.inferable_content || ''} />
                      <Typography content="Kết luận:" type='span' modifiers={['16x28', '700', 'uppercase']} />
                      <RichTextEditor typeText={'notHeadernotBordernotBG'} isDisabled data={data?.imaging?.inferable_conclude || ''} />
                    </p>
                    <img src={data?.imaging?.damnifics?.image_path} alt="" loading="lazy" style={{ height: 550 }} />
                  </div>
                  <div className={mapModifiers('t-examination_result_xq_images', data?.imaging?.items?.length === 1 && 'one')} style={{ gridTemplateColumns: '1fr' }}>
                    {!_.isEmpty(data?.imaging?.items) && data?.imaging?.items?.map((image: any, idx: any) => (
                      <img src={image?.blob_url} alt="" key={idx} />
                    ))}
                  </div>
                </div>
              </div>
            )
        );
      case 'PCD':
        return (
          <div className="t-examination_result_pcd">
            <PublicTable
              isSimpleHeader
              column={columnsPCD}
              listData={data?.items}
              size="small"
              rowkey="servicespoint_detail_id"
              isPagination={false}
              isHideRowSelect
              isbordered
            />
          </div>
        );
      case 'TDV':
        return (
          <div className="t-examination_result_tdv">
            <Typography content="Thuốc điều trị:" />
            <div className="t-examination_result_tdv_content">
              <div className="t-examination_result_tdv_content_item">
                <span>- Lời dặn của Bác sĩ:</span>
                <Typography content={data?.prescription?.doctor_note} />
              </div>
            </div>
            <div className="m-medical_record_chapter">
              <div className="m-medical_record_chapter_heading">
                <Typography content="VIII. ĐƠN THUỐC:" type="h4" />
              </div>
              <div className="m-medical_record_chapter_content_viii ">
                {data?.prescription?.items?.length ?
                  <div className="m-medical_record_chapter_content_viii_info">
                    <PublicTable
                      column={columTDV}
                      isSimpleHeader
                      isHideRowSelect
                      listData={data?.prescription?.items}
                    />
                  </div>
                  : <div><Typography content='Không tìm thấy đơn thuốc' modifiers={['400', 'cg-red', 'center']} /></div>}
              </div>
            </div>
          </div>
        );
      case 'XN':
        const newData: any = [];

        data?.items?.forEach((item: any, index: any) => {
          const { labtests_group_id, labtests_group_name } = item;
          const existingGroup = newData.find((group: any) => group?.group_id === labtests_group_id);

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

        return (
          <div className='t-examination_result_xn'>
            <div className='t-examination_result_xn_table_header'>
              <PublicTable
                column={columnsXN}
                listData={ExampleXNData}
                size="small"
                scroll={{ x: 'max-content' }}
                rowkey="servicespoint_detail_id"
                isbordered
                isPagination={false}
                isHideRowSelect
              />
            </div>
            {
              newData?.map((item: any, idex: any) => (
                <div className="t-examination_result_xn_contents" key={idex}>
                  <PublicTable
                    textHeader={item?.group_name}
                    column={columnsXN}
                    listData={item?.child}
                    size="small"
                    rowkey="servicespoint_detail_id"
                    isbordered
                    scroll={{ x: 'max-content' }}
                    isPagination={false}
                    isHideRowSelect
                    isHideHeader
                    rowClassNames={(record: any, index: any) => {
                      if (!record?.is_normal) return 't-examination_result_xn-red';
                      return 't-examination_result_xn-blue';
                    }}
                  />
                </div>
              ))
            }
            <div className="t-examination_result_xn_signature">
              <p>
                Ngày giờ duyệt kết quả:&nbsp;
                {format(
                  new Date(data?.approved_time || new Date()),
                  "HH:mm, 'ngày' dd 'tháng' MM 'năm' yyyy",
                )}
              </p>
              <p>
                Người duyệt:&nbsp;
                <strong>{data?.approved_employee?.name || ''}</strong>
              </p>
            </div>
          </div>

        );
      case 'EMR':
        return (
          <div className="t-examination_result_EMR_content">
            <RenderMedicalRecord data={data} />
          </div>
        );
      case 'GPB':
        return (
          <div className="t-examination_result_gpb_content">
            <div className="t-examination_result_gpb_content_chapper" style={{
              paddingBottom: 8
            }}>
              <div className="t-examination_result_gpb_content_chapper_item">
                <span>Yêu cầu xét nghiệm: </span>
                <span>
                  {data?.histopathology?.request_text}
                </span>
              </div>
              <div className="t-examination_result_gpb_content_chapper_item">
                <span>Sinh thiết được lấy từ: </span>
                <span>
                  {data?.histopathology?.endoscopy_biopsy_node}
                </span>
              </div>
            </div>
            <div className="t-examination_result_gpb_content_chapper" style={{
              paddingTop: 12,
              borderTop: '1px solid #dbdbdb'
            }}>
              <div className="t-examination_result_gpb_content_chapper_item">
                <span>Kết luận: </span>
                <span>
                  {data?.histopathology?.result_conclusion}
                </span>
              </div>
              <div className="t-examination_result_gpb_content_chapper_item">
                <span>Đề nghị (nếu có): </span>
                <span>
                  {data?.histopathology?.solution_fixation}
                </span>
              </div>
              <div className="t-examination_result_gpb_content_chapper_item">
                <span>Tập tin kết quả: </span>
                <span
                  style={{ color: '#27ACFD', cursor: 'pointer' }}
                >
                  {data?.histopathology?.result_files?.map((i: any, indexs: any) => (<span
                    onClick={() => window.open(i?.path)} style={{ color: '#27ACFD', cursor: 'pointer' }}
                    key={indexs}>{i?.name}</span>))}
                </span>
              </div>
            </div>
          </div>
        );
      case 'XNHT': return (
        <div className="t-examination_result_xnht_content">
          <div className="t-examination_result_xnht_content_item">
            <p className="t-examination_result_xnht_content_item_heading">Đánh giá mức độ sẵn sàng trước khi tiến hành xét nghiệm:</p>
            {templateNXHT.map((item, index) => (
              <div className="t-examination_result_xnht_content_item_checklist" key={Math.floor(Math.random() * 10000)}>
                <Checkbox checked={item.answer} label={item.question} />
              </div>
            ))}
          </div>
          <div className="t-examination_result_xnht_content_item">
            <p className="t-examination_result_xnht_content_item_heading">Nguyên lý xét nghiệm:</p>
            <RichTextEditor typeText={'notHeadernotBordernotBG'} isDisabled data={data?.breathtest?.breathtest_helper_text || ''} />
          </div>
          <div className="t-examination_result_xnht_content_item">
            <PublicTable
              listData={data?.breathtest?.items}
              column={columnsXNHT}
              isHideRowSelect
              isSimpleHeader
            />
          </div>
          <div className="t-examination_result_xnht_content_item_signature">
            <Typography content={`Ngày giờ duyệt kết quả: ${moment(data?.breathtest?.expected_result_time).format('HH:mm,')} ngày ${moment(data?.breathtest?.expected_result_time).format('DD')} tháng ${moment(data?.breathtest?.expected_result_time).format('MM')} năm ${moment(data?.breathtest?.expected_result_time).format('YYYY')}`} />
            <p>Người duyệt: <strong>{data?.breathtest?.approved_employee?.name}</strong></p>
          </div>

        </div>
      )
      case 'XNSHPT': return (
        <div className="t-examination_result_xnshpt_content">
          <div className="t-examination_result_xnshpt_content_title">
            Kết quả:
          </div>
          <div className="t-examination_result_xnshpt_content_wrap">
            <div className="t-examination_result_xnshpt_content_top">
              <img src={data?.molecule?.result_image} />
            </div>
            {data?.molecule?.items.length ? (
              <div className="t-examination_result_xnshpt_content_bottom">
                <div className="t-examination_result_xnshpt_content_bottom_header_table">
                  <span>Kết luận</span>
                  <span> KẾT QUẢ</span>
                  <span> NGƯỠNG PHÁT HIỆN</span>
                </div>
                <div className="t-examination_result_xnshpt_content_bottom_content_table">
                  <div className="t-examination_result_xnshpt_content_bottom_content_table_result">
                    <span style={{ color: data?.molecule?.result_is_positive ? '#f00' : '#0093ff' }}>{data?.molecule?.result_is_positive ? 'Dương tính' : 'âm tính'}</span>
                  </div>
                  <div className="t-examination_result_xnshpt_content_bottom_content_table_item">
                    {data?.molecule?.items?.length ?
                      data?.molecule?.items?.map((item: any) => (
                        <div className="t-examination_result_xnshpt_content_bottom_content_table_item_row" key={item.id}>
                          <span style={{ color: item.result_is_positive ? '#f00' : '#000' }}>{`${item.result_index}`.replaceAll('<SUP>2</SUP>', '')}<sup>2</sup>{item?.unit_id}</span>
                          <span><RichTextEditor data={`${item.normal_index} ${item?.unit_id}`} notuseHeader typeText="notHeadernotBordernotBG" /></span>
                        </div>
                      ))
                      : null}
                  </div>
                </div>
              </div>
            ) : null}
            <div className="t-examination_result_xn_signature">
              <p>
                Ngày giờ duyệt kết quả:&nbsp;
                {format(
                  new Date(data?.molecule?.result_receive_datetime as any),
                  "HH:mm, 'ngày' dd 'tháng' MM 'năm' yyyy",
                )}
              </p>
              <p>
                Người duyệt:&nbsp;
                <strong>{data?.molecule?.signature_print_name || ''}</strong>
              </p>

              <p>
                <span style={{
                  fontWeight: 600
                }}>File gốc:</span>&nbsp;
                <span
                  style={{
                    cursor: 'pointer',
                    color: '#0093ff'
                  }}
                  onClick={() => {
                    window.open(data?.molecule?.result_file);
                  }}
                >{getNameFileFromURL(data?.molecule?.result_file) || ''}</span>
              </p>
            </div>
          </div>
        </div >
      )
      case 'overview': return (
        <div className="t-examination_result_overview">
          <div className="t-examination_result_overview-customer_info">
            <div className="t-examination_result_overview-customer_info_name">
              <div className="t-examination_result_overview-customer_info_flex">
                <span>Họ tên:</span>
                <Typography content={data?.customer?.customer_fullname} />
              </div>
              <div className="t-examination_result_overview-customer_info_flex">
                <span>Giới tính:</span>
                <Typography content={data?.customer?.gender?.name} modifiers={['400']} />
              </div>
              <div className="t-examination_result_overview-customer_info_flex">
                <span>Năm sinh:</span>
                <Typography content={data?.customer?.year_of_birth} modifiers={['400']} />
              </div>
            </div>
            <div className="t-examination_result_overview-customer_info_flex">
              <span> Địa chỉ:</span>
              <Typography content={data?.customer?.customer_full_address} modifiers={['400']} />
            </div>
            <div className="t-examination_result_overview-customer_info_vitalsign">
              <span>Sinh hiệu:</span>
              <div className="t-examination_result_overview-customer_info_flex">
                <span>Mạch:</span>
                <Typography content={`${data?.vitalsign?.heart_rate}  (lần/phút);`} modifiers={['400']} />
              </div>
              <div className="t-examination_result_overview-customer_info_flex">
                <span>Huyết áp:</span>
                <Typography content={`${data?.vitalsign?.blood_pressure_min}/${data?.vitalsign?.blood_pressure_max} (mmHg);`} modifiers={['400']} />
              </div>
              <div className="t-examination_result_overview-customer_info_flex">
                <span>Nhịp thở:</span>
                <Typography content={`${data?.vitalsign?.respiratory_rate} (lần/phút);`} modifiers={['400']} />
              </div>
              <div className="t-examination_result_overview-customer_info_flex">
                <span>Nhiệt độ:</span>
                <Typography content={`${data?.vitalsign?.temperature} (°C);`} modifiers={['400']} />
              </div>
              <div className="t-examination_result_overview-customer_info_flex">
                <span>Chiều cao:</span>
                <Typography content={`${data?.vitalsign?.height} (cm);`} modifiers={['400']} />
              </div>
              <div className="t-examination_result_overview-customer_info_flex">
                <span>Cân nặng:</span>
                <Typography content={`${data?.vitalsign?.weight} (kg);`} modifiers={['400']} />
              </div>
              <div className="t-examination_result_overview-customer_info_flex">
                <span>BMI:</span>
                <Typography content={`${data?.vitalsign?.bmi} (kg/m2);`} modifiers={['400']} />
              </div>
            </div>
          </div>
          <div className="t-examination_result_overview-symptom">
            <h4 className="t-examination_result_overview-symptom_title"> A. Triệu chứng khó chịu khi Bạn đến khám:</h4>
            <div className="t-examination_result_overview-symptom_list">
              {data?.card?.symptoms?.map((item: any, index: number) => (
                <div className="t-examination_result_overview-symptom_item" key={item?.tag_id}> {item?.tag_name} </div>
              ))}
            </div>
          </div>
          <div className="t-examination_result_overview-diagnose">
            <h4 className="t-examination_result_overview-diagnose_title"> B. Bác sĩ chẩn đoán từ kết quả thăm khám và làm cận lâm sàng:</h4>
            <div className="t-examination_result_overview-diagnose-note">
              <span>Chú thích:</span>
              {
                dataExamDiseaseReportTag?.map((tag) => (
                  <div className="t-examination_result_overview-diagnose-note_item">
                    <span style={{ backgroundColor: tag.tagColor }} />
                    <div className="t-examination_result_overview-diagnose-note_item_tag">
                      {tag.tagName}
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="t-examination_result_overview-diagnose-list">
              {data?.card?.exams_diseases?.map((item: any, index: number) => (
                <div className={mapModifiers("t-examination_result_overview-diagnose-item",)}>
                  <div className={mapModifiers("t-examination_result_overview-diagnose-item_image",)}>
                    <img src={item?.disease_group_icon_path} alt="" />
                    <p>{item?.disease_group_name}</p>
                  </div>
                  <div className={mapModifiers("t-examination_result_overview-diagnose-item_content", item?.disease_status_id === 1 ? 'normal' : 'risk')}>
                    {item?.disease_status_id === 1 ? (
                      <div className="t-examination_result_overview-diagnose-item_content_tag">
                        <img src={item?.disease_status_icon_path} />
                        <p>
                          {item?.disease_status_name}
                        </p>
                      </div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>Kết luận bệnh</th>
                            <th>Nguy cơ</th>
                            <th>Khuyến cáo</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{item?.disease_status_conclude}</td>
                            <td>
                              <img src={item?.disease_status_icon_path} />
                              <p>
                                {item?.disease_status_name}
                              </p>
                            </td>
                            <td>{item?.disease_status_recommend}</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="t-examination_result_overview-timeline">
            <h4 className="t-examination_result_overview-timeline_title"> C. Lời dặn từ Bác sĩ giúp bạn kiểm soát bệnh hiệu quả</h4>
            <div className="t-examination_result_overview-timeline_content">
              {handleFormatTimeLine(data?.card?.exams_disease_timelines)?.map((timeline) => (
                <div className="t-examination_result_overview-timeline_content_group" key={timeline.year}>
                  <div className="t-examination_result_overview-timeline_content_group_title" >{timeline.year}</div>
                  {timeline?.child?.length > 0 && timeline?.child?.map((item: any) => (
                    <div className="t-examination_result_overview-timeline_content_child" key={item?.create_datetime}>
                      <div className="t-examination_result_overview-timeline_content_child_title" >{item.timeline_title}</div>
                      <RichTextEditor data={item.timeline_content} typeText="notHeadernotBordernotBG" isDisabled />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="t-examination_result_overview-habit">
            <h4 className="t-examination_result_overview-habit_title"> D. Hướng dẫn điều chỉnh thói quen giúp bạn kiểm soát tốt sức khỏe bản thân:</h4>
            <div className="t-examination_result_overview-habit_content">
              {handleFormatHabit(data?.card?.disease_advices)?.map((habit) => (
                <div className="t-examination_result_overview-habit_content_group" key={habit?.index}>
                  <div className="t-examination_result_overview-habit_content_group_title" >{habit.groupname}</div>
                  <div className="t-examination_result_overview-habit_content_group_list">
                    {habit?.child?.length > 0 && habit?.child?.map((item: any) => (
                      <div className="t-examination_result_overview-habit_content_group_item" key={item.create_datetime}>
                        <div className="t-examination_result_overview-habit_content_group_item_image" key={item.create_datetime}>
                          <img src={item?.disease_advice_icon_path} />
                        </div>
                        <div className="t-examination_result_overview-habit_content_group_item_content" key={item.create_datetime}>
                          <p>{item?.disease_advice_title}</p>
                          <span>{item?.disease_advice_content}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="t-examination_result_overview-prescription">
            <h4 className="t-examination_result_overview-prescription_title"> E. Toa thuốc:</h4>
            <div className="t-examination_result_overview-prescription_session">
              <h4 className="t-examination_result_overview-prescription_session_title">I. THÔNG TIN CHẨN ĐOÁN:</h4>
              <div className="t-examination_result_overview-prescription_session_list">
                {data?.drug?.diagnose_icd10s?.map((item: any) => (
                  <div className="t-examination_result_overview-symptom_item" key={item?.id}> {item?.disease_name_vi} </div>
                ))}
              </div>
            </div>
            <div className="t-examination_result_overview-prescription_session">
              <h4 className="t-examination_result_overview-prescription_session_title"> II. ĐIỀU TRỊ BẰNG THUỐC ĐẶC HIỆU:</h4>
              <div className="t-examination_result_overview-prescription_session_drugs">
                {handleFormatDrugItem(data?.drug?.drugitems)?.map((item: any, index: number) => (
                  <div className="t-examination_result_overview-prescription_session_drugs_item" key={index}>
                    <div className="t-examination_result_overview-prescription_session_drugs_item_name">
                      <p>{item?.groupname}</p>
                      <p>{item?.note}</p>
                    </div>
                    {item?.child?.length > 0 && item?.child?.map((drug: any) => (
                      <div className="t-examination_result_overview-prescription_session_drugs_item_row">
                        <p>{drug?.session}</p>
                        <p>{drug?.quantity_display}</p>
                        <p>{drug?.note_time_use}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="t-examination_result_overview-prescription_session">
              <h4 className="t-examination_result_overview-prescription_session_title"> III. HÃY TÁI KHÁM ĐÚNG HẸN:</h4>
              <div className="t-examination_result_overview-prescription_session_reexam">
                <div>
                  <li>
                    <span>- Ngày tái khám: </span>
                    <span>{data?.drug?.appointment_date ? moment(data?.drug?.appointment_date).format('DD/MM/YYYY') : ''}</span>
                  </li>
                  <li>
                    <span>- Nội dung tái khám: </span>
                    <span>{data?.drug?.appointment_content}</span>
                  </li>
                </div>
                <div className="t-examination_result_overview-prescription_session_reexam_signature">
                  <p> Ngày kê toa thuốc: {format(
                    new Date(data?.drug?.appointment_date || new Date()),
                    "'Ngày' dd', tháng' MM', năm' yyyy",
                  )}</p>
                  <p>Bác sĩ điều trị</p>
                  <p>{data?.drug?.prescriber_employee?.name}</p>
                </div>
              </div>
            </div>
            <div className="t-examination_result_overview-prescription_session">
              <h4 className="t-examination_result_overview-prescription_session_title"> IV. THÔNG TIN CỦA TỪNG LOẠI THUỐC THEO TOA:</h4>
              <div className="t-examination_result_overview-prescription_session_info_drug">
                {data?.drug?.drugguiditems?.map((item: any, index: number) => (
                  <li className="t-examination_result_overview-prescription_session_info_drug_item" key={index}>
                    <p className="t-examination_result_overview-prescription_session_info_drug_item_label">{item.drug_display_name} </p>
                    <ul>
                      <li>
                        <li>Lợi ích:</li>
                        <span>{item?.benefit}</span>
                      </li>
                      <li>
                        <li>Tác dụng phụ thường gặp:</li>
                        <span>{item?.side_effects}</span>
                      </li>
                      <li>
                        <li> Chống chỉ định:</li>
                        <span>{item?.contraindications}</span>
                      </li>
                      <li>
                        <li>Đường thải:</li>
                        <span>{item?.waste_line}</span>
                      </li>
                      <li>
                        <li>Tương tác thuốc:</li>
                        <span>{item?.drug_interactions}</span>
                      </li>
                    </ul>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="t-examination_result">
      <CTooltip title="In kết quả" placements='topLeft'>
        <div className="t-examination_result_print" onClick={() => {
          if (handlePrint) handlePrint()
        }}>
          {isPrintOption ? (
            <div className="t-examination_result_print_loading">
              <Icon iconName="loading_crm" size="40x40" isPointer />
            </div>
          ) : <Icon iconName="pdf" size="40x40" isPointer />
          }
        </div>
      </CTooltip>
      <div className="o-categories_customer_right_title">
        <Typography content={title} />
      </div>
      {['XQ', 'DT', 'SA', 'NS', 'XN'].includes(type as any) && (
        <div className="o-categories_customer_right_info" style={{}}>
          <div className="o-categories_customer_right_info_item">
            <span>Ngày chỉ định:</span>
            <Typography content={data?.imaging?.servicepoint_create_date ? moment(data?.imaging?.servicepoint_create_date).format('YYYY/MM/DD HH:mm') : '--'} modifiers={['blueNavy', '13x18']} />
          </div>
          <div className="o-categories_customer_right_info_item">
            <span>Mã phiếu:</span>
            <Typography content={masterId} modifiers={['blueNavy', '13x18']} />
          </div>
        </div>
      )}
      {['PCD'].includes(type as any) && (
        <div className="o-categories_customer_right_info o-categories_customer_right_info_pcd" style={{
          flexWrap: 'wrap'
        }}>
          <div className="o-categories_customer_right_info_item">
            <span>Ngày chỉ định:</span>
            <Typography content={data?.servicepoint_datetime && moment(data?.servicepoint_datetime).format('YYYY/MM/DD HH:mm')} modifiers={['blueNavy', '13x18']} />
          </div>
          <div className="o-categories_customer_right_info_item">
            <span>Mã phiếu:</span>
            <Typography content={masterId} modifiers={['blueNavy', '13x18']} />
          </div>
          <div className="o-categories_customer_right_info_item">
            <span>Người tạo phiếu:</span>
            <Typography content={data?.servicepoint_affiliat_name} modifiers={['blueNavy', '13x18']} />
          </div>
        </div>
      )}
      {['GPB'].includes(type as any) && (
        <div className="o-categories_customer_right_info" style={{}}>
          <div className="o-categories_customer_right_info_item">
            <span>Ngày chỉ định:</span>
            <Typography content={data?.histopathology?.servicepoint_create_date && moment(data?.histopathology?.servicepoint_create_date).format('YYYY/MM/DD HH:mm')} modifiers={['blueNavy', '13x18']} />
          </div>
          <div className="o-categories_customer_right_info_item">
            <span>Mã phiếu:</span>
            <Typography content={masterId} modifiers={['blueNavy', '13x18']} />
          </div>
        </div>
      )}
      {['XN'].includes(type as any) && (
        <div className="t-examination_result_xn_header">
          <div className="t-examination_result_xn_header_item">
            <span>Thời gian lấy mẫu:</span>
            <Typography content={data?.take_samples_time ? moment(data?.take_samples_time).format('HH:mm - DD/MM/YYYY') : ''} />
          </div>
          <div className="t-examination_result_xn_header_item">
            <span>Thời gian nhập kết quả:</span>
            <Typography content={data?.approved_time ? moment(data?.approved_time).format('HH:mm - DD/MM/YYYY') : ''} />
          </div>
          <div className="t-examination_result_xn_header_item">
            <span>Hẹn trả kết quả lúc:</span>
            <Typography content={data?.expected_results_time ? moment(data?.expected_results_time).format('HH:mm - DD/MM/YYYY') : ''} />
          </div>
          <div className="t-examination_result_xn_header_item">
            <span>Mã bệnh phẩm (SID):</span>
            <Typography content={data?.labtests_sid || ''} />
          </div>
        </div>
      )}
      {['XQ'].includes(type as any) && (
        <div className="t-examination_result_xn_header">
          <div className="t-examination_result_xn_header_item">
            <span>Nơi thực hiện: </span>
            <Typography content={data?.imaging?.execution_department?.name} />
          </div>
          <div className="t-examination_result_xn_header_item">
            <span>Người thực hiện: </span>
            <Typography content={data?.imaging?.signature_print_name} />
          </div>
          <div className="t-examination_result_xn_header_item">
            <span>Ngày thực hiện:</span>
            <Typography content={moment(data?.imaging?.approved_date).format('HH:mm DD-MM-YYYY')} />
          </div>
        </div>
      )}
      {['NS'].includes(type as any) && (
        <div className="t-examination_result_xn_header">
          <div className="t-examination_result_xn_header_item">
            <span>Nơi thực hiện: </span>
            <Typography content={data?.imaging?.execution_department?.name} />
          </div>
          <div className="t-examination_result_xn_header_item">
            <span>Người thực hiện: </span>
            <Typography content={data?.imaging?.approved_employee?.name} />
          </div>
          <div className="t-examination_result_xn_header_item">
            <span>Ngày thực hiện: </span>
            <Typography content={moment(data?.imaging?.approved_date).format('HH:mm DD-MM-YYYY')} />
          </div>
        </div>
      )}
      {['DT', 'SA'].includes(type as any) && (
        <div className="t-examination_result_gpb_header">
          <div className="t-examination_result_gpb_header_item">
            <span>Nơi thực hiện:</span>
            <Typography content={data?.imaging?.execution_department?.name} />
          </div>
          <div className="t-examination_result_gpb_header_item">
            <span>Người thực hiện:</span>
            <Typography content={data?.imaging?.approved_employee?.name} />
          </div>
          <div className="t-examination_result_gpb_header_item">
            <span>Ngày thực hiện:</span>
            <Typography content={data?.imaging?.checkout_time ? moment(data?.imaging?.checkout_time).format('DD/MM/YYYY - HH:mm') : '--'} />
          </div>
        </div>
      )}
      {type === 'GPB' && (
        <div className="t-examination_result_gpb_header">
          <div className="t-examination_result_gpb_header_item">
            <span>Nơi nhận mẫu:</span>
            <Typography content={data?.histopathology?.execution_department?.name} />
          </div>
          <div className="t-examination_result_gpb_header_item">
            <span>Người bàn giao:</span>
            <Typography content={data?.histopathology?.servicepoint_affiliat_name?.name} />
          </div>
          <div className="t-examination_result_gpb_header_item">
            <span>Người nhận mẫu:</span>
            <Typography content={data?.histopathology?.servicepoint_affiliat_name?.name} />
          </div>
          <div className="t-examination_result_gpb_header_item">
            <span> Thời gian nhận mẫu:</span>
            <Typography content={data?.histopathology?.receive_time} />
          </div>
          <div className="t-examination_result_gpb_header_item">
            <span> Ngày hẹn trả kết quả:</span>
            <Typography content={data?.histopathology?.expected_results_time} />
          </div>
          <div className="t-examination_result_gpb_header_item">
            <span>Thời gian nhận kết quả:</span>
            <Typography content={data?.histopathology?.receive_result_time} />
          </div>
        </div>
      )}
      {type !== 'EMR' && type !== 'XNHT' && type !== 'XN' && type !== 'XNSHPT' && type !== 'overview' && (
        <div className="t-examination_result_header_diagnose_note">
          <span>
            Chẩn đoán:
          </span>
          <span style={{
            fontWeight: 400,
            color: '#27ACFD',
            marginLeft: 8,
          }}
          >
            {type === 'GPB' && data?.histopathology?.diagnose_note
              || type === 'XQ' && data?.imaging?.diagnose_note
              || type === 'TDV' && data?.re_exams_card?.diagnose_icd10_text
              || type === 'DT' && data?.imaging?.diagnose_note
              || type === 'SA' && data?.imaging?.diagnose_note
              || type === 'PCD' && data?.diagnose_note
              || data?.diagnose_note}
          </span>
        </div>
      )}
      {type === 'XNHT' && (
        <div className="t-examination_result_xnht_header">
          <div className="t-examination_result_xnht_header_item">
            <span>Thời gian nhận chỉ định:</span>
            <Typography content={moment(data?.breathtest?.checkin_time).format('DD-MM-YYYY HH:mm')} />
          </div>
          <div className="t-examination_result_xnht_header_item">
            <span>Thời gian đo lần 1:</span>
            <Typography content={moment(data?.breathtest?.execution_first_time).format('DD-MM-YYYY HH:mm')} />
          </div>
          <div className="t-examination_result_xnht_header_item">
            <span>Thời gian đo lần 2:</span>
            <Typography content={moment(data?.breathtest?.expected_second_time).format('DD-MM-YYYY HH:mm')} />
          </div>
          <div className="t-examination_result_xnht_header_item">
            <span>Thời gian duyệt kết quả:</span>
            <Typography content={moment(data?.breathtest?.expected_result_time).format('DD-MM-YYYY HH:mm')} />
          </div>
        </div>
      )}
      {type === 'XNSHPT' && (
        <div className="t-examination_result_xnshpt_header">
          <div className="t-examination_result_xnshpt_header_row">
            <div className="t-examination_result_xnshpt_header_item">
              <span>Thời gian nhận chỉ định:</span>
              <Typography content={moment(data?.molecule?.checkin_time).format('HH:mm - DD/MM/YYYY')} />
            </div>
            <div className="t-examination_result_xnshpt_header_item">
              <span>Người nhận:</span>
              <Typography content={data?.molecule?.handing_employee?.name} />
            </div>
            <div className="t-examination_result_xnshpt_header_item">
              <span>Thời gian duyệt kết quả:</span>
              <Typography content={moment(data?.molecule?.checkout_time).format('HH:mm - DD/MM/YYYY')} />
            </div>
            <div className="t-examination_result_xnshpt_header_item">
              <span>Người duyệt:</span>
              <Typography content={data?.molecule?.approved_employee?.name} />
            </div>
          </div>
          <div className="t-examination_result_xnshpt_header_row2">
            <div className="t-examination_result_xnshpt_header_item2">
              <span>Xét nghiệm:</span>
              <Typography content={data?.service?.service_name} modifiers={['cg-red', '400']} />
            </div>
            <div className="t-examination_result_xnshpt_header_item">
              <Typography content={data?.molecule?.molecule_method} />
            </div>

          </div>
        </div>
      )}
      <div className="t-examination_result_content">
        {!isRenderDone ? (
          <div className="t-examination_result_content_null">
            <Loading variant="default" />
          </div>
        ) : (_.isEmpty(data) ?
          <div style={{ color: '#f00' }}>
            Chưa có kết quả!
          </div>
          : handleRender() as any)}
      </div>
    </div>
  );
};

// RenderExaminationResult.defaultProps = {
// };

export default RenderExaminationResult;
