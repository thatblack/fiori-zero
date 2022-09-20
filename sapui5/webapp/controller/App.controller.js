// @ts-nocheck

sap.ui.define([
    "sap/ui/core/mvc/Controller",
],

    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */

    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("ns.sapui5.controller.App", {

            onInit: function () {
                


            },

            onOpenDialogHeader: function () {
                //abrir metodo de abrir dialogo desde el Component
                this.getOwnerComponent().openHelloDialog();   
   
               }

         

        });


    });