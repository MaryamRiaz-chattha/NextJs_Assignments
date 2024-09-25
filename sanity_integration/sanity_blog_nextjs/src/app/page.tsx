import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type BlogType = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const getData = async () => {
  const revalidate =10;
  const result = await client.fetch (`*[_type=="blogs"]`, { revalidate });
  return result;
};

export default async function Home() {
  const blogs = await getData();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog: BlogType) => (
          <div
            key={blog._id}
            className="flex flex-col border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-white overflow-hidden"
          >
            <Image
              src={urlFor(blog.image).url()}
              height={400}
              width={400}
              alt="img-blog"
              className="w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                {blog.description}
              </p>
              <button className="mt-auto text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-medium py-2 px-4 rounded-md self-end">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
