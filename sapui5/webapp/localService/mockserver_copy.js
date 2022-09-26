// @ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
     * @param{type of sap.ui.core.util.MockServer} MockServer
     * @param{type of sap.ui.model.json.JSONModel} JSONModel
     * @param{type of sap.base.util.MockServer} UriParameters
     * @param{type of sap.base.Log} Log
     */
    function (MockServer, JSONModel, UriParameters, Log) {
        "use strict";

        var oMockServer,
            _sAppPath = "ns/sapui5/",
            _JsonFilesPath = _sAppPath + "localService/mockdata";

        var oMockServerInterface = {

            /**
             * Initiliazes the mock server asyncronously
             * @protected
             * @param {object} oOptionParameter
             * @returns{Promise} a promise that is resolved when the mockserver has been started               
             */
            init: function (oOptionParameter) {

                var oOptions = oOptionParameter || {};

                return new Promise(function (fnResolved, fnReject) {

                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath  + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameters = new UriParameters(window.location.href);

                        //parse manifest for local metadata URI
                        var sJsonFileUrl = sap.ui.require.toUrl(_JsonFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainOData");
                        var sMetadataUrl = sap.ui.require.toUrl(_sAppPath  + oMainDataSource.settings.localUri);

                        //ensure there is a trailing slash
                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                        //create mock server instance or stop the existing one to reinitialize
                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            });
                        } else {
                            oMockServer.stop();
                        }

                        //configure mock server with the given options or a default delay of 0.5s
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                        })
                    });

                    //simulate all request using mock data
                    oMockServer.simulate(sMetadataUrl, {

                        sMockdataBaseUrl: sJsonFileUrl,
                        bGenerateMissingMockData: true

                    });

                    var aRequest = oMockServer.getRequests();

                    //compose an error response for each request
                    var fnResponse = function (iErrorCode, sMessage, aRequest) {
                        aRequest.response = function (oXhr) {
                            oXhr.response(iErrorCode, { "Content-Type": "text/plain;charset=utf-8" });
                        };
                    };


                    //simulate metadata errors
                    if (oOption.metadataError || oUriParameters.get("metadataError")) {
                        aRequest.forEach(function (aEntry) {
                            if (aEntry.path.toString().indexof("$metadata") > -1) {
                                fnResponse(500, "metadata Error", aEntry);
                            }
                        });
                    };

                    //simulate request errors
                    var sErrorParam = oOptionParameter.errorType || oUriParameters.get("errorType");
                    var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                    if (sErrorParam) {
                        aRequest.forEach(function (aEntry) {
                            fnResponse(iErrorCode, sErrorParam, aEntry);
                        });
                    };

                    //set requests and start the server
                    oMockServer.setRequest(aRequest);
                    oMockServer.start();

                    Log.info("running app with mock data");
                    fnResolved();


                });

                oManifestModel.attachRequestFailed(function () {
                    var sError = "fail to load application manifest";
                    Log.error(sError);
                    fnReject(new Error(sError));
                })
            }
        };

        return oMockServerInterface;

    });