
class SiteController {

    index(req, res) {
        res.json(['main-page'])
    }

}

export default new SiteController();