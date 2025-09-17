/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import PublicTable from 'components/molecules/PublicTable';
import CCollapse from 'components/organisms/CCollapse';
import CModal from 'components/organisms/CModal';
import React, {
  useEffect, useMemo, useState,
} from 'react';

import Icon from '../Icon';
import Typography from '../Typography';

export interface TransferItemType {
  tag_id: number;
  tag_name: string;
  tag_color: string;
  tag_group?: string;
  tag_group_name?: string;
  orderNumber: number;
}

export interface TransferType {
  groupId: number;
  tagGroupName: string;
  child: TransferItemType[];
}

interface TransferProps {
  isOpen: boolean;
  widths?: number;
  title?: string;
  titleCancel?: string;
  titleSubmit?: string;
  dataSource?: TransferType[];
  dataUpdate?: TransferItemType[];
  handleClose?: () => void;
  handleSubmit?: (item: TransferItemType[]) => void;
}

const Transfer: React.FC<TransferProps> = ({
  isOpen, widths, title, dataSource, handleClose, handleSubmit, titleCancel, titleSubmit, dataUpdate,
}) => {
  const [tagList, setTagList] = useState<TransferItemType[]>(dataUpdate || []);

  const handleAddTag = (item: TransferItemType) => {
    const check = tagList.some((i) => i.tag_id === item.tag_id);
    if (check) return;
    setTagList([item, ...tagList]);
  };

  const handleRemoveTag = (item: TransferItemType) => {
    const newList = tagList.filter((i) => i.tag_id !== item.tag_id);
    setTagList(newList);
  };

  useEffect(() => {
    if ((dataUpdate || []).length === 0) { setTagList([]); }
  }, []);
  useEffect(() => {
    setTagList(dataUpdate as any);
  }, [dataUpdate]);

  const tableColumns = [
    {
      title: <Typography content="Tag đã chọn" modifiers={['12x18', '500', 'center', 'blueNavy']} />,
      dataIndex: 'tag_name',
      align: 'center',
      render: (record: any) => (
        <Typography content={record} modifiers={['12x18', '500', 'center']} />
      ),
    },
    {
      title: <Typography content="Xóa" modifiers={['12x18', '500', 'center', 'blueNavy']} />,
      dataIndex: '',
      align: 'center',
      width: 40,
      render: (record: any) => (
        <div onClick={() => handleRemoveTag(record)}>
          <Icon iconName="delete_crm" isPointer />
        </div>
      ),
    },
  ];

  const tableTransfer = useMemo(() => (
    <PublicTable
      column={tableColumns}
      listData={tagList}
      size="middle"
      rowkey="tagID"
      isbordered
      isPagination={false}
    />
  ), [tagList]);

  return (
    <CModal
      isOpen={isOpen}
      widths={widths}
      title={title}
      onCancel={() => { if (handleClose) handleClose(); setTagList([]); }}
      onOk={() => {
        if (handleSubmit) handleSubmit(tagList);
        setTagList([]);
      }}
      textCancel={titleCancel}
      textOK={titleSubmit}
      className="transfer"
    >
      <div className="a-transfer">
        <div className="a-transfer_left">
          {dataSource && dataSource.length > 0 && dataSource.map((item, index) => {
            const { child } = item;
            return (
              <li key={index} className="a-transfer_left_parent_item">
                <CCollapse title={item.tagGroupName} key_default="1">
                  {child && child.length > 0 && child.map((ytem, yndex) => (
                    <li className="a-transfer_left_child_item" key={yndex}>
                      <Typography content={ytem.tag_name} />
                      <div className="a-transfer_left_child_item_icon" onClick={() => handleAddTag(ytem)}>
                        <Icon iconName={tagList?.some((i) => i.tag_id === ytem.tag_id) ? 'done_tag' : 'add_tag'} size="26x26" isPointer />
                      </div>
                    </li>
                  ))}
                </CCollapse>
              </li>
            );
          })}
        </div>
        <div className="a-transfer_right">
          {tableTransfer}
        </div>
      </div>
    </CModal>
  );
};

Transfer.defaultProps = {
  isOpen: false,
};

export default Transfer;
