export interface addCollectBody {
    foodId: number
    type: number
    userid: number
}

export interface AiQuestionBody {
    question: string
    userid: number
}

export interface DeepSeekQuestionBody {
    message: string,
    model: string
    temperature: number
    maxTokens: number
}
