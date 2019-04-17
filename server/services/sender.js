class Sender {
    constructor(app) {
        this.app = app;
    }

    sendTo(controller, method, params, recipients) {
        for (let i in recipients) {
            recipients[i].getSocket().send(JSON.stringify({
                success: true,
                type: controller + '.' + method,
                response: params
            }))
        }
    }
    
}

export default Sender;