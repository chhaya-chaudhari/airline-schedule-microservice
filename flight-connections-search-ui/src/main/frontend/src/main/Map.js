import { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import config from './MapConfig';
import { Polyline } from "@react-google-maps/api";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Tooltip } from "@material-ui/core";
import convert from 'geo-coordinates-parser';
import flightService from "../utils/FlightService";

function MapComponent(props) {
  console.log("map", props.data)
  console.log("map", props.inputOption)
  const [data] = useState(props.data);
  const [show, isShow] = useState(false);
  const [state1, setState1] = useState({
    showingInfoWindow: false,
    activeMarker: {},
  });
  const [state2, setState2] = useState({
    showingInfoWindow: false,
    activeMarker: {},
  });
  const [state3, setState3] = useState({
    showingInfoWindow: false,
    activeMarker: {},
  });

  const [polyline, setPolyline] = useState([
    // { lat: 19.08861, lng: 72.86806 },
    //       { lat: 25.25278, lng: 55.36444 },
    //       { lat: 40.63972, lng: -73.77889 },
  ]);
  
  useEffect(() => {
    isShow(true);
    if(props.data?.connArrArpt === 'JFK') {
      setPolyline([
        { lat: 19.08861, lng: 72.86806 },
        { lat: 25.25278, lng: 55.36444 },
        { lat: 40.63972, lng: -73.77889 },
      ])
    }
    else if(props.data?.connArrArpt === 'IAH') {
      setPolyline([
        { lat: 19.08861, lng: 72.86806 },
        { lat: 25.25278, lng: 55.36444 },
        {lat:29.99020 , lng:-95.33707}
      ]) 
  }
  },[data, props]);

  // useEffect(() => {
  //   const latLng = [];
  //   const bom = [];
  //   if(props.data){
  //   const codes = [props.data.onwardDepArpt, props.data.onwardArrArpt,props.data.connArrArpt]
  //   codes.forEach(code => {
  //     flightService.fetchAirportDetails(code)
  //     .then(response => {
  //       console.log("response", response);
  //       // response.map((row) => {
  //         const converted = convert(response.coOrdinates);
  //         response.lat = converted.decimalLatitude;
  //         response.lng = converted.decimalLongitude;
  //         bom.push(response);
  //         setBom(bom);
  //         latLng.push({
  //           lat: converted.decimalLatitude,
  //           lng: converted.decimalLongitude
  //         })
  //         setPolyline(latLng);
  //       // })
  //     });
  //   })
  // }
  // }, [props.data])

  let bomDetails = props.data ? ` City Name:` + props.data.onwardDepArpt + `
  Flight No: ` + props.data.onwardFltNo + `
  Flight Time: ` + props.data.onwardDepTime + ` (Dep Time)
  Wait Time: 	-  ` : "";

  let jfkDetails = props.data ? ` City Name:` + props.data.connArrArpt + `
  Flight No: ` + props.data.connFltNo + `
  Flight Time: ` + props.data.connArrTime + ` (Arr Time)
  Wait Time: 	-  ` : "";

  let dxbDetails = props.data ? `City Name:` + props.data.connDepArpt + `
  Flight No: ` + props.data.onwardFltNo + `
  Flight Time: ` + props.data.onwardArrTime + ` (Arr Time)
  Wait  Time: ` + props.data.waitTime + `
  Flight No: ` + props.data.connFltNo + `
  Flight Time: ` + props.data.connDepTime + ` (Dep Time) ` : "";

  const onMarkerClick1 = (props, marker, e) => {
    setState1({
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  const onMarkerClick2 = (props, marker, e) => {
    setState2({
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  const onMarkerClick3 = (props, marker, e) => {
    setState3({
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  return (
    <Map
      google={props.google}
      zoom={config.zoomLevel}
      initialCenter={{ lat: config.center.lat, lng: config.center.lng }}
      streetViewControl={config.streetViewControl}
      gestureHandling={config.gestureHandling}
      mapTypeControl={config.mapTypeControl}
      fullscreenControl={config.fullscreenControl}
      center={{ lat: config.center.lat, lng: config.center.lng }}
    >
       <Marker position={{ lat: 19.08861, lng: 72.86806 }} onMouseover={onMarkerClick1} />
      <InfoWindow
        marker={state1.activeMarker}
        visible={state1.showingInfoWindow}
      >
        <Tooltip title={bomDetails} placement="bottom">
         <p>Mumbai BOM</p>
        </Tooltip>
      </InfoWindow>
     <Marker position={{ lat: 25.25278, lng: 55.36444 }} onMouseover={onMarkerClick2} />
      <InfoWindow
        marker={state2.activeMarker}
        visible={state2.showingInfoWindow}
      >
        <Tooltip title={dxbDetails} placement="top">
          <p>Dubai DXB</p>
        </Tooltip>
      </InfoWindow>
      <Marker position={props.inputOption == 'IAH' ?  {lat:29.99020 , lng:-95.33707} :{ lat: 40.63972, lng: -73.77889 }} onMouseover={onMarkerClick3} />
      <InfoWindow
        marker={state3.activeMarker}
        visible={state3.showingInfoWindow}
      >
        <Tooltip title={jfkDetails} placement="bottom">
       <p>{props.inputOption == 'IAH' ? 'Houston IAH' : 'New York JFK'}</p>
        </Tooltip>
      </InfoWindow>
      <Polyline
        path={polyline}
        geodesic={true}
        options={{
          strokeColor: "#d14",
          strokeOpacity: 1,
          strokeWeight: 1.5,
          offset: '0%',
          icons: [
            {
              strokeWeight: 2,
              icon: FiberManualRecordIcon,
              offset: '0%',
              repeat: '35px'
            }
          ]
        }} />
    </Map>
  );
}

export default GoogleApiWrapper({ apiKey: config.apiKey })(MapComponent);
