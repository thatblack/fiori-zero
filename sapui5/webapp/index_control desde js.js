// @ts-nocheck
sap.ui.define([
    "sap/m/Text"
],


    /**
     * 
     * @param {typeof sap.Text} Text 
     */

    function (Text) {
        "use strict";

        new Text({ text: "Hello World" }).placeAt("contenido")
    });