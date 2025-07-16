import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    image:       { type: String, required: true },
    slug:        { type: String, required: true, unique: true },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default
  mongoose.models.Blog || mongoose.model("Blog", blogSchema);




// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema({
//   title:       { type: String, required: true },
//   description: { type: String, required: true },
//   image:       { type: String, required: true },
//   date:        { type: Date,   default: Date.now },
// });

// const BlogModel =
//   mongoose.models.blog || mongoose.model("blog", blogSchema);

// export default BlogModel;
