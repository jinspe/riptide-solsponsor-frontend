import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Compressor from 'compressorjs';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';

import { Editor as ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';

// import 'style/Components/CKeditorStyle/basickeditor.css';
import 'style/Components/CKeditorStyle/ckeditorlark.css';
// import 'style/ckeditorbase.css';

type TbasicEditor = {
  maxLength: number;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export default function ArticleEditor({
  maxLength,
  text,
  setText,
}: TbasicEditor): JSX.Element {
  function uploadAdapter(loader: any) {
    return {
      upload: async () => {
        try {
          const file = await loader.file;
          let result: File | Blob | undefined;
          await new Promise((resolve, reject) => {
            /* eslint-disable no-new */
            new Compressor(file, {
              convertTypes: ['image/png'],
              quality: 0.8,
              maxWidth: 400,
              maxHeight: 400,
              success: (compressedResult) => {
                resolve((result = compressedResult));
              },
              error: (e) => {
                reject(e);
              },
            });
          });

          return new Promise((resolve, reject) => {
            if (result !== undefined) {
              const reader = new FileReader();
              reader.readAsDataURL(result);
              reader.onloadend = () => {
                resolve({ default: reader.result });
              };
            } else {
              reject(Error('Failed to process your image'));
            }
          });
        } catch (error: any) {
          toast.error(error?.message);
          return { default: '' };
        }
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
    toolbar: [
      'heading', // ok
      '|',
      'bold', // ok
      'italic', // ok
      'underline',
      '|', // ok
      'alignment', // ok
      'bulletedList', // ok
      'link',
      '|',
      'imageInsert',
      'Code',
      'CodeBlock',
      'horizontalLine',
      'insertTable',
      'highlight',
      'strikethrough',
      'subscript',
      'superscript',
      'specialCharacters',
      'undo',
      'redo',
    ],
    removePlugins: [
      // 'Indent',
      // 'IndentBlock',
      // 'Autoformat',
      // 'AutoImage',
      // 'BlockQuote',
      // 'CKFinderUploadAdapter',
      // 'CloudServices',
      // 'Code',
      // 'CodeBlock',
      // 'FontBackgroundColor',
      // 'FontColor',
      // 'FontFamily',
      // 'FontSize',
      // 'Highlight',
      // 'HorizontalLine',
      // 'Image',
      // 'ImageCaption',
      // 'ImageInsert',
      // 'ImageResize',
      // 'ImageStyle',
      // 'ImageToolbar',
      // 'ImageUpload',
      // 'LinkImage',
      'MediaEmbed',
      'MediaEmbedToolbar',
      // 'PasteFromOffice',
      // 'RemoveFormat',
      // 'SourceEditing',
      // 'Strikethrough',
      // 'Subscript',
      // 'Superscriptv',
      // 'Table',
      // 'TableCaption',
      // 'TableCellProperties',
      // 'TableProperties',
      // 'TableToolbar',
      // 'TextTransformation',
      // 'WordCount',
    ],
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
    <div className=" min-h-full">
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={text}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          if (data.length >= maxLength) {
            editor.setData(DOMPurify.sanitize(text));
          } else {
            setText(DOMPurify.sanitize(data));
          }
        }}
      />
    </div>
  );
}
