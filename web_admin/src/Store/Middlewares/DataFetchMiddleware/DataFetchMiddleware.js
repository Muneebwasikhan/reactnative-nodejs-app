import Path from "../../../config/path"
import DataFetchAction from "../../Actions/DataFetchAction/DataFetchAction"
class DataFetchMiddleware {
    static getCategory = {
        mySchools: Path.GET_SCHOOLS,
        classes: Path.GET_CLASSES,
        teachers: Path.GET_TEACHERS
    }
    static dataFetch({ get, ...data }) {
        var user = JSON.parse(localStorage.getItem("AdminData"))
        if (!user) {
            alert("Please Login First");
            return;
        }
        data.databaseToken = user.databaseToken;

        return (dispatch) => {
            dispatch(DataFetchAction.dataFetch(data))
            fetch(`${this.getCategory[get]}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((resObj) => resObj.json())
                .then(res => {
                    if (!res.success) {
                        console.log(res);
                        dispatch(DataFetchAction.dataFetchFailed(data))
                    }
                    console.log(res);

                    dispatch(DataFetchAction.dataFetchSuccessfull(res.data, get))
                })
                .catch(err => {
                    dispatch(DataFetchAction.dataFetchFailed({ message: "Something Went Wrong Please Try Again" }))
                })
        }
    }

    static dataShowMiddleware(data, wts) {
        return dispatch => {
            dispatch(DataFetchAction.dataShowAction(data, wts))
        }
    }
}
export default DataFetchMiddleware;