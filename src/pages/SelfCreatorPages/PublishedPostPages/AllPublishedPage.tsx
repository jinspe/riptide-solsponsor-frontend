import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { querySelfPreviewPost } from 'services/Firebase/GetData/SelfPostUtils';
import { creatorInfosAtom } from 'services/Utils/Recoil/creatorInfo';

import Spinner from 'components/Common/Util/Spinner';
import SelfPostDraftCard from 'components/Posts/SelfPost/SelfPostDraftCard';

import { IpostPreview } from 'types/types';

export default function AllPublishedPage(): JSX.Element {
  const [draftPostList, setDraftPostList] = useState<IpostPreview[]>([]);
  const creatorInfos = useRecoilValue(creatorInfosAtom);

  const [pageLoading, setPageLoading] = useState(true);

  async function getDraftPreviewPosts() {
    setPageLoading(true);
    try {
      setDraftPostList(await querySelfPreviewPost('published'));
    } catch (error: any) {
      toast.error(error?.message);
    }
    setPageLoading(false);
  }

  useEffect(() => {
    getDraftPreviewPosts();
  }, []);

  return (
    <div>
      <div
        className="bg-neutral-200 dark:bg-neutral-900 
      rounded-lg shadow mx-auto p-3">
        <div
          className="text-xl mt-1 font-bold text-center
        text-black
        dark:text-neutral-100">
          Your Published Posts
        </div>
        {/* No Draft Post */}
        {pageLoading && (
          <div className="mx-auto flex justify-center my-10">
            <Spinner classExtend="h-12 spinner-color " />
          </div>
        )}
        {!pageLoading && draftPostList.length === 0 && (
          <div className="mb-5">
            <div
              className="text-lg mt-10 font-bold text-center
        text-black
        dark:text-neutral-100">
              You currently have no published posts
            </div>
            <div className="mt-3 text-center">
              <Link
                to="/new-post"
                className="text-base font-medium 
                text-cyan-600 hover:text-cyan-500">
                Create a new post<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        )}
        {/* Has draft Post */}
        {!pageLoading && draftPostList.length > 0 && (
          <div className="my-5 space-y-10 max-w-3xl mx-auto">
            {draftPostList.map((post) => (
              <div key={post.id}>
                <SelfPostDraftCard
                  postPreview={post}
                  creatorInfos={creatorInfos}>
                  <div />
                </SelfPostDraftCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
