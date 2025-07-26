import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/Layout/DashboardLayout.jsx";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { CARD_BG } from "../../utils/CARD_BG.js";
import SummaryCard from "../../components/cards/SummaryCard.jsx";
import moment from 'moment'
import Modal from "../../components/Modal.jsx";
import CreateSessionForm from "./CreateSessionForm.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      console.log(response);
      
      setSessions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSessions = async (sessionData) => {};

  useEffect(() => {
    fetchAllSessions();
  }, []);
  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-6">
          {sessions?.map((data, i) => (
            
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[i % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "-"}
              questions={data?.questions?.length || ""}
              description = {data?.description || ""}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("DD MM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
            
          ))}

          
        </div>
        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <FaPlus />
          Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={()=>{
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm/>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
