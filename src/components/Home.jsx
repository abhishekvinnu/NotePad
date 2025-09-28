import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }
    //After creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center">
        <input
          className="p-2 min-w-[250px] rounded-xl mt-2 flex-1 pl-4 bg-[#000000]/50 border border-transparent hover:border-[#06b6d4] selection:bg-[#06b6d4] selection:text-white"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="p-2 rounded-xl mt-2  min-w-[250px]"
        >
          {pasteId ? "Update the Note" : "Create a Note"}
        </button>
      </div>
      <div>
        <textarea
          className="rounded-xl mt-4 w-full sm:w-[100%] lg:w-[100%] xl:w-[100%] p-4 bg-[#000000]/50  border border-transparent hover:border-[#06b6d4] selection:bg-[#06b6d4] selection:text-white"
          value={value}
          placeholder="Write your content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
