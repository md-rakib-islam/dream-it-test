"use client";

import { useCreateBlogCommentMutation } from "@/features/blog/blogCommentSlice";
import { addComments } from "@/features/blog/blogSlice";
import { useGetCommentByBlogIdQuery } from "@/features/content/contentApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const initialState = {
  full_name: "",
  phn_num: "",
  email: "",
  comment_des: "",
};
const FormReply = ({ blogId, blogTitle }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({ ...initialState });
  const [fetchComments, setFetchComments] = useState(false);

  const [createBlogComment, { isLoading, isSuccess }] =
    useCreateBlogCommentMutation();

  const { data: commentData, refetch } = useGetCommentByBlogIdQuery(blogTitle);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await createBlogComment({ ...formState, blog: blogId });
      if (res.data) {
        // alert("thanks for contact with us!");
        toast.success("Thanks for contact with us!", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setFormState(initialState);
        router.push(`/blog-details/${blogTitle}`);
        setFetchComments(true);
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (event) => {
    setFormState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      refetch(); // Reset fetchComments to avoid refetching
    }
  }, [isSuccess, refetch]);

  return (
    <form className="row y-gap-30 pt-40" onSubmit={handleSubmit}>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="col-xl-4">
        <div className="form-input ">
          <input
            onChange={handleChange}
            value={formState.full_name}
            type="text"
            name="full_name"
            id="name"
            required
            autocomplete="new-password"
          />
          <label className="lh-1 text-16 text-light-1">Full Name</label>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="form-input ">
          <input
            onChange={handleChange}
            value={formState.phn_num}
            type="text"
            name="phn_num"
            id="phn_num"
            required
            autocomplete="new-password"
          />
          <label className="lh-1 text-16 text-light-1">Phone Number</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-4">
        <div className="form-input ">
          <input
            onChange={handleChange}
            value={formState.email}
            type="email"
            name="email"
            id="email"
            required
            autocomplete="new-password"
          />
          <label className="lh-1 text-16 text-light-1">Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <textarea
            onChange={handleChange}
            value={formState.comment_des}
            id="message"
            name="comment_des"
            required
            autocomplete="new-password"
            rows={6}
          ></textarea>
          <label className="lh-1 text-16 text-light-1">
            Write Your Comment
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-auto">
        <button
          type="submit"
          href="#"
          className="button -md -dark-1 bg-blue-1 text-white"
        >
          Post Comment <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default FormReply;
