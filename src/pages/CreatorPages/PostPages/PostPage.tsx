import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function PostPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div>
      <p>PostPage</p>
      <button
        type="button"
        onClick={() => {
          navigate('/c/cunt/popo');
        }}>
        ccc
      </button>
    </div>
  );
}
