module.exports = {
    config: {
        name: 'tagall',
        aliases: ['all', 'mentionall'],
        permission: 3,
        prefix: true,
        description: 'Mentions all members of a group with stylish greetings.',
        categories: 'group',
        usages: [`${global.config.PREFIX}tagall [optional message]`],
        credit: 'Developed by Mohammad Nayan'
    },

    start: async ({ event, api, args }) => {
        const { threadId, senderI, message } = event;

        const groupMetadata = await api.groupMetadata(threadId);
        const participants = groupMetadata.participants || [];

        if (participants.length === 0) {
            return await api.sendMessage(threadId, { text: '⚠️ No participants found in this group.' });
        }

        
        const greetings = [
            "👋 হ্যালো সবাই! আজ কিছু মজা করার জন্য প্রস্তুত?",
            "🌚 হ্যালো সুন্দরী মেয়েরা কেমন আছো তোমরা ",
            "😎 ওহ দল! চলো আজকের দিনটিকে অসাধারণ করে তুলি!",
            "🎉 হ্যালো বন্ধুরা! এবার কিছু গ্রুপ বিশৃঙ্খলার সময়।😜",
            "💖 সবাইকে শুভেচ্ছা! ভালোবাসা এবং হাসি ছড়িয়ে দিন!",
            "🔥 কি খবর ফ্যামিলি? চলো এই গ্রুপটাকে জাগিয়ে তুলি!",
            "🥳 সবাইকে আসসালামুয়ালাইকুম পার্টির আমেজ শুরু!",
            "😇 হে কিংবদন্তিরা! আজও হাসতে থাকো।",
            "⚡ হ্যালো তারকারা! আজ উজ্জ্বলভাবে জ্বলে উঠুন।",
            "🌈 সকলের দৃষ্টি আকর্ষণ করছি! মজার মোড সক্রিয় করা হয়েছে।!"
        ];

        let customMsg = args.join(' ');
        if (!customMsg) {
            
            customMsg = greetings[Math.floor(Math.random() * greetings.length)];
        }

        
        let mentionText = `✨ *${customMsg}* ✨\n\n`;
        let mentions = [];

        participants.forEach((participant, index) => {
            mentionText += `🎀🩷 ${index + 1}. @${participant.id.split('@')[0]}\n`;
            mentions.push(participant.id);
        });

        mentionText += `\n💌 Have a great day, everyone!`;

        
        await api.sendMessage(threadId, {
            text: mentionText,
            mentions: mentions
        }, { quoted: message });
    }
};
