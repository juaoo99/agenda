exports.meuMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');

    next();
}

// Middleware para tratar erros de CSRF
exports.checkCsrferror = (err, req, res, next) => {
    if (err) {
        return res.render('404');
    }
    next(); // Chame next para passar para o próximo middleware
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}