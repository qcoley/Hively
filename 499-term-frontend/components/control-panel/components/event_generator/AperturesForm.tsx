import { useRecoilState } from "recoil";
import { aperturesAtom } from "../../../../atom/appliancesAndAperturesAtom";
import Row from "../../../ui/Containers/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import Col from "../../../ui/Containers/Col";
import Select from "../../../ui/Forms/Select";
import { useState } from "react";
import Image from "next/image";
import TimeInput from "../../../ui/Forms/TimeInput";
import PrimaryButton from "../../../ui/Buttons/PrimaryButton";

interface IFormInput {
  open_at: string;
  closed_at: string;
}

//this feature is being cut from the final project due to time constraints, simulation of apertures is available
//through the toggle. This is because our thermostat calculations are done every minute, and calculating this post hoc would
//take up too much of our remaining time

export default function AperturesForm() {
  //state
  const [apertures, setApertures] = useRecoilState(aperturesAtom);
  const [selectedAperture, setSelectedAperture] = useState(apertures[0]);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({});

  //dummy submit
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-row items-center mx-4"
    >
      <Col className="w-1/2 ml-4 pr-8 h-full justify-evenly">
        <Select
          label="Apertures"
          items={apertures}
          selected={selectedAperture}
          setSelected={setSelectedAperture}
        />
        <Row className="w-full justify-evenly">
          <div className="w-24 h-24 relative rounded-full">
            <Image
              fill
              src="https://i.imgur.com/BwptyE5.png"
              alt={`water icon`}
            />
          </div>
          <div className="w-24 h-24 relative rounded-full">
            <Image
              fill
              src="https://i.imgur.com/hAcDP2M.png"
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
          max={watch("open_at")}
          errors={errors}
        />
        <TimeInput
          id="off_at"
          label="Off At"
          register={register}
          registerOptions={{ required: "Off time is required" }}
          min={watch("closed_at")}
          errors={errors}
        />
        <PrimaryButton type="submit">Generate Event</PrimaryButton>
      </Col>
    </form>
  );
}
