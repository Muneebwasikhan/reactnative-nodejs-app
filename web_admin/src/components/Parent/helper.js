/*eslint-disable */

function validateForm(data) {
    const {
        name,
        userName,
        password,
        address,
        email,
        gender,
        phoneNumber,
        dob
    } = data;

    var errors = {
        hasError: false,
        errorsObj: {}
    }

    let Validation = {
        name: {
            Validate: [{
                condition: name.length < 3,
                message: " Please Specify Parent's Full Name . ",
            }, {
                condition: /\d/.test(name) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(name),
                message: " Name Can Not Contain Numbers Or Any Special Character . ",
            }
            ],
            elem: "name"
        },
        userName: {
            Validate: [{
                condition: userName.length < 3,
                message: " Please Specify Parent's User Name . ",
            }
            ],
            elem: "userName"
        },
        phoneNumber: {
            Validate: [
                {
                    condition: !/\d/.test(phoneNumber) || /^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 @&$]*)?$/.test(phoneNumber),
                    message: " Should Have Numbers Only . ",
                }, {
                    condition: /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(phoneNumber),
                    message: " No Space Hyphens '-' Or Any Special Character . ",
                }

            ],
            elem: "phoneNumber"
        },
        password: {
            Validate: [
                {
                    condition: password.length < 6,
                    message: " Password Must Be Of 6 Characters ",
                },
            ],
            elem: "password"
        },

        address: {
            Validate: [
                {
                    condition: address.length < 8,
                    message: " Please specify Parent's complete address. ",
                }
            ],
            elem: "address"
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

        email: {
            Validate: [
                {
                    condition: !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
                        || !/^(?=[^@]{3,}@)([\w\.-]*[a-zA-Z0-9_]@(?=.{3,}\.[^.]*$)[\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z])$/.test(email),
                    message: " Please enter a valid email address. ",
                }
            ],
            elem: "email"
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