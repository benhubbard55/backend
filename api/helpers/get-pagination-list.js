/* eslint-disable eqeqeq */
module.exports = {
    friendlyName: "Pagination helper",
    description: "",
    inputs: {
        request: {
            type: "ref",
            required: true,
        },
        modelName: {
            type: "ref",
            required: true,
        },
        whereCondition: {
            type: "ref",
            defaultsTo: {},
        },
        selectItems: {
            type: "ref",
            defaultsTo: [],
        },
        populate: {
            type: "ref",
            defaultsTo: [],
        },
        sortBy: {
            type: "string",
            defaultsTo: "id asc",
        },
    },
    exits: {
        success: {},
    },

    fn: async function (inputs, exits) {
        try {
            const { request, modelName, whereCondition, selectItems, sortBy } =
                inputs;

            const page = parseInt(request.query["page"]) || 1;
            const limit = parseInt(request.query["limit"]) || 10;

            const skip = (page - 1) * limit;

            const findObj = {
                where: whereCondition,
                limit: limit,
                skip: skip,
            };

            if (selectItems.length > 0) {
                findObj.select = selectItems;
            }

            const populateData = inputs.populate;

            let findData;

            if (populateData.length > 0) {
                findData = await populateData.reduce((query, field) => {
                    return query.populate(field).sort(sortBy);
                }, sails.models[modelName.toLowerCase()].find(findObj));
            } else {
                findData = await sails.models[modelName.toLowerCase()]
                    .find(findObj)
                    .sort(sortBy);
            }

            // const totalRecord = await sails.models[modelName.toLowerCase()].count({
            //     where: whereCondition,
            // });

            // const totalPage = Math.ceil(totalRecord / limit);

            const isNextPage = findData.length === limit;

            return exits.success({
                status: true,
                message: "List fetched successfully",
                data: findData,
                pagination: {
                    // totalRecord: totalRecord,
                    // currentPage: page,
                    // totalPage: totalPage,
                    isNextPage: isNextPage,
                },
            });
        } catch (error) {
            console.log("error :>> ", error);
            return exits.success({
                status: false,
                message: typeof error == "string" ? error : serverErrorMsg,
                data: [],
                pagination: {
                    // totalRecord: 0,
                    // currentPage: 0,
                    // totalPage: 0,
                    isNextPage: false,
                },
            });
        }
    },
};
