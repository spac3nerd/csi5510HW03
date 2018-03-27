/**
 * @module hw03.controllers
 * @class account
 */

hw03.controllers = hw03.controllers || {};
hw03.controllers.home = hw03.controllers.home || {};
hw03.controllers.home.account = function(parent) {
    hw03.controllers.controller.call(this);
    this.parent = parent;

    this.detach = function() {
        this.container.detach();
    };
};

hw03.controllers.home.account.prototype = {
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
     * Creates the account view
     * @method _createView
     * @private
     */
    _createView: function() {
        //perform the magic incantation
        var that = this;
        var data = this.data;
        //fetch the partial

        //called once a response with the data is received
        var showAccountInfo = function(data) {
            this.template = _.template($("#accountPage").html());
            this.parent.append(this.template({
                email: data.data.email,
                address: data.data.address,
                zip: data.data.zip
            }));
            this.container = $("#accountContainer");
            console.log(data);
        };

        this.service.getAccount(showAccountInfo, this);
    },
    /**
     * @method init
     * @return {Object} the instance object
     */
    init: function() {
        console.log("init account");
        this._createView();

        return this;
    }
};