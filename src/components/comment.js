// Comment.js

import React, { useState } from 'react';
import ReplyForm from './ReplyForm';
import { formatDate } from '../utils/dateUtils';

function Comment({ comment, onEdit, onDelete, onLike, onReply, depth = 0 }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleEdit = () => {
    if (editedText.trim().length > 0 && editedText.length <= 200) {
      onEdit(comment.id, editedText);
      setIsEditing(false);
    }
  };

  const handleReply = (replyText) => {
    onReply(comment.id, replyText, depth > 0 ? comment.id : null);
    setShowReplyForm(false);
  };

  return (
    <div className={`bg-gray-100 p-4 rounded-md ${depth > 0 ? 'ml-4 mt-2' : ''}`}>
      {isEditing ? (
        <div>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-2 border rounded-md resize-none"
            rows="3"
            maxLength={200}
          ></textarea>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-2">{comment.text}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{comment.author} • {formatDate(comment.date)}</span>
            <div className="space-x-2">
              <button
                onClick={() => onLike(comment.id)}
                className="hover:text-blue-500 transition-colors"
              >
                Like ({comment.likes})
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="hover:text-blue-500 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                className="hover:text-red-500 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="hover:text-blue-500 transition-colors"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
      {showReplyForm && (
        <ReplyForm onSubmit={handleReply} />
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
            {comment.replies.map((reply) => (
            <Comment
                key={reply.id}
                comment={reply}
                onEdit={onEdit}
                onDelete={onDelete}
                onLike={onLike}
                onReply={onReply}
                depth={depth + 1}
            />
            ))}
        </div>
        )}
    </div>
  );
}

export default Comment;