import React, { useRef } from 'react';
import {
  PaperClipIcon,
  TrashIcon,
  DownloadIcon,
} from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { deleteAttachment } from 'services/Firebase/WriteData/Posts/PostDelete';
import { IsFileBelowMaxSize } from 'services/Utils/Functions/FileVerification';
import { Iattachment, IattachmentLocal, IpostPreview } from 'types/types';

type TattachmentSection = {
  attachments: Iattachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Iattachment[]>>;
  attachmentsLocal: IattachmentLocal[];
  setAttachmentsLocal: React.Dispatch<React.SetStateAction<IattachmentLocal[]>>;
  setPostPreview: React.Dispatch<React.SetStateAction<IpostPreview>>;
  disableEdit: boolean;
};

export default function AttachmentSection({
  attachments,
  setAttachments,
  attachmentsLocal,
  setAttachmentsLocal,
  setPostPreview,
  disableEdit,
}: TattachmentSection): JSX.Element {
  const inputFileButton = useRef<HTMLInputElement>(null);

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      try {
        const file = event.target.files[0];
        IsFileBelowMaxSize(file, 20);
        const attachmentLocal: IattachmentLocal = {
          file,
          fileUrl: URL.createObjectURL(file),
          fileType: file.type,
          name: file.name,
        };
        setAttachmentsLocal((prevState) => [...prevState, attachmentLocal]);

        setPostPreview((prevState) => ({
          ...prevState,
          attachmentCount: attachments.length + attachmentsLocal.length,
        }));
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
  }

  async function deleteRemoteAttachment(idx: number) {
    try {
      await deleteAttachment(attachments[idx].filePath);
      setAttachments(attachments.filter((item, fidx) => idx !== fidx));
      setPostPreview((prevState) => ({
        ...prevState,
        attachmentCount: attachments.length + attachmentsLocal.length,
      }));
      toast.success('File deleted');
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  return (
    <div>
      <div className="flex justify-between ">
        <div>
          <div
            className="flex gap-2 items-center px-1
        text-primary">
            <PaperClipIcon className="h-5" />
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-bold">Attachments</p>
            </div>
          </div>
          <p className="text-neutral-500 text-xs ">
            (optional, add any file downloadable by your sponsors)
          </p>
        </div>
        <div>
          <input
            ref={inputFileButton}
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={(e) => handleFileInput(e)}
            onClick={(e) => {
              const element = e.target as HTMLInputElement;
              element.value = '';
            }}
          />
          <button
            type="button"
            className="px-5 text-cyan-600 hover:text-cyan-500 underline 
            font-bold text-lg"
            onClick={() => {
              if (inputFileButton.current) inputFileButton.current.click();
            }}
            disabled={disableEdit}>
            Upload
          </button>
        </div>
      </div>
      <div className="mt-3 space-y-3">
        {attachments.length > 0 &&
          attachments.map((att, idx) => (
            <div
              key={att.fileUrl}
              className="border 
          border-neutral-400
          dark:border-neutral-600 
        bg-neutral-300 
        dark:bg-neutral-800 rounded-lg
        p-3 flex justify-between">
              <div className="overflow-hidden">
                <a
                  href={att.fileUrl}
                  download={att.name}
                  className="text-cyan-600 hover:text-cyan-500
            flex gap-2 items-center pr-2">
                  <p className="truncate max-w-sm">{att.name}</p>
                  <DownloadIcon className="h-5 flex-shrink-0" />
                </a>
              </div>
              <div className="flex gap-5 items-center">
                <p className=" text-primary text-xs">{att.fileType}</p>
                <button
                  type="button"
                  className="text-neutral-900 dark:text-neutral-200 
              hover:text-red-600
              dark:hover:text-red-600
              flex gap-2 items-center"
                  onClick={() => {
                    deleteRemoteAttachment(idx);
                  }}>
                  <p className="font-semibold underline">Delete</p>
                  <TrashIcon className="h-5" />
                </button>
              </div>
            </div>
          ))}
      </div>
      {/* Local Attachments */}
      <div className="mt-3 space-y-3">
        {attachmentsLocal.length > 0 &&
          attachmentsLocal.map((att, idx) => (
            <div
              key={att.fileUrl}
              className="border 
              border-neutral-400
              dark:border-neutral-600 
            bg-neutral-300 
            dark:bg-neutral-800 rounded-lg
            p-3 flex justify-between">
              <div className="overflow-hidden">
                <a
                  href={att.fileUrl}
                  download={att.name}
                  className="text-cyan-600 hover:text-cyan-500
                flex gap-2 items-center pr-2">
                  <p className="truncate max-w-sm">{att.name}</p>
                  <DownloadIcon className="h-5 flex-shrink-0" />
                </a>
              </div>
              <div className="flex gap-5 items-center">
                <p className=" text-primary text-xs">{att.fileType}</p>
                <button
                  type="button"
                  className="text-neutral-900 dark:text-neutral-200 
                  hover:text-red-600
                  dark:hover:text-red-600
                  flex gap-2 items-center"
                  onClick={() => {
                    setAttachmentsLocal(
                      attachmentsLocal.filter((item, fidx) => idx !== fidx)
                    );
                  }}>
                  <p className="font-semibold underline">Delete</p>
                  <TrashIcon className="h-5" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
