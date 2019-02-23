/*eslint-disable */

function validateForm(data) {
    const {
        SchoolName, email, phoneNumber, address, schoolWebsite, password
    } = data;

    var errors = {
        hasError: false,
        errorsObj: {}
    }

    let Validation = {
        SchoolName: {
            Validate: [{
                condition: SchoolName.length < 3,
                message: " Please Specify Your School Name . ",
            }, {
                condition: /\d/.test(SchoolName) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(SchoolName),
                message: " Name Can Not Contain Numbers Or Any Special Character . ",
            }
            ],
            elem: "SchoolName"
        },

        address: {
            Validate: [
                {
                    condition: address.length < 8,
                    message: " Please specify school's complete address. ",
                }
            ],
            elem: "address"
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
        schoolWebsite: {
            Validate: [
                {
                    condition: schoolWebsite && !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(schoolWebsite),
                    message: "Please Enter A Valid URL",
                }
            ],
            elem: "schoolWebsite"
        }
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