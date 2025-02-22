const generateSlug = (schema) => {
    schema.pre(/^findOneAndUpdate|save/, function (next) {
        if (this.isNew || this.isModified?.('name')) {
            this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
        }
        if (this.getUpdate) {
            const update = this.getUpdate();
            if (update?.name) {
                update.slug = update.name.toLowerCase().replace(/\s+/g, '-');
                this.setUpdate(update);
            }
        }

        next();
    });
};
module.exports = generateSlug;