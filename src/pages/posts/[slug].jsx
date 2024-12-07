import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Single = () => {
  const router = useRouter();
  const { id } = router.query; // Get dynamic route parameter
  const [post, setPost] = useState({});

  useEffect(() => {
    if (id) {
      // Ensure `id` is available
      let url = `http://localhost/wordpress/wp-json/wp/v2/posts/${id}`;
      axios
        .get(url)
        .then((res) => {
          console.log("res", res);
          setPost(res.data);
        })
        .catch((err) => {
          console.log("error:", err.message);
        });
    }
  }, [id]);

  return (
    <>
      {Object.keys(post).length ? (
        <div className="p-5">
          <div className="max-w-md">
            <img
              className="w-full"
              src={post.featured_src}
              alt={post.title.rendered}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{post.title.rendered}</h1>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          ></div>
        </div>
      ) : (
        "Loading...."
      )}
    </>
  );
};

export default Single;
