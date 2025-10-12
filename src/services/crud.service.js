class CrudService {
  constructor(Model) { this.Model = Model; }
  async list() { return this.Model.findAll(); }
  async get(id) { return this.Model.findByPk(id); }
  async create(data) { return this.Model.create(data); }
  async update(id, data) {
    const item = await this.Model.findByPk(id);
    if (!item) return null;
    await item.update(data);
    return item;
  }
  async remove(id) {
    const item = await this.Model.findByPk(id);
    if (!item) return 0;
    await item.destroy();
    return 1;
  }
}
module.exports = { CrudService };
