// @ts-nocheck

sap.ui.define([

],



    function () {
        "use strict";

        return {

            InvoiceStatus: function (sStatus) {

                //read text from i18 model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();

                switch (sStatus) {
                    case 'A':
                        return  oBundle.getText("InvoiceStatusA");
                    case 'B':
                        return  oBundle.getText("InvoiceStatusB");
                    case 'C':
                        return  oBundle.getText("InvoiceStatusC");
                    default:
                        return  oBundle.getText("InvoiceStatusX");
                }


            }
        }

    });
