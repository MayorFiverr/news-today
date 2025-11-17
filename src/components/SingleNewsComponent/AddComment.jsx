import React from "react";
import { FiSend } from "react-icons/fi";

export default function AddComment({
  commentText,
  setCommentText,
  handlePostComment,
  isDark,
}) {
  return (
    <div className="mb-8 border-t border-gray-200 dark:border-gray-700 pt-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          <img
            src="../images/download (2).jpeg"
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="flex-1">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className={`w-full border border-gray-200 rounded-lg p-4 min-h-[72px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 bg-transparent ${
              isDark ? "text-gray-100" : "text-gray-600"
            }`}
          />
          <div className="text-right mt-3">
            <button
              onClick={handlePostComment}
              className="inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              <FiSend /> Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
