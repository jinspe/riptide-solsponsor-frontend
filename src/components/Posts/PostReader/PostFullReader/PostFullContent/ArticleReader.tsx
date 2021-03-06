import React from 'react';
import CKArticleReader from 'services/Utils/CKeditor/Reader/CKArticleReader';
import { IpostContent } from 'types/types';

type TarticleReader = {
  postContent: IpostContent;
};

export default function ArticleReader({
  postContent,
}: TarticleReader): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="p-3 mt-2 border 
        border-neutral-400
        dark:border-neutral-700
        bg-white dark:bg-neutral-700 
  text-black dark:text-neutral-100
      rounded-lg text-base space-y-2 text-primary">
        <CKArticleReader text={postContent.content} />
      </div>
    </div>
  );
}
