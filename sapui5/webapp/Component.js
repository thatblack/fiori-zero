// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/resource/ResourceModel",
    "ns/sapui5/model/Models",
    "./controller/HelloDialog"
],

    /**
     * 
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */
    function (UIComponent, ResourceModel, Models, HelloDialog) {
        
        return UIComponent.extend("ns.sapui5.Component", {

            //metadata para cargar la vista principal
            metadata: {
                manifest: "json"
                // "rootView": {
                //     "viewName": "ns.sapui5.view.App",
                //     "type": "XML",
                //     "async": true,
                //     "id": "app"
                //}
        },

            init: function () {

                //call init function of parent 
                UIComponent.prototype.init.apply(this, arguments);


                //set data model on the view
                this.setModel(Models.createRecipient());

                //set i18n model
                //var i18nModel = new ResourceModel({
                //    bundleName: "ns.sapui5.i18n.i18n"
                //});
                //this.setModel(i18nModel, "i18n");
                //   se crga en i18 por el manifest en el model

                //se instancia el objeto de dialogo y se le envia el controlador actual que se este usando
                this._helloDialog = new HelloDialog(this.getRootControl());

                // create the views based on the url/hash(pateer en manifest)
                this.getRouter().initialize();
            },

            exit : function(){
                this._helloDialog.destroy(); //destruye instancia
                delete this._helloDialog; //elimina atributo 
            },

            //abrir metodo de abrir desde cualquier punto que se necesite
            openHelloDialog : function(){
                this._helloDialog.open();
            }
        })
    });