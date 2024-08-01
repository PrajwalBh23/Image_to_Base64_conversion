import PostMessage from '../models/postmessage.js';

export const getdata = async (req, res) => {
  try {
    const posts = await PostMessage.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postdata = async (req, res) => {
  const { myFile } = req.body;
  const newPost = new PostMessage({ myFile });

  try {
    await newPost.save();
    res.status(201).json({ message: "New Image added" });
  } catch (error) {
    res.status(409).json({ message: "Error adding new image", error: error.message });
  }
};
