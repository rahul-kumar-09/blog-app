import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import axios from "axios";
import { post } from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    post = axios
      .get("http://localhost/wordpress/wp-json/wp/v2/posts")
      .then((res) => {
        setPosts(res.data);
        // console.log(res.data);
      });
  }, []);
  return (
    <div>
      <div className="flex mx-2 ">
        {posts.map((post, index) => (
          <div
            key={index}
            className="border rounded-md mt-2 mx-2 w-64 p-2 hover:shadow-slate-300 hover:shadow-2xl cursor-pointer"
          >
            <h2 className="text-2xl font-bold">{post.title.rendered}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
          </div>
        ))}
      </div>
    </div>
  );
}
