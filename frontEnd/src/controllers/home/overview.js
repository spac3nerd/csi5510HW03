/**
 * @module hw03.controllers
 * @class overview
 */

hw03.controllers = hw03.controllers || {};
hw03.controllers.home = hw03.controllers.home || {};
hw03.controllers.home.overview = function(parent) {
    hw03.controllers.controller.call(this);
    this.parent = parent;

    this.detach = function() {
        this.container.detach();
    };
};

hw03.controllers.home.overview.prototype = {
    /**
     * Called when the data set changes
     * @method _updateTable
     * @private
     */
    _updateTable: function() {
        this.table.clear();
        this.table.rows.add(this.data);
        this.table.draw();
    },
    /**
     * Creates the overview view
     * @method _createView
     * @private
     */
    _createView: function() {
        //perform the magic incantation
        var that = this;
        var data = this.data;
        //fetch the partial
        this.template = _.template($("#overviewPage").html());
        this.parent.append(this.template({}));
        this.container = $("#overviewContainer");
        //called once a response with the data is received
        var renderTable = function(data) {
            //initialize the DataTable
            this.table = $("#d-overviewTable").DataTable({
                scrollY: "500px",
                scrollCollapse: true,
                paging: false,
                data: data.data,
                columns: [
                    {
                        data: "name",
                        title: "Name"
                    },
                    {
                        data: "project",
                        title: "Project"
                    },
                    {
                        data: "description",
                        title: "Description"
                    }
                ]
            });
            $("#d-overviewTable_filter").addClass("tableFilterLayout");

            var editCallback = function(action, newData) {
                if (action === "delete") {
                    this.service.getoverview(function(d) {
                        this.data = d;
                        this._updateTable();
                    }, that);
                }
                else if (action === "update") {
                    this.service.getoverview(function(d) {
                        this.data = d;
                        this._updateTable();
                    }, that);
                }
            };
            //Add event listener for editing row
            this.table.body = $("#d-overviewTable tbody");
            this.table.body.on("click", "td.editRow", function () {
                var data = that.table.row(this).data();

                that.windowManager.openWindow("bay", {
                    type: "edit",
                    data: {
                        bayId: data.bayId,
                        name: data.name,
                        facId: data.facId,
                        capacity: data.capacity,
                        occupancy: data.occupancy
                    }
                }, editCallback);
            });
        };

        this.service.getOverview(renderTable, this);
    },
    /**
     * @method init
     * @return {Object} the instance object
     */
    init: function() {
        console.log("init overview");
        this._createView();

        return this;
    }
};