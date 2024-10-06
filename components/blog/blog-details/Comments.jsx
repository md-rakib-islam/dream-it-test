"use client";
import formatDate from "@/utils/dateFormate";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

const Comments = ({ blogId }) => {
  const { comments } = useSelector((state) => state.blog);
  const [showAll, setShowAll] = useState(false);

  const getInitials = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  // Function to get a fixed color based on the first letter
  const getColorByLetter = (letter) => {
    const colors = {
      A: "#ff9999",
      B: "#ffcc99",
      C: "#ffff99",
      D: "#ccff99",
      E: "#99ff99",
      F: "#99ffcc",
      G: "#99ffff",
      H: "#99ccff",
      I: "#9999ff",
      J: "#cc99ff",
      K: "#ff99ff",
      L: "#ff99cc",
      M: "#ff6699",
      N: "#ff9966",
      O: "#ffcc66",
      P: "#ffff66",
      Q: "#ccff66",
      R: "#99ff66",
      S: "#66ff66",
      T: "#66ff99",
      U: "#66ffcc",
      V: "#66ffff",
      W: "#66ccff",
      X: "#6699ff",
      Y: "#6666ff",
      Z: "#9966ff",
      0: "#ff6666",
      1: "#ff9966",
      2: "#ffcc66",
      3: "#ffff66",
      4: "#ccff66",
      5: "#99ff66",
      6: "#66ff66",
      7: "#66ff99",
      8: "#66ffcc",
      9: "#66ffff",
    };
    return colors[letter] || "#cccccc"; // Default color if letter is not found
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  const displayedComments = showAll ? comments : comments.slice(0, 3);

  return displayedComments.length == 0 ? (
    <div className="row y-gap-40 justify-center">
      <div className="col-auto">
        <div className="fw-500 text-center lh-15">There is no comments</div>
      </div>
    </div>
  ) : (
    <div className="row y-gap-40">
      {displayedComments.map((comment, index) => {
        const initial = getInitials(comment?.full_name);
        const fixedColor = getColorByLetter(initial);
        const date = formatDate(comment.created_at);

        return (
          <div className="col-12" key={index}>
            <div className="row x-gap-20 y-gap-20 items-center">
              <div className="col-auto">
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    backgroundColor: fixedColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    color: "#000000",
                  }}
                >
                  {initial}
                </div>
              </div>
              <div className="col-auto">
                <div className="fw-500 lh-15">{comment?.full_name}</div>
                <div className="text-14 text-light-1 lh-15">{date}</div>
              </div>
            </div>
            <p className="text-15 text-dark-1 mt-10">{comment?.comment_des}</p>
            <div className="d-flex x-gap-30 items-center pt-20">
              <button className="d-flex items-center text-blue-1">
                <i className="icon-like text-16 mr-10" />
                Helpful
              </button>
              <button className="d-flex items-center text-light-1">
                <i className="icon-dislike text-16 mr-10" />
                Not helpful
              </button>
            </div>
          </div>
        );
      })}

      {comments.length > 3 && (
        <div className="col-auto">
          {!showAll ? (
            <button
              onClick={handleShowAll}
              className="button -md -outline-blue-1 text-blue-1"
            >
              Show all comments <div className="icon-arrow-top-right ml-15" />
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className="button -md -outline-blue-1 text-blue-1"
            >
              Show less comments <div className="icon-arrow-top-right ml-15" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
