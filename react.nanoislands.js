/* borschik:include:node_modules/yate/lib/runtime.js */
/* borschik:include:nanoislands.js */
/* borschik:include:externals.yate.js */
/* borschik:include:react.nanoislands.yate.js */

(function() {
    "use strict";

    function ni(type, options) {
        return yr.run("react-nanoislands", options, type);
    }

    var Island = React.createClass({
        displayName: "Island",

        componentDidMount: function() {
            var node = this.getDOMNode();
            var block;
            var type = this.props.type;
            var handlers = this.props.on;

            nb.init(node);

            if (node.firstChild) {
                block = nb.block(node.firstChild);
            }

            if (block && handlers) {
                Object.keys(handlers).forEach(function(key) {
                    block.on(key, handlers[key]);
                });
            }

            this.node = node;
            this.block = block;
        },

        componentWillUnmount: function() {
            if (this.block) {
                this.block.destroy();
                delete this.node;
                delete this.block;
            }
        },

        render: function() {
            var className = "island";

            if (this.props.className) {
                className += " " + this.props.className;
            }

            return (
                React.createElement("div", {
                    className: className,
                    style: {display: "inline-block"},
                    dangerouslySetInnerHTML: {__html: ni(this.props.type, this.props.options)}
                })
            );
        }
    });

    nb.Block.prototype.getYateModuleName = function() {
        return 'react-nanoislands';
    };

    window.ni = ni;
    window.Island = Island;


})();
