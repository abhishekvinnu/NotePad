import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaCopy,
  FaShareAlt,
  FaShare,
} from "react-icons/fa";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(id) {
    const shareUrl = `${window.location.origin}/paste/${id}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this paste",
          text: "Here’s something I wanted to share with you!",
          url: shareUrl,
        })
        .then(() => {
          toast.success("Shared successfully!");
        })
        .catch((error) => {
          toast.error("Sharing failed: " + error.message);
        });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.info("Link copied to clipboard!");
    }
  }

  return (
    <div>
      <input
        className="p-3 rounded-xl w-full sm:w-[90%] lg:w-[70%] mt-2 bg-[#000000]/50 border border-transparent hover:border-[#06b6d4]"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className=" flex flex-col gap-5 mt-4">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border p-4 rounded-lg relative w-full sm:w-[90%] lg:w-[70%] mx-auto hover:border-[#06b6d4] bg-[#000000]/50" key={paste._id}>
                <div className="flex justify-between items-start ">
                  <div className="font-bold text-2xl sm:text-2xl text-white truncate max-w-[230px] sm:max-w-[400px]">
                    {paste.title}
                  </div>

                  <div className=" flex gap-4 text-xl">
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                      <FaEdit
                        size={20}
                        className=" text-white cursor-pointer hover:text-[#06b6d4]"
                        title="Edit"
                      />
                    </NavLink>

                    <NavLink to={`/pastes/${paste?._id}`}>
                      <FaEye
                        size={20}
                        className="text-white cursor-pointer hover:text-[#06b6d4]"
                        title="View"
                      />
                    </NavLink>

                    <FaTrash
                      size={20}
                      className="text-white cursor-pointer hover:text-[#06b6d4]"
                      title="Delete"
                      onClick={() => handleDelete(paste?._id)}
                    />
                    <FaCopy
                      size={20}
                      className="text-white cursor-pointer hover:text-[#06b6d4]"
                      title="Copy"
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success("Copied to clipboard");
                      }}
                    />
                    <FaShare
                      size={20}
                      className="text-white cursor-pointer hover:text-[#06b6d4]"
                      title="Copy"
                      onClick={() => handleShare(paste?._id)}
                    />
                  </div>
                </div>
                <div className="mt-5 text-left text-lg text-gray-300 line-clamp-2">
                  {paste.content}
                </div>
                <div className="text-white text-sm mt-5 text-right">
                  Last updated: {paste.createdAt.substring(8, 10)}-
                  {paste.createdAt.substring(5, 7)}-
                  {paste.createdAt.substring(0, 4)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
