class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query,
            this.queryStr = queryStr
    }
    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this
    }
    filter() {
        let filterCopy = { ...this.queryStr }
        let removeQuery = ["keyword", "page", "limit"]
        removeQuery.forEach(key => delete filterCopy[key])
        this.query = this.query.find(filterCopy)
        return this
    }
    pagination(resultPerPage){
        let currentPage = Number(this.queryStr.page) || 1
        let skip = resultPerPage * (currentPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this
    }
}

module.exports = ApiFeatures


