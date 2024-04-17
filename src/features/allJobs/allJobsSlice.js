import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobsThunk, showStatsThunk } from './allJobThunk';

const initialFiltersState = {
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
    isLoading: false,
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    ...initialFiltersState,
};

const allJobsSlice=createSlice({
    name: 'allJobs',
    initialState,
    reducers: {
        clearAllJobsState: () => initialState,
        handleChange: (state, { payload: { name, value } }) => {
            // state.page = 1;
            state[name]=value;
        },
        clearFilters: (state) => {
            return { ...state, ...initialFiltersState };
        },
        showLoading: (state) => {
            state.isLoading=true;
        },
        hideLoading: (state) => {
            state.isLoading=false;
        },
        changePage: (state, { payload }) => {
            state.page=payload;
        },
    },
    extraReducers: {
        [getAllJobsThunk.pending]: (state) => {
            state.isLoading=true;
        },
        [getAllJobsThunk.fulfilled]: (state, { payload }) => {
            state.isLoading=false;
            state.jobs=payload.jobs;
            state.numOfPages=payload.numOfPages;
            state.totalJobs=payload.totalJobs;
        },
        [getAllJobsThunk.rejected]: (state, { payload }) => {
            state.isLoading=false;
            toast.error(payload);
        },
        [showStatsThunk.pending]: (state) => {
            state.isLoading=true;
        },
        [showStatsThunk.fulfilled]: (state, { payload }) => {
            state.isLoading=false;
            state.stats=payload.defaultStats;
            state.monthlyApplications=payload.monthlyApplications;
        },
        [showStatsThunk.rejected]: (state, { payload }) => {
            state.isLoading=false;
            toast.error(payload);
        },
    }
});



export default allJobsSlice.reducer;
export const {
    showLoading,
    hideLoading,
    handleChange,
    clearFilters,
    changePage, 
    clearAllJobsState
} = allJobsSlice.actions;