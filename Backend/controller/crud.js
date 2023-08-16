const BlogsModel = require("../model/model")



exports.CreatePost = async (req, res) => {
    const reqBody = req.body;
    const data = await BlogsModel.create(reqBody);
    if (data) {
      return res.status(200).json({ status: "Success", data: data });
    } else {
      return res.status(400).json({ status: "Failed"});
  }
  };

  exports.ReadPost= async(req, res) => {
    const Quarry = {};
    const Projection ="title content author ";
   const read =await BlogsModel.find(Quarry, Projection)
      if (read) {
       res.status(200).json({ satus: "Read Successs", data:read });
      } else {
        
        res.status(404).json({ status: "Read Fail", data: err });
      }
    };

  

 exports.UpdatePost = async(req, res) => {
   const id = req.params.id;
   const Query = { _id: id };
   const reqBody = req.body;
   const update =await BlogsModel.updateOne(Query, reqBody)
     if (update) {
       res.status(200).json({ satus: "Update Success", data: update });
     } else {      
      res.status(404).json({ satus: "Update Fail", data: err });
     }  
 };
 
 
 exports.DeletPost =async (req, res) => {
   const id = req.params.id;
   const Query = { _id: id };
  const delet = await BlogsModel.deleteOne(Query)
     if (delet) {
       res.status(200).json({ satus: "Remove Success", data: delet });
     } else {      
       res.status(404).json({ satus: "Remove Fail", data: err });
     }  
 };

 exports.Search = async (req, res) => {
  try {
    const { title } = req.params;
    const results = await BlogsModel.find(
      {
        $or: [
          { title: { $regex: title} },     
        ],
      }
    );

    res.json(results);

  } catch (err) {
    console.log(err);
  }
};
