import React, {useMemo} from "react";
import {useInfiniteQuery} from "react-query";
import {useIntersect} from "./hooks/useIntersect";
import {getLectures} from "./api";
import styled from "styled-components";
import {Post} from "../../components/posting/Post";
import {SkeletonPost} from "../../components/posting/SkeletonPost";
import {lecturesProps} from "../Main";

const InfinityScroll = (props: {tags: string[]}) => {
    const {data: dataList, hasNextPage, isFetching, fetchNextPage} = useInfiniteQuery(
        ["lectures"],
        ({pageParam = null}) => getLectures(pageParam),
        {
            getNextPageParam: (lastPage, page) => {
                return lastPage.length == 16 ? lastPage[lastPage.length - 1].createdAt : undefined;
            },
        }
    );

    const bottomRef = useIntersect(async (entry, observer) => {
        observer.unobserve(entry.target);
        if (hasNextPage && !isFetching) fetchNextPage();
    });

    const filtering = (data?: lecturesProps[]) => {
        if(data === undefined) return data;
        if(props.tags.length === 0) return data;
        return data.filter(value => {
            const tags = value.tagNameList.map(value => value.name);
            for (const tag of props.tags) if (!tags.includes(tag)) return false;
            return true;
        });
    }

    const lectures = useMemo(() => (dataList ? dataList.pages.flatMap(lectures => lectures) : []), [dataList]);

    return (
        <>
            <PostDiv>
                {filtering(lectures)?.map(data =>
                    <Post isLecture img={data.lectureThumbnailUrl} name={data.createdBy} date={data.createdAt}
                          title={data.title} subTitle={data.explanation} tag={data.tagNameList}
                          lectureId={data.lectureId} key={data.lectureId}/>
                )}
                {!dataList && hasNextPage || isFetching ? <PostDiv ref={bottomRef}>
                    <SkeletonPost/>
                    <SkeletonPost/>
                    <SkeletonPost/>
                    <SkeletonPost/>
                    <SkeletonPost/>
                    <SkeletonPost/>
                    <SkeletonPost/>
                    <SkeletonPost/>
                </PostDiv> : undefined}
            </PostDiv>
        </>
    )
}

const PostDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 40px;
  height: fit-content;
  @media only screen and (max-width: 576px) {
    width: 100%;
  }
`

export default InfinityScroll
