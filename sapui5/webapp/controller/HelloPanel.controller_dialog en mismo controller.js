// @ts-nocheck

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"

],


    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     * @param {typeof sap.ui.core.Fragment} Fragment
     */

    function (Controller, MessageToast,Fragment) {
        "use strict";

        return Controller.extend("ns.sapui5.controller.HelloPanel", {

            onInit: function () {
                
            },

            onShowHello: function () {

                //read text from i18 model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                //read property from data model
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMessage",[sRecipient])
                MessageToast.show(sMsg);
            },

            onOpenDialog: function () {

                const oView = this.getView();


                if(!this.byId("Dialog1")){
                Fragment.load({
                    id: oView.getId(),
                    name: "ns.sapui5.view.HelloDialog",
                    controller : this
                }).then(function(oDialog){
                    oView.addDependent(oDialog);
                    oDialog.open();
                } );
                }else{
                    this.byId("Dialog1").open();
                }
            },

            onCloseDialog: function(){
                this.byId("Dialog1").close();
            }
        

        });


    });