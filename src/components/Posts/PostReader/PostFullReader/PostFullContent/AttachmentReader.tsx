import React from 'react';
import { PaperClipIcon, DownloadIcon } from '@heroicons/react/outline';

import { Iattachment } from 'types/types';

type TattachmentReader = {
  attachments: Iattachment[];
};

export default function AttachmentReader({
  attachments,
}: TattachmentReader): JSX.Element {
  return (
    <div>
      <div className="border-b border-neutral-500" />
      <div
        className="flex gap-2 mt-4 items-center px-1
        text-primary">
        <PaperClipIcon className="h-5" />
        <p className="text-base font-bold">Attachments</p>
      </div>
      <div className="mt-2 space-y-3">
        {attachments.length > 0 &&
          attachments.map((att) => (
            <div
              key={att.fileUrl}
              className="border 
              border-neutral-400
              dark:border-neutral-600 
            bg-neutral-100 
            dark:bg-neutral-800 rounded-lg
            py-1 px-4 flex justify-between">
              <div className="overflow-hidden">
                <a
                  href={att.fileUrl}
                  download={att.name}
                  className="text-link
                flex gap-2 items-center pr-2">
                  <p className="truncate max-w-sm">{att.name}</p>
                  <DownloadIcon className="h-5 flex-shrink-0" />
                </a>
              </div>
              <div className="flex gap-5 items-center">
                <p className=" text-primary text-xs">{att.fileType}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
