import React from "react";
import "./styles/App.css";
import { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import { useMemo } from "react";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript 1", body: "Description" },
        { id: 2, title: "Javascript 2", body: "Description" },
        { id: 3, title: "Javascript 3", body: "Description" },
    ]);

    const [selectedSort, setSelectedSort] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const sortedPost = useMemo(() => {
        console.log("Отработала функция");
        if (selectedSort) {
            return [...posts].sort((a, b) =>
                a[selectedSort].localeCompare(b[selectedSort])
            );
        } else {
            return posts;
        }
    }, [selectedSort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPost.filter((post) =>
            post.title.toLocaleLowerCase().includes(searchQuery)
        );
    }, [searchQuery, sortedPost]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const sortPosts = (sort) => {
        setSelectedSort(sort);
    };

    return (
        <div className="App">
            <PostForm create={createPost} />
            <hr style={{ margin: "15px 0" }} />
            <div>
                <MyInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск"
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка по"
                    options={[
                        {
                            value: "title",
                            name: "По названию",
                        },
                        { value: "body", name: "По описанию" },
                    ]}
                />
            </div>
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