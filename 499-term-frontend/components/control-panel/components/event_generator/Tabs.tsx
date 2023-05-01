import { Dispatch, SetStateAction } from "react";
import { classNames } from "../../../../lib/functions";

const tabs = [
  { name: "Appliances" },
  // { name: "Apertures" },
  { name: "Air Quality" },
];

export default function EventTabs({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          onChange={(e) => {
            setSelectedTab(e.target.value);
          }}
          className="block w-1/2 ml-10 rounded-md border-gray-300 py-1 my-2 pl-3 pr-10 text-base text-gray-800 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={tabs.find((tab) => tab.name === selectedTab)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex w-full justify-evenly space-x-8"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                type="button"
                onClick={() => setSelectedTab(tab.name)}
                className={classNames(
                  tab.name === selectedTab
                    ? "border-hPurple-500 text-white"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-400",
                  "whitespace-nowrap w-full border-b-2 py-4 px-1 text-sm font-medium"
                )}
                aria-current={tab.name === selectedTab ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
