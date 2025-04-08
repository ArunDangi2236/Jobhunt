// import React from 'react'
// import { Button } from './ui/button'
// import { Bookmark } from 'lucide-react'
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'

// function Job() {
//   return (
//     <div>
//       <p>2 days ago</p>
//       <Button variant='outline' className="rounded-full" size="icon"><Bookmark/></Button>
//       <Button variant="outline" className="p-6 " size="icon">
//         <Avatar>
//             <AvatarImage className='h-[100%]' src='data:image/jpeg;base64,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'/>
//         </Avatar>
//       </Button>
//     </div>
//   )
// }

// export default Job
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setSingleJob } from '@/redux/jobSlice'

const jobId='arunjdfj'
function Job({job}) {
    const nav=useNavigate()
   
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant='outline' className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>

                <Button variant="outline" className="p-6" >
                    <Avatar className="w-12 h-12"> {/* You can adjust the width and height to a fixed value */}
                        <AvatarImage
                            className='w-full h-full object-cover'  // Ensure the image is responsive within the avatar
                            src='data:image/jpeg;base64,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' />
                    </Avatar>
                </Button>
                <div> 
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 '>{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
                </div>
                <div className='flex items-center gap-4 mt-4'>
                    <Button onClick={()=>nav(`/description/:${job?._id}`)} variant="outline" >Details</Button>
                    <Button className="bg-[#7209b7]">Save For Later</Button>
                </div>
        </div>
    )
}

export default Job
