"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BreadStore = function () {
  function BreadStore(_ref) {
    var model = _ref.model;

    _classCallCheck(this, BreadStore);

    this.model = model;
  }

  _createClass(BreadStore, [{
    key: "browse",
    value: function browse(query, options) {
      return BreadStore.send(BreadStore.prepare(this.model.find(query || {}), options));
    }
  }, {
    key: "read",
    value: function read(id, options) {
      return BreadStore.send(BreadStore.prepare(this.model.findById(id), options));
    }
  }, {
    key: "edit",
    value: function edit(id, data) {
      return BreadStore.send(this.model.findByIdAndUpdate(id, data));
    }
  }, {
    key: "add",
    value: function add(data) {
      return this.model.create(data);
    }
  }, {
    key: "destroy",
    value: function destroy(id) {
      return BreadStore.send(this.model.findByIdAndRemove(id));
    }
  }], [{
    key: "prepare",
    value: function prepare(query, options) {
      var builders = Object.keys(options);
      var optionedBuilders = builders.filter(function (builder) {
        return options && options[builder];
      });
      return optionedBuilders.length ? optionedBuilders.reduce(function (query, builder) {
        return BreadStore.bake(query, builder, options[builder]);
      }, query) : query;
    }
  }, {
    key: "bake",
    value: function bake(query, builder, properties) {
      return query[builder](properties);
    }
  }, {
    key: "send",
    value: function send(query) {
      return query;
    }
  }]);

  return BreadStore;
}();

exports.default = BreadStore;
;