
//The catch Async function is used instead of using try and catch on every single route,
//instead we can just wrap the call in a callback function and let the catchAsync function do the work

function catchAsync(fn){
    return function (req, res, next) {
       fn(req, res, next).catch((err) => {
           next(err)
       })}
}

module.exports = catchAsync;