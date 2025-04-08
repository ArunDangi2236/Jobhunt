import React from 'react';
import { Popover, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { AvatarFallback, AvatarImage } from '../ui/avatar';
import { Avatar } from '@radix-ui/react-avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

function Navbar() {
     let { user} = useSelector(store=>store.authSlice)
     const dispatch=useDispatch()
     const nav=useNavigate()
    // let user = false;
    
    const handleLogout=async()=>{
        try {
            const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
            if(res.data.success){
                dispatch(setUser(null))
                nav("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('error from the navbar logout button',error)
            
        }
    }
    return (
        <div className='bg-white'>
            <div>
                <div className='flex mx-auto max-w-7xl items-center justify-between h-16'>
                    <h1 className='text-2xl font-bold'>
                        Job<span className='text-[#F83002]'>Portal</span>
                    </h1>
                    <div className='flex gap-12 items-center'>
                        <ul className='flex items-center gap-5 font-medium'>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/jobs">Jobs</Link></li>
                            <li><Link to="/browse">Browse</Link></li>
                        </ul>

                        {!user ? (<div>
                            <Link to="/login">  <Button variant="outline">Login</Button></Link>
                            <Link to="signup">     <Button>Sign Up</Button></Link>
                        </div>) : <Popover>
                            <PopoverTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" className={"h-10 w-10 rounded-full cursor-pointer"} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" className={"h-10 w-10 rounded-full cursor-pointer"} />
                                        </Avatar>
                                        <div>
                                            <h4>{user?.fullname}</h4>
                                            <p>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <User2 />
                                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <LogOut />
                                        <Button variant="link" onClick={handleLogout}>LogOut</Button>

                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>}


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
