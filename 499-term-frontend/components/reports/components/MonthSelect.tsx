import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { classNames } from "../../../lib/functions";
import { format } from "date-fns";
import Row from "../../ui/Containers/Row";

export default function MonthSelect({
  label,
  months,
  selected,
  setSelected,
}: {
  label: string;
  months: Date[];
  selected: Date;
  setSelected: any;
}) {
  return (
    <Row className="items-baseline space-x-4">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-white">
              {label}
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-200 py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-hPurple-500 sm:text-sm">
                <span className="block truncate">
                  {format(selected, "MMMM")}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg ring-1 ring-gray-900 ring-opacity-5 focus:outline-none sm:text-sm">
                  {months.map((month, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-hPurple-500 text-white"
                            : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={month}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {format(month, "MMM")}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-hPurple-500",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </Row>
  );
}
