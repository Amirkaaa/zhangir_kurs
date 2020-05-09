export default (modelName) => ({
    collection: modelName,
    minimize: false,
    versionKey: 'version',
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
});