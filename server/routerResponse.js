class RouterResponse {
    
    constructor(status, response) {
       this.status = status;
       this.response = response; 
    }

    isError() {
        return this.status === false;
    }

    getResponse() {
        return this.response;
    }
}

export default RouterResponse;

