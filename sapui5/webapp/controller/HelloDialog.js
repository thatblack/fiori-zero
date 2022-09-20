// @ts-nocheck
sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
],
    /**
     * 
     * @param {typeof sap.ui.base.ManegedObject} ManagedObject 
     * @param {typeof sap.ui.core.Fragment} Fragment
     */


    function (ManagedObject, Fragment) {
        //usar las variables correctamente tipadas 
        "use strict"

        return ManagedObject.extend("ns.sapui5.controller.HelloDialog", {

            //construcutor para inicializar vista pasada como paramentro desde el Component
            constructor: function (oView) {
                this._oView = oView;
            },

            exit: function () {
                delete this._oView;
            },

            open: function () {

                const oView = this._oView;

                //valida que solo exista una isntancia
                if (!oView.byId("Dialog1")) {

                    //simula un controlador y el metodo de cerrado de dialogo
                    let oFragmentController = {

                        onCloseDialog: function () {
                            oView.byId("Dialog1").close();
                        }
                    };

                    //se abre el fragmneto dialogo async    
                    Fragment.load({
                        id: oView.getId(),
                        name: "ns.sapui5.view.HelloDialog",
                        controller: oFragmentController
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                
                
                //si ya existe instancia abrirla
                } else {
                    oView.byId("Dialog1").open();
                }
            }

        });

    })