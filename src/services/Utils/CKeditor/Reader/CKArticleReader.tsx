import React from 'react';

import DOMPurify from 'dompurify';

import 'style/Components/CKeditorStyle/basicreader.css';
import 'style/Components/CKeditorStyle/ckarticlereader.css';

// import 'style/ckeditorbase.css';

/* eslint-disable react/no-danger */

type TdisplayHtmlText = {
  text: string | undefined;
};
export default function CKArticleReader({
  text,
}: TdisplayHtmlText): JSX.Element {
  function createMarkup() {
    return { __html: DOMPurify.sanitize(text ?? '') };
  }
  return (
    <div className=" flex break-all">
      <div
        className="ckbreader border-none relative ck-article ring-none break-words"
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
}
