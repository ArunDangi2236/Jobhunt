import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import store from '@/redux/store';
import { Loader2 } from 'lucide-react';

function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector(store=>store.authSlice)
    // const {user}=useSelector(store=>store.authSlice)

    const hanldeChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex mx-auto max-w-7xl items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-1/2 border-gray-200 rounded-md p-4 my-10 shadow-lg'>
                    <h1 className='font-bold mb-5 text-xl'>Login</h1>

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

                        </RadioGroup>
                    </div>

                    {loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/></Button> : <Button className="w-full my-4">Login</Button>
                    }

                    <span className='text-sm'>
                        Don't have an account?
                        <Link to="/signup" className='text-blue-600'>Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
