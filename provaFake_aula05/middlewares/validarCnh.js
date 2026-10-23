function validarCnh(req, res, next) {
    const { cnh } = req.body;
    const regexCnh = /^\d{11}$/;

    if (!cnh || !regexCnh.test(cnh)) {
        return res.status(400).json({
            erro: "Validacao falhou: A CNH deve conter exatamente 11 digitos numericos."
        });
    }

    next();
}

module.exports = validarCnh;
