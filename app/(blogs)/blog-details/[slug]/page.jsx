import Wrapper from "@/components/layout/Wrapper";
import BlogSingleDynamic from "./BlogSingleDynamic";

export async function generateStaticParams() {
  return [{ slug: "1" }, { slug: "2" }, { slug: "3" }];
}

export default function Blog({ params }) {
  return (
    <>
      <Wrapper>
        <BlogSingleDynamic params={params} />
      </Wrapper>
    </>
  );
}
