import React, { Component, useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import 'style/ckeditor.css';
import 'style/ckeditorbase.css';

export default function CKeditorC(): JSX.Element {
  const [text, setText] = useState('');

  return (
    <div className="">
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          console.log({ event, editor, data });
          setText(data);
        }}
        onBlur={(event: any, editor: any) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event: any, editor: any) => {
          console.log('Focus.', editor);
        }}
      />
      <div>
        <p>Recoil Text</p>
        <div className="ck-content">
          <div
            /* eslint-disable react/no-danger */
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        </div>
      </div>
    </div>
  );
}
