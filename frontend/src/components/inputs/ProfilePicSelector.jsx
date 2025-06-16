import React, { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const ProfilePicSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    console.log(e);
    const file = e.target.files[0];

    if (file) {
      //update
      setImage(file);
    }

    const preview = URL.createObjectURL(file);
    console.log(preview);
    
    if (setPreview) {
      setPreview(preview);
    }
    setPreviewUrl(preview);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer">
          <FaUser className="text-4xl text-orange-500" />
          <button 
          type="button" 
          className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer" onClick={onChooseFile}>
            <MdFileUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button 
          onClick={handleRemoveImage}
          type="button" 
          className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer">
            <FaTrash/>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicSelector;
