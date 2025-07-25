import React, { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../../components/inputs/Input";

const CreateSessionForm = () => {
  const [formData, setFormData ] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the fields");
      return;
    }
    setError("");
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-s text-slate-700 mt-[5px] mb-3">Start a new Interview Journey</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few quick details to unlock your personalized set of
        interview questions:
      </p>

      <form onSubmit={handleCreateSession}>
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="(e.g., Frontend Developer, UI/UX Designer etc)"
          type="text"
        />
        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          type={"number"}
          label="Total Experience"
          placeholder="(e.g., 1 Year, 2 years, 3 Years etc)"
        />
        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Major Topics Your are Focusing On"
          placeholder="(e.g., React, Node.js, SpringBoot etc)"
          type="text"
        />
        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description"
          placeholder="(Any specific goals or notes for this sessions)"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
            type="submit"
            className="btn-primary w-full mt-2"
            disabled={isLoading}
        >
            Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
