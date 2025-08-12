import Link from "next/link";
import footerDataContent from "../../../data/footerContent";
import AgentLink from "@/components/AgentLink/AgentLink";

const FooterContent = () => {
  return (
    <>
      {footerDataContent.map((item) => (
        <div className="col-xl-2 col-lg-2 col-sm-6" key={item.id}>
          <span className="text-18 fw-500 mb-20  w-100">{item.title}</span>
          <div className="d-flex y-gap-0 flex-column w-100">
            {item.menuList.map((menu, i) => (
              <AgentLink
                className="text-14 footer-link"
                href={menu.routerPath}
                key={i}
                area-label={menu.areaLabel}
              >
                {menu.name}
              </AgentLink>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterContent;
