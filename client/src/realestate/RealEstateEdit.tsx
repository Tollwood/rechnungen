import * as React from "react";
import { ChangeEvent, useState } from "react";
import RealEstate from "./RealEstate";
import CUDButtons from "../common/CUDButtons";
import AddressInput from "../common/AddressInput";
import ErrorMapper from "../ErrorMapper";
import NameValue from "../common/NameValue";
import RealEstateService from "./RealEstateService";
import { useNavigate, useParams } from "react-router-dom";
import API from "../API";

const RealEstateEdit: React.FC = () => {
  const navigate = useNavigate();

  let { id } = useParams();
  React.useEffect(() => {
    if (id !== "new") {
      API.get(`/api/real-estates/${id}`)
        .then((result) => result.data)
        .then((realEstate) => {
          setRealEstate(realEstate);
          setInitalState(realEstate);
        });
    }
  }, [id]);
  const [initialState, setInitalState] = useState<RealEstate>(new RealEstate());
  const [realEstate, setRealEstate] = useState<RealEstate>(initialState);
  const [errors, setErrors] = useState(new Map<string, string>());

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setRealEstate({ ...realEstate, [event.target.name]: event.target.value });
    setErrors(ErrorMapper.removeError(errors, event.target.name));
  }

  function handleAddressChange(nameValue: NameValue) {
    setRealEstate({ ...realEstate, address: { ...realEstate.address, [nameValue.name]: nameValue.value } });
    setErrors(ErrorMapper.removeError(errors, "address." + nameValue.name));
  }

  return (
    // <Segment>
    //   {realEstate._id === undefined ? <h1>Neue Liegenschaft</h1> : <h1>Liegenschaft Bearbeiten</h1>}
    //   <Form>
    //     <Grid>
    //       <Grid.Row>
    //         <Grid.Column width={8}>
    //           <Form.Field>
    //             <label>Bezeichnung</label>
    //             <FormInput
    //               id="name"
    //               placeholder="Bezeichnung"
    //               value={realEstate.name}
    //               name="name"
    //               onChange={onChange}
    //               error={errors.get("name") ? { content: errors.get("name") } : null}
    //             />
    //           </Form.Field>
    //         </Grid.Column>
    //         <Grid.Column width={8}>
    //           <Form.Field>
    //             <label>Entfernung</label>
    //             <input
    //               id="distance"
    //               placeholder="Entfernung"
    //               value={realEstate.distance}
    //               name="distance"
    //               onChange={onChange}
    //             />
    //           </Form.Field>
    //         </Grid.Column>
    //       </Grid.Row>
    //       <AddressInput address={realEstate.address} handleAddressChange={handleAddressChange} errors={new Map()} />
    //       <CUDButtons
    //         onSave={RealEstateService.save}
    //         name={"Liegenschaft"}
    //         object={realEstate}
    //         initialState={initialState}
    //         onSuccess={() => navigate("/real-estates")}
    //         onError={setErrors}
    //         onCancel={() => navigate("/real-estates")}
    //         onDelete={RealEstateService.delete}
    //         canDelete={realEstate._id !== undefined}
    //       />
    //     </Grid>
    //   </Form>
    // </Segment>
    <div></div>
  );
};

export default RealEstateEdit;
