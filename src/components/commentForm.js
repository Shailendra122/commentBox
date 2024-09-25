import React, { useState } from 'react';

function CommentForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 0 && text.length <= 200) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment (max 200 characters)"
        maxLength={200}
        className="w-full p-2 border rounded-md resize-none"
        rows="3"
      ></textarea>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">
          {200 - text.length} characters left
        </span>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;