const Session = require('../models/Session');
const Question = require('../models/Questions.js')


exports.createSession = async(req,res)=>{
    try {
        const {role,experience, topicsToFocus,description,questions} = req.body;
        const userId = req.user._id;

        const session = await Session.create({
            user:userId,
            role,
            experience,
            topicsToFocus,
            description
        });

        const questionDocs = await Promise.all(
            questions.map(async (q)=>{
                const question = await Question.create({
                    session:session._id,
                    question:q.question,
                    answer:q.amswer
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();
        res.status(200).json({success:true, session});
    } 
    
    catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
}


exports.getMySession = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
}
exports.getSessionById = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
}
exports.deleteSession = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"});
    }
}