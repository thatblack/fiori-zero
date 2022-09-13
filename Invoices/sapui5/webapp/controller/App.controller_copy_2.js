// @ts-nocheck

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "ns/sapui5/model/Models",
    "sap/ui/model/resource/ResourceModel"
],


    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {sap.ui.model.resource.ResourceModel} ResourceModel
     */

    function (Controller, MessageToast, Models,ResourceModel) {
        "use strict";

        return Controller.extend("ns.sapui5.controller.App", {

            onInit: function () {
                
                //set data model on the view
                this.getView().setModel(Models.createRecipient());

                //set 18n model
                var i18nModel = new ResourceModel({
                    bundleName : "ns.sapui5.i18n.i18n"
                });
                this.getView().setModel(i18nModel,"i18n"); 

            },

            onShowHello: function () {

                //read text from i18 model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                //read property from data model
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMessage",[sRecipient])
                MessageToast.show(sMsg);
            }

        });


    });