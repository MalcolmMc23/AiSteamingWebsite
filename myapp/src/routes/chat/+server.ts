import type { RequestHandler } from '../chat/$types';
import { OpenAIStream, StreamingTextResponse} from "ai"
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAiAPI_KEY } from '$env/static/private';

const config = new Configuration({
    apiKey: OpenAiAPI_KEY
})
const openai = new OpenAIApi(config);

export const POST: RequestHandler = async ({request}) => {
    const { messages } = await request.json();

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages
    })
    const stream = await OpenAIStream(response)

    return new StreamingTextResponse(stream)
};