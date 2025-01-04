class MainController {
    _isProd = process.env.NODE_ENV === 'production';

    constructor() {
        this.getIsProd = this.getIsProd.bind(this);
    }
    getIsProd = () => {
        return this._isProd;
    };
}

export default MainController;