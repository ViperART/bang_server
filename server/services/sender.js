class Sender {
    constructor(app) {
        this.app = app;
    }

    sendTo(controller, method, params, recipients) {
        for (let i in recipients) {
            if (recipients.hasOwnProperty(i)) {
                recipients[i].getSocket().send(JSON.stringify({
                    success: true,
                    type: controller + '.' + method,
                    response: params
                }))
            }
        }
    }

    sendForeach(controller, method, callback, recipients) {
        for (let i in recipients) {
            if (recipients.hasOwnProperty(i)) {
                let response = callback(recipients[i]);
                recipients[i].getSocket().send(JSON.stringify({
                    success: true,
                    type: controller + '.' + method,
                    response
                }))
            }
        }
    }
    
}

export default Sender;