import joi from "joi";
export const userRegisterValidation = joi.object({
    userName: joi.string().min(2).required(),
    firstName: joi.string().allow("", null),
    lastName: joi.string().allow("", null),
    middleName: joi.string().allow("", null),
    email: joi.string().email().required(),
    phone: joi
        .string()
        .pattern(/^[0-9]{10,15}$/)
        .allow("", null),
    role: joi.string().valid("student", "admin", "teacher", "parent").allow("", null),
    password: joi
        .string()
        .min(8)
        .max(30)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$"))
        .required()
        .messages({
            "string.pattern.base": `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
        }),
});


export const loginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});


export const otpEmailValidation = joi.object({
    email: joi.string().email().required(),
});

export const resetPasswordValidation = joi.object({
    email: joi.string().email().required(),
    otp: joi.string().min(4).max(4).required(),
    newPassword: joi.string().min(8).max(30)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$"))
        .required()
        .messages({
            "string.pattern.base": `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
        }),
});