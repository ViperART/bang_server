class IdGenerator {
    constructor(app) {
        this.app = app;
    }

    generate() {
        var id = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 16; i++)
          id += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return id;  
    }
}

export default IdGenerator;