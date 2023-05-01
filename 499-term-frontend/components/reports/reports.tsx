import Panel from "../ui/Containers/Panel";
import Row from "../ui/Containers/Row";
import PanelLabel from "../ui/Labels/PanelLabel";
import { eachMonthOfInterval, format, startOfYear } from "date-fns";
import MonthSelect from "./components/MonthSelect";
import { useEffect, useState } from "react";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import BudgetModal from "./components/BudgetModal";
import Graph from "./components/Graph";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import chartTrendline from "chartjs-plugin-trendline";
import annotationPlugin from "chartjs-plugin-annotation";
import { faker } from "@faker-js/faker";
import { eachDayOfInterval, lastDayOfMonth } from "date-fns";
import { useRecoilValue, useRecoilState } from "recoil";
import { budgetAtom } from "../../atom/budgetAtom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { linearProject } from "../../lib/lineFitter";
import {
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import ReactDOMServer from "react-dom/server";
import Col from "../ui/Containers/Col";
import { EventLog } from "../../types/EventLog";
import { fetcher } from "../../lib/fetcher";
import FormError from "../ui/Forms/FormError";
import { BeatLoader } from "react-spinners";

//get months of this year for select
const months = eachMonthOfInterval({
  start: startOfYear(new Date()),
  end: new Date(),
});

export default function ReportsPage() {
  //state
  const [selectedMonth, setSelectedMonth] = useState<Date>(
    months[months.length - 1]
  );
  const [budgetModalOpen, setBudgetModalOpen] = useState<boolean>(false);
  const [budget, setBudget] = useRecoilState(budgetAtom);
  const [budgetError, setBudgetError] = useState<string | null>(null);

  const [reports, setReports] = useState<EventLog[]>([]);
  const [reportsError, setReportsError] = useState<string | null>(null);
  const [noReports, setNoReports] = useState<boolean>(true);

  const [firstReportDay, setFirstReportDay] = useState<number>(1);

  const [showLoading, setShowLoading] = useState<boolean>(true);

  //graph state
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [waterData, setWaterData] = useState<any[]>([]);
  const [costData, setCostData] = useState<any[]>([]);
  const [energyProj, setEnergyProj] = useState<any[]>([]);
  const [waterProj, setWaterProj] = useState<any[]>([]);
  const [costProj, setCostProj] = useState<any[]>([]);

  async function fetchBudget() {
    let res = await fetcher.get("budget/");
    if (res.code !== 200) {
      setBudgetError(res.message);
      console.error(res.message);
      return;
    }
    setBudget(res.data);
  }

  async function fetchMonthlyReport() {
    //format date as YYYY-MM-dd
    let payload = {
      date: format(selectedMonth, "yyyy-MM-dd"),
    };
    let res = await fetcher.post("monthly_report/", payload);

    //error checking
    if (res.code !== 200) {
      setBudgetError(res.message);
      console.error(res.message);
      return;
    }
    setReports(res.data);
    setFirstReportDay(res.first_day);
    setNoReports(false);
    setShowLoading(false);
  }

  //life cycle methods
  //on mount
  useEffect(() => {
    fetchBudget();
    fetchMonthlyReport();
  }, []);

  //on month change
  useEffect(() => {
    setShowLoading(true);
    fetchMonthlyReport();
  }, [selectedMonth]);

  //on reports changed
  useEffect(() => {
    //if reports is empty, set no reports message, reset graph state
    if (reports.length === 0) {
      setEnergyData([]);
      setWaterData([]);
      setCostData([]);
      setEnergyProj([]);
      setWaterProj([]);
      setCostProj([]);
      setNoReports(true);
      return;
    }
    //formatting data for graph
    let energyByDate: number[] = [];
    let waterByDate: number[] = [];
    let costByDate: number[] = [];
    let energy = 0;
    let water = 0;
    let cost = 0;

    //append 0s for every day from the first of the month to firstReportDay
    let i = 0;
    for (i; i < firstReportDay; i++) {
      energyByDate.push(0);
      waterByDate.push(0);
      costByDate.push(0);
    }

    for (const report of reports) {
      //append the data from reports
      energy += report.watts_used / 1000;
      water += report.water_used;
      cost += report.cost;
      energyByDate.push(energy);
      waterByDate.push(water);
      costByDate.push(cost);
    }

    //project data for days in the future
    let costProjection = days.map((day, index) => {
      if (index === costByDate.length - 1) {
        return costByDate[costByDate.length - 1];
      }
      if (!costByDate[index] && costByDate[index] !== 0) {
        return linearProject(costByDate, index);
      }
      return null;
    });
    let energyProjection = days.map((day, index) => {
      if (index === energyByDate.length - 1) {
        return energyByDate[energyByDate.length - 1];
      }
      if (!energyByDate[index] && energyByDate[index] !== 0) {
        return linearProject(energyByDate, index);
      }
      return null;
    });
    let waterProjection = days.map((day, index) => {
      if (index === waterByDate.length - 1) {
        return waterByDate[waterByDate.length - 1];
      }
      if (!waterByDate[index] && waterByDate[index] !== 0) {
        return linearProject(waterByDate, index);
      }
      return null;
    });

    //set graph state
    setEnergyData(energyByDate);
    setWaterData(waterByDate);
    setCostData(costByDate);
    setEnergyProj(energyProjection);
    setWaterProj(waterProjection);
    setCostProj(costProjection);
  }, [reports]);

  //graph setup
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin,
    chartTrendline
  );

  //budget thresholds for graph, only shown if budget is active
  const annotations = [
    {
      id: "cost-budg",
      type: "line",
      mode: "horizontal",
      value: budget.max_cost,
      scaleID: "y",
      borderWidth: 2,
      borderDash: [10, 5],
      borderColor: "rgba(212, 4, 8, 0.5)",
      label: {
        enabled: true,
        content: `Cost Budget:`,
        position: "start",
      },
    },
    {
      id: "energy-budg",
      type: "line",
      mode: "horizontal",
      value: budget.max_energy,
      scaleID: "y1",
      borderWidth: 2,
      borderDash: [10, 5],
      borderColor: "rgb(222, 181, 16)",
      label: {
        enabled: true,
        content: `Energy Budget:`,
        position: "start",
      },
    },
    {
      id: "water-budg",
      type: "line",
      mode: "horizontal",
      value: budget.max_water,
      scaleID: "y2",
      borderWidth: 2,
      borderDash: [10, 5],
      borderColor: "rgb(17, 132, 214)",
      label: {
        enabled: true,
        content: `Water Budget:`,
        position: "start",
      },
    },
  ];

  //graph options
  let options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: true,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        ticks: {
          beginAtZero: true,
        },
        title: {
          display: true,
          text: "Cost ($)",
        },
        beginAtZero: true,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        beginAtZero: true,
        title: {
          display: true,
          text: "Energy Usage (kWh)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        beginAtZero: true,
        title: {
          display: true,
          text: "Water Usage (gal)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      annotation: {
        //only show annotations if budget is active
        annotations: budget.is_active ? annotations : [],
      },
    },
  };

  //get days of the month for labels and other data generation
  let days = eachDayOfInterval({
    start: selectedMonth,
    end: lastDayOfMonth(selectedMonth),
  });
  let labels = days.map((day) => day.getDate().toString());

  //format data for graphs
  const data = {
    labels,
    datasets: [
      {
        label: "Cost ($)",
        data: labels.map((label, index) => costData[index]),
        borderColor: "rgba(212, 4, 8, 0.7)",
        backgroundColor: "rgba(212, 4, 8, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Cost Projection ($)",
        data: labels.map((label, index) => costProj[index]),
        borderColor: "rgba(212, 4, 8, 0.7)",
        backgroundColor: "rgba(212, 4, 8, 0.5)",
        yAxisID: "y",
        borderDash: [8, 10],
      },
      {
        label: "Energy (kWh)",
        data: labels.map((label, index) => energyData[index]),
        borderColor: "rgb(222, 181, 16)",
        backgroundColor: "rgba(222, 181, 16, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Energy Projection (kWh)",
        data: labels.map((label, index) => energyProj[index]),
        borderColor: "rgb(222, 181, 16)",
        backgroundColor: "rgba(222, 181, 16, 0.5)",
        yAxisID: "y1",
        borderDash: [8, 10],
      },
      {
        label: "Water (gal)",
        data: labels.map((label, index) => waterData[index]),
        borderColor: "rgb(17, 132, 214)",
        backgroundColor: "rgba(17, 132, 214, 0.5)",
        yAxisID: "y2",
      },
      {
        label: "Water Projection (gal)",
        data: labels.map((label, index) => waterProj[index]),
        borderColor: "rgb(17, 132, 214)",
        backgroundColor: "rgba(17, 132, 214, 0.5)",
        yAxisID: "y2",
        borderDash: [8, 10],
      },
    ],
  };

  return (
    <Panel className="w-full h-full">
      <BudgetModal open={budgetModalOpen} setOpen={setBudgetModalOpen} />
      <PanelLabel>Reports</PanelLabel>
      <div className="flex flex-col h-full w-full px-4">
        {/* selecter, edit budget button, and warnings */}
        <section className="flex flex-row justify-between items-center px-4 w-full h-[8%]">
          {/* selector and edit budget button */}
          <Row className="space-x-4 items-end">
            {/* month selector */}
            <MonthSelect
              label="Month"
              months={months}
              selected={selectedMonth}
              setSelected={setSelectedMonth}
            />
          </Row>
          {/* loading indicator */}
          {showLoading && <BeatLoader loading={true} color="#fff" />}
          {/* warnings */}
          <Row className="space-x-6">
            <div className="flex h-full">
              {budget.is_active && (
                <div
                  data-tooltip-id="budget-indicator"
                  // tooltip for budget indicator
                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    <Col>
                      {budget.max_cost < costData[costData.length - 1] ? (
                        <p>Exceeded maximum monthly cost budget.</p>
                      ) : (
                        <>
                          {budget.max_cost < costProj[costProj.length - 1] &&
                            new Date().getDate() >= 10 && (
                              <p>At risk of exceeding monthly cost budget.</p>
                            )}
                        </>
                      )}
                      {budget.max_energy < energyData[energyData.length - 1] ? (
                        <p>Exceeded maximum monthly energy budget.</p>
                      ) : (
                        <>
                          {budget.max_energy <
                            energyProj[energyProj.length - 1] && (
                            <p>At risk of exceeding monthly energy budget.</p>
                          )}
                        </>
                      )}
                      {budget.max_water < waterData[waterData.length - 1] ? (
                        <p>Exceeded maximum monthly water budget.</p>
                      ) : (
                        <>
                          {budget.max_water <
                            waterProj[waterProj.length - 1] && (
                            <p>At risk of exceeding monthly water budget.</p>
                          )}
                        </>
                      )}
                    </Col>
                  )}
                >
                  {/* when the budget is exceed show red icon */}
                  {budget.max_cost < costData[costData.length - 1] ||
                  budget.max_energy < energyData[energyData.length - 1] ||
                  budget.max_water < waterData[waterData.length - 1] ? (
                    <ShieldExclamationIcon className="h-8 w-8 text-red-500" />
                  ) : (
                    <>
                      {/* when the budget is at risk of being exceeded show yellow icon */}
                      {(budget.max_cost < costProj[costProj.length - 1] ||
                        budget.max_energy < energyProj[energyProj.length - 1] ||
                        budget.max_water < waterProj[waterProj.length - 1]) &&
                        energyData.length - 1 >= 10 &&
                        waterData.length - 1 >= 10 &&
                        costData.length - 1 >= 10 && (
                          <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
                        )}
                    </>
                  )}
                  <ReactTooltip id="budget-indicator" place="bottom" />
                </div>
              )}
            </div>
            <div
              data-tooltip-id="budget-button"
              data-tooltip-content="Failed to fetch budget information. Please refresh the page."
            >
              <PrimaryButton
                onClick={() => setBudgetModalOpen(true)}
                disabled={!budget.id}
              >
                Budget
                {!budget.id && (
                  <ReactTooltip id="budget-button" place="bottom" />
                )}
              </PrimaryButton>
            </div>
          </Row>
        </section>
        {/* graph */}
        <section className="flex flex-grow flex-col">
          <div className="flex w-full h-[95%] items-center justify-center mt-2 px-4">
            <Graph options={options} data={data} />
          </div>
        </section>
        {noReports && (
          <Row className="w-full justify-center mb-2">
            <FormError>
              No reports found for {format(selectedMonth, "MMMM")}
            </FormError>
          </Row>
        )}
      </div>
    </Panel>
  );
}
