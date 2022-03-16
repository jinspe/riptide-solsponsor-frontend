import React from 'react';

import DOMPurify from 'dompurify';

import 'style/Components/CKeditorStyle/basicreader.css';

/* eslint-disable react/no-danger */

type TdisplayHtmlText = {
  text: string | undefined;
};
export default function BasicEditorReader({
  text,
}: TdisplayHtmlText): JSX.Element {
  function createMarkup() {
    return { __html: DOMPurify.sanitize(text ?? '') };
  }
  return (
    <div
      className="ckbreader break-words"
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
}
