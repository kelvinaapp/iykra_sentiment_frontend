const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export const sendChatMessage = async (message, onChunk) => {
    try {
        const response = await fetch(`${API_BASE_URL}/ai/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') {
                        return;
                    }
                    try {
                        const jsonData = JSON.parse(data);
                        if (jsonData.error) {
                            throw new Error(jsonData.error);
                        }
                        if (jsonData.text) {
                            onChunk(jsonData.text);
                        }
                    } catch (e) {
                        console.error('Error processing chunk:', e);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error in sendChatMessage:', error);
        throw error;
    }
};
