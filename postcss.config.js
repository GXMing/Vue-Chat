module.exports = {
    plugins : [
        require('autoprefixer')({
            browsers:['>1%','last 5 versions','ie >= 8']
            // browsers:["last 10 versions","ie >= 8","ff >= 30","chrome >= 34","safari >= 6","ios >= 6","android >= 4.4","Firefox >= 20"]
        })
    ]
}