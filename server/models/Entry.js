const mongoose = require("mongoose");
const { Schema } = mongoose;

const entrySchema = new Schema(
  {
    _contentTypeId: { type: Schema.Types.ObjectId, ref: "ContentType" },
    createdAt: Number,
    createdBy: String,
    lastUpdated: Number,
    lastUpdatedBy: String,
    publishDate: Number
  },
  { strict: false }
);

mongoose.model("entries", entrySchema);
