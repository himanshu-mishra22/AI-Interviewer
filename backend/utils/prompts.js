const questionAnswerPrompt = (role,experience,topicsToFocus,numberofQuestions)=>(
    `You are an AI trained to generate technical interview questions and answer.
    Task:
    - Role: ${role}
    - Candidate Experience: ${experience} years
    - Focus Topics: ${topicsToFocus}
    - Write ${numberofQuestions} interview questions.
    - For each question, generate a detailed but beginner-friendly answer.
    - If the answer needs a code example, add a small code block inside.
    - Keep formatting very clean,
    - Return a pure JSON array like:
    [
        {
            "question" : "Question here?",
            "answer" : "Answer here.."
        },
        ...
    ]
    Important: Do NOT add any extra text, Only return valid JSON.
    `
)

const conceptExplainPrompt = (question) => (
    `
    You are an AI trained to generate explanations for a given interview question.
    Task: 
    - Explain the following interview question and its concept in depth as if you are a beginner developer.
    - Question : "${question}"
    - After the explanation, provide a short and clear title that summarize the concept for the article or page header
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON onject in the following format:
    {
        "title":"Short title here?",
        "explanation":"Explanation here"
    }
    Important: Do NOT add any extra text, Only return valid JSON.
    `
)

module.exports = {conceptExplainPrompt,questionAnswerPrompt};