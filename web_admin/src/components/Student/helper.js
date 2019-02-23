/*eslint-disable */

function validateForm(data) {
    const {
        parentName,
        schoolName,
        name,
        gender,
        dob
    } = data;

    var errors = {
        hasError: false,
        errorsObj: {}
    }

    let Validation = {
        schoolName: {
            Validate: [{
                condition: schoolName.length < 3,
                message: " Please Specify School's Full Name . ",
            }, {
                condition: /\d/.test(schoolName) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(schoolName),
                message: " Name Can Not Contain Numbers Or Any Special Character . ",
            }
            ],
            elem: "schoolName"
        },
        parentName: {
            Validate: [{
                condition: parentName.length < 3,
                message: " Please Specify Parent's Full Name . ",
            }, {
                condition: /\d/.test(parentName) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(parentName),
                message: " Name Can Not Contain Numbers Or Any Special Character . ",
            }
            ],
            elem: "parentName"
        },
        name: {
            Validate: [{
                condition: name.length < 3,
                message: " Please Specify Student's Full Name . ",
            },{
                condition: /\d/.test(name) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(name),
                message: " Name Can Not Contain Numbers Or Any Special Character . ",
            }
            ],
            elem: "name"
        },
        

        
        dob: {
            Validate: [
                {
                    condition: !dob,
                    message: "Please Enter A Valid Date",
                }
            ],
            elem: "dob"
        },
        gender: {
            Validate: [
                {
                    condition: !gender,
                    message: "Please Select Your Gender",
                }
            ],
            elem: "gender"
        },

    }

    for (var i in Validation) {
        var conArray = Validation[i].Validate;
        errors.errorsObj[Validation[i].elem] = { message: [] }
        for (var j = 0; j < conArray.length; j++) {
            if (conArray[j].condition) {
                errors.hasError = true
                errors.errorsObj[Validation[i].elem].message.push(conArray[j].message)
            }
        }
        if (!errors.errorsObj[Validation[i].elem].message.length) {
            delete errors.errorsObj[Validation[i].elem]
        }
    }


    return errors.hasError ? errors : {
        hasError: false,
        errorsObj: {}
    }
}





export { validateForm };