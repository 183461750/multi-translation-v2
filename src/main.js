var lang = require('./lang.js');

function supportLanguages() {
    return lang.supportLanguages();
}

// 自定义睡眠函数
function sleep(ms) {
    return new Promise(resolve => {
        const end = Date.now() + ms;
        while (Date.now() < end) {
            // 空循环，直到时间到达
        }
        resolve();
    });
}

async function waitForCompletion(chatId, conversationId, apiKey) {
    let status = 'in_progress';

    const checkStatus = async () => {
        const resp = await $http.request({
            method: "GET",
            url: `https://api.coze.cn/v3/chat/retrieve?chat_id=${chatId}&conversation_id=${conversationId}`,
            header: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (resp.error) {
            throw new Error(resp.error.message || '查询翻译状态失败');
        }

        status = resp.data.data.status;

        $log.info('Check Status Response: ' + JSON.stringify(resp.data));

        if (status === 'error') {
            throw new Error('对话状态错误: ' + resp.data.message);
        }

        if (status === 'completed') {
            $log.info('Translation completed: ' + JSON.stringify(resp.data));
            return;
        }

        if (status === 'in_progress') {
            await sleep(1000); // 使用自定义的睡眠函数
            return checkStatus();
        }
    };

    await checkStatus();
}

async function getTranslationResult(chatId, conversationId, apiKey) {
    const resp = await $http.request({
        method: "GET",
        url: `https://api.coze.cn/v3/chat/message/list?chat_id=${chatId}&conversation_id=${conversationId}`,
        header: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    if (resp.error) {
        throw new Error(resp.error.message || '获取翻译结果失败');
    }

    $log.info('Response Data: ' + JSON.stringify(resp.data));

    // 检查返回的数据结构
    if (!resp.data || !Array.isArray(resp.data.data)) {
        throw new Error('返回的数据格式不正确，预期为对象，实际为: ' + JSON.stringify(resp.data));
    }

    // 找到类型为 answer 的消息内容
    const answerMessage = resp.data.data.find(msg => msg.type === 'answer');
    if (answerMessage) {
        return answerMessage.content; // 返回翻译内容
    } else {
        throw new Error('未找到翻译结果');
    }
}

function translate(query, completion) {
    const { text } = query; // 只提取用户输入的文本
    const apiKey = $option.apiKey;
    const botId = $option.botId;

    if (!apiKey) {
        completion({
            error: {
                type: 'api',
                message: '请先配置豆包API密钥',
            },
        });
        return;
    }

    if (!botId) {
        completion({
            error: {
                type: 'api',
                message: '请先配置豆包机器人ID',
            },
        });
        return;
    }

    const body = {
        bot_id: botId,
        user_id: "bob_plugin_user",
        stream: false,
        auto_save_history: true,
        additional_messages: [
            {
                role: "user",
                content: text, // 直接传递用户输入的文本
                content_type: "text"
            }
        ]
    };

    (async () => {
        try {
            const chatResp = await $http.request({
                method: "POST",
                url: "https://api.coze.cn/v3/chat",
                header: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: body
            });

            $log.info('Chat Response: ' + JSON.stringify(chatResp));

            if (chatResp.error) {
                throw new Error(chatResp.error.message || '发起翻译请求失败');
            }

            const { id: chatId, conversation_id: conversationId } = chatResp.data.data;

            $log.info('Chat ID: ' + chatId);
            $log.info('Conversation ID: ' + conversationId);

            await waitForCompletion(chatId, conversationId, apiKey);

            const translatedText = await getTranslationResult(chatId, conversationId, apiKey);

            completion({
                result: {
                    from: 'auto', // 可以根据需要设置为 'auto'
                    to: 'auto',   // 可以根据需要设置为 'auto'
                    toParagraphs: [translatedText.trim()]
                }
            });
        } catch (e) {
            completion({
                error: {
                    type: 'unknown',
                    message: e.message
                }
            });
        }
    })();
}

module.exports = {
    translate,
    supportLanguages
}; 