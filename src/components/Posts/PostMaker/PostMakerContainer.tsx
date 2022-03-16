import React, { ReactChildren, ReactChild, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { savePost } from 'services/Firebase/WriteData/Posts/PostUpload';
import { creatorInfosAtom } from 'services/Utils/Recoil/creatorInfo';

import { postDelete } from 'services/Firebase/WriteData/Posts/PostDelete';

import Spinner from 'components/Common/Util/Spinner';
import {
  IpostPreview,
  Iattachment,
  IattachmentLocal,
  TpostSate,
} from 'types/types';

import AttachmentSection from './AttachmentSection';

type TpostContainer = {
  children: ReactChildren | ReactChild;
  postPreview: IpostPreview;
  setPostPreview: React.Dispatch<React.SetStateAction<IpostPreview>>;
  attachments: Iattachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Iattachment[]>>;
  attachmentsLocal: IattachmentLocal[];
  setAttachmentsLocal: React.Dispatch<React.SetStateAction<IattachmentLocal[]>>;
  postContent: string;
};

const MAXTITLELENGTH = 80;
const MAXTEASERLENGTH = 140;

export default function PostMakerContainer({
  children,
  postPreview,
  setPostPreview,
  attachments,
  setAttachments,
  attachmentsLocal,
  setAttachmentsLocal,
  postContent,
}: TpostContainer): JSX.Element {
  const navigate = useNavigate();
  const [disableEdit, setDisableEdit] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const creatorInfo = useRecoilValue(creatorInfosAtom);

  function goDraft() {
    navigate('/drafts');
  }

  function goPostPage(postId: string) {
    navigate(`/c/${creatorInfo.userName}/${postId}`);
  }

  async function handleSave(publish: boolean) {
    setDisableEdit(true);
    if (publish) {
      setPublishLoading(true);
    } else {
      setDraftLoading(true);
    }
    setDisableEdit(true);
    try {
      if (postPreview.title.length > MAXTITLELENGTH)
        throw new Error(`Title needs to smaller than ${MAXTITLELENGTH}`);
      if (postPreview.title.length === 0)
        throw new Error('Title cannot be empty');
      const currentState: TpostSate = publish ? 'published' : 'draft';
      const savedPreview = {
        ...postPreview,
        timeCreation: new Date().getTime(),
        attachmentCount: attachments.length + attachmentsLocal.length,
        state: currentState,
      };
      setPostPreview(savedPreview);

      const postId = await savePost(
        attachments,
        attachmentsLocal,
        savedPreview,
        postContent
      );
      toast.success('Post saved');
      if (publish) {
        goPostPage(postId);
      } else {
        goDraft();
      }
    } catch (error: any) {
      toast.error(error?.message);
      setDisableEdit(false);
      setPublishLoading(false);
      setDraftLoading(false);
    }
  }

  async function handleDelete() {
    setDeleteLoading(true);
    setDisableEdit(true);
    if (postPreview.id !== '') {
      try {
        await postDelete(postPreview.id);
        toast.success('Post deleted');
        goDraft();
      } catch (error: any) {
        toast.error(error?.message);
        setDeleteLoading(false);
        setDisableEdit(false);
      }
    } else {
      goDraft();
    }
  }

  return (
    <div className="page-container-l1">
      <div className="page-title mt-1">Draft {postPreview.type} post</div>
      <div
        className="max-w-3xl mx-auto 
        px-4 py-5 rounded-lg sm:p-6">
        {/* Title */}
        <div>
          <div
            className=" text-sm font-medium text-primary 
                    flex items-center gap-2">
            <p>Post title</p>
            <p className="text-secondary text-xs ">
              (required, max {MAXTITLELENGTH} characters)
            </p>
          </div>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              id="title"
              className="text-input-field
              shadow-sm font-semibold
              block w-full text-lg
              rounded-md"
              placeholder="Post Title"
              value={postPreview.title}
              maxLength={MAXTEASERLENGTH}
              onChange={(e) =>
                setPostPreview((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
            />
          </div>
        </div>
        {/* Teaser */}
        <div className="mt-4">
          <div
            className=" text-sm font-medium text-primary
                    flex items-center gap-2">
            <p>Post teaser</p>
            <p className="text-secondary text-xs ">
              (optional, max {MAXTEASERLENGTH} characters)
            </p>
          </div>
          <div className="mt-1">
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full py-3 border-0 resize-none 
              text-input-field
               leading-tight
              shadow-sm 
              rounded-md
              text-base"
              placeholder="Add a public teaser text ..."
              value={postPreview.teaser}
              maxLength={MAXTEASERLENGTH}
              onChange={(e) =>
                setPostPreview((prevState) => ({
                  ...prevState,
                  teaser: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="border-b border-neutral-500 py-3" />
        <div className="mt-4">{children}</div>
        <div className="border-b border-neutral-500 py-3" />
        {/* Attachement */}
        <div className="mt-6">
          <AttachmentSection
            attachments={attachments}
            setAttachments={setAttachments}
            attachmentsLocal={attachmentsLocal}
            setAttachmentsLocal={setAttachmentsLocal}
            setPostPreview={setPostPreview}
            disableEdit={disableEdit}
          />
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between mt-14 text-xs sm:text-base">
          {/* Delete */}
          <button
            type="button"
            className="button-cancel"
            disabled={disableEdit}
            onClick={handleDelete}>
            <div className=" w-16 sm:w-24 mx-auto">
              {deleteLoading ? (
                <Spinner classExtend="h-5 mx-auto" />
              ) : (
                <p className="text-center"> Delete Post</p>
              )}
            </div>
          </button>
          <div className="flex gap-2">
            {/* Draft */}
            <button
              type="button"
              className="button-draft"
              disabled={disableEdit}
              onClick={() => {
                handleSave(false);
              }}>
              <div className=" w-20 sm:w-24 mx-auto">
                {draftLoading ? (
                  <Spinner classExtend="h-5 mx-auto" />
                ) : (
                  <p className="text-center">Save as Draft</p>
                )}
              </div>
            </button>
            {/* Publish */}
            <button
              type="button"
              className="button-action"
              disabled={disableEdit}
              onClick={() => {
                handleSave(true);
              }}>
              <div className=" w-12 sm:w-24 mx-auto">
                {publishLoading ? (
                  <Spinner classExtend="h-5 mx-auto" />
                ) : (
                  <p className="text-center">Publish</p>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
