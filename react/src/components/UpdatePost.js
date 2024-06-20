import React from "react";
import NewPost from "../pages/LoggedIn/NewPost";
import { useDispatch, useSelector } from "react-redux";

const UpdatePost = ({ updatePostData, setUpdatePostClick }) => {
  // const { updatePostData } = useSelector((state) => state.post);

  const handleClickOverlay = (e) => {
    e.stopPropagation();
    setUpdatePostClick(false);
  };
  const handleClickChild = (e) => {
    e.stopPropagation();
  };
  console.log("updatePostData", updatePostData);
  return (
    <div
      onClick={(e) => handleClickOverlay(e)}
      className="fixed top-0 left-0 right-0 bottom-0 inset-0 bg-slate-900 bg-opacity-90 flex justify-center"
    >
      <div
        onClick={(e) => handleClickChild(e)}
        className="bg-white max-w-[1000px] w-full overflow-y-auto mt-[60px]"
      >
        <NewPost updatePostData={updatePostData} />
      </div>
    </div>
  );
};

export default UpdatePost;
