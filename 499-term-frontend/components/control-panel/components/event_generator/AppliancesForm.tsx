import { useRecoilState, useRecoilValue } from "recoil";
import { appliancesAtom } from "../../../../atom/appliancesAndAperturesAtom";
import { eventsAtom } from "../../../../atom/eventsAtom";
import { applianceTypesAtom } from "../../../../atom/applianceTypesAtom";
import Row from "../../../ui/Containers/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import Col from "../../../ui/Containers/Col";
import Select from "../../../ui/Forms/Select";
import { useEffect, useState } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import TimeInput from "../../../ui/Forms/TimeInput";
import PrimaryButton from "../../../ui/Buttons/PrimaryButton";
import { format } from "date-fns";
import FormError from "../../../ui/Forms/FormError";
import { fetcher } from "../../../../lib/fetcher";

interface IFormInput {
  on_at: string;
  off_at: string;
}

export default function AppliancesForm() {
  //state
  const [appliances, setAppliances] = useRecoilState(appliancesAtom);
  const [selectedAppliance, setSelectedAppliance] = useState(appliances[0]);
  const [events, setEvents] = useRecoilState(eventsAtom);
  const applianceTypes = useRecoilValue(applianceTypesAtom);

  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [firstLoad, setFirstLoad] = useState(true);

  //useEffect to set default selectedAppliance
  useEffect(() => {
    if (firstLoad && appliances.length > 0) {
      setSelectedAppliance(appliances[0]);
      setFirstLoad(false);
    }
  }, [appliances]);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({});

  //dummy submit
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    clearErrors();
    setFormError(null);
    setSubmitting(true);

    //parse and validating time
    let startTime = new Date();
    let endTime = new Date();
    startTime.setHours(
      parseInt(data.on_at.substring(0, data.on_at.indexOf(":")))
    );
    startTime.setMinutes(
      parseInt(data.on_at.substring(data.on_at.indexOf(":") + 1))
    );
    startTime.setSeconds(0);

    endTime.setHours(
      parseInt(data.off_at.substring(0, data.off_at.indexOf(":")))
    );
    endTime.setMinutes(
      parseInt(data.off_at.substring(data.off_at.indexOf(":") + 1))
    );
    endTime.setSeconds(0);

    if (endTime.getTime() - startTime.getTime() <= 0) {
      setFormError("Start time must come before end time");
      return;
    }

    let payload = {
      appliance_id: selectedAppliance.pk,
      on_at: format(startTime, "yyyy-MM-dd HH:mm:ss"),
      off_at: format(endTime, "yyyy-MM-dd HH:mm:ss"),
    };

    let res = await fetcher.post("create_event/", payload);

    //error handling
    if (res.code !== 200) {
      setFormError(res.message);
      console.error(res.message);
      setSubmitting(false);
      return;
    }
    setEvents([res.data, ...events]);
    setSubmitting(false);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-row items-center mx-4"
    >
      <Col className="w-1/2 ml-4 pr-8 h-full justify-evenly">
        <Select
          label="Appliances"
          items={appliances}
          selected={selectedAppliance}
          setSelected={setSelectedAppliance}
        />
        <Row className="w-full justify-evenly">
          <BoltIcon className="h-24 w-24" />
          <div className="w-20 h-20 relative rounded-full">
            <Image
              fill
              src="https://i.imgur.com/IZ5bFOt.png"
              alt={`water icon`}
            />
          </div>
        </Row>
      </Col>
      <Col className="w-1/2 h-full mr-12 pl-8 justify-evenly">
        <TimeInput
          id="on_at"
          label="On At"
          register={register}
          registerOptions={{ required: "On time is required" }}
          max={watch("off_at")}
          errors={errors}
        />
        <TimeInput
          id="off_at"
          label="Off At"
          register={register}
          registerOptions={{ required: "Off time is required" }}
          min={watch("on_at")}
          errors={errors}
        />
        <PrimaryButton type="submit" loading={submitting} disabled={submitting}>
          Generate Event
        </PrimaryButton>
        {formError && <FormError>{formError}</FormError>}
      </Col>
    </form>
  );
}
