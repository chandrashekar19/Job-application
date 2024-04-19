import { useEffect } from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import PageBtnContainer from './PageBtnContainer';
import { Loading } from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';


export const JobsContainer = () => {
    const { jobs, isLoading, page, totalJobs, numOfPages }=useSelector(
        (store) => store.allJobs
    );
    const dispatch=useDispatch();

    useEffect(() => {
        dispatch(getAllJobs());
    }, []);

    if (isLoading) {
        return <Loading center />
    }

    if (jobs.length===0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} job{jobs.length>1&&'s'} found
            </h5>
            <div className='jobs'>
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />;
                })}
            </div>
            {numOfPages>1&&<PageBtnContainer />}
        </Wrapper>
    );
};

