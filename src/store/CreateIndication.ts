/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { createAsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getStatisticAppointmentView,
  loadAppointmentMasters,
} from "services/api/appointmentView";
import {
  AppointmentViewResp,
  StatisticAppointment,
  StatisticAppointmentCustomize,
} from "services/api/appointmentView/types";
import { TypeGetInfoOfPatient } from "services/api/createindication/types";
import { loadKPIDays, loadKPIDays_C1, loadKPIDays_C2, loadKPIDays_C3 } from "services/api/kpi_taskView";
import { loadKPIDaysView,loadKPIDaysType} from "services/api/kpi_taskView/types"
import { TypeListPatient } from "services/api/list_patients/types";
import { isLoading } from "store/example";

import { getInfoOfPatient } from "../services/api/createindication/index";
import { getListPatients } from '../services/api/list_patients/index';


interface ListPatientsPViewState {
 
  ListPatient: TypeListPatient;
  isLoadingListPatient: boolean;
  GetInfoOfPatient: TypeGetInfoOfPatient;
  isLoadingGetInfoOfPatient: boolean;
}

const initialState: ListPatientsPViewState = {
  isLoadingListPatient: false,
  ListPatient: {
    data: [],
    message: "",
    status: false,
    client_ip: "",
  } as any,
 isLoadingGetInfoOfPatient: false,
  GetInfoOfPatient: {
    data: [],
    message: "",
    status: false,
    client_ip: "",
  } as any,
};

export const getListPatient = createAsyncThunk<
  TypeListPatient,
  { rejectValue: any }
>(
  "mapsReducer/listPatientAction",
  async (data, { rejectWithValue }) => {
    try {

      const response = await getListPatients(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const GetInfoOfPatientAPI = createAsyncThunk<
  TypeGetInfoOfPatient,
  { rejectValue: any }
>(
  "mapsReducer/GetInfoOfPatientAction",
  async (data, { rejectWithValue }) => {
    try {

      const response = await getInfoOfPatient(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const ListPatientViewSlice = createSlice({
  name: "listPatientViewReducer",
  initialState,
  reducers: {

  },
  extraReducers(builder) {
     
     builder
      .addCase(getListPatient.pending, ($state) => {
        $state.isLoadingListPatient = true;
      })
      .addCase(getListPatient.fulfilled, ($state, action) => {
        $state.isLoadingListPatient = false;
        $state.ListPatient = action.payload;
        if (!action.payload.status) {
          toast.error(action.payload.message);
        }
      });
     builder
      .addCase(GetInfoOfPatientAPI.pending, ($state) => {
        $state.isLoadingGetInfoOfPatient = true;
      })
      .addCase(GetInfoOfPatientAPI.fulfilled, ($state, action) => {
        $state.isLoadingGetInfoOfPatient = false;
        $state.GetInfoOfPatient = action.payload;
        if (!action.payload.status) {
          toast.error(action.payload.message);
        }
      });
  },
});

export const {} = ListPatientViewSlice.actions;

export default ListPatientViewSlice.reducer;
