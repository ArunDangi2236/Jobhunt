import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllJobs() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true })
                if (response.data.success) {
                    console.log(response)
                    dispatch(setAllJobs(response.data.jobs))
                }
            }
            catch (error) {
                console.log("error from the useGetAllJobs hook", error)

            }
        }
        fetchAllJobs()
    })
}

export default useGetAllJobs