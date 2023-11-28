import { createContext, useContext } from "react";


export let BlogContext = createContext({
    loader: false,
    changeLoader: () => {}
});

export const BlogProvider = BlogContext.Provider;

const useBlog = () => {
    return useContext(BlogContext);
}

export default useBlog;