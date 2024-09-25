import React, { useState } from 'react';

function ReplyForm({ onSubmit }) {
  const [replyText, setReplyText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (replyText.trim().length > 0 && replyText.length <= 200) {
      onSubmit(replyText);
      setReplyText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Write a reply (max 200 characters)"
        maxLength={200}
        className="w-full p-2 border rounded-md resize-none"
        rows="2"
      ></textarea>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">
          {200 - replyText.length} characters left
        </span>
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors"
        >
          Reply
        </button>
      </div>
    </form>
  );
}

export default ReplyForm;