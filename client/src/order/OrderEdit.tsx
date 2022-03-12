import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../API";
import Company from "../contractors/Company";
import Customer from "../customers/Customer";
import Order from "./Order";
import ServiceCatlog from "./ServiceCatalog";
import * as yup from "yup";
import { Box, Button, Divider, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { DeepPartial } from "@tomysmith/deep-partial";
import { DatePicker } from "@mui/lab";
const validationSchema = yup.object({});

interface Props {
  company: Company;
  customers: Customer[];
  serviceCatalogs: ServiceCatlog[];
}

const OrderEdit: React.FC<Props> = ({ company, customers, serviceCatalogs }) => {
  const [value, setValue] = React.useState<Date | null>(null);
  const navigate = useNavigate();
  let { id } = useParams();
  const persisted = id !== "new";
  const [loading, setLoading] = React.useState<boolean>(persisted);
  const { enqueueSnackbar } = useSnackbar();
  const navigateToOverviewPage = () => navigate("/orders");
  const deleteItem = async () => {
    try {
      await API.delete(`/api/orders/${id}`);
      enqueueSnackbar("Auftrag gelöscht", { variant: "success" });
      navigateToOverviewPage();
    } catch {
      enqueueSnackbar("Auftrag konnte nicht gelöscht werden", { variant: "error" });
    }
  };
  const saveItem = async (item: DeepPartial<Order>) => {
    try {
      await API.post("/api/orders", item);
      enqueueSnackbar("Auftrag gespeichert", { variant: "success" });
      navigateToOverviewPage();
    } catch {
      enqueueSnackbar("Auftrag konnte nicht gespeichert werden", { variant: "error" });
    }
  };

  const formik = useFormik({
    initialValues: {
      taxRate: 0.19,
      smallOrder: false,
      includeKmFee: true,
      canceled: false,
      status: "ORDER_EDIT",
      firstAppointment: null,
      secondAppointment: null,
      orderItems: [],
      billItems: [],
    } as DeepPartial<Order>,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      saveItem(values);
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      if (persisted) {
        const response = await API.get<Order>(`/api/orders/${id}`);
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="orderId"
            name="orderId"
            label="Auftrags-ID"
            disabled={formik.values._id !== undefined}
            value={formik.values.orderId}
            onChange={formik.handleChange}
            error={formik.touched.orderId && Boolean(formik.errors.orderId)}
            helperText={formik.touched.orderId && formik.errors.orderId}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="contractor"
            name="contractor.lastName"
            label="Auftragnehmer"
            disabled
            value={formik.values.contractor?.lastName}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="customer"
            name="customer.name"
            label="Auftraggeber"
            disabled
            value={formik.values.customer?.name}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField fullWidth id="realestate" label="Liegenschaft" disabled value={formik.values.realEstate?.name} />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch name="smallOrder" checked={formik.values.smallOrder} onChange={formik.handleChange} />}
            label="Kleinauftrag"
          />
        </Grid>

        <Grid item xs={6} display="flex">
          <TextField
            fullWidth
            id="distance"
            name="distance"
            label="Tatsächlich gefahrene KM"
            value={formik.values.distance}
            onChange={formik.handleChange}
            error={formik.touched.distance && Boolean(formik.errors.distance)}
            helperText={formik.touched.distance && formik.errors.distance}
          />
          <Box width="400px" ml={2} display="flex">
            <FormControlLabel
              control={
                <Switch name="includeKmFee" checked={formik.values.includeKmFee} onChange={formik.handleChange} />
              }
              label="Km Pauschale anwenden"
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Divider variant="middle" />
          <h3>Kontakt Details</h3>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="contactDetails-utilisationUnit"
            name="contactDetails.utilisationUnit"
            label="Nutzungseinheit"
            value={formik.values.contactDetails?.utilisationUnit}
            onChange={formik.handleChange}
            //error={formik.touched.contactDetails?.utilisationUnit && Boolean(formik.touched.contactDetails?.utilisationUnit)} getIn(form.errors, name) && getIn(form.touched, name)
            // helperText={formik.touched.contactDetails?.utilisationUnit && formik.errors.contactDetails?utilisationUnit}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="contactDetails-name"
            name="contactDetails.name"
            label="Name"
            value={formik.values.contactDetails?.name}
            onChange={formik.handleChange}
            //error={formik.touched.contactDetails?.utilisationUnit && Boolean(formik.touched.contactDetails?.utilisationUnit)} getIn(form.errors, name) && getIn(form.touched, name)
            // helperText={formik.touched.contactDetails?.utilisationUnit && formik.errors.contactDetails?utilisationUnit}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="contactDetails-phoneNumber"
            name="contactDetails.phoneNumber"
            label="Telefonnummer"
            value={formik.values.contactDetails?.phoneNumber}
            onChange={formik.handleChange}
            //error={formik.touched.contactDetails?.utilisationUnit && Boolean(formik.touched.contactDetails?.utilisationUnit)} getIn(form.errors, name) && getIn(form.touched, name)
            // helperText={formik.touched.contactDetails?.utilisationUnit && formik.errors.contactDetails?utilisationUnit}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="contactDetails-location"
            name="contactDetails.location"
            label="Lage"
            value={formik.values.contactDetails?.location}
            onChange={formik.handleChange}
            //error={formik.touched.contactDetails?.utilisationUnit && Boolean(formik.touched.contactDetails?.utilisationUnit)} getIn(form.errors, name) && getIn(form.touched, name)
            // helperText={formik.touched.contactDetails?.utilisationUnit && formik.errors.contactDetails?utilisationUnit}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
          <h3>Termine</h3>
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label="Ersttermin"
            value={formik.values.firstAppointment}
            onChange={(newValue) => {
              formik.setFieldValue("firstAppointment", newValue);
            }}
            renderInput={(params) => <TextField {...params} id="firstAppointment" />}
            inputFormat="dd.MM.yyyy"
            mask="'__.__.____"
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label="Zweittermin"
            value={formik.values.secondAppointment}
            onChange={(newValue) => {
              formik.setFieldValue("secondAppointment", newValue);
            }}
            renderInput={(params) => <TextField {...params} id="secondAppointment" />}
            inputFormat="dd.MM.yyyy"
            mask="'__.__.____"
          />
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
          <h3>Leistungen</h3>
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
  // <Segment>
  //   <Form autoComplete={"off"}>
  //     <Grid>

  //       {order.status === "ORDER_EDIT" || order.status === "ORDER_EXECUTE" ? (
  //         <Grid.Row centered>
  //           <Grid.Column width="8">
  //             <ListOrderServices
  //               order={order}
  //               services={services}
  //               onOrderItemsChanged={updateOrderServies}
  //               onCatalogChanged={(serviceCatalogId: number) =>
  //                 handleOrderChange("serviceCatalogId", serviceCatalogId)
  //               }
  //             />
  //           </Grid.Column>
  //           <Grid.Column width="8" style={{ marginTop: "40px" }}>
  //             <ServicesOverview
  //               asPriceList={true}
  //               serviceCatalogs={serviceCatalogs}
  //               selectedServiceCatalog={serviceCatalogs.find((sc) => sc._id === order.serviceCatalogId)}
  //             />
  //           </Grid.Column>
  //         </Grid.Row>
  //       ) : null}

  //       <OrderKmPauschale handleOrderChange={handleOrderChange} order={order} errors={errors} />
  //       {order.status === "ORDER_BILL" && (
  //         <BillDetails order={order} handleOrderChange={handleOrderChange} errors={errors} />
  //       )}
  //       {order.status === "ORDER_BILL" && <BillButton company={company} order={order} services={services} />}
  //       <PaymentRecieved order={order} handleOrderChange={handleOrderChange} errors={errors} />
  //       <Grid.Row centered>
  //         <Grid.Column width={5} floated="left">
  //           {order.status === Helper.nextStatus(order.status) ? null : (
  //             <OrderAddButton
  //               order={order}
  //               realEstates={realEstates}
  //               onSuccess={onSuccessSave}
  //               onError={(errors: Map<string, string>) => {
  //                 setErrors(errors);
  //               }}
  //             />
  //           )}
  //         </Grid.Column>
  //         <Grid.Column width={5}>
  //           <Button
  //             className={"cancel-bttn"}
  //             content="Abbrechen"
  //             icon="cancel"
  //             labelPosition="left"
  //             onClick={() => {
  //               if (initialState !== order) {
  //                 setShowUnsavedChangesModal(true);
  //               } else {
  //                 onCancelEdit();
  //               }
  //             }}
  //           />
  //         </Grid.Column>
  //         <Grid.Column width={5} floated="right">
  //           {order.id !== undefined && order.status !== "PAYMENT_RECIEVED" && (
  //             <Button
  //               className={"delete-bttn"}
  //               floated={"right"}
  //               color={"red"}
  //               content={"Löschen"}
  //               icon="trash"
  //               labelPosition="left"
  //               onClick={() => setShowDeleteModal(true)}
  //             />
  //           )}
  //         </Grid.Column>
  //       </Grid.Row>
  //     </Grid>
  //   </Form>
  //   <DeleteModal
  //     objectToDelete={"Auftrag"}
  //     show={showDeleteModal}
  //     onSuccess={() => {
  //       OrderService.delete(order, onDeleteSuccess);
  //     }}
  //     onClose={() => setShowDeleteModal(false)}
  //   />
  //   <UnsavedChangesModal
  //     name={"Auftrag"}
  //     show={showUnsavedChangesModal}
  //     onSuccess={onCancelEdit}
  //     onClose={() => setShowUnsavedChangesModal(false)}
  //   />
  // </Segment>
};

export default OrderEdit;
