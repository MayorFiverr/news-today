import React from "react";
import { FiSend } from "react-icons/fi";

export default function Comment({ comment, isDark, comments, setComments }) {
  const toggleReplyBox = () => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === comment.id ? { ...c, showReplyBox: !c.showReplyBox } : c
      )
    );
  };

  const toggleReplies = () => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === comment.id ? { ...c, showReplies: !c.showReplies } : c
      )
    );
  };

  const postReply = () => {
    const text = comment.replyText?.trim();
    if (!text) return;
    const reply = {
      id: Date.now(),
      name: "You",
      avatar: "../images/download (2).jpeg",
      date: new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      text,
    };
    setComments((prev) =>
      prev.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              replies: [...(c.replies || []), reply],
              replyText: "",
              showReplyBox: false,
            }
          : c
      )
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-sm overflow-hidden">
          {comment.avatar ? (
            <img
              src={comment.avatar}
              alt={comment.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            comment.name.charAt(0)
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <p className="font-medium text-sm">{comment.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {comment.date}
            </p>
          </div>
          <p className={`mt-1 ${isDark ? "text-gray-100" : "text-gray-600"}`}>
            {comment.text}
          </p>

          <div className="mt-2 flex items-center gap-4">
            <button
              onClick={toggleReplyBox}
              className="text-sm text-blue-600 hover:underline"
            >
              Reply
            </button>
            {comment.replies?.length > 0 && (
              <button
                onClick={toggleReplies}
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                {comment.showReplies
                  ? "Hide replies"
                  : `View ${comment.replies.length} repl${
                      comment.replies.length > 1 ? "ies" : "y"
                    }`}
              </button>
            )}
          </div>

          {comment.showReplyBox && (
            <div className="mt-3">
              <textarea
                placeholder={`Reply to ${comment.name}...`}
                value={comment.replyText || ""}
                onChange={(e) =>
                  setComments((prev) =>
                    prev.map((c) =>
                      c.id === comment.id
                        ? { ...c, replyText: e.target.value }
                        : c
                    )
                  )
                }
                className={`w-full border border-gray-200  rounded-lg p-3 text-sm min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400 ${
                  isDark ? "text-gray-100" : "text-gray-600"
                }`}
              />
              <div className="text-right mt-2">
                <button
                  onClick={postReply}
                  className="inline-flex items-center gap-1 bg-blue-600 dark:bg-blue-500 text-white text-sm px-3 py-1 rounded-md"
                >
                  <FiSend className="w-4 h-4" /> Reply
                </button>
              </div>
            </div>
          )}

          {comment.showReplies && comment.replies?.length > 0 && (
            <div className="mt-4 ml-10 space-y-4">
              {comment.replies.map((r) => (
                <div key={r.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs overflow-hidden">
                    {r.avatar ? (
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      r.name.charAt(0)
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-xs">{r.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {r.date}
                      </p>
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-gray-100" : "text-gray-600"
                      }`}
                    >
                      {r.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
