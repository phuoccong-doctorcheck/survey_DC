/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OptionTypeCustomerBooking, optionCancelBooking, optionDate } from 'assets/data';
import CDatePickers from 'components/atoms/CDatePickers';
import CTooltip from 'components/atoms/CTooltip';
import Dropdown, { DropdownData } from 'components/atoms/Dropdown';
import GroupRadio, { GroupRadioType } from 'components/atoms/GroupRadio';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import FloatFilter from 'components/molecules/FloatFilter';
import FormAddCustomer from 'components/molecules/FormAddCustomer';
import PublicTable from 'components/molecules/PublicTable';
import CCollapse from 'components/organisms/CCollapse';
import CModal from 'components/organisms/CModal';
import PublicHeader from 'components/templates/PublicHeader';
import PublicHeaderStatistic from 'components/templates/PublicHeaderStatistic';
import PublicLayout from 'components/templates/PublicLayout';
import Cookies from 'js-cookie';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { postPrintAppointmentServicepoint } from 'services/api/appointmentView';
import { postSaveCustomerBeforeExams } from 'services/api/beforeExams';
import { BookingScheduleItem } from 'services/api/booking_schedule/types';
import { postCanceledAppointment, postDelayAppointment } from 'services/api/customerInfo';
import { getListBooking, postLoadingBooking } from 'store/booking_schedule';
import { getInfosCustomerById } from 'store/customerInfo';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import mapModifiers, { downloadBlobPDF, downloadBlobPDFOpenLink, previewBlobPDFOpenLink } from 'utils/functions';

export type StateActionType = 'Đã khám xong' | 'Đã hủy' | 'Chưa đến' | 'Đang phục vụ';
type StateType = 'KH mới' | 'KH cũ';
export interface BookingScheduleType {
  id: number;
  timeBooking: Date;
  name: string;
  yearOfBirh: Date;
  sex: DropdownData;
  phoneNumber: string;
  state: StateType;
  origin: DropdownData;
  stateAction: StateActionType;
}

const RegisterAppointment: React.FC = () => {
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(getListBooking({} as any));
    document.title = 'Đặt lịch | CRM'
  }, []);





  return (
    <>
   

   
    </>
  );
};
export default RegisterAppointment;
