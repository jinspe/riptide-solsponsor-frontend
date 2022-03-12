import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';

import { userPublicKeyAtom } from 'services/Utils/Recoil/userInfo';
import ArticleEditor from 'services/Utils/CKeditor/Editor/ArticleEditor';
import PostMakerContainer from 'components/Posts/PostMaker/PostMakerContainer';
import Spinner from 'components/Common/Util/Spinner';

import { getSelfFullPost } from 'services/Firebase/GetData/SelfPostUtils';

import {
  IpostPreview,
  TpostType,
  IattachmentLocal,
  Iattachment,
} from 'types/types';

import PostNotFoundPage from './PostNotFoundPage';

type IeditPostPage = {
  postType: TpostType;
  postId: string;
};

const MAXLENGHTARTICLE = 500000;

export default function EditPostPage({
  postType,
  postId,
}: IeditPostPage): JSX.Element {
  const userPublickey = useRecoilValue(userPublicKeyAtom);

  const [postPreview, setPostPreview] = useState<IpostPreview>({
    id: '',
    title: '',
    type: postType,
    cId: userPublickey ?? '',
    teaser: '',
    timeCreation: 0,
    attachmentCount: 0,
    state: 'draft',
  });

  const [postPreviewF, setPostPreviewF] = useState<IpostPreview | undefined>();

  const [postContent, setPostContent] = useState<string>('');
  const [attachments, setAttachments] = useState<Iattachment[]>([]);
  const [attachmentsLocal, setAttachmentsLocal] = useState<IattachmentLocal[]>(
    []
  );

  const [pageLoading, setPageLoading] = useState(true);

  async function getPostToEdit() {
    setPageLoading(true);
    try {
      if (userPublickey !== undefined) {
        const [postPreviewFetch, postContentFetch] = await getSelfFullPost(
          postId,
          userPublickey,
          'any'
        );
        setPostPreviewF(postPreviewFetch);
        if (postPreviewFetch !== undefined) {
          setPostPreview(postPreviewFetch);
        }
        if (postContentFetch !== undefined) {
          setPostContent(postContentFetch.content);
          setAttachments(postContentFetch.attachments);
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
    setPageLoading(false);
  }

  useEffect(() => {
    getPostToEdit();
  }, []);

  return (
    <div>
      {pageLoading && (
        <div className="mx-auto flex justify-center my-10">
          <Spinner classExtend="h-12 spinner-color " />
        </div>
      )}
      {!pageLoading && postPreviewF === undefined && <PostNotFoundPage />}
      {!pageLoading && postPreviewF !== undefined && (
        <PostMakerContainer
          postPreview={postPreview}
          setPostPreview={setPostPreview}
          attachments={attachments}
          setAttachments={setAttachments}
          attachmentsLocal={attachmentsLocal}
          setAttachmentsLocal={setAttachmentsLocal}
          postContent={postContent}>
          <div>
            {postType === 'article' && (
              <ArticleEditor
                text={postContent}
                setText={setPostContent}
                maxLength={MAXLENGHTARTICLE}
              />
            )}
          </div>
        </PostMakerContainer>
      )}
    </div>
  );
}
