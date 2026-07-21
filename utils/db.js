import mongoose from "mongoose";

const connect = async () => {
    const uri = "mongodb+srv://nahid143:nahid420420@cluster0.urqrhir.mongodb.net/"
    await mongoose.connect(uri)
}

export default connect
