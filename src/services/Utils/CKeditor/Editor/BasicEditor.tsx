import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { Editor as ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';

import 'style/Components/CKeditorStyle/basickeditor.css';
import 'style/Components/CKeditorStyle/ckeditorlark.css';

import DOMPurify from 'dompurify';

type TbasicEditor = {
  maxLength: number;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export default function BasicEditor({
  maxLength,
  text,
  setText,
}: TbasicEditor): JSX.Element {
  // const [text, setText] = useState('');

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
    ],
    removePlugins: [
      'Indent',
      'IndentBlock',
      'Autoformat',
      'AutoImage',
      'BlockQuote',
      'CKFinderUploadAdapter',
      'CloudServices',
      'Code',
      'CodeBlock',
      'FontBackgroundColor',
      'FontColor',
      'FontFamily',
      'FontSize',
      'Highlight',
      'HorizontalLine',
      'Image',
      'ImageCaption',
      'ImageInsert',
      'ImageResize',
      'ImageStyle',
      'ImageToolbar',
      'ImageUpload',
      'LinkImage',
      'MediaEmbed',
      'MediaEmbedToolbar',
      'PasteFromOffice',
      'RemoveFormat',
      'SourceEditing',
      'Strikethrough',
      'Subscript',
      'Superscriptv',
      'Table',
      'TableCaption',
      'TableCellProperties',
      'TableProperties',
      'TableToolbar',
      'TextTransformation',
      'WordCount',
    ],
  };

  return (
    <div className="">
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
