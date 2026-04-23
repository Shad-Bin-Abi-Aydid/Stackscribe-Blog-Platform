import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFormClient";
import { blogService } from "@/services/blog.service";


export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {const { id } = await params;
  const { data } = await blogService.getBlogById(id);

  return (
    <div>
      <CreateBlogFormClient initialData={data} />
    </div>
  );
}
