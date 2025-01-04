class MainController {
    _isProd = process.env.NODE_ENV === 'production';
    getIsProd = () => {
        return this._isProd;
    };
}

export default MainController;