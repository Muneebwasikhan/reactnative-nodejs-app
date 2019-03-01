import DataFetchAction from "../../Actions/DataFetchAction/DataFetchAction"
function DataFetchReducer(state = {
    isLoading: false,
    hasError: false,
    mySchools: [],
    errMsg: "",
    successMsg: ""
}, action) {

    switch (action.type) {
        case DataFetchAction.DATA_FETCH:
            return {
                ...state,
                isLoading: true,
                hasError: false,
                errMsg: "",
                successMsg: ""
            }
        case DataFetchAction.DATA_FETCH_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                [action.key]: action.data,
                errMsg: "",
                hasError: false
            }
        case DataFetchAction.DATA_FETCH_FAILED:
            return {
                ...state,
                isLoading: false,
                errMsg: action.data.message,
                successMsg: "",
                hasError: true
            }
        case "SHOW_SCHOOL":
            return {
                ...state,
                isLoading: false,
                dataToBeShow: {
                    SchoolName: action.data.SchoolName
                }
            }
        case "ADD_SCHOOL_IN_SIDEBAR":
            state.mySchools.push(action.data)
            return {
                ...state,
                isLoading: false,
                successMsg: "",
                errMsg: "",
                hasError: false
            }
        case 'EDIT_SCHOOL_IN_SIDEBAR':
            console.log(action.data);
            state.mySchools.map((school, index) => {
                if (school._id == action.data._id) {
                    state.mySchools[index] = { ...action.data }
                }
            })
            return {
                mySchools: state.mySchools,
                isLoading: false,
                successMsg: "",
                errMsg: "",
                hasError: false
            }


        default:
            return {
                ...state
            }
    }
}

export default DataFetchReducer;