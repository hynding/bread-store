export default class BreadStore {
  constructor({model}) {
    this.model = model;
  }

  browse(query, options) {
    return BreadStore.send(BreadStore.prepare(this.model.find(query || {}), options));
  }

  read(id, options) {
    return BreadStore.send(BreadStore.prepare(this.model.findById(id), options));
  }

  edit(id, data) {
    return BreadStore.send(this.model.findByIdAndUpdate(id, data));
  }

  add(data) {
    return this.model.create(data);
  }

  destroy(id) {
    return BreadStore.send(this.model.findByIdAndRemove(id));
  }

  static prepare(query, options) {
    let builders = Object.keys(options);
    let optionedBuilders = builders.filter(builder=>(options && options[builder]));
    return optionedBuilders.length ? optionedBuilders.reduce((query,builder)=>BreadStore.bake(query,builder,options[builder]), query): query;
  }

  static bake(query, builder, properties) {
    return query[builder](properties);
  }

  static send(query) {
    return query;
  }
};