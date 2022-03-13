import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userPublicKeyAtom } from 'services/Utils/Recoil/userInfo';
import Spinner from 'components/Common/Util/Spinner';
import PostMaker from 'components/Posts/PostMaker/PostMaker';

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

export default function EditPostPage({
  postType,
  postId,
}: IeditPostPage): JSX.Element {
  const navigate = useNavigate();
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
        if (
          postPreviewFetch?.type !== undefined &&
          postPreviewFetch.type !== postType
        ) {
          navigate(`/drafts/${postPreviewFetch.type}/${postPreviewFetch.id}`);
        }
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
        <PostMaker
          postType={postType}
          postPreview={postPreview}
          setPostPreview={setPostPreview}
          attachments={attachments}
          setAttachments={setAttachments}
          attachmentsLocal={attachmentsLocal}
          setAttachmentsLocal={setAttachmentsLocal}
          postContent={postContent}
          setPostContent={setPostContent}
        />
      )}
    </div>
  );
}
