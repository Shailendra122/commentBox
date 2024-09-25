import React, { useState } from 'react';
import CommentForm from './commentForm';
import CommentList from './commentList';
import { useLocalStorage } from '../hooks/useLocalStorage';

function CommentWidget() {
  const [comments, setComments] = useLocalStorage('comments', []);
  const [sortBy, setSortBy] = useState('date');

  const addComment = (text) => {
    const newComment = {
      id: Date.now(),
      text,
      author: 'Anonymous',
      date: new Date().toISOString(),
      likes: 0,
      replies: [],
    };
    setComments([newComment, ...comments]);
  };

  const editComment = (id, newText) => {
    setComments(prevComments => updateComment(prevComments, id, comment => ({
      ...comment,
      text: newText
    })));
  };

  const deleteComment = (id) => {
    setComments(prevComments => deleteCommentRecursive(prevComments, id));
  };

  const likeComment = (id) => {
    setComments(prevComments => updateComment(prevComments, id, comment => ({
      ...comment,
      likes: comment.likes + 1
    })));
  };

  const addReply = (commentId, replyText, parentId = null) => {
    const newReply = {
      id: Date.now(),
      text: replyText,
      author: 'Anonymous',
      date: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments(prevComments => updateComment(prevComments, parentId || commentId, comment => ({
      ...comment,
      replies: [...comment.replies, newReply]
    })));
  };

  const updateComment = (comments, id, updateFn) => {
    return comments.map(comment => {
      if (comment.id === id) {
        return updateFn(comment);
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateComment(comment.replies, id, updateFn)
        };
      }
      return comment;
    });
  };

  const deleteCommentRecursive = (comments, id) => {
    return comments.filter(comment => {
      if (comment.id === id) {
        return false;
      }
      if (comment.replies.length > 0) {
        comment.replies = deleteCommentRecursive(comment.replies, id);
      }
      return true;
    });
  };

  const sortedComments = [...comments].sort((a, b) =>
    sortBy === 'date'
      ? new Date(b.date) - new Date(a.date)
      : b.likes - a.likes
  );

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <CommentForm onSubmit={addComment} />
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-1"
        >
          <option value="date">Date</option>
          <option value="likes">Likes</option>
        </select>
      </div>
      <CommentList
        comments={sortedComments}
        onEdit={editComment}
        onDelete={deleteComment}
        onLike={likeComment}
        onReply={addReply}
      />
    </div>
  );
}

export default CommentWidget;