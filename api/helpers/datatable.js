var _ = require("lodash");
module.exports = {
    friendlyName: "Datatable",
    description: "Datatable something.",
    inputs: {
        model: {
            type: "ref",
            required: true,
        },
        options: {
            type: {},
            required: true,
        },
        extraWhere: {
            type: "ref"
        }
    },
    exits: {
        success: {
            description: "All done.",
        },
    },

    fn: async function (inputs, exits) {
        let model = inputs.model; // Project; //inputs.model;
        let options = inputs.options;

        let start = options.start;
        let length = options.length;
        var _columns = [
            {
                data: "",
                name: "",
                searchable: false,
                orderable: false,
                search: {
                    regex: false,
                    value: "",
                },
            },
        ];

        //default datatable options
        var _options = {
            draw: 0,
            columns: _columns,
            start: 0,
            length: 10,
            search: {
                value: "",
                regex: false,
            },
            order: [
                {
                    column: 0,
                    dir: "asc",
                },
            ],
        };

        //merge both Object, options and _options into _options
        _.assign(_options, options);

        //response format
        var _response = {
            draw: _options.draw,
            recordsTotal: 0,
            recordsFiltered: 0,
            iTotalRecords: 0, //legacy
            iTotalDisplayRecords: 0, //legacy
            data: [],
        };

        var _reverse = {};

        //build where criteria
        var where = [],
            whereQuery = {},
            select = [];

        if (_.isArray(_options.columns)) {
            _options.columns.forEach(function (column, index) {
                // This handles the column search property
                if (_.isNull(column.data) || column.searchable == 'false') {
                    return true;
                }
                if (_.isBoolean(column.reverse)) {
                    var joinedModel = _.split(column.data, ".", 2)[0];
                    var association = _.find(model.associations, ["alias", joinedModel]);
                    if (_.isUndefined(association)) {
                        _response["error"] = "Association " + joinedModel + " not found on this model:" + model.identity;
                        return true;
                    }
                    _reverse.model = sails.models[association.model || association.collection];
                    var joinCriteria = _.split(column.data, ".", 2)[1];
                    if (_.isUndefined(joinCriteria)) {
                        _reverse.criteria = {
                            id: column.search.value,
                        };
                    } else {
                        _reverse[joinCriteria] = column.search.value;
                    }
                    return true;
                }
                if (_.isPlainObject(column.search.value)) {
                    if (column.search.value.from != "" && column.search.value.to != "") {
                        whereQuery[column.data] = {
                            ">=": column.search.value.from,
                            "<": column.search.value.to,
                        };
                    }
                } else if (_.isString(column.search.value)) {
                    var col = column.data.split(".")[0];

                    if (!_.isEqual(column.search.value, "")) {
                        // whereQuery[col] = column.search.value;
                        if (col != "") {
                            whereQuery[col] = column.search.value;
                        }
                    }
                } else if (_.isNumber(column.search.value)) {
                    var col = column.data.split(".")[0];
                    whereQuery[col] = column.search.value;
                } else if (_.isArray(column.search.value)) {
                    var col = column.data.split(".")[0];
                    whereQuery[col] = column.search.value;
                }

                // This handles the global search function of this column
                var col = column.data.split(".")[0];

                var filter = {};
                if (col != "") {
                    filter[col] = {
                        contains: _options.search.value,
                    };

                    select.push(col);
                    where.push(filter);
                }
            });
        }
        whereQuery["or"] = where;

        var sortColumn = {};
        var sortString = "";
        _.forEach(_options.order, function (value, key) {
            var sortBy = _options.columns[value.column].data;
            if (_.includes(sortBy, ".")) {
                sortBy = sortBy.substr(0, sortBy.indexOf("."));
            }
            var sortDir = value.dir == "asc" ? 1 : 0;
            sortColumn[sortBy] = sortDir;
            sortString = sortBy + " " + value.dir;
        });

        //find the database on the query and total items in the database data[0] and data[1] repectively
        if (!_.isEmpty(_response["error"])) {
            delete _response["data"];
            return new Promise(function (resolve, reject) {
                reject(_response);
            });
        }

        if (inputs?.extraWhere?.length > 0) {
            const transformedData = inputs.extraWhere.reduce((result, item) => {
                const key = Object.keys(item)[0];
                const value = item[key];
                return { ...result, [key]: value };
            }, whereQuery);
            whereQuery = transformedData
        }

        _response.recordsTotal = await model.count();
        _response.recordsFiltered = await model.count({
            where: whereQuery,
        });
        _response.iTotalRecords = _response.recordsTotal;
        _response.iTotalDisplayRecords = _response.recordsFiltered;

        let queryOptions = {
            skip: _options.start,
            limit: _options.length,
            sort: sortString,
        };

        const cleanedWhereQuery = Object.fromEntries(
            Object.entries(whereQuery).filter(([key, value]) => {
                return (
                    !(Array.isArray(value) && value.length === 0) &&
                    !(typeof value === "object" && value !== null && Object.keys(value).length === 0)
                );
            })
        );

        if (Object.keys(cleanedWhereQuery).length > 0) {
            queryOptions.where = cleanedWhereQuery;
        }

        _response.data = await model
            .find(queryOptions)
            .populateAll();

        return exits.success(_response);
    },
};
