import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId, comments }) => {
  //render comments
  const renderComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default CommentList;
