const {json} = require("express");

class ApiFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    // filtration method 
    filter(){
        const queryObj = {...this.queryString};
        const excludeFields = ['limit','page','sort','fields','keyword'];
        excludeFields.map(field => delete queryObj[field]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    // sorting method

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(" ");// to join more than condition of sorts 
            this.query = this.query.sort(sortBy);
        }
        else{
            this.query = this.query.sort({createdAt: -1});// sort descending order
        }
        return this;
    }

    // limit method
    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');// to determine what fields you want to show 
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');// to exclude the __v field that mongoose adds for versioning
        }
        return this;
    }
    // search method
    search(modelName){
        if(this.queryString.keyword){
           let Query = {}
           if(modelName === "Products"){
            Query = {$or: [
                {title: {$regex: this.queryString.keyword, $options: 'i'}},
                {description: {$regex: this.queryString.keyword, $options: 'i'}}
            ]}
            }else{
                Query = {name: {$regex: this.queryString.keyword, $options: 'i'}}
            }
            this.query = this.query.find(Query);
           }
           return this;
    }
    // pagination method
    paginate(countDocument){
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 10;
        const skip = (page - 1) * limit;
        // pagination result
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.totalPages = Math.ceil(countDocument / limit);

        // previous and next page
        if(page > 1){
            pagination.hasPrevPage = true;
            pagination.prevPage = page - 1;
        }
        if(page < pagination.totalPages){
            pagination.hasNextPage = true;
            pagination.nextPage = page + 1;
        }
        this.query = this.query.skip(skip).limit(limit);
        this.paginationResult = pagination
        return this;
    }
}

module.exports = ApiFeatures;




