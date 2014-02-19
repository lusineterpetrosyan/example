(function() {
    define(['require', 'jquery', 'underscore', 'bb', 'i/item/c','text!/html/index.html','text!/html/addItem.html'], function(require, $, _, Backbone, Items,IndexPage,AddItemPage) {
        return Backbone.View.extend({
            id: 'index',
            initialize: function(options) {
                var that = this;
                this.___ = options.___;
                this.items = new Items(null,{ s: this.___.so}); //1st is preloading models ; 2nd is option having socket
                this.items.on('add', this.addItem, this);
                //this.items.on('remove', this.removeItem, this);
                this.home = _.template(IndexPage);
                this.addItemPage = _.template(AddItemPage);
                that.render();
            },
            events: {
                'click #create': "createItem",
                'click .remove': "removeItem"
            },
            render:function(){
                var that       = this;
                that.$el.html(this.home({}))
                this.items.fetch({
                    success: function(){
                       that.items.each(function(m){ 
                            this.addItem(m);
                        })
                    },data: {
                        "group": "person"
                    }
                })
            },
            addItem: function(m){
                if(this.$("li[data-id='" + m.id + "']").length == 0 && _.isString(m.id)){
                   // this.$("ul.dataItems").append("<li data-id='" + m.get("_id") + "'>'" + m.get("body.name") + "'<span class='remove'> X </span></li>") // show in list??? or add in it
                     this.$("ul.dataItems").append(this.addItemPage(m.toJSON())); 
                 }
            },
            createItem: function(){
                this.items.create({  
                    "title":"SomeBody"   
                    ,"body":{
                        "name": "SomeBody", 
                        "last": "Last"
                    }
                    ,"group":"person"
                }, {callback: function(json, model){
                        console.log('json', json)
                        console.log('model', model)
                }
            })
            },
            removeItem: function(m){
                if(this.$("li[data-id='" + m.id + "']").length == 1){
                    this.$("li[data-id='" + m.id + "']").remove();
                }
            }, 
            deleteItem: function(){

            }
    });
});

}).call(this);

