import React, { Component, useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { useRecoilState } from 'recoil';

import { Editor as ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';
import { textCk } from './RecoilText';
import 'style/ckeditor.css';
import 'style/ckeditorbase.css';

export default function CKeditsource(): JSX.Element {
  const [recoilText, setRecoilText] = useRecoilState(textCk);

  const [text, setText] = useState('');
  /* const alertUser = (e: any) => {
    e.preventDefault();
    e.returnValue = 'refresh???';
  };
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []); */

  /* eslint-disable no-promise-executor-return */
  function sleep(ms: any) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve('caca');
      }, ms)
    );
  }

  function uploadAdapter(loader: any) {
    console.log('Loader', loader);
    // const newUrl = URL.createObjectURL(loader.file);
    // console.log(newUrl);
    // return newUrl;
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file
            .then((file: any) => {
              const reader = new window.FileReader();
              reader.onloadend = async () => {
                console.log('RESULT', reader.result);
                await sleep(20000);
                resolve({ default: reader.result });
              };
              reader.readAsDataURL(file);
              // body.append('files', file);
              // let headers = new Headers();
              // headers.append("Origin", "http://localhost:3000");
              // console.log(body);

              // const newUrl = URL.createObjectURL(file);
              // .then((res) => res.json())
              // .then((res) => {
              // resolve({
              //   default: newUrl,
              // });
              // compress the image and verify it is the correct size
              // console.log(reader.result);
              // resolve({ default: reader.result });
            })
            .catch((err: any) => {
              reject(err);
            });
        });
      },
    };
  }

  function uploadPlugin(editor: any) {
    /* eslint-disable no-param-reassign */
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }
  const editorConfiguration = {
    /* toolbar: [
      'sourceEditing',
      'heading', // ok
      '|',
      'bold', // ok
      'italic', // ok
      'underline',
      'link', // ok
      'fontSize', // ok
      'fontColor', // ok
      'fontBackgroundColor', // ok
      'highlight', // ok
      'strikethrough', // ok
      'subscript', // ok
      'superscript', // ok
      'specialCharacters', // ok
      'removeFormat', // ok
      '|', // ok
      'alignment', // ok
      'outdent',
      'indent',
      'bulletedList', // ok
      'numberedList', // ok
      '|',
      'code', // ok
      'codeBlock', // ok
      'blockQuote', // ok
      'horizontalLine',
      'imageUpload',
      'imageInsert',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ], */

    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        'linkImage',
        '|',
        'imageStyle:inline',
        'imageStyle:alignLeft',
        'imageStyle:block',
        'imageStyle:alignRight',
      ],
    },

    extraPlugins: [uploadPlugin],
  };
  return (
    <div className="mb-12">
      <h2>Using CKEditor 5 from online builder in React</h2>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data=""
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          setText(data);
          // console.log({ event, editor, data });
        }}
        /* onBlur={(event: any, editor: any) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event: any, editor: any) => {
          console.log('Focus.', editor);
        }} */
      />
      <button
        type="button"
        onClick={() => {
          console.log(text);
        }}>
        save
      </button>

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
