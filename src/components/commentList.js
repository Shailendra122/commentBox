import React from 'react';
import Comment from './comment';

function CommentList({ comments, onEdit, onDelete, onLike, onReply }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          onLike={onLike}
          onReply={onReply}
          depth={0}
        />
      ))}
    </div>
  );
}

export default CommentList;