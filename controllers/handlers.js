const asyncHandler = require('express-async-handler');
const ApiError = require('../shared/apiError');
const statuscode = require('../shared/statusCode');
const ApiFeatures = require('../shared/apiFeatures');
const loggerService = require('../services/log/logger.service');
const{handleAuditing} = require('../middlewares/handleAuditing')
const bcrypt = require('bcrypt'); 
exports.apiCreateOne = (Model) => {
    const logger = new loggerService(Model.modelName);
    return asyncHandler(async (req, res, next) => {
        try {
            if (Model.modelName === "User") {
                req.body.password = await bcrypt.hash(req.body.password, 10); 
            }
            if (req.body.price) req.body.price = Number(req.body.price);
            if (req.body.quantity) req.body.quantity = Number(req.body.quantity);
            if(Model.modelName === "Product") {
                if (req.files) {
                    req.body.images = req.files.map(file => file.path); 
                }
            }else{
                if (req.file) {
                    req.body.image = req.file.path; 
                }
            }
            const item = new Model(req.body);
            await item.save();
            logger.info(`${Model.modelName} document created successfully`, { data: item }, Model.modelName);

            handleAuditing(`Create ${Model.modelName}`, req.user?.id||'system', 201, item);

            res.status(201).json({ data: item, message: "New document was created successfully" });
        } catch (e) {
            logger.error(`${Model.modelName} document creation failed`, { error: e.message }, Model.modelName);
            handleAuditing(`Create ${Model.modelName}`, req.user?.id, 500, {}, [e.message]);
            console.error(e);
            next(new ApiError(e, statuscode.badRequest));
        }
    });
};

exports.apiGetAll = (Model, modelName = "", populateOptions = []) => {
    const logger = new loggerService(Model.modelName);
    return asyncHandler(async (req, res, next) => {
        try {
            let filter = {};
            if (req.filterObj) {
                filter = req.filterObj;
            }
            const docCount = await Model.countDocuments();
            const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
                .limitFields()
                .sort()
                .filter()
                .paginate(docCount)
                .search(modelName);
            let { paginationResult, query } = apiFeatures;
            if (populateOptions.length) {
                populateOptions.forEach(option => {
                    if (option === 'user') {
                        query = query.populate({ path: 'user', populate: { path: 'role', select: 'name -_id' } });
                    } else if (option === 'products') {
                        query = query.populate({ path: 'items.product', select: 'name price description image' }); // حدد الحقول المطلوبة من المنتج
                    } else {
                        query = query.populate(option);
                    }
                });
            }                      
            const items = await query;
            logger.info(`${Model.modelName} documents fetched successfully`, { results: items.length, paginationResult }, Model.modelName);

            handleAuditing(`Fetch All ${Model.modelName}`, req.user?.id, 200, items);

            res.status(200).json({
                message: "All documents were fetched successfully",
                results: items.length,
                paginationResult,
                data: items,
            });
        } catch (e) {
            logger.error(`${Model.modelName} document fetch failed`, { error: e.message }, Model.modelName);

            handleAuditing(`Fetch All ${Model.modelName}`, req.user?.id, 500, {}, [e.message]);

            next(new ApiError("No documents found in database", statuscode.serverError));
        }
    });
};

exports.apiGetOne = (Model) => {
    const logger = new loggerService(Model.modelName);
    return asyncHandler(async (req, res, next) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) {
                return next(new ApiError(`No document found with id: ${req.params.id}`, statuscode.notFound));
            }
            logger.info(`${Model.modelName} document fetched successfully`, { data: item }, Model.modelName);

            handleAuditing(`Fetch One ${Model.modelName}`, req.user?.id, 200, item);

            res.status(200).json({ data: item, message: "Document was fetched successfully" });
        } catch (e) {
            logger.error(`${Model.modelName} document fetch failed`, { error: e.message }, Model.modelName);

            handleAuditing(`Fetch One ${Model.modelName}`, req.user?.id, 500, {}, [e.message]);

            next(new ApiError("Error while fetching document", statuscode.serverError));
        }
    });
};

exports.apiUpdateOne = (Model) => {
    const logger = new loggerService(Model.modelName);
    return asyncHandler(async (req, res, next) => {
        try {
            const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!item) {
                return next(new ApiError(`No document found with id: ${req.params.id}`, statuscode.notFound));
            }
            logger.info(`${Model.modelName} document updated successfully`, { data: item }, Model.modelName);

            handleAuditing(`Update ${Model.modelName}`, req.user?.id, 200, item);

            res.status(200).json({ data: item, message: "Document was updated successfully" });
        } catch (e) {
            logger.error(`${Model.modelName} document update failed`, { error: e.message }, Model.modelName);

            handleAuditing(`Update ${Model.modelName}`, req.user?.id, 500, {}, [e.message]);

            next(new ApiError("Error while updating document", statuscode.serverError));
        }
    });
};

exports.apiDeleteOne = (Model) => {
    const logger = new loggerService(Model.modelName);
    return asyncHandler(async (req, res, next) => {
        try {
            const item = await Model.findByIdAndDelete(req.params.id);
            if (!item) {
                return next(new ApiError(`No document found with id: ${req.params.id}`, statuscode.notFound));
            }
            logger.info(`${Model.modelName} document deleted successfully`, { data: item }, Model.modelName);

            handleAuditing(`Delete ${Model.modelName}`, req.user?.id, 200, item);

            res.json({ message: "Document deleted successfully" });
        } catch (e) {
            logger.error(`${Model.modelName} document deletion failed`, { error: e.message }, Model.modelName);

            handleAuditing(`Delete ${Model.modelName}`, req.user?.id, 500, {}, [e.message]);

            next(new ApiError("Error while deleting document", statuscode.serverError));
        }
    });
};

exports.apiDeleteAll = (Model) => {
    const logger = new loggerService(Model.modelName);
    return asyncHandler(async (req, res, next) => {
        try {
            const result = await Model.deleteMany();
            logger.info(`${Model.modelName} all documents deleted successfully`, { deletedCount: result.deletedCount }, Model.modelName);

            handleAuditing(`Delete All ${Model.modelName}`, req.user?.id, 200, { deletedCount: result.deletedCount });

            res.status(200).json({
                message: "All documents deleted successfully",
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            logger.error(`${Model.modelName} all documents deletion failed`, { error: error.message }, Model.modelName);

            handleAuditing(`Delete All ${Model.modelName}`, req.user?.id, 500, {}, [error.message]);

            next(new ApiError("Error while deleting all documents", statuscode.serverError));
        }
    });
};
