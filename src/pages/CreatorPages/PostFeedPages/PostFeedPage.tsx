import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { queryFullPostByCreator } from 'services/Firebase/GetData/PostUtils';
import Spinner from 'components/Common/Util/Spinner';
import PostCardContainer from 'components/Posts/PostFeed/PostCardContainer';
import { IpostPreview, Icreator, IFullPost } from 'types/types';
import { userMembershipsAtom } from 'services/Utils/Recoil/userInfo';

import NoMembershipSection from './Components/NoMembershipSection';
import NoPostSection from './Components/NoPostSection';

type TpostFeedPage = {
  creatorInfos: Icreator;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
};

const BATCHLENGHT = 7;

export default function PostFeedPage({
  creatorInfos,
  setCurrentTab,
}: TpostFeedPage): JSX.Element {
  const memberships = useRecoilValue(userMembershipsAtom);

  const [postBatchList, setPostBatchList] = useState<Array<IFullPost[]>>([]);

  const [hasAccess, setHasAcces] = useState(false);

  const [lastVisible, setLastVisible] = useState<
    QueryDocumentSnapshot<IpostPreview> | undefined
  >();
  const [postPaginationLoading, setPostPaginationLoading] = useState(false);
  const [hasMorePost, setHasMorePost] = useState(true);

  const [pageLoading, setPageLoading] = useState(true);

  async function getAPostBatch() {
    setPostPaginationLoading(true);
    if (creatorInfos.uId !== undefined) {
      try {
        const [batch, lastVisibleFetch] = await queryFullPostByCreator(
          creatorInfos.uId,
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
    }
    setPostPaginationLoading(false);
  }

  async function getInitialPostBatch() {
    setPageLoading(true);
    // Check authorization
    if (creatorInfos.uId !== undefined) {
      const creatorMem = memberships.filter(
        (mem) =>
          mem.cId === creatorInfos.uId &&
          parseFloat(mem.expiration) > new Date().getTime()
      );
      if (creatorMem.length > 0) {
        setHasAcces(true);
      }
      // get the Posts
      try {
        const [batch, lastVisibleFetch] = await queryFullPostByCreator(
          creatorInfos.uId,
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
    }
    setPageLoading(false);
  }

  useEffect(() => {
    getInitialPostBatch();
  }, [memberships]);

  return (
    <div>
      {/* No Draft Post */}
      {pageLoading && (
        <div className="mx-auto flex justify-center my-10">
          <Spinner classExtend="h-12 spinner-color " />
        </div>
      )}
      {!pageLoading && !hasAccess && (
        <NoMembershipSection
          setCurrentTab={setCurrentTab}
          creatorInfos={creatorInfos}
        />
      )}
      {!pageLoading && postBatchList[0].length === 0 && <NoPostSection />}
      {/* Has Post */}
      {!pageLoading && postBatchList[0].length > 0 && (
        <div>
          <div className="my-10 space-y-10 max-w-3xl mx-auto">
            {postBatchList.map((postBatch) => (
              <div className="my-5 space-y-10  mx-auto">
                {postBatch.map((post) => (
                  <div key={post.preview.id}>
                    <PostCardContainer
                      postPreview={post.preview}
                      creatorInfos={creatorInfos}>
                      <div />
                    </PostCardContainer>
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
  );
}
