import Empty from "@/components/Empty";
import Marquee from "react-fast-marquee";

export default function SplashScreen() {
  return (
    <main className="flex flex-col items-center w-full min-h-[100vh] bg-green justify-center text-textDark gap-0">
      {/* <div className="flex gap-2 items-center flex-row-reverse">
        <h1 className="text-3xl font-semibold">Billiance</h1>
      </div>
      <p className="text-xl mt-1">Make Invoices Brilliantly!</p> */}
      <Marquee
        speed={100}
        className="text-[22vw] md:text-[10vw] overflow-hidden translate-y-11"
      >
        <span>
          INVOICE • BILLIANCE <Empty />
        </span>
      </Marquee>
      <Marquee
        speed={100}
        direction="right"
        className="text-[22vw] md:text-[10vw] overflow-hidden"
      >
        <span>
          BRILLIANT • EASY • FAST <Empty />
        </span>
      </Marquee>
      <Marquee
        speed={100}
        className="text-[22vw] md:text-[10vw] overflow-hidden -translate-y-11"
      >
        <span>
          INVOICE • BILLIANCE <Empty />
        </span>
      </Marquee>
    </main>
  );
}
