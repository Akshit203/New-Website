import axios from "axios";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function BlogCard(props) {
  const navigate = useNavigate();
  const { id, isUser, title, description, image, username, time } = props;

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`, {
        id,
      });
      if (data?.status == true) {
        toast.success("Blog deleted successfully");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" border w-[600px] h-[600px] flex flex-col justify-center items-center m-5 p-5">
        {isUser && (
          <div className="flex justify-around relative left-60 bottom-5">
            <MdOutlineEdit
              className="m-1 cursor-pointer text-green-800"
              onClick={handleEdit}
            />
            <MdOutlineDelete
              className="m-1 cursor-pointer text-red-600"
              onClick={handleDelete}
            />
          </div>
        )}
        <div className="font-extrabold text-2xl">{title}</div>
        <div className="relative left-48 bottom-8 text-sm italic">
          {username}
        </div>
        <div className="relative left-48 bottom-8 text-sm">
          {new Date(time).toDateString()}
        </div>
        <img src={image} className="h-[250px] w-[250px]" />
        <p className="mt-2">{description}</p>
      </div>
    </>
  );
}

export default BlogCard;
