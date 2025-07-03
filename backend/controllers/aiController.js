const {GoogleGenAI} = require("@google/genai");
const {conceptExplainPrompt, questionAnswerPrompt} = require("../utils/prompts");

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const generateInterviewQuestions = async(req,res)=>{
    try{
        const {role,experience,topicsToFocus,numberOfQuestions} = req.body;
        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message:"Missing required fields"});
        }

        const prompt = questionAnswerPrompt(role,experience,topicsToFocus,numberOfQuestions);
        const response = await ai.models.generateContent({
            model:"gemeni-2.0-flash-lite",
            contents:prompt,
        });
        let rawText = response.text;
        // console.log(rawText);

        const realtext = rawText.replace(/^```json\s*/,"").replace(/```$/,"").trim();
        console.log(realtext);

        const data = JSON.parse(realtext);
        res.send(200).json(data);
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