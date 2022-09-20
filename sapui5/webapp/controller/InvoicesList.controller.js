// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/InvoicesFormatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],

    /**
       * 
       * @param {typeof sap.ui.core.mvc.Controller} Controller
       * @param {typeof sap.ui.model.json.JSONModel} JSONModel
       * @param {typeof sap.ui.model.Filter} Filter
       * @param {typeof sap.ui.model.FilterOperator} FilterOperator
       */

    function (Controller, JSONModel, InvoicesFormatter, Filter,FilterOperator) {

        return Controller.extend("ns.sapui5.controller.InvoicesList", {

            //se crea un alias para trabajarlo en la funcion y en la vista xml
            formatterC: InvoicesFormatter,

            //se carga un nuevo modelo para representar la moneda ya que el json original no la tenia
            onInit: function () {

                var oViewModel = new JSONModel({
                    usd: "USD",
                    eur: "EUR"
                });

                this.getView().setModel(oViewModel, "currency");
            },


            //filtro de busqueda
            onFilterInvoices: function (oEvent) {

                const aFilter = [];

                //se obtiene query
                const sQuery = oEvent.getParameter("query");

                //se anade el filtro al array de filtros
                if (sQuery){
                    aFilter.push( new Filter("ProductName", FilterOperator.Contains, sQuery ));
                }
                 
                //se obtiene la lista
                const oList = this.getView().byId("_IDGenList1");

                //se obtiene los elementos de la lista
                const oBinding = oList.getBinding("items");
                
                //se aplica el filtro
                oBinding.filter(aFilter);


            }
        })
    });