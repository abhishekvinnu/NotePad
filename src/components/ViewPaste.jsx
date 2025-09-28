import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final ", paste);
  return (
    <div>
      <div className="flex flex-row gap-5 place-content-between">
        <input
          className="p-2 rounded-xl mt-2 w-[70%] pl-4 bg-[#000000]/50"
          type="text"
          placeholder="Enter text here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          className="rounded-xl mt-4 min-w-[500px] p-4 bg-[#000000]/50 "
          value={paste.content}
          placeholder="Enter content"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
