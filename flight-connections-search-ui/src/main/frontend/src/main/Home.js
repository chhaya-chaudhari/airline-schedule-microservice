import { Button, CircularProgress, Grid, InputLabel, Paper, TextField, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useState } from "react";
import flightService from "../utils/FlightService";
import MapComponent from "../main/Map";
import { DataGrid } from "@material-ui/data-grid";
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as endpointConstants from '../utils/Endpoints';
import moment from "moment";

const columns = [
    { field: 'id', headerName: 'Id', hide: true },
    { field: 'onwardFltNo', headerName: 'Onward Flight', width: 130 },
    { field: 'onwardDepArpt', headerName: 'Dep Airport', width: 130 },
    { field: 'onwardArrArpt', headerName: 'Arrival Airport', width: 130 },
    { field: 'onwardDepTime', headerName: 'Dep Time', width: 130 },
    { field: 'onwardArrTime', headerName: 'Arrival Time', width: 130 },
    { field: 'connFltNo', headerName: 'Connecting Flight', width: 130 },
    { field: 'connDepArpt', headerName: 'Dep Airport', width: 130 },
    { field: 'connArrArpt', headerName: 'Arrival Airport', width: 130 },
    { field: 'connDepTime', headerName: 'Dep Time', width: 130 },
    { field: 'connArrTime', headerName: 'Arrival Time', width: 130 },
];

export default function SearchRequest() {
    const [data, setData] = useState([]);
    const [rowData, setRowData] = useState();
    const [opts, setOpts] = useState({ q: '', dataset: [] });
    const  remoteUrl = endpointConstants.searchCode;
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const search = (e) => {
        var formData = {
            departureAirport: e.from,
            arrivalAirport: e.to
        }
        flightService.fetchFlightData(formData)
            .then(response => {
                console.log("response", response);
                response.map((row) => {
                    var startTime = moment(row.connDepTime, "HH:mm:ss a"),
                     endTime = moment(row.onwardArrTime, "HH:mm:ss a");
                     let dif;
                     if(endTime > startTime){
                        dif = startTime.diff(moment("00:00:00", "HH:mm:ss a"));
                        dif = dif + moment("24:00:00", "HH:mm:ss a").diff(endTime);
                        dif = moment.duration(dif);
                        console.log('dif', dif.hours())
                        row.waitTime = dif.hours()+ "h " + dif.minutes() + "m";
                     }
                   else {
                    dif = moment.duration(startTime.diff(endTime));
                    row.waitTime = dif.hours()+ "h " + dif.minutes() + "m";
                   }
                    row.id = row.onwardFltNo + row.connFltNo;
                })
                setData(response)
            });
    }

    const handleClose = (event, reason) => {
        if (remoteUrl) {
            setOpts((prevState) => ({
                ...prevState,
                dataset: []
            }));
        }
        console.log('closing');
    }

    const onKeyPressInput = (event, value, reason) => {
        if (event.type === 'click') {
            return;
        }

        if (remoteUrl && value !== '') {
            autocompleteSearch(value)
            setOpts((prevState) => ({
                ...prevState,
                q: value,
            }));
        }
    }

    const autocompleteSearch = (value) => {
        setLoading1(true);
        let qurl;

        if (remoteUrl.indexOf('?') === -1) {
           qurl = remoteUrl + '?code=' + `${value}`;
        } else {
           qurl = remoteUrl + '&code=' + `${value}`;
        }
     
        console.log("url::::", qurl);
        flightService.searchCode(qurl).then(e => {
            let dItems = [];
            console.log(e);
            dItems = e.map((ele) => {
                return { label: ele, value: ele }
            });
            console.log(dItems);
            setOpts((prevState) => ({
                ...prevState,
                dataset: dItems
            }));
            setLoading1(false);

        })
    };

    const handleChange1 = (event, option, formik) => {
        formik.values.from = option?.value;
    }

    const handleChange2 = (event, option, formik) => {
        formik.values.to = option?.value;
    }

    return (
        <Formik
            initialValues={{
                from: "",
                to: ""
            }}
            onSubmit={search}
        >
            {(formik) => {
                return (
                    <Paper style={{ padding: '30px' }}>
                        <Form autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={4} className="row">
                                    <InputLabel>From Airport : </InputLabel>
                                </Grid>
                                <Grid item xs={8} className="row">
                                   <Autocomplete
                                    freeSolo
                                    name="from"
                                    id="from"
                                    autoComplete={false}
                                    options={opts.dataset}
                                    renderOption={(option) => (
                                        <Typography variant="p">{option.label}</Typography>
                                      )}
                                    getOptionLabel={(option) => option.label}
                                    getOptionSelected={(option, value) => {
                                        return true;
                                    }}
                                    onChange={(event, option) => handleChange1(event, option, formik)}
                                    onInputChange={onKeyPressInput}
                                    onClose={handleClose}
                                    renderInput={(params) => {
                                        return (<>
                                            <div className="autoSelect-txt-div">
                                                <TextField autoComplete="false"   {...params} label={"Search by Flight code"}  variant="outlined"
                                                 margin="dense"   InputLabelProps={{
                                                    style:{
                                                     fontSize: '16px', 
                                                     fontStyle: 'normal',
                                                     color:'#5A5A5A'
                                                    }
                                                }}
                                                   
                                                />
                                                {loading1 && <CircularProgress className="auto-search-loading-icon" />}
                                            </div>
                                        </>)
                                    }}
                                />
                                </Grid>
                                <Grid item xs={4}>
                                    <InputLabel>To Airport : </InputLabel>
                                </Grid>
                                <Grid item xs={8}>
                                    <Autocomplete
                                    freeSolo
                                    name="to"
                                    id="to"
                                    autoComplete={false}
                                    options={opts.dataset}
                                    renderOption={(option) => (
                                        <Typography variant="p">{option.label}</Typography>
                                      )}
                                    getOptionLabel={(option) => option.label}
                                    getOptionSelected={(option, value) => {
                                        return true;
                                    }}
                                    onChange={(event, option) => handleChange2(event, option, formik)}
                                    onInputChange={onKeyPressInput}
                                    onClose={handleClose}
                                    renderInput={(params) => {
                                        return (<>
                                            <div className="autoSelect-txt-div">
                                                <TextField autoComplete="false"   {...params} label={"Search by Flight code"}  variant="outlined"
                                                 margin="dense"   InputLabelProps={{
                                                    style:{
                                                     fontSize: '16px', 
                                                     fontStyle: 'normal',
                                                     color:'#5A5A5A'
                                                    }
                                                }}
                                                   
                                                />
                                                {loading2 && <CircularProgress className="auto-search-loading-icon" />}
                                            </div>
                                        </>)
                                    }}
                                />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Search
                        </Button>
                                </Grid>
                            </Grid>
                            <Grid container style={{ height: 350, width: '100%', padding: '30px' }}>
                                <DataGrid rows={data}
                                    columns={columns}
                                    onRowClick={e => {
                                        console.log(e)
                                        setRowData(e.row)
                                    }}
                                    hideFooter={true} />
                            </Grid>
                        </Form>
                        <Grid container>
                            <div style={{ width: "200vh", height: "100vh", position: 'relative' }}>
                                <MapComponent
                                    data={rowData}
                                    inputOption={formik.values.to}
                                />
                            </div>
                        </Grid>
                    </Paper>

                )
            }}
        </Formik>
    )
}
