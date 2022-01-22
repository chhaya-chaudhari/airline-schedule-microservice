import * as endpointConstants from './Endpoints';
import { getHttp, postHttp } from '../services/HttpService';

class RequestService {

    fetchFlightData(formData) {
        const remoteUrl = endpointConstants.getFlightData;
        let obj = {
            url: remoteUrl,
            body: formData
        };
        return postHttp(obj);
    }

    fetchAirportDetails(code) {
        const remoteUrl = endpointConstants.getAirportDetails+"/"+code;
        let obj = {
            url: remoteUrl
        };
        return getHttp(obj);
    }

    searchCode(url) {
        let obj = {
            url: url
        };
        return getHttp(obj);
    }

}
export default new RequestService()