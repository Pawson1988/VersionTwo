<<<<<<< HEAD


class AppError extends Error {
    constructor(message, status){
        super()
        this.message = message;
        this.status = status;
    }
}

=======


class AppError extends Error {
    constructor(message, status){
        super()
        this.message = message;
        this.status = status;
    }
}

>>>>>>> c38e7307cd8513f21125579bbb63a3d5cb944e5e
module.exports = AppError;