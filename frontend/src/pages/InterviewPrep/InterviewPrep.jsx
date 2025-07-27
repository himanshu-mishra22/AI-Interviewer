import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import moment from 'moment'
import {AnimatePresence,motion} from 'framer-motion'
import {LuCircleAlert,LuListCollapse} from 'react-icons/lu'
import SpinnerLoader from '../../components/loader/SpinnerLoader'
import {toast} from 'react-hot-toast'
import { DashboardLayout } from '../../components/Layout/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import QuestionCard from '../../components/cards/QuestionCard'


const InterviewPrep = () => {
  const {sessionId} = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [err,setErr] = useState('');
  const [openLeanMoreDrawer,setOpenLeanMoreDrawer] = useState(false);
  const [explanation,setExplanation] = useState(null);
  const [isLoading,setIsLoadding] = useState(false);
  const [isUpdateLoader,setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async()=>{
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      console.log(response);
      
      if(response.data && response.data.session){
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.log("Error in fetching session", error);
    }
  };

  const generateConceptExplanation = async(question)=>{};

  const toggleQuestionPinStatus = async(questionId)=>{};

  const uploadMoreQuestion = async()=>{}

  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailsById();
    }

    return ()=>{};
  },[])

  return (
    <DashboardLayout>
      <RoleInfoHeader
      role={sessionData?.role || ""}
      topicsToFocus={sessionData?.topicsToFocus || ""}
      experience={sessionData?.experience || ""}
      questions={sessionData?.questions?.length || ""}
      description={sessionData?.experience || ""}
      lastUpdate={
        sessionData?.updatedAt ? moment(sessionData.updatedAt).format("DD MM YYYY"): ""
      }
      />

      <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
        <h2 className='text-lg m-6 font-semibold color-black'>Interview Q & A</h2>

        <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
          <div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>
            <AnimatePresence>
              {sessionData?.questions?.map((data,idx)=>{
                return (
                  <motion.div
                  key={data._id || idx}
                  initial={{opacity:0, y:-20}}
                  animate={{opacity:1,y:0}}
                  exit={{opacity:0,scale:0.95}}
                  transition={{
                    duration:0.4,
                    type:"spring",
                    stiffness:100,
                    delay:idx*0.1,
                    damping:15
                  }}
                  layout
                  layoutId={`question-${data._id || idx}`}
                  >
                    <>
                      <QuestionCard 
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={()=>generateConceptExplanation(data.question)}
                        isPinned={data?.isPinned}
                        onTogglePin={()=>toggleQuestionPinStatus(data._id)}
                        />
                    </>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep