class Sender {
    constructor(app) {
        this.app = app;
    }

    sendTo(controller, method, params, recipients) {
        for (let i in recipients) {
            // recipients[i] -> {nickname, ws}
            recipients[i].ws.send(JSON.stringify({
                success: true,
                type: controller + '.' + method,
                response: params
            }))
        }
    }
    
}

export default Sender;