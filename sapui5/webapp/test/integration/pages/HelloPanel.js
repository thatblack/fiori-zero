// @ts-nocheck
sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press"
],
    /**
     * @param{typeof sap.ui.test.Opa5} Opa5,
     * @param{typeof sap.ui.test.actions.Press} Press
     */
    function (Opa5, Press) {

        Opa5.createPageObjects({
            onTheAppPage: {
                
                actions: {

                    iPressTheSayHelloWithDialogButton: function () {
                        return this.waitFor({
                            id: "_IDGenButton2",
                            viewName: "ns.sapui5.view.HelloPanel",
                            actions: new Press(),
                            errorMessage: "Did not find  the 'Say Hello Dialog button' on the HelloPanel view"
                        });
                    }
                },
                assertions: {

                    iShouldSeeTheHelloDialog: function () {
                        return this.waitFor({
                            controlType: "sap.m.Dialog",
                            success: function () {
                                Opa5.assert.ok(true, "The Dialog was opened")
                            },
                            errorMessage: "Did not find the Dialog control"
                        });
                    }

                }
            }
        });

    })