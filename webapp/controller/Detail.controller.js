sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "student00/com/sap/training/ux402/listdetail/ux402listdetail/controller/BaseController",
    "sap/ui/Device"
], (Controller, Device) => {
    "use strict";

    return Controller.extend("student00.com.sap.training.ux402.listdetail.ux402listdetail.controller.Detail", {
        onInit() {
            this.getRouter().getRoute("carrierdetails").attachPatternMatched(this._onObjectMatched, this);
        },


_onBindingChange: function() {
    var oView = this.getView();
    var oElementBinding = oView.getElementBinding();
    if (!oElementBinding.getBoundContext()) {
    this.getRouter().getTargets().display("detailObjectNotFound");
    this.getOwnerComponent().oListSelector.clearMasterListSelection();
    return;
    }
    var sPath = oElementBinding.getPath();
    this.getOwnerComponent().oListSelector.selectAListItem(sPath);
   },

   _bindView: function(sObjectPath) {
    var oView = this.getView();
   
    this.getView().bindElement({
    path: sObjectPath,
    events: {
    change: this._onBindingChange.bind(this),
    dataRequested: function() {
    oView.setBusy(true);
    },
    dataReceived: function() {
    oView.setBusy(false);
    }
    }
    });
   },

_onObjectMatched: function(oEvent) {
    this.getView().getModel("mainView").setProperty("/layout", "TwoColumnsMidExpanded");
    var sObjectPath =
    "/UX_C_Carrier_TP('" + oEvent.getParameter("arguments").objectId + "')";
    this._bindView(sObjectPath);
   }


    });
});

