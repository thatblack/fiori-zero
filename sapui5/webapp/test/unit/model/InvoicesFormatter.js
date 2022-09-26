// @ts-nocheck
sap.ui.define([
    "ns/sapui5/model/InvoicesFormatter",
    "sap/ui/model/resource/ResourceModel"
],
    /**
     * @param {typeof sap.ui.model.resource.ResourceModel } ResourceModel        
     */
    function (InvoicesFormatter, ResourceModel) {


        QUnit.module("Qunit invoices formatter status", {

            beforeEach: function () {
                this._oResourceModel = new ResourceModel({
                    bundleUrl: sap.ui.require.toUrl("ns/sapui5") + "/i18n/i18n.properties"
                });
            },
            afterEach: function () {
                this._oResourceModel.destroy();

            }




        });

        QUnit.test("Should return the invoice status", function(assert) {

            let oModel = this.stub();
            oModel.withArgs("i18n").returns(this._oResourceModel);

            let oViewStub = {
                getModel : oModel
            };

            let oControllerStub = {
                getView : this.stub().returns(oViewStub)
            };

            let fnIssolatedFormatter = InvoicesFormatter.InvoiceStatus.bind(oControllerStub);

            //asserts
            assert.strictEqual(fnIssolatedFormatter("A"),"New", "The invoice estatus for A is correct" );
            assert.strictEqual(fnIssolatedFormatter("B"),"In progress", "The invoice estatus for B is correct" );
            assert.strictEqual(fnIssolatedFormatter("C"),"New", "The invoice estatus for C is correct" );

        });

    });