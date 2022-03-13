import React, { useState, useEffect } from 'react';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { querySelfFullPost } from 'services/Firebase/GetData/SelfPostUtils';

import SelfPostEditCard from 'components/Posts/SelfPost/SelfPostEditCard';
import Spinner from 'components/Common/Util/Spinner';

import { IpostPreview, IFullPost, TpostSate } from 'types/types';
import { creatorInfosAtom } from 'services/Utils/Recoil/creatorInfo';

import NoPostFound from '../../../pages/SelfCreatorPages/PubDraftPostsPages/NoPostFound';

type TselfPostQueryList = {
  state: TpostSate;
};

const BATCHLENGHT = 5;

export default function SelfPostQueryList({
  state,
}: TselfPostQueryList): JSX.Element {
  const [postBatchList, setPostBatchList] = useState<Array<IFullPost[]>>([]);
  const creatorInfos = useRecoilValue(creatorInfosAtom);

  const [lastVisible, setLastVisible] = useState<
    QueryDocumentSnapshot<IpostPreview> | undefined
  >();
  const [postPaginationLoading, setPostPaginationLoading] = useState(false);
  const [hasMorePost, setHasMorePost] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  async function getAPostBatch() {
    setPostPaginationLoading(true);
    try {
      const [batch, lastVisibleFetch] = await querySelfFullPost(
        state,
        lastVisible,
        BATCHLENGHT
      );
      setLastVisible(lastVisibleFetch);
      if (batch.length === BATCHLENGHT) {
        setPostBatchList([...postBatchList, batch.slice(0, -1)]);
        setHasMorePost(true);
      } else {
        setPostBatchList([...postBatchList, batch]);
        setHasMorePost(false);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }

    setPostPaginationLoading(false);
  }

  async function getInitialPostBatch() {
    setPageLoading(true);
    // Check authorization
    // get the Posts
    try {
      const [batch, lastVisibleFetch] = await querySelfFullPost(
        state,
        undefined,
        BATCHLENGHT
      );
      setLastVisible(lastVisibleFetch);
      if (batch.length === BATCHLENGHT) {
        setPostBatchList([batch.slice(0, -1)]);
        setHasMorePost(true);
      } else {
        setPostBatchList([batch]);
        setHasMorePost(false);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }

    setPageLoading(false);
  }

  useEffect(() => {
    getInitialPostBatch();
  }, []);

  return (
    <div>
      <div className="page-container-l1">
        {state === 'draft' && (
          <div className="page-title mt-1 ">Your Draft Posts</div>
        )}
        {state === 'published' && (
          <div className="page-title mt-1 ">Your Published Posts</div>
        )}
        <div>
          {/* No Draft Post */}
          {pageLoading && (
            <div className="mx-auto flex justify-center my-10">
              <Spinner classExtend="h-12 spinner-color " />
            </div>
          )}

          {!pageLoading && postBatchList[0].length === 0 && (
            <NoPostFound state={state} />
          )}
          {/* Has Post */}
          {!pageLoading && postBatchList[0].length > 0 && (
            <div>
              <div className="my-10 space-y-10 max-w-3xl mx-auto">
                {postBatchList.map((postBatch) => (
                  <div
                    key={postBatch[0].preview.id}
                    className="my-5 space-y-10 mx-auto">
                    {postBatch.map((post) => (
                      <div key={post.preview.id}>
                        <SelfPostEditCard
                          post={post}
                          creatorInfos={creatorInfos}
                          state={state}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {hasMorePost && (
                <div className="mb-10 flex justify-between">
                  <button
                    className="button-action w-42 mx-auto"
                    type="button"
                    onClick={getAPostBatch}>
                    {postPaginationLoading ? (
                      <div className="px-12 py-0.5">
                        <Spinner classExtend="h-5 px-0.5 " />
                      </div>
                    ) : (
                      <p className="text-center">Load More Posts</p>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
