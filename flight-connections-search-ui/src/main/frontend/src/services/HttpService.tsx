import axios from "axios"


interface HttpParam {
    url: string;
    body?: string;
}

export const postHttp = (obj: HttpParam) => {

    let config = {
        headers: {
            
        }
    }

    return axios.post(obj.url, obj.body, config)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error.response.data);
            return error.response.data;
        })
}

export const putHttp = (obj: HttpParam) => {

    let config = {
        headers: {
        }
    }

    return axios.put(obj.url, obj.body, config)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error.response.data);
            return error.response.data;

        })

}

export const getHttp = (obj: HttpParam) => {

    let config = {
        headers: {
        }
    }

    return axios.get(obj.url, config)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error.response);
            return error.response;
        })

}


