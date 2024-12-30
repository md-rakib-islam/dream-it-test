import MainHome from "@/components/home/index";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Home() {
  return (
    <div>
      <MainHome />
      <GoogleAnalytics gaId="G-TXJZSJCPCZ" />
    </div>
  );
}
