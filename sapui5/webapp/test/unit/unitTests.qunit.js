// @ts-nocheck
/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ns/sapui5/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});