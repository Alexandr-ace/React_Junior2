import React from "react";
import "./styles/App.css";
import { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

import { useMemo } from "react";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript 1", body: "Description" },
        { id: 2, title: "Javascript 2", body: "Description" },
        { id: 3, title: "Javascript 3", body: "Description" },
    ]);

    const [filter, setFilter] = useState({ sort: "", query: "" });

    const sortedPost = useMemo(() => {
        console.log("Отработала функция");
        if (filter.sort) {
            return [...posts].sort((a, b) =>
                a[filter.sort].localeCompare(b[filter.sort])
            );
        } else {
            return posts;
        }
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPost.filter((post) =>
            post.title.toLocaleLowerCase().includes(filter.query.toLowerCase())
        );
    }, [filter.query, sortedPost]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    return (
        <div className="App">
            <PostForm create={createPost} />
            <hr style={{ margin: "15px 0" }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            {sortedAndSearchedPosts.length !== 0 ? (
                <PostList
                    remove={removePost}
                    posts={sortedAndSearchedPosts}
                    title="Список постов 1"
                />
            ) : (
                <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>
            )}
        </div>
    );
}

export default App;
