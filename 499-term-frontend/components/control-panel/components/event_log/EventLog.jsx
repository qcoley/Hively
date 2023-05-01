import { useMemo, useEffect, useState } from "react";
import Panel from "../../../ui/Containers/Panel";
import PanelLabel from "../../../ui/Labels/PanelLabel";
import { useTable, useSortBy } from "react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { eventsAtom } from "../../../../atom/eventsAtom";
import { toast } from "react-toastify";
import { useInterval } from "usehooks-ts";
import { fetcher } from "../../../../lib/fetcher";
import { format, parseISO } from "date-fns";

export default function EventLog() {
  //state
  const [events, setEvents] = useRecoilState(eventsAtom);
  const data = useMemo(() => events, [events]);
  const columns = useMemo(
    () => [
      {
        Header: "Appliance",
        accessor: "fields.title",
      },
      {
        Header: "On At",
        accessor: "fields.on_at",
        Cell: (props) => format(parseISO(props?.value), "M/dd/yy HH:mm"),
      },
      {
        Header: "Off At",
        accessor: "fields.off_at",
        Cell: (props) => format(parseISO(props?.value), "M/dd/yy HH:mm"),
      },
      {
        Header: "Watts Used",
        accessor: "fields.watts_used",
        Cell: (props) => props?.value?.toFixed(3),
      },
      {
        Header: "Water Used",
        accessor: "fields.water_used",
        Cell: (props) => props?.value?.toFixed(3),
      },
      {
        Header: "Cost",
        accessor: "fields.cost",
        Cell: (props) => props?.value?.toFixed(6),
      },
    ],
    []
  );

  //fetch events
  async function fetchEvents() {
    let res = await fetcher.get("get_todays_events/");

    //error checking
    if (res.code !== 200) {
      console.error(res.message);
      toast(`Failed to fetch todays event log`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setEvents(res.data);
  }

  //fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  //refresh every 5 seconds
  useInterval(() => {
    fetchEvents();
  }, 5000);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleSortBy,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  //this doesnt seem to be working
  // useEffect(() => {
  //   toggleSortBy("on_at", true);
  // }, [todaysEvents]);

  return (
    <Panel className="h-full">
      <PanelLabel>Event Log</PanelLabel>
      <div className="mx-3 my-2 pr-6 flex w-full h-[35vh] rounded-md 2xl:h-[40vh]">
        <table
          {...getTableProps()}
          className="min-w-full divide-y overflow-y-auto border-gray-800 border-2 divide-gray-400 flex flex-col items-center"
        >
          <thead className="bg-gray-700 w-full">
            {headerGroups.map((headerGroup) => (
              <tr
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
                className="w-full flex flex-row justify-around"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-3 py-3.5 text-left inline-flex space-x-2 text-sm font-semibold text-white"
                  >
                    <span>{column.render("Header")}</span>
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon className="text-white h-5 w-5" />
                        ) : (
                          <ChevronUpIcon className="text-white h-5 w-5" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-gray-600 w-full">
            {rows.map((row, rowIdx) => {
              prepareRow(row);
              return (
                <tr
                  key={row.id}
                  {...row.getRowProps()}
                  className={
                    (rowIdx % 2 === 0 ? undefined : "bg-gray-700 ") +
                    "w-full flex flex-row justify-around"
                  }
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        className="px-3 py-4 text-sm text-left w-full text-white"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
