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
      <div
        className="flex gap-2 items-center px-1
        text-primary">
        <PaperClipIcon className="h-4" />
        <p className="text-sm font-bold">Attachments</p>
      </div>
      <div className="mt-1 space-y-3">
        {attachments.length > 0 &&
          attachments.map((att) => (
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
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
