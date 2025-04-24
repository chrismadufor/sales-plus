import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  sectors: [],
  reportParams: [],
  subTypes: []
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    saveServices: (state, { payload }) => {
      state.services = payload;
    },
    saveSectors: (state, { payload }) => {
      state.sectors = payload;
    },
    saveReportParams: (state, { payload }) => {
      state.reportParams = payload;
    },
    saveSubTypes: (state, { payload }) => {
      state.subTypes = payload;
    },
  },
});

export const { saveServices, saveSectors, saveReportParams, saveSubTypes } = dashboardSlice.actions;
export default dashboardSlice.reducer;
