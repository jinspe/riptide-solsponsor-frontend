import React from 'react';

import SelfPostQueryList from 'components/Posts/SelfPost/SelfPostQueryList';

export default function PublishedPostsPage(): JSX.Element {
  return (
    <div className="pageFrame">
      <SelfPostQueryList state="published" />
    </div>
  );
}
