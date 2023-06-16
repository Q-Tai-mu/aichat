/*
 * @职业: 自由 开发者
 * @Description: 
 * @Author: KeHan
 * @Date: 2023-05-21 14:51:31
 * @LastEditTime: 2023-05-21 17:40:38
 * @LastEditors: KeHan
 */
const expressions = [
    {
        keywords: ["hello", "hi", "hey", "你好", "您好", "嗨", "哈喽", "哈罗"],
        response: "你好，需要我帮助你什么吗？"
    },
    {
        keywords: ["how are you", "how are things", "你好吗", "最近怎么样"],
        response: "我很好，谢谢关心。"
    },
    {
        keywords: ["thank", "thanks", "谢谢", "感谢", "多谢", "麻烦你了"],
        response: "不用谢！"
    },
    {
        keywords: ["weather", "天气"],
        response: "很抱歉，我现在没有天气信息。"
    },
    {
        keywords: ["language", "speaking", "语言", "讲话", "说话"],
        response: "我可以用多种语言进行交流，包括英语。"
    },
    {
        keywords: ["time", "时间", "几点了"],
        response: "现在的时间是 " + new Date().toLocaleTimeString() + "。"
    },
    {
        keywords: ["goodbye", "bye", "再见", "拜拜", "下次见"],
        response: "再见！很高兴能和你聊天。"
    },
    {
        keywords: ["love", "爱", "喜欢", "爱好"],
        response: "爱情是美好的，你不觉得吗？"
    }, {
        keywords: ["joke", "笑话"],
        response: "我知道一个笑话，你想听吗？"
    },
    {
        keywords: ["music", "音乐"],
        response: "我喜欢听音乐，你呢？"
    },
    {
        keywords: ["movie", "电影"],
        response: "我最近看了一部很好看的电影，你有兴趣吗？"
    },
    {
        keywords: ["game", "游戏"],
        response: "我也喜欢玩游戏，你最喜欢什么类型的游戏？"
    },
    {
        keywords: ["book", "书籍"],
        response: "我也喜欢读书，你最近读了什么好书？"
    },
    {
        keywords: ["sport", "运动"],
        response: "我也喜欢运动，你最擅长什么运动？"
    }
];
module.exports = expressions;