class SettingsSiteController {
    async getItems(req, res) {
    }

    async getItem() {}

    async createItem() {}

    async updateItem() {}

    async deleteItem(req, res) {
        const { id } = req.params;
    }
}

export default new SettingsSiteController();