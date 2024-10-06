"use client";

import { Interweave } from "interweave";
import Image from "next/image";

const SingleBlogSkeleton = () => {
  // localStorage.clear();
  return (
    <section className="layout-pt-md layout-pb-md">
      <div className="container">
        <div className="row y-gap-40 justify-center text-center">
          <div className="col-auto">
            <div className="text-15 fw-500 text-blue-1 mb-8 text-capitalize skeleton">
              ArtArt
            </div>
            <h1 className="text-30 fw-600 skeleton">
              Booking travel during Corona: good advice in an uncertain time
            </h1>
            <div className="text-15 text-light-1 mt-10 skeleton">
              Jan 06, 2023
            </div>
          </div>
          <div className="col-12 skeleton">
            <Image
              src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/6b16b61e-0e45-4631-85a9-c9058ed0bf00/public"
              // className="col-12 rounded-4 destination_banner_img"
              height={400}
              width={1920}
              className="col-12 rounded-4 w-100 img_large_details"
            />
          </div>
        </div>
        {/* End .row top bar image and title */}

        <div className="row y-gap-30 justify-center">
          <div className="col-xl-8 col-lg-10 layout-pt-md skeleton">
            What makes a good brand book? Sed viverra ipsum nunc aliquet
            bibendum enim facilisis gravida. Diam phasellus vestibulum lorem sed
            risus ultricies. Magna sit amet purus gravida quis blandit. Arcu
            cursus vitae congue mauris. Nunc mattis enim ut tellus elementum
            sagittis vitae et leo. Semper risus in hendrerit gravida rutrum
            quisque non. At urna condimentum mattis pellentesque id nibh tortor.
            A erat nam at lectus urna duis convallis convallis tellus. Sit amet
            mauris commodo quis imperdiet massa. Vitae congue eu consequat ac
            felis. Sed viverra ipsum nunc aliquet bibendum enim facilisis
            gravida. At urna condimentum mattis pellentesque id nibh. Laoreet
            non curabitur Magna etiam tempor orci eu lobortis elementum.
            Bibendum est ultricies integer quis. Semper eget duis at tellus.
            icon “Sed viverra ipsum nunc aliquet bibendum enim facilisis
            gravida. Diam phasellus vestibulum lorem sed risus ultricies. Magna
            sit amet purus gravida quis blandit. Arcu cursus vitae congue
            mauris.“ Donec purus posuere nullam lacus aliquam egestas arcu. A
            egestas a, tellus massa, ornare vulputate. Erat enim eget laoreet
            ullamcorper lectus aliquet nullam tempus id. Dignissim convallis
            quam aliquam rhoncus, lectus nullam viverra. Bibendum dignissim
            tortor, phasellus pellentesque commodo, turpis vel eu. Donec
            consectetur ipsum nibh lobortis elementum mus velit tincidunt
            elementum. Ridiculus eu convallis eu mattis iaculis et, in dolor.
            Sem libero, tortor suspendisse et, purus euismod posuere sit. Risus
            dui ut viverra venenatis ipsum tincidunt non, proin. Euismod
            pharetra sit ac nisi. Erat lacus, amet quisque urna faucibus.
            Rhoncus praesent faucibus rhoncus nec adipiscing tristique sed
            facilisis velit. Neque nulla porta ut urna rutrum. Aliquam cursus
            arcu tincidunt mus dictum sit euismod cum id. Dictum integer
            ultricies arcu fermentum fermentum sem consectetur. Consectetur
            eleifend aenean eu neque euismod amet parturient turpis vitae.
            Faucibus ipsum felis et duis fames.
            {/* <DetailsContent /> */}
            {/* Details content */}
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
};

export default SingleBlogSkeleton;
