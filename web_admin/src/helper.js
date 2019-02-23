/*eslint-disable */
import React from "react";

function validateForm(check, data, field, err) {
    const {
        fullName, DOB, gender, email, phoneNumber, lastQualification, studentCnic, fatherName,
        homeAddress, province, course, image, fatherCnic, city
    } = data;

    var errors = err ? err : {
        hasError: false,
        errorsObj: {}
    }
    // function hasNumber(myString) {
    //     return;
    // }



    let Validation = {
        fullName: {
            Validate: [{
                condition: fullName.length < 3,
                message: " Please Specify Your Full Name . ",
            }, {
                condition: /\d/.test(fullName) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(fullName),
                message: " Name Can Not Contain Numbers Or Any Special Character . ",
            }
            ],
            elem: "fullName"
        },
        fatherName: {
            Validate: [
                {
                    condition: fatherName.length < 3,
                    message: " Please Specify You Full Father Name . ",
                },
                {
                    condition: /\d/.test(fatherName) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(fatherName),
                    message: " Name Can Not Contain Numbers Or Any Special Character . ",
                }

            ],
            elem: "fatherName"
        },
        image: {
            Validate: [
                {
                    condition: !image,
                    message: "Please select your picture",
                },
                {
                    condition: image && image.size > 1000000,
                    message: "Image size must be less than 1 MB",
                },
                {
                    condition: image && !image.type.toLowerCase().match(/\/(jpg|jpeg|png)$/i),
                    message: " Please select a valid image . "
                }
            ],
            elem: "imagePicker"
        },
        homeAddress: {
            Validate: [
                {
                    condition: homeAddress.length < 8,
                    message: " Please specify your complete address. ",
                }
            ],
            elem: "homeAddress"
        },
        studentCnic: {
            Validate: [
                {
                    condition: studentCnic.length !== 13,
                    message: " Please enter your full CNIC number. CNIC # should contain only 13 digits. ",
                }, {
                    condition: !/\d/.test(studentCnic) || /^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 @&$]*)?$/.test(studentCnic),
                    message: " CNIC Should Have Numbers Only. ",
                }, {
                    condition: /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(studentCnic),
                    message: " No Space Hyphens '-' Or Any Special Character. ",
                }, {
                    condition: fatherCnic === studentCnic,
                    message: "Candidate and Father CNIC # can not be same.",
                }
            ],
            elem: "studentCnic"
        },
        fatherCnic: {
            Validate: [
                {
                    condition: fatherCnic && fatherCnic.length !== 13,
                    message: " Please enter your father's full CNIC number. CNIC # should contain only 13 digits. ",

                }, {
                    condition: fatherCnic && (!/\d/.test(fatherCnic) || /^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 @&$]*)?$/.test(fatherCnic)),
                    message: " CNIC Should Have Numbers Only. ",
                }, {
                    condition: fatherCnic && /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(fatherCnic),
                    message: "  No Space Hyphens '-' Or Any Special Character. ",
                }, {
                    condition: fatherCnic && fatherCnic === studentCnic,
                    message: " Please Enter Your Father CNIC Number. ",
                }

            ],
            elem: "fatherCnic"
        },
        DOB: {
            Validate: [
                {
                    condition: !DOB,
                    message: "Please Enter A Valid Date",
                }, {
                    condition: (Date.now() - Date.parse(DOB) < 201429092347),
                    message: "You are not eligible for this program",
                }
            ],
            elem: "DOB"
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
        lastQualification: {
            Validate: [
                {
                    condition: !lastQualification || lastQualification === "Select",
                    message: "Please Select Your Qualification",
                }
            ],
            elem: "lastQualification"
        },
        province: {
            Validate: [
                {
                    condition: !province || province === "Select",
                    message: "Please Select The Province In Which You Live",
                }
            ],
            elem: "province"
        },
        city: {
            Validate: [
                {
                    condition: !city || city === "Select" || city === "Please Select Province",
                    message: "Please Select The City In Which You Live",
                }
            ],
            elem: "city"
        },
        email: {
            Validate: [
                {
                    condition: !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email),
                    message: " Please enter a valid email address. ",
                },
                {
                    condition: !/^(?=[^@]{3,}@)([\w\.-]*[a-zA-Z0-9_]@(?=.{3,}\.[^.]*$)[\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z])$/.test(email),
                    message: " Please enter a valid email address. ",
                }
            ],
            elem: "email"
        },
        phoneNumber: {
            Validate: [
                {
                    condition: phoneNumber.indexOf("03") !== 0,
                    message: " Please enter a valid mobile phone number . ",

                }, {
                    condition: phoneNumber.length !== 11,
                    message: "  Phone number must contain 11 digits . "
                },
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
        course: {
            Validate: [
                {
                    condition: !course.length || course === "Select",
                    message: "Please Select Any Course",
                }
            ],
            elem: "course"
        }
    }
    if (check === "all") {
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
                errors.errorsObj[Validation[i].elem] = undefined
            }
        }
        return errors
    }
    if (check === "each") {
        var conArray = Validation[field].Validate;
        errors.errorsObj[Validation[field].elem] = { message: [] }
        for (var j = 0; j < conArray.length; j++) {
            if (conArray[j].condition) {
                errors.hasError = true
                errors.errorsObj[Validation[field].elem].message.push(conArray[j].message)
            }
        }
        if (!errors.errorsObj[Validation[field].elem].message.length) {
            errors.errorsObj[Validation[field].elem] = undefined
        }
        return errors
    }




    return errors.hasError ? errors : {
        hasError: false
    }
}


const Loader = () => {
    return (
        <div className="LoaderContainer">
            <div className="loader">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}



export { validateForm, Loader };