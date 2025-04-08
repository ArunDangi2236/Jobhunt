import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';


function Signup() {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector(store => store.authSlice)

    const hanldeChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }
    const formData = new FormData();
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    formData.append("file", input.file)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                // console.log(res)
               
                navigate("/login")
                toast.success(res.data.message)
            }
        } catch (error) {
            // console.log(error)
            toast.error(error.response.data.message)

        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleFileChange = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }
    return (
        <div>
            <Navbar />
            <div className='flex mx-auto max-w-7xl items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-1/2 border-gray-200 rounded-md p-4 my-10 shadow-lg'>
                    <h1 className='font-bold mb-5 text-xl'>Signup</h1>

                    <div className='my-2'>
                        <Label className="mb-2">Full Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter Your Full Name"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            name="fullname"
                            value={input.fullname}
                            onChange={hanldeChange}
                        />
                    </div>

                    <div className='my-2'>
                        <Label className="mb-2">Email</Label>
                        <Input
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            name="email"
                            value={input.email}
                            onChange={hanldeChange}
                        />
                    </div>

                    <div className='my-2'>
                        <Label className="mb-2">Phone No.</Label>
                        <Input
                            type="text"
                            placeholder="Enter Your Phone Number"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={hanldeChange}
                        />
                    </div>

                    <div className='my-2'>
                        <Label className="mb-2">Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter Your Password"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            name="password"
                            value={input.password}
                            onChange={hanldeChange}
                        />
                    </div>

                    <div className='flex items-center'>
                        <RadioGroup defaultValue="comfortable" className='flex items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    value="student"
                                    name="role"
                                    checked={input.role === "student"}
                                    onChange={hanldeChange}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>

                            <div className='flex gap-30'>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        value="recruiter"
                                        name="role"
                                        checked={input.role === "recruiter"}
                                        onChange={hanldeChange}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r2">Recruiter</Label>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <Label className="mb-2">Profile</Label>
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>

                        </RadioGroup>
                    </div>
                    {loading ? <Button className="w-full my-4"><Loader2 className='mr-4 h-4 w-4 animate-spin' /></Button> : <Button className="w-full my-4">Signup</Button>}


                    <span className='text-sm'>
                        Already have an account?
                        <Link to="/login" className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Signup;
