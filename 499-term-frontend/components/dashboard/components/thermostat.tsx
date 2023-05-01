import Col from "../../ui/Containers/Col";
import Panel from "../../ui/Containers/Panel";
import SubPanel from "../../ui/Containers/SubPanel";
import PanelLabel from "../../ui/Labels/PanelLabel";
import { SubmitHandler, useForm } from "react-hook-form";
import NumberSelector from "../../ui/Forms/NumberSelector";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";
import { fetcher } from "../../../lib/fetcher";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { thermostatAtom } from "../../../atom/thermoAndAirAtom";
import { useInterval } from "usehooks-ts";
import FormError from "../../ui/Forms/FormError";
import { toast } from "react-toastify";

// form input interface
interface IFormInput {
  target_temp: number;
}

export default function Thermostat() {
  //state
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [thermostat, setThermostat] = useRecoilState(thermostatAtom);

  //form stuff
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      target_temp: thermostat.target_temp,
    },
  });

  //fetch data
  async function fetchThermData() {
    //get current thermostat info
    let res = await fetcher.get("thermostat/");
    //handle errors
    if (res.code !== 200) {
      setError(res.message);
      console.error(res.message);
      return;
    }
    //set thermostat state
    setThermostat(res.data);
    setValue("target_temp", res.data.target_temp);
  }

  //life cycle methods
  //on mount
  useEffect(() => {
    fetchThermData();
  }, []);

  //data refetch every 10 seconds
  useInterval(() => {
    fetchThermData();
  }, 10000);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmitting(true);

    //clear old errors
    clearErrors();
    setError(null);
    //set the thermostat target temp
    let payload = {
      target_temp: data.target_temp.toString(),
    };

    let res = await fetcher.post("thermostat/", payload);
    //handle errors
    if (res.code !== 200) {
      setError(res.message);
      console.error(res.message);
      setSubmitting(false);
      return;
    }
    //set thermostat state
    setThermostat(res.data);
    setSubmitting(false);
  };

  return (
    <Panel className="pb-2">
      <PanelLabel>Thermostat</PanelLabel>
      <Col className="w-full h-full  mt-2 justify-start items-center">
        <SubPanel className="w-2/3 items-center p-8 bg-gray-600">
          <h3 className="text-3xl font-semibold lg:text-4xl">
            {thermostat.current_temp.toFixed(1)}
          </h3>
        </SubPanel>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-2/3 h-full lg:w-5/6"
        >
          <div className="flex flex-col h-full items-center justify-evenly">
            {/* <NumberSelector
              label={"Min. Temperature"}
              id={"min_temp"}
              setValue={setValue}
              watch={watch}
              min={50}
              max={watch("target_temp") - 1}
            /> */}
            <NumberSelector
              label={"Target Temperature"}
              id={"target_temp"}
              setValue={setValue}
              watch={watch}
              min={50}
              max={90}
            />
            {/* <NumberSelector
              label={"Max. Temperature"}
              id={"max_temp"}
              setValue={setValue}
              watch={watch}
              min={watch("target_temp") + 1}
              max={90}
            /> */}
            <div className="w-full lg:w-2/3">
              <PrimaryButton
                type="submit"
                loading={submitting}
                disabled={submitting}
              >
                Set Thermostat
              </PrimaryButton>
            </div>
            {error && <FormError>{error}</FormError>}
          </div>
        </form>
      </Col>
    </Panel>
  );
}
