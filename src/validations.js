const yup = require('yup');

function paymentInfoValidation(data) {
    const schema = yup.object().shape({
        name: yup
            .string().trim()
            .required()
            .min(5)
            .matches(/[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/),
        enterprise: yup
            .string().trim()
            .required(),
        reason: yup
            .string().trim()
            .required()
            .matches(/[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/)
            .min(3),
        rfc: yup.string()
            .required()
            .uppercase()
            .matches(/^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/),
        email: yup.string()
            .email()
            .required(),
        cfdi: yup.string().required()
    });
    schema.validateSync(data, { abortEarly: false });
}

function contactMailValidation(data) {
    const schema = yup.object().shape({
        name: yup
            .string().trim()
            .required("El nombre es requerido")
            .min(5, "El nombre no puede ser tan corto")
            .matches(/^[a-zA-z ,.'-]+$/, "No puedes ingresar números"),
        email: yup.string()
            .email("Dirección de correo no válida")
            .required("La dirección de correo no puede estar vacía"),
        phone: yup.string()
            .required().matches(/^[0-9]{10}/)
    });
    schema.validateSync(data, { abortEarly: false });
}

function distributorMailValidation(data) {
    const schema = yup.object().shape({
        enterprise: yup
            .string().trim()
            .required(),
        address: yup
            .string().trim()
            .required(),
        city: yup
            .string().trim()
            .required()
            .matches(/^[a-zA-z ,.'-]+$/),
        state: yup
            .string().trim()
            .required()
            .matches(/^[a-zA-z ,.'-]+$/),
        name: yup
            .string().trim()
            .required()
            .min(5)
            .matches(/^[a-zA-z ,.'-]+$/),
        phone: yup.string()
            .required().matches(/^[0-9]{10}/),
        email: yup.string()
            .email()
            .required(),
        message: yup.string().required()
    });
    schema.validateSync(data, { abortEarly: false });
}

module.exports = {
    paymentInfoValidation,
    contactMailValidation,
    distributorMailValidation
}