/* eslint-disable @next/next/no-img-element */
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { classNames } from "../../lib/functions";
import Link from "next/link";
import { fetcher } from "../../lib/fetcher";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  appliancesAtom,
  aperturesAtom,
} from "../../atom/appliancesAndAperturesAtom";
import { useInterval } from "usehooks-ts";
import { toast } from "react-toastify";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Reports", href: "/reports" },
  { name: "Control Panel", href: "/control" },
];

export default function NavBar() {
  const router = useRouter();

  //state
  const [appliances, setAppliances] = useRecoilState(appliancesAtom);
  const [apertures, setApertures] = useRecoilState(aperturesAtom);
  const [stopRefetching, setStopRefetching] = useState(false);

  //fetch appliances
  async function fetchAppliances() {
    let res = await fetcher.get("appliances/");
    //check errors
    if (res.code !== 200) {
      console.error(res.message);
      toast(`Failed to fetch appliance list, try refreshing page`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setStopRefetching(true);
      return;
    }
    setAppliances(res.data);
  }

  //fetch apertures
  async function fetchApertures() {
    let res = await fetcher.get("apertures/");

    //check errors
    if (res.code !== 200) {
      console.error(res.message);
      toast(`Failed to fetch aperture list, try refreshing page`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setStopRefetching(true);
      return;
    }
    setApertures(res.data);
  }

  let refetchTime =
    router.pathname === "/" || router.pathname === "/control" ? 5000 : 60000;

  //fetch appliances on mount
  useEffect(() => {
    fetchAppliances();
    fetchApertures();
  }, []);

  //refetch appliances and apertures every five seconds if page is index or /control, otherwise only refetch every 60 seconds to avoid strain
  //this is so information when the map or control panel opens is as not stale as possible
  useInterval(
    () => {
      fetchAppliances();
      fetchApertures();
    },
    stopRefetching ? null : refetchTime
  );

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className=" max-w-7xl px-4 py-1 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 relative ">
                  <img
                    src="./logo-small.png"
                    alt=""
                    className="w-16 h-auto block lg:hidden"
                  />
                  <img
                    src="./logo.png"
                    alt=""
                    className="w-auto h-16 hidden lg:block"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href === router.pathname
                            ? "bg-gray-700 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === router.pathname
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700",
                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  )}
                  // className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
