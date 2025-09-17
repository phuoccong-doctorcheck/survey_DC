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
import { loadKPIDays, loadKPIDays_C1, loadKPIDays_C2, loadKPIDays_C3 } from "services/api/kpi_taskView";
import { loadKPIDaysView,loadKPIDaysType} from "services/api/kpi_taskView/types"
import {  getReport } from "services/api/report";
import { TypeReport } from "services/api/report/types";
import { isLoading } from "store/example";

interface ReportPViewState {
 
  listReport: TypeReport;
  isLoadingReport: boolean;
}

const initialState: ReportPViewState = {
  isLoadingReport: false,
  listReport: {
    data: [],
    message: "",
    status: false,
    client_ip: "",
  } as any,
 
};

export const getReportF = createAsyncThunk<
  TypeReport,
  { rejectValue: any }
>(
  "mapsReducer/listReportAction",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data)
      const response = await getReport(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ReportViewSlice = createSlice({
  name: "appointmentViewReducer",
  initialState,
  reducers: {

  },
  extraReducers(builder) {
     
     builder
      .addCase(getReportF.pending, ($state) => {
        $state.isLoadingReport = true;
      })
      .addCase(getReportF.fulfilled, ($state, action) => {
        $state.isLoadingReport = false;
        $state.listReport = action.payload;
        if (!action.payload.status) {
          toast.error(action.payload.message);
        }
      });
  },
});

export const {} = ReportViewSlice.actions;

export default ReportViewSlice.reducer;
