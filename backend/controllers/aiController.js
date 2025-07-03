const {GoogleGenAI} = require("@google/genai");
const {conceptExplainPrompt} = require("../utils/prompts");

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const generateInterviewQuestions = async(req,res)=>{
    try{

    }catch(e){
        res.status(500).json({message:"Failed to generate questions", error:e.message});
    }
}


const generateExplanation= async(req,res)=>{
    try{

    }catch(e){
        res.status(500).json({message:"Failed to generate explanation", error:e.message});
    }
}


module.exports = {generateInterviewQuestions,generateExplanation}