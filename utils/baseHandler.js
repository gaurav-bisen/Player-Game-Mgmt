export default class BaseHandler{
    constructor(args={}){
        this.args = args;
    }

    static execute(args) {
        return new this(args);
    }
}