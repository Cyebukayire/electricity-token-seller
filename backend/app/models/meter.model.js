module.exports.Meter = (mongoose) => {
    var schema = mongoose.Schema(
        {
            code: String,
            owner_first_name: String,
            owner_last_name: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Tutorial = mongoose.model("meter", schema);
    return Tutorial;
};

module.exports.validateMeter = (body)=>{
    return Joi.object({
        owner_first_name: Joi.string().required(),
        owner_last_name: Joi.string().required()
    }).validate(body)
}