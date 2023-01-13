import Link from "next/link";
import Image from "next/image";
import { classJoin } from "@/utils";
import { useRouter } from "next/router";

const Header = () => {
  const route = useRouter();

  return (
    <div className="h-12 bg-white  space-x-8 items-center px-24 font-sans text-lg text-table-header flex justify-between ">
      <div className="flex items-center  space-x-8 items-center ">
        <Image src="/logo.png" alt="logo" width={170} height={24} />
        <Link
          href="/"
          className={classJoin([
            "px-5 py-2 ",
            route.pathname === "/" ? "border-0 border-b-4 border-primary text-default-text" : ""
          ])}
        >
          Currency Converter
        </Link>
        <Link
          href="/history"
          className={classJoin([
            "px-5 py-2 ",
            route.pathname === "/history" ? "border-0 border-b-4 border-primary text-default-text" : ""
          ])}
        >
          View Conversion History
        </Link>
      </div>
      <Link href="" className="text-primary font-sans flex justify-end">
        LOGOUT
      </Link>
    </div>
  );
};

export default Header;
