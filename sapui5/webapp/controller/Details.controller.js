// @ts-nocheck

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
    */
    function (Controller, History, UIComponent) {
        "use strict";

        return Controller.extend("ns.sapui5.controller.Details", {



            onInit: function () {

                //se valida si hay un mach con el patron del manifest si es asi se dispara la funct
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatched, this);

            },


            //se  obtienen los argumentos de la vista anterior y el model anterior
            _onObjectMatched: function (oEvent) {

                this.byId("rating").reset(); 

                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model: "northwind_Int"
                });

            },

            //navegacion hacia atras si hay o no evento anterior, puede venir directo de la url completa sin 
            //habe rentrado a la lista(else)
            onNavBack: function () {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                }
                else {
                    const oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteApp");
                }
            },
            
            //metodo personalizado para el control de rating metadatos ->change
            onRatingChange : function(oEvent){

                const fValue = oEvent.getParameter("value");
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                sap.m.MessageToast.show(oResourceBundle.getText("ratingConfirmation",[fValue]));
                
            }


        });

    });