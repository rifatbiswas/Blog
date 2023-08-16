
import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs]= useState([]);


  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/read");
      const data = res.data;
      return data; 
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  useEffect(() => {
    sendRequest()
      .then((data) => setBlogs(data.data))
      .catch((error) => console.error("Error setting blogs:", error));
  }, []);
    // console.log(blogs);

    return (
        <div>
          {blogs.map((blog, index) => (
        <Blog
          key={blog.index}
          title={blog.title}
          content={blog.content}
          image={blog.image}
          author={blog.author}
        />
      ))}
          <Blog/>
        </div>
    );
};

export default Blogs;


