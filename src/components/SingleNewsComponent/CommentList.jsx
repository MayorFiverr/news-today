import React from "react";
import Comment from "./Comment";

export default function CommentList({ comments, setComments, isDark }) {
  return (
    <div className="space-y-8 mb-10">
      {comments.map((c) => (
        <Comment
          key={c.id}
          comment={c}
          comments={comments}
          setComments={setComments}
          isDark={isDark}
        />
      ))}
    </div>
  );
}
