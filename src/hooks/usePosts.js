import { useMemo } from "react";
export const useSortedPosts = (posts, sort) => {
    const sortedPost = useMemo(() => {
        console.log("Отработала функция");
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        } else {
            return posts;
        }
    }, [sort, posts]);
    return sortedPost;
};

export const usePosts = (posts, sort, query) => {
    const sortedPost = useSortedPosts(posts, sort);
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPost.filter((post) =>
            post.title.toLocaleLowerCase().includes(query.toLowerCase())
        );
    }, [query, sortedPost]);
    return sortedAndSearchedPosts;
};
