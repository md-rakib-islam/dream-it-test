import dynamic from "next/dynamic";
import Address from "@/components/block/Address";
import Social from "@/components/common/social/Social";
import { GET_METADATA_BY_CONTENT_NAME } from "@/constant/constants";
import Image from "next/image";

const fetchMetadata = async () => {
  try {
    const res = await fetch(`${GET_METADATA_BY_CONTENT_NAME}/blog`);
    if (!res.ok) {
      throw new Error("Failed to fetch metadata");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      meta_title:
        "Blogs || Dream Tourism SRLS - Your Place for Amazing Travel Adventure",
      meta_description:
        "Start your dream vacation with Dream Tourism SRLS. Explore fantastic destinations and enjoy unforgettable adventures. Your perfect getaway is just a click away!",
      image:
        "https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/5dbac07d-cbd4-4694-9a38-615bf832f800/public", // Default image
    };
  }
};

// Define the generateMetadata function
export async function generateMetadata() {
  const metadata = await fetchMetadata();
  return {
    title: metadata.meta_title,
    description: metadata.meta_description,
    openGraph: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      images: [
        {
          url: metadata?.cloudflare_image,
          width: 100,
          height: 100,
          alt: metadata?.meta_title,
        },
      ],
      type: "website",
    },
    twitter: {
      title: metadata.meta_title,
      description: metadata.meta_description,
      image: metadata?.cloudflare_image,
    },
  };
}
const Blogs = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row x-gap-20 y-gap-20 justify-between">
            <div className="col-12">
              <h1 className="text-20 sm:text-24 fw-500">Our Blogs</h1>
            </div>
            <div className="col-md-6 col-sm-12">
              <div>
                <Image
                  src="/img/blogs/blog.jpg"
                  width={1200}
                  height={400}
                ></Image>
                <h5>This is the Demo Post Title </h5>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry’s
                  standard dummy text Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry’s standard dummy text
                </p>
              </div>
            </div>
            <div className="col-md-6 sm:d-none">
              <div className="d-flex justify-between mb-20">
                <Image
                  src="/img/blogs/blog.jpg"
                  width={200}
                  height={50}
                ></Image>
                <div className="ml-20">
                  <h5>This is the Demo Post Title </h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
              <div className="d-flex justify-between mb-20">
                <Image
                  src="/img/blogs/blog.jpg"
                  width={200}
                  height={50}
                ></Image>
                <div className="ml-20">
                  <h5>This is the Demo Post Title </h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
              <div className="d-flex justify-between ">
                <Image
                  src="/img/blogs/blog.jpg"
                  width={200}
                  height={50}
                ></Image>
                <div className="ml-20">
                  <h5>This is the Demo Post Title </h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-12">
              <Image src="/img/blogs/blog.jpg" width={600} height={400}></Image>
            </div>
            <div className="col-md-3 col-12">
              <Image src="/img/blogs/blog.jpg" width={600} height={400}></Image>
            </div>
            <div className="col-md-3 col-12">
              <Image src="/img/blogs/blog.jpg" width={600} height={400}></Image>
            </div>
            <div className="col-md-3 col-12 ">
              <Image src="/img/blogs/blog.jpg" width={600} height={400}></Image>
            </div>
            <div className="col-12 ">
              <div className="px-40 py-40 bg-dark-2 ">
                <div className="row">
                  <div className="col-md-6 text-white">
                    <h5>Want to get update tips & tricks?</h5>
                    <p className="text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <div className="single-field col-md-6 col-sm-12 d-flex sm:d-block">
                    <div className="mr-10 sm:mr-0 sm:mb-10 sm:mt-10">
                      <input
                        //   onChange={(e) => setEmail(e.target.value)}
                        //   value={email}
                        required
                        name="email"
                        className="border border-secondary w-100 h-50"
                        style={{ backgroundColor: "#ffffff" }}
                        type="email"
                        placeholder="Your Email"
                      />
                    </div>
                    {/* End email input */}

                    <div>
                      <button
                        //   disabled={!email || isLoading}
                        //   onClick={handleSubmit}
                        className="px-20 fw-400 text-14 border-white -outline-white h-50 text-white  w-100 pointer"
                      >
                        Subscribe
                      </button>
                    </div>
                    {/* End subscribe btn */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="row x-gap-20 y-gap-20">
                <div className="col-md-6">
                  <div>
                    <Image
                      src="/img/blogs/blog.jpg"
                      width={600}
                      height={400}
                    ></Image>
                    <h5>This is the Demo Post Title </h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry’s
                      standard dummy text Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry. Lorem Ipsum has
                      been the industry’s standard dummy text
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <Image
                      src="/img/blogs/blog.jpg"
                      width={600}
                      height={400}
                    ></Image>
                    <h5>This is the Demo Post Title </h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry’s
                      standard dummy text Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry. Lorem Ipsum has
                      been the industry’s standard dummy text
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <Image
                      src="/img/blogs/blog.jpg"
                      width={600}
                      height={400}
                    ></Image>
                    <h5>This is the Demo Post Title </h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry’s
                      standard dummy text Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry. Lorem Ipsum has
                      been the industry’s standard dummy text
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <Image
                      src="/img/blogs/blog.jpg"
                      width={600}
                      height={400}
                    ></Image>
                    <h5>This is the Demo Post Title </h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry’s
                      standard dummy text Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry. Lorem Ipsum has
                      been the industry’s standard dummy text
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row x-gap-20 y-gap-20">
                <div className="col-12">
                  <div>
                    <div className="mb-20">
                      <h5> My Personal Favarite </h5>
                    </div>
                    <div className="d-flex justify-between mb-20">
                      <Image
                        src="/img/blogs/blog.jpg"
                        width={150}
                        height={50}
                      ></Image>
                      <div className="ml-10">
                        <h5>This is the Demo Post Title </h5>
                        <p>Read More</p>
                      </div>
                    </div>
                    <div className="d-flex justify-between mb-20">
                      <Image
                        src="/img/blogs/blog.jpg"
                        width={150}
                        height={50}
                      ></Image>
                      <div className="ml-10">
                        <h5>This is the Demo Post Title </h5>
                        <p>Read More</p>
                      </div>
                    </div>
                    <div className="d-flex justify-between mb-20">
                      <Image
                        src="/img/blogs/blog.jpg"
                        width={150}
                        height={50}
                      ></Image>
                      <div className="ml-10">
                        <h5>This is the Demo Post Title </h5>
                        <p>Read More</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div>
                    <div className="mb-30 mt-20">
                      <h5> Sponsor</h5>
                    </div>
                    <div className="sponsor">
                      <div className="sponsor-contetn">
                        <div
                          className={`sponsor-bg`}
                          style={{
                            backgroundImage:
                              "url(https://blog.dreamtourism.co.uk/wp-content/uploads/2024/07/public-2-1024x682.jpg)",
                          }}
                        >
                          <div className="sponsor-overlay"></div>
                        </div>
                      </div>
                      <div className="sponsor-text-content">
                        <h2 className="sm:text-20"> Capri Island Day Trip </h2>
                        <button
                          //   disabled={!email || isLoading}
                          //   onClick={handleSubmit}
                          className="mt-15 px-20 py-10 fw-500 text-14 border-white -outline-white   text-white   pointer"
                        >
                          Book Now
                        </button>
                      </div>
                      <div className="sponsor-conter-text">
                        <div className="conter-text"> SELLING FAST</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div>
                    <div className="mb-20 mt-20">
                      <h5> Explore</h5>
                    </div>
                    <div className="explore mb-20">
                      <div className="explore-contetn">
                        <div
                          className={`explore-bg`}
                          style={{
                            backgroundImage:
                              "url(https://blog.dreamtourism.co.uk/wp-content/uploads/2024/07/public-2-1024x682.jpg)",
                          }}
                        >
                          <div className="explore-overlay"></div>
                        </div>
                      </div>
                      <div className="explore-text-content">
                        <h2 className="sm:text-20">
                          Colosseum Full Experience With Arena Ticket{" "}
                        </h2>
                        <button
                          //   disabled={!email || isLoading}
                          //   onClick={handleSubmit}
                          className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                    <div className="explore mb-20">
                      <div className="explore-contetn">
                        <div
                          className={`explore-bg`}
                          style={{
                            backgroundImage:
                              "url(https://blog.dreamtourism.co.uk/wp-content/uploads/2024/07/public-2-1024x682.jpg)",
                          }}
                        >
                          <div className="explore-overlay"></div>
                        </div>
                      </div>
                      <div className="explore-text-content">
                        <h2> Capri Island Tour With Blue Grotto </h2>
                        <button
                          //   disabled={!email || isLoading}
                          //   onClick={handleSubmit}
                          className="mt-15 px-20 fw-500 text-14 border-white -outline-white h-50 text-white   pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(Blogs), { ssr: true });
