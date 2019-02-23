class DataFetchAction {
    static DATA_FETCH = "DATA_FETCH"
    static DATA_FETCH_SUCCESSFULL = "DATA_FETCH_SUCCESSFULL"
    static DATA_FETCH_FAILED = "DATA_FETCH_FAILED"
    static DATA_TO_BE_SHOW = "DATA_TO_BE_SHOW"


    static dataFetch(data) {
        return {
            type: this.DATA_FETCH,
            data
        }
    }
    static dataFetchSuccessfull(data, key) {
        return {
            type: this.DATA_FETCH_SUCCESSFULL,
            key,
            data
        }
    }
    static dataFetchFailed(data) {
        return {
            type: this.DATA_FETCH_FAILED,
            data
        }
    }
    static dataShowAction(data, wts) {
        console.log(data,wts);
        return {
            type: wts,
            data
        }
    }

       

}

export default DataFetchAction;