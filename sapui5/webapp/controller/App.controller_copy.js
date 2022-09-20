// @ts-nocheck

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
   // "sap/ui/model/json/JSONModel"
   "ns/sapui5/model/Models"
],


    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */

    function (Controller, MessageToast, JSONModel) {
        "use strict";

        return Controller.extend("ns.sapui5.controller.App", {
            onInit: function () {
               
                /*
                var oData = {
                    recipient: {
                        name: "Ronald",
                        city: "Montreal"
                    }
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);                
                */

               this.getView().setModel(oModel);   

            },
            
            onShowHello: function () {
                MessageToast.show("Hola mundillo");
            }

        });


    });