import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost/wordpress/wp-json/wp/v2/posts"
        );
        setPosts(res.data);
      } catch (err) {
        // console.error("Error fetching posts:", err.message);
        setError("Please try again in a few minutes.");
      } finally {
        setLoading(false)
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {loading && <p> Loading... </p>}
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error message */}
      <div className="flex mx-2">
        {!loading && posts.length > 0
          ? posts.map((post, index) => (
              <Link
                href={`/posts/${post.id}`}
                key={index}
                className="border rounded-md mt-2 mx-2 w-64 p-2 hover:shadow-slate-300 hover:shadow-2xl cursor-pointer"
              >
                <h2 className="text-2xl font-bold">{post.title.rendered}</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                ></p>
              </Link>
            ))
          : !loading && !error && <p className="text-gray-500">No posts available.</p>}
      </div>
    </div>
  );
}
