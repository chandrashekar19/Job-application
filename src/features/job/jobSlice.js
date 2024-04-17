import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';
import {  createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';
const initialState={
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
};

export const createJob= createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob= createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob= createAsyncThunk('job/editJob', editJobThunk);


const jobSlice=createSlice({
    name: 'job',
    initialState,
    reducers: {
        clearValues: () => {
            return {
                ...initialState,
                jobLocation: getUserFromLocalStorage()?.location||'',
            };
        
        },
        logoutUser: (state, { payload }) => {
            state.user=null;
            state.isSidebarOpen=false;
            removeUserFromLocalStorage();
            if (payload) {
                toast.success(payload)
            }
        },
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload };
        },

    },
    extraReducers: {
        [createJob.pending]: (state) => {
            state.isLoading=true;
        },
        [createJob.fulfilled]: (state, action) => {
            state.isLoading=false;
            toast.success('Job Created');
        },
        [createJob.rejected]: (state, { payload }) => {
            state.isLoading=false;
            toast.error(payload);
        },
        [editJob.pending]: (state) => {
            state.isLoading=true;
        },
        [editJob.fulfilled]: (state) => {
            state.isLoading=false;
            toast.success('Job Modified...');
        },
        [editJob.rejected]: (state, { payload }) => {
            state.isLoading=false;
            toast.error(payload);
        },
       
    },
});


export const { clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;