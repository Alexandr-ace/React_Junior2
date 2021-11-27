import React, { useRef } from "react";
import { useState } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import { usePosts } from "../hooks/usePosts";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { useEffect } from "react";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserrver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();
    console.log(lastElement);

    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getAll(limit, page);
            setPosts([...posts, ...response.data]);
            const totalCount = response.headers["x-total-count"];
            setTotalPages(getPageCount(totalCount, limit));
        }
    );

    useObserrver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <div className="App">
            <MyButton
                style={{ marginTop: "30px" }}
                onClick={() => {
                    setModal(true);
                }}
            >
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: "15px 0" }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            <MySelect
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue="Количество элементов на страницу"
                options={[
                    { value: 5, name: "5" },
                    { value: 10, name: "10" },
                    { value: 25, name: "25" },
                    { value: -1, name: "Показать всё" },
                ]}
            />
            {postError && <h1>Произошла ошибка ${postError}</h1>}
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title="Список постов 1"
            />
            <div
                ref={lastElement}
                style={{ height: "20px", background: "red" }}
            />
            {isPostsLoading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                    }}
                >
                    <Loader />
                </div>
            )}
            <Pagination
                totalPages={totalPages}
                changePage={changePage}
                page={page}
            />
        </div>
    );
}

export default Posts;
