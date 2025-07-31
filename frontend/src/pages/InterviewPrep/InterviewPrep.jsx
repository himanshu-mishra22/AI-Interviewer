import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/cards/QuestionCard";
import axios from "axios";
import AiResponsePreview from "./components/AiResponsePreview";
import Drawer from "./components/Drawer";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [err, setErr] = useState("");
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoadding] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      console.log(response);

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.log("Error in fetching session", error);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErr("");
      setExplanation(null);

      setIsLoadding(true)
      setOpenLeanMoreDrawer(true)

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATIONS,{
        question,
      })

      if(response.data){
        setExplanation(response.data);
      }

    } catch (error) {
      setExplanation(null);
      setErr("Failed to generate explanation");
      console.log(error);
    }finally{
      setIsLoadding(false)
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      console.log(response);
      if (response.data && response.data.question) {
        toast.success(`Quesstion Pin Seccessfully`);
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadMoreQuestion = async () => {};

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => {};
  }, []);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions?.length || ""}
        description={sessionData?.experience || ""}
        lastUpdate={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("DD MM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg m-6 font-semibold color-black">
          Interview Q & A
        </h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, idx) => {
                return (
                  <motion.div
                    key={data._id || idx}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: idx * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || idx}`}
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      />
                    </>

                    {!isLoading && sessionData?.question?.length == idx +1 && (
                      <div className="flex items-center justify-center mt-5">
                        <button
                        className="flex items-center gap-3 txt-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer" 
                        disabled={isLoading || isUpdateLoader}
                        onClick={uploadMoreQuestion}>
                          {isUpdateLoader ? <SpinnerLoader/> : <LuListCollapse className="text-lg"/>}{" "}
                          Load More                         
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <Drawer
          isOpen={openLeanMoreDrawer}
          onClose={() => setOpenLeanMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          {err && (
            <p className="flex gap-2 text-sm text-amber-600 font-medium">
              <LuCircleAlert className="mt-1" />
              {err}
            </p>
          )}
          {!isLoading && explanation && (
            <AiResponsePreview content={explanation?.explanation} />
          )}

          {isLoading && (<p>Generating Answer..</p>)}
        </Drawer>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
   