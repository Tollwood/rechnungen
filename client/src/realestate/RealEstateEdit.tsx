import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import API from "../API";
import RealEstate from "./RealEstate";

const validationSchema = yup.object({
  name: yup.string().required("Pflichtfeld"),
});

const RealEstateEdit: React.FC = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const persisted = id !== "new";
  const [loading, setLoading] = useState<boolean>(persisted);
  const { enqueueSnackbar } = useSnackbar();
  const navigateToOverviewPage = () => navigate("/real-estates");
  const deleteItem = async () => {
    try {
      await API.delete(`/api/real-estates/${id}`);
      enqueueSnackbar("Liegenschaft gelöscht", { variant: "success" });
      navigateToOverviewPage();
    } catch {
      enqueueSnackbar("Liegenschaft konnte nicht gelöscht werden", { variant: "error" });
    }
  };
  const saveItem = async (item: RealEstate) => {
    try {
      await API.post("/api/real-estates", item);
      enqueueSnackbar("Liegenschaft gespeichert", { variant: "success" });
      navigateToOverviewPage();
    } catch {
      enqueueSnackbar("Liegenschaft konnte nicht gespeichert werden", { variant: "error" });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: undefined,
      address: {},
      distance: 0,
    } as RealEstate,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      saveItem(values);
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      if (persisted) {
        const response = await API.get<RealEstate>(`/api/real-estates/${id}`);
        formik.setValues(response.data);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container p={2} pt={3} spacing={2}>
        <Grid item xs={12}>
          {persisted ? <h1>Liegenschaft Bearbeiten</h1> : <h1>Neue Liegenschaft</h1>}
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Bezeichnung"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <TextField
            fullWidth
            type="number"
            id="distance"
            name="distance"
            label="Entfernung"
            value={formik.values.distance}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
            error={formik.touched.distance && Boolean(formik.errors.distance)}
            helperText={formik.touched.distance && formik.errors.distance}
          />
        </Grid>

        <Grid item xs={8}>
          <TextField
            fullWidth
            id="street"
            label="Straße"
            placeholder="Straße"
            name="address.street"
            value={formik.values.address.street}
            onChange={formik.handleChange}
            error={formik.touched.address?.street && Boolean(formik.errors.address?.street)}
            helperText={formik.touched.address?.street && formik.errors.address?.street}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="houseNumber"
            label="Nr."
            placeholder="Hausnummer"
            name="address.houseNumber"
            value={formik.values.address.houseNumber}
            onChange={formik.handleChange}
            error={formik.touched.address?.houseNumber && Boolean(formik.errors.address?.houseNumber)}
            helperText={formik.touched.address?.houseNumber && formik.errors.address?.houseNumber}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="zipCode"
            placeholder="PLZ"
            label="PLZ"
            name="address.zipCode"
            value={formik.values.address.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.address?.zipCode && Boolean(formik.errors.address?.zipCode)}
            helperText={formik.touched.address?.zipCode && formik.errors.address?.zipCode}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="city"
            label="Stadt"
            fullWidth
            placeholder="Stadt"
            name="address.city"
            value={formik.values.address.city}
            onChange={formik.handleChange}
            error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
            helperText={formik.touched.address?.city && formik.errors.address?.city}
          />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent={"space-evenly"}>
          <Button variant="contained" color="primary" onClick={formik.submitForm}>
            Speichern
          </Button>
          <Button variant="outlined" color="secondary" onClick={navigateToOverviewPage}>
            Abbrechen
          </Button>
          {persisted && (
            <Button variant="outlined" color="error" onClick={deleteItem}>
              Löschen
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          {JSON.stringify(formik.values)}
        </Grid>
      </Grid>
    </form>
  );
};

export default RealEstateEdit;
